import { BreadcrumbItem, Breadcrumbs, Pagination } from '@nextui-org/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { path } from '../../../enum/path';
import { useNavigate } from 'react-router-dom';
import FilterBarUser from './FilterBarUser';
import Table from './Table';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { countTotalUser, getPaginationUser } from './service';
import { IUser } from '../../../model/User.model';
import { IPaginationClientData } from '../../../assets/data/PaginatedResponse.dto';
import { IUserQueryDto } from '../../../assets/data/UseQuery.Dto';
import { IPaginationRequestDto } from '../../../assets/data/PaginationRequest.Dto';

function User() {
   const history = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [userData, setUserData] = useState<IUser[]>([]);

   const [paginationData, setPaginationData] = useState<IPaginationClientData>({
      totalPages: -1,
      size: 5,
      currentPage: 1,
   });
   const [filterData, setFilterData] = useState<IUserQueryDto>({
      query: null,
   });

   const handleChangePage = async (page: number) => {
      const queryData: IPaginationRequestDto<IUserQueryDto> = {
         where: filterData,
         pageNumber: page,
         pageSize: paginationData.size,
      };
      setPaginationData((prev) => {
         return {
            ...prev,
            currentPage: page,
         };
      });
      setIsLoading(true);
      const res = await getPaginationUser(queryData);
      setIsLoading(false);
      res && setUserData(res.data);
   };

   const getTotalCourse = async () => {
      const queryData: IUserQueryDto = {
         ...filterData,
      };
      const totalCourse = await countTotalUser(queryData);
      setPaginationData((prev) => {
         return {
            ...prev,
            totalPages: Math.ceil(+totalCourse / paginationData.size),
            isHasNextPage: totalCourse > paginationData.size,
         };
      });
   };

   useEffect(() => {
      const initData = async () => {
         setIsLoading(true);
         await getTotalCourse();
         const queryData: IPaginationRequestDto<IUserQueryDto> = {
            where: {},
            pageNumber: 1,
            pageSize: paginationData.size,
         };
         const res = await getPaginationUser(queryData);
         setIsLoading(false);
         res && setUserData(res.data);
      };

      initData();
   }, []);

   useEffect(() => {
      const filterData = async () => {
         await Promise.all([getTotalCourse(), handleChangePage(paginationData.currentPage)]);
      };
      setIsLoading(true);
      const queryTimeout = setTimeout(() => {
         filterData();
         setIsLoading(false);
      }, 1000);
      return () => {
         clearTimeout(queryTimeout);
      };
   }, [filterData]);

   return (
      <AdminLayout>
         <Helmet>
            <title>Quản lý người dùng trong hệ thống</title>
         </Helmet>
         <div className="w-full  p-4">
            <Breadcrumbs>
               <BreadcrumbItem onClick={() => history(path.ADMIN.USER)}>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
               <BreadcrumbItem>Người dùng</BreadcrumbItem>
            </Breadcrumbs>
            <FilterBarUser
               onChange={function (text: string): void {
                  setFilterData((prev) => {
                     return {
                        ...filterData,
                        query: text,
                     };
                  });
               }}
            />
            <div className="pt-5">
               <Table isLoading={isLoading} data={userData} />
            </div>
            <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
               <Pagination total={paginationData.totalPages} initialPage={1} className="" />
            </div>
         </div>
      </AdminLayout>
   );
}

export default User;
