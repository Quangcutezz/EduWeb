import {
   Button,
   Card,
   CardBody,
   CardFooter,
   Chip,
   Image,
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@nextui-org/react';
import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { IPostItem } from '../../../model/Post.model';
import toast from 'react-hot-toast';

type PostUserItemProps = {
   data: IPostItem;
   onRemove: (id: any) => void;
};

const removePost = async (id: number): Promise<boolean> => {
   try {
      const response = await fetch('https://localhost:7005/api/post/' + id, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData: boolean = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return false;
   }
};

function PostUserItem(props: PostUserItemProps) {
   const [isOpenConfirmRemove, setIsOpenConfirmRemove] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const handleRemovePost = async () => {
      if (!props.data.id) return;

      setIsLoading(true);
      const isRemove = await removePost(+props.data.id);
      setIsLoading(false);

      if (isRemove) {
         toast.success('Xóa bài viết thành công!');
         props.onRemove(props.data.id);
      } else {
         toast.error('Xóa bài viết không thành công!');
      }
   };
   return (
      <Card
         shadow="sm"
         isPressable
         onPress={() => console.log('item pressed')}
         className="relative scale-90 border-none"
      >
         <CardBody className="overflow-visible p-0">
            <Image
               shadow="sm"
               radius="lg"
               width="100%"
               alt={props.data.title}
               className="object-cover h-[250px] w-[340px]"
               src={props.data.thumbnail}
            />
         </CardBody>
         <CardFooter className="text-small gap-2 justify-start items-start flex flex-col">
            <b>{props.data.title}</b>
            <h6 className=" truncate w-full text-start">{props.data.description}</h6>

            <div className="flex justify-start gap-2">
               {props.data.tags.split(',').map((p, index) => (
                  <Chip key={index} variant="flat" color="secondary">
                     #{p.toUpperCase()}
                  </Chip>
               ))}
            </div>

            <div className="flex justify-between items-center w-full">
               {props.data.isApproved ? (
                  <Chip variant="flat" color="success">
                     {'Đã phê duyệt'}
                  </Chip>
               ) : (
                  <Chip variant="flat" color="danger">
                     {'Chưa phê duyệt'}
                  </Chip>
               )}

               <Popover isOpen={isOpenConfirmRemove} backdrop="blur" placement="top-start" offset={20} showArrow>
                  <PopoverTrigger>
                     <div
                        onClick={() => {
                           setIsOpenConfirmRemove(true);
                        }}
                     >
                        <IoMdTrash className="text-xl text-red-600" />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent>
                     <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.1) backdrop-blur-2xl ">
                        <h1 className="mb-2 text-2xl font-bold">Xác nhận xóa</h1>
                        <h5>Bạn có chắc chắn muốn xóa bài viết này</h5>

                        <div className="mt-2 w-full flex justify-center items-center gap-4">
                           <Button
                              size="sm"
                              onClick={() => {
                                 setIsOpenConfirmRemove(false);
                              }}
                           >
                              Hủy
                           </Button>
                           <Button size="sm" color="danger" onClick={handleRemovePost} isLoading={isLoading}>
                              Chắc chắn
                           </Button>
                        </div>
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
         </CardFooter>
      </Card>
   );
}

export default PostUserItem;
