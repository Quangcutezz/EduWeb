import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import AdminLayout from '../../../layouts/AdminLayout';
import CardItem from './CardItem';
import { path } from '../../../enum/path';
import { GoPersonFill } from 'react-icons/go';
import { BiBookContent } from 'react-icons/bi';
import { SlBookOpen } from 'react-icons/sl';
import { Helmet } from 'react-helmet-async';
function Dashboard() {
   return (
      <AdminLayout>
         <Helmet>
            <title>Menu quản lý hệ thống</title>
         </Helmet>
         <div className="w-full  p-4">
            <Breadcrumbs>
               <BreadcrumbItem>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
            </Breadcrumbs>

            <div className="mt-5 flex justify-start items-center gap-10">
               <CardItem
                  title="Khóa học"
                  icon={<BiBookContent className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.COURSE}
                  description={'Quản lý khóa học của bạn...'}
                  subtitle="Thêm 1 khóa học mỗi tháng"
               />
               <CardItem
                  title="Người dùng"
                  icon={<GoPersonFill className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.USER}
                  description={'Quản trị người dùng...'}
                  subtitle=" Tăng 12 người dùng mỗi tháng"
               />
               <CardItem
                  title="Bài viết"
                  icon={<SlBookOpen className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.POST}
                  description={'Quản lý bài viết, duyệt, xóa...'}
                  subtitle="Thêm 12 bài viết mỗi tháng"
               />
            </div>
         </div>
      </AdminLayout>
   );
}

export default Dashboard;
