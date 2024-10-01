import { Accordion, AccordionItem, Button, Image, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { FaCheck } from 'react-icons/fa';
import Review from '../../components/Review';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ICourse } from '../../model/Course.model';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import { checkExistRegisterCourse, createPayment, getCourseById } from './service';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import { useLoading } from '../../context/loadingContext';
import { useRouter } from '../../hook';
import { path } from '../../enum/path';
import { Helmet } from 'react-helmet-async';

var settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
};

function SummaryCourse() {
   const loading = useLoading();
   const { courseId } = useParams();
   const { user } = useAuth();
   const router = useRouter();
   const [isCheckBuyExist, setIsCheckBuyExist] = useState(false);
   const [course, setCourse] = useState<ICourse | null>(null);

   useEffect(() => {
      const intiCourseData = async () => {
         if (courseId) {
            const res = await getCourseById(courseId);
            if (res) {
               setCourse(res);
            }
         }
      };
      courseId && intiCourseData();
   }, [courseId]);

   useEffect(() => {
      const initCheckBuyExist = async () => {
         if (user?.id && course?.id) {
            const res = await checkExistRegisterCourse(user?.id, course?.id);
            setIsCheckBuyExist(res);
         }
      };

      user?.id && course?.id && initCheckBuyExist();
   }, [course, user]);

   const handleRegisterCourseFree = async () => {
      if (!user?.id || !course?.id) return;
      const registerCourseRequestDto = {
         courseId: course?.id,
         userId: user?.id,
         isPayment: false,
      };
      loading.startLoading();
      try {
         const registerCourseResult = await createPayment({
            ...registerCourseRequestDto,
            isPayment: true,
         });
         console.log('Register Course Result:', registerCourseResult);

         if (registerCourseResult) {
            toast.success('Đăng ký khóa học thành công!');
            router.replace('/' + path.COURSE.LEARNING + registerCourseRequestDto.courseId);
         }
      } catch (error) {
         // Handle errors here
         console.error('Error:', error);
      }
      loading.stopLoading();
   };

   const handleRegisterCourseRequestHasFee = async () => {
      if (!user?.id || !course?.id) return;
      const registerCourseRequestDto = {
         courseId: course?.id,
         userId: user?.id,
         isPayment: false,
      };
      loading.startLoading();
      try {
         const createPaymentCourse = await createPayment({
            ...registerCourseRequestDto,
            isPayment: true,
         });
         if (createPaymentCourse?.paymentURL) {
            window.location.href = createPaymentCourse?.paymentURL;
         }
         console.log('Create Payment Course Result:', createPaymentCourse);
      } catch (error) {
         // Handle errors here
         console.error('Error:', error);
      }
      loading.stopLoading();
   };

   return (
      <>
         {course && (
            <Helmet>
               <title>{course?.title}</title>
               <meta name="description" content={course.description} />
               <meta name="keywords" content={course.title + course.subTitle + course.description} />
               <meta name="robots" content="index, follow" />
               <link rel="canonical" href="https://www.example.com/" />
               <meta property="og:title" content={course.description} />
               <meta property="og:description" content={course.description} />
               <meta property="og:image" content={course.thumbnail} />
               <meta property="og:url" content={course.thumbnail} />
               <meta name="twitter:card" content={course.thumbnail} />
               <meta name="twitter:title" content={course?.title} />
               <meta name="twitter:description" content={course.description} />
               <meta name="twitter:image" content={course.thumbnail} />
            </Helmet>
         )}
         {!course && <h1>Loading ...</h1>}
         {course && (
            <div className="max-w-screen-xl mt-5 m-auto select-none ">
               <div className="flex justify-between items-start gap-6">
                  <div className="flex flex-col gap-4 w-2/3">
                     <h1 className="font-extrabold text-3xl">{course.title}</h1>
                     <h5>{course.description}</h5>
                     <div className="w-full">
                        <h1 className="font-bold underline">Bạn sẽ học được gì?</h1>
                        <div className="grid grid-cols-2 mt-5 gap-6">
                           {course.target.split(',').map((rq, index) => (
                              <div key={index} className="flex justify-start items-center gap-4">
                                 <FaCheck className="text-primary" />
                                 <span>{rq}</span>
                              </div>
                           ))}
                        </div>
                        <h1 className="font-bold mt-5 underline">Nội dung học tập</h1>
                        <div className="w-full">
                           {course.groupLessons && (
                              <Accordion>
                                 {course.groupLessons?.map((groupLesson, index) => (
                                    <AccordionItem
                                       key={groupLesson.id}
                                       aria-label={'Accordion ' + groupLesson.id}
                                       title={groupLesson.index + 1 + '.' + groupLesson.title}
                                    >
                                       {groupLesson.lessons &&
                                          groupLesson.lessons.map((lesson, lessonIndex) => (
                                             <div key={lesson.id} className="p-4 rounded-lg w-full hover:bg-primary/10">
                                                {index + 1}.{lessonIndex + 1}
                                                {'   '}
                                                {lesson.title}
                                             </div>
                                          ))}
                                    </AccordionItem>
                                 ))}
                              </Accordion>
                           )}
                        </div>

                        <h1 className="font-bold mt-5 underline">Yêu cầu</h1>
                        {course.requireSkill.split(',').map((rq, index) => (
                           <div key={index} className="flex mt-5 justify-start items-center gap-4">
                              <FaCheck className="text-primary" />
                              <span>{rq}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="w-1/3 flex-col gap-4 justify-center flex items-center">
                     <Image className="w-full" alt={course.title} src={course.thumbnail} />
                     {course.price !== 0 && <CurrencyFormatter amount={course.price} />}
                     {course.price === 0 && <div className=" text-orange-500">Miến phí</div>}
                     {isCheckBuyExist && (
                        <Button
                           onClick={() => {
                              router.push(path.COURSE.LEARNING + course?.id);
                           }}
                           color="primary"
                        >
                           Truy cập học
                        </Button>
                     )}

                     {/*  ì user not login */}
                     {!user && (
                        <Popover backdrop="blur" placement="right">
                           <PopoverTrigger>
                              <Button color="primary">Đăng ký</Button>
                           </PopoverTrigger>
                           <PopoverContent>
                              <div className=" flex flex-col justify-center items-center p-5">
                                 <div className="text-small font-bold">
                                    Bạn chưa đăng nhập vào hệ thống, vui lòng đăng nhập rồi thử lại sau
                                 </div>
                                 <Button
                                    onClick={() => router.push(path.AUTH.LOGIN)}
                                    className="mt-2 text-white"
                                    color="success"
                                 >
                                    Đăng nhập ngay
                                 </Button>
                              </div>
                           </PopoverContent>
                        </Popover>
                     )}
                     {!isCheckBuyExist && user && (
                        <Button
                           onClick={() => {
                              course.price === 0 ? handleRegisterCourseFree() : handleRegisterCourseRequestHasFee();
                           }}
                           color="primary"
                        >
                           Đăng ký
                        </Button>
                     )}

                     <span className="text-center text-white/2">{course.subTitle}</span>
                  </div>
               </div>
               <div className="w-full mt-10 m-auto">
                  <Slider {...settings}>
                     <Review /> <Review /> <Review /> <Review /> <Review /> <Review />
                  </Slider>
               </div>
            </div>
         )}
      </>
   );
}

export default SummaryCourse;
