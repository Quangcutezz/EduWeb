import React, { useState } from 'react';
import {
   Table as TableNextUI,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Image,
   Chip,
   Spinner,
   Button,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Link,
} from '@nextui-org/react';
import {
   IPostItem,
   IStatusPost,
   MapColorStatusPost,
   MapTextColorStatusPost,
   MapTitleStatusPost,
} from '../../../model/Post.model';
import { BiListCheck } from 'react-icons/bi';
import ModalConfirmRemovePost from './ModalConfirmRemovePost';
import { HiOutlineCheck } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { path } from '../../../enum/path';
import { approvePost, rejectPost } from './service';
import toast from 'react-hot-toast';

const columns = [
   { name: 'Tiêu đề', uid: 'title' },
   { name: 'Ảnh đại diện', uid: 'thumbnail' },
   { name: 'Mô tả', uid: 'description' },
   { name: 'Trạng thái', uid: 'status' },
   { name: 'Danh mục', uid: 'tags' },
   { name: '', uid: 'actions' },
];

type TableProps = {
   data: IPostItem[];
   isLoading?: boolean;
   onRemove: (id: string | number) => void;
   onChangePost: (post: IPostItem) => void;
};

export default function Table(props: TableProps) {
   const [isLoadingApprove, setIsLoadingApprove] = useState(false);
   const [isLoadingReject, setIsLoadingReject] = useState(false);

   const renderCell = React.useCallback((post: IPostItem, columnKey: any) => {
      const handleApprovePost = async () => {
         if (!post.id) return;
         setIsLoadingApprove(true);
         const res = await approvePost(post.id);

         if (res) {
            props.onChangePost(res);
            toast.success('Bài viết đã được phê duyệt!');
         } else {
            toast.error('Có lỗi gì đó,! thử lại!');
         }
         setIsLoadingApprove(false);
      };

      const handleRejectPost = async () => {
         if (!post.id) return;
         setIsLoadingReject(true);
         const res = await rejectPost(post.id);
         if (res) {
            props.onChangePost(res);
            toast.success('Bài viết đã bị từ chối!');
         } else {
            toast.error('Có lỗi gì đó,! thử lại!');
         }
         setIsLoadingReject(false);
      };

      const statusColor = post.status?.toString() && MapColorStatusPost[post.status];
      const statusName = post.status?.toString() && MapTitleStatusPost[post.status];
      const statusTextColor = post.status?.toString() && MapTextColorStatusPost[post.status];
      switch (columnKey) {
         case 'title':
            return <h5>{post.title}</h5>;
         case 'thumbnail':
            return <Image width={200} alt={post.title} src={post.thumbnail} />;
         case 'status':
            return (
               <div
                  className={`capitalize  p-1 ${statusColor} rounded-full text-center text-sm max-w-[10rem] ${statusTextColor}`}
               >
                  {statusName}
               </div>
            );
         case 'description':
            return <h5 className="w-10rem truncate">{post.description}</h5>;
         case 'tags':
            return (
               <div className="flex justify-start items-center gap-2 ">
                  {post.tags &&
                     post.tags.split(',').map((tag) => (
                        <Chip variant="flat" color="secondary" key={tag}>
                           #{tag.toUpperCase()}
                        </Chip>
                     ))}
               </div>
            );
         case 'actions':
            return (
               <div className="relative flex items-center gap-2">
                  {post.status === IStatusPost.WAIT_APPROVE && (
                     <Popover placement="right" backdrop="blur">
                        <PopoverTrigger>
                           <Button
                              startContent={<BiListCheck className="text-2xl" />}
                              isIconOnly
                              variant="flat"
                              color="secondary"
                           />
                        </PopoverTrigger>
                        <PopoverContent>
                           <div className="px-1 py-2">
                              <div className="text-small font-bold">Duyệt bài viết này</div>
                              <div className="text-small ">Bạn nên kiểm tra nội dung bài viết trước khi duyệt</div>
                              <Link href={path.COURSE.DEFAULT + '/' + post.id}>Kiểm tra ngay</Link>
                              <div className="text-tiny flex justify-end gap-4 mt-5">
                                 <Button
                                    onClick={handleRejectPost}
                                    isIconOnly
                                    startContent={<MdClose className="text-2xl text-white" />}
                                    color="danger"
                                    isLoading={isLoadingApprove}
                                 />
                                 <Button
                                    onClick={handleApprovePost}
                                    isIconOnly
                                    startContent={<HiOutlineCheck className="text-2xl text-white" />}
                                    color="success"
                                    isLoading={isLoadingReject}
                                 />
                              </div>
                           </div>
                        </PopoverContent>
                     </Popover>
                  )}

                  {post.id && <ModalConfirmRemovePost id={+post.id} onRemove={props.onRemove} />}
               </div>
            );
         default:
            return <h5></h5>;
      }
   }, []);

   return (
      <>
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
               isLoading={props.isLoading}
               loadingContent={<Spinner label="Loading..." />}
               emptyContent={<h5>Không có kết quả nào</h5>}
               items={props.data}
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
