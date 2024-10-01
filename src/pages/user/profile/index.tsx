import { Card, Image, Link, User } from '@nextui-org/react';
import UploadImg from '../../../components/UploadImg';
import { IoMdPerson } from 'react-icons/io';
import CourseJoined from './CourseJoined';
import { useAuth } from '../../../context/authContext';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IUserCourse } from '../../../model/Course.model';
import { getUserCourseByUser } from '../service';
import { Helmet } from 'react-helmet-async';

function Profile() {
   const [userCourses, setUserCourses] = useState<IUserCourse[]>([]);
   const { user } = useAuth();

   useEffect(() => {
      const initUserCourseByUser = async () => {
         if (!user?.id) return;
         const res = await getUserCourseByUser(user?.id);
         setUserCourses(res);
      };

      initUserCourseByUser();
   }, [user]);

   return (
      <div className="w-full">
         <Helmet>
            <title>Trang cá nhân của bạn</title>
         </Helmet>
         <div className="w-full bg-[#15616d] relative flex rounded-b-xl justify-center items-center">
            <Image
               className="m-auto bg-contain h-[20rem]"
               alt="Code"
               src="https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/Green%20Teal%20%26%20Navy%20Geometric%20Modern%20Computer%20Programmer%20Code%20Editor%20Quotes%20for%20Facebook%20Post.png?alt=media&token=5e69af64-97e1-4c27-901d-3ce3b4609272"
            ></Image>

            <div className="absolute bottom-3 right-3">
               <UploadImg
                  onResult={function (res: string): void {
                     console.log(res);
                  }}
               />
            </div>
            <Card className=" scale-150 absolute left-[5%] -bottom-[10%] p-2 pl-4 pr-4">
               <User
                  name="Junior Garcia"
                  description={
                     <Link href={user?.avatar} size="sm" isExternal>
                        @{user?.email}
                     </Link>
                  }
                  avatarProps={{
                     src: user?.avatar,
                  }}
               />
            </Card>
         </div>

         <div className="flex mt-20 justify-between items-start gap-10">
            <Card className="p-4 w-full flex flex-col gap-4">
               <div>
                  <h5 className=" font-extrabold">Giới thiệu</h5>
                  <div className="flex justify-start items-center gap-4 mt-2">
                     <IoMdPerson className="" />
                     <h5 className=" ">
                        Thành viên của Course EDU - Học lập trình để đi làm từ{' '}
                        {user?.verifyAt && dayjs(new Date(user?.verifyAt)).locale('vi').format('DD/MM/YYYY')}
                     </h5>
                  </div>
               </div>

               <div>
                  <h5 className=" font-extrabold">Hoạt động gần đây</h5>
                  <div className="flex justify-start items-center gap-4 mt-2">
                     <IoMdPerson className="" />
                     <h5 className=" ">Chưa có hoạt động nào gần đây</h5>
                  </div>
               </div>
            </Card>

            <div className="flex flex-col gap-8 w-full">
               <h5 className=" font-extrabold">Các khóa học đã tham gia</h5>
               {userCourses.map((userCourse, index) => (
                  <CourseJoined key={index} data={userCourse} />
               ))}
            </div>
         </div>
      </div>
   );
}

export default Profile;
