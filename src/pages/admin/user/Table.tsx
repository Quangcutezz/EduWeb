import React, { useState } from 'react';
import {
   Table as TableNextUI,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Chip,
   Tooltip,
   Switch,
   Avatar,
   Spinner,
} from '@nextui-org/react';
import { TfiEye } from 'react-icons/tfi';
import { IUser } from '../../../model/User.model';
import dayjs from 'dayjs';
import ModalDetailUser from './ModalDetailUser';

const columns = [
   { name: 'Họ và tên', uid: 'firstName' },
   { name: 'Ảnh đại diện', uid: 'avatar' },
   { name: 'Email', uid: 'email' },
   { name: 'Chức vụ', uid: 'role' },
   { name: 'Trạng thái', uid: 'status' },
   { name: '', uid: 'actions' },
];

type PropsType = {
   data: IUser[];
   isLoading?: boolean;
};
export default function Table({ data, isLoading }: PropsType) {
   const [userIdSelect, setUserIdSelect] = useState<any>(null);

   const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof IUser];
      switch (columnKey) {
         case 'firstName':
            return (
               <h5>
                  {user.firstName ? (
                     user.firstName + ' ' + user.lastName
                  ) : (
                     <Chip color="danger" variant="flat">
                        Chưa cập nhật
                     </Chip>
                  )}
               </h5>
            );
         case 'avatar':
            return <Avatar alt={user.firstName} src={user.avatar} />;
         case 'email':
            return <h5>{user.email}</h5>;
         case 'role':
            return (
               <Chip className="capitalize" color="secondary" size="sm" variant="flat">
                  {user.role === 1 ? 'Người dùng' : 'Quản trị viên'}
               </Chip>
            );
         case 'status': {
            return (
               <>
                  {user.role === 1 && (
                     <Chip className="capitalize" color="success" size="sm" variant="flat">
                        {user?.verifyAt
                           ? `Đã kích hoạt (Lúc : ${dayjs(user.verifyAt).format('HH:MM, DD-MM-YYYY')})`
                           : 'Quản trị viên'}
                     </Chip>
                  )}
               </>
            );
         }
         case 'actions':
            return (
               <div className="flex justify-end items-center gap-4">
                  {user.role === 1 && (
                     <Tooltip size="sm" color="warning" className="text-white" content="Xem thông tin chi tiết">
                        <span
                           onClick={() => setUserIdSelect(user.id)}
                           className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                           <TfiEye className="text-xl" />
                        </span>
                     </Tooltip>
                  )}
               </div>
            );
         default:
            return cellValue;
      }
   }, []);

   return (
      <>
         <ModalDetailUser onClose={() => setUserIdSelect(null)} isOpen={!!userIdSelect} id={userIdSelect} />
         <TableNextUI aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn
                     className="font-extrabold"
                     key={column.uid}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name.toUpperCase()}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody
               isLoading={isLoading}
               loadingContent={<Spinner label="Loading..." />}
               emptyContent={<h5>Không có kết quả nào</h5>}
               items={data}
            >
               {(item) => (
                  <TableRow className="hover:bg-[rgba(0,0,0,0.1)] cursor-pointer rounded-lg" key={item.id}>
                     {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
               )}
            </TableBody>
         </TableNextUI>
      </>
   );
}
