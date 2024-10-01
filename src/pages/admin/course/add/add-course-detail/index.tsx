import { BreadcrumbItem, Breadcrumbs, Spinner } from '@nextui-org/react';
import { memo, useEffect, useState } from 'react';
import { path } from '../../../../../enum/path';
import AdminLayout from '../../../../../layouts/AdminLayout';
import { useRouter } from '../../../../../hook';
import Sidebar from './SideBar';
import ManagerGroupLesson from './ManagerGroupLesson';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { ICourse } from '../../../../../model/Course.model';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCourseById } from './service';
import { useLoading } from '../../../../../context/loadingContext';
import SettingCourse from './SettingCourse';
import { Helmet } from 'react-helmet-async';

function AddCourseDetail() {
   const { id } = useParams();
   const router = useRouter();
   const [activeSidebar, setActiveSidebar] = useState<number>(0);
   const [course, setCourse] = useState<ICourse | null>(null);
   const loading = useLoading();

   useEffect(() => {
      const initCourse = async () => {
         if (!id) return;
         loading.startLoading();
         const result = await getCourseById(id);
         loading.stopLoading();
         result && setCourse(result);
      };

      if (id) {
         initCourse();
      } else {
         toast.error('Không tìm thấy ID cho khóa học!');
         router.back();
         return;
      }
   }, [id]);

   return (
      <AdminLayout>
         <Helmet>
            <title>Quản lý, chỉnh sửa khóa học - {course.title}</title>
         </Helmet>
         <div className="w-full p-4">
            <Breadcrumbs>
               <BreadcrumbItem onClick={() => router.replace(path.ADMIN.COURSE)}>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
               <BreadcrumbItem>Chi tiết khóa học</BreadcrumbItem>
            </Breadcrumbs>
            {course && (
               <div className="w-full rounded-lg h-full bg-light-sidebar dark:bg-dark-sidebar mt-4">
                  <div
                     onClick={() => router.back()}
                     className="hover:bg-primary/10 cursor-pointer flex justify-start items-center gap-4 w-full pb-2 p-4 border-b-[1px] border-solid border-gray-500/10"
                  >
                     <IoIosArrowRoundBack className="text-2xl" />
                     <div>
                        <h5 className="text-2xl font-extrabold">{course.title}</h5>
                        <h5>{course.description}</h5>
                     </div>
                  </div>
                  <div className="flex w-full">
                     <div className="border-r-[1px] border-solid border-gray-500/10">
                        <Sidebar
                           active={activeSidebar}
                           onChangeSidebar={function (key: number): void {
                              setActiveSidebar(key);
                           }}
                        />
                     </div>

                     {activeSidebar === 0 && course && <ManagerGroupLesson data={course} />}
                     {activeSidebar === 1 && course && (
                        <SettingCourse
                           data={course}
                           onChangeData={(res) => {
                              setCourse(res);
                              setActiveSidebar(0);
                           }}
                        />
                     )}
                  </div>
               </div>
            )}

            {!course && <Spinner color="primary" />}
         </div>
      </AdminLayout>
   );
}

export default memo(AddCourseDetail);
