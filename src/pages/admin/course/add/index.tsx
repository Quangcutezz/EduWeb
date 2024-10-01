import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { path } from '../../../../enum/path';
import AdminLayout from '../../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddSummaryInformation from './AddSummaryInformation';
import { Helmet } from 'react-helmet-async';

export enum EStep {
   ADD_SUMMARY_INFORMATION,
}
function AddCourse() {
   const history = useNavigate();
   const [step, setStep] = useState<EStep>(EStep.ADD_SUMMARY_INFORMATION);
   return (
      <AdminLayout>
         <Helmet>
            <title>Thêm khóa học vào hệ thống</title>
         </Helmet>
         <div className="w-full p-4">
            <Breadcrumbs>
               <BreadcrumbItem onClick={() => history(path.ADMIN.COURSE)}>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
               <BreadcrumbItem>Thêm khóa học</BreadcrumbItem>
            </Breadcrumbs>
            <div className="pt-5 ">
               <div className="w-full rounded-lg p-6 h-full bg-light-sidebar dark:bg-dark-sidebar mt-10">
                  {step === EStep.ADD_SUMMARY_INFORMATION && <AddSummaryInformation />}
               </div>
            </div>
         </div>
      </AdminLayout>
   );
}

export default AddCourse;
