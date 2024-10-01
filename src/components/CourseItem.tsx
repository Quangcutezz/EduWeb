import { Card, Image, Button, CardFooter, CardHeader, CardBody, Chip, user, Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { path } from '../enum/path';
import { ICourse } from '../model/Course.model';
import CurrencyFormatter from './CurrencyFormatter';
import { useRouter } from '../hook';
import course from '../pages/admin/course';
import { checkExistRegisterCourse } from '../pages/course/service';
import { useAuth } from '../context/authContext';
import { useState } from 'react';

type CourseItemProps = {
   data: ICourse;
};
function CourseItem(props: CourseItemProps) {
   const router = useRouter();
   const { user } = useAuth();
   const [isLoading, setIsLoading] = useState(false);

   const handleNavigate = async () => {
      if (user?.id && props.data?.id) {
         setIsLoading(true);
         const res = await checkExistRegisterCourse(user?.id, props.data.id);
         setIsLoading(false);
         if (res) {
            router.push(path.COURSE.LEARNING + props.data.id);
         } else {
            router.push(path.COURSE.SUMMARY + '/' + props.data.id);
         }
      }
   };
   return (
      <Card
         isFooterBlurred
         radius="lg"
         className="relative hover:shadow-md transition-all cursor-pointer select-none overflow-hidden group border-none shadow-none  "
      >
         <CardHeader onClick={handleNavigate} className="  flex-col !items-start">
            <h5 className="text-2xl uppercase font-extrabold max-w-full truncate">{props.data.title}</h5>
            <h4 className=" font-medium text-md  max-w-[90%] truncate">{props.data.description}</h4>
         </CardHeader>
         <CardBody onClick={handleNavigate} className="overflow-visible py-2 relative">
            {isLoading && (
               <div className="absolute z-30 top-0 bottom-0 right-0 left-0 bg-black/10 backdrop-blur-lg flex justify-center items-center">
                  <Spinner color="primary" />
               </div>
            )}

            <Image
               alt={props.data.title}
               className="h-[12rem] min-w-[24rem] w-full bg-contain"
               src={props.data.thumbnail}
            />
         </CardBody>
         <CardFooter className="opacity-0 transition-all group-hover:opacity-100 justify-between before:bg-white/2 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-0 p-2 shadow-small  z-10">
            <p className="font-semibold flex-shrink-0 mr-4 ml-4 text-white">
               {props.data.price !== 0 && <CurrencyFormatter amount={props.data.price} />}
               {props.data.price === 0 && (
                  <Chip className="bg-orange-600/80 text-white" variant="flat">
                     Miến phí
                  </Chip>
               )}
            </p>

            <Button
               onClick={handleNavigate}
               className="text-tiny text-white w-full bg-primary"
               variant="flat"
               color="default"
               radius="lg"
            >
               Xem chi tiết
            </Button>
         </CardFooter>
      </Card>
   );
}

export default CourseItem;
