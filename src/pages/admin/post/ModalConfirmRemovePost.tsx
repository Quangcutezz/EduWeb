import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { IoMdTrash } from 'react-icons/io';
import { removePostById } from './service';
type ModalConfirmRemovePostProps = {
   id: number;
   onRemove?: (id: number | string) => void;
   children?: React.ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
};

export default function ModalConfirmRemovePost(props: ModalConfirmRemovePostProps) {
   const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
   const [isLoading, setIsLoading] = useState(false);

   const handleRemovePost = async () => {
      setIsLoading(true);
      const isRes = await removePostById(props.id);

      if (isRes) {
         toast.success('Xóa bài viết thành công!');
         props.onRemove && props.onRemove(props.id);
         onClose();
      } else {
         toast.error('Xóa bài viết không thành công!');
      }
      setIsLoading(false);
   };

   return (
      <>
         <Button
            onClick={onOpen}
            startContent={<IoMdTrash className="text-xl" />}
            isIconOnly
            variant="flat"
            color="danger"
         />
         <Modal className="z-[1000000]" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                     <ModalBody>
                        <div className="p-2 rounded-lg flex flex-col gap-4 justify-center items-center bg-[rgba(0,0,0,0.1) backdrop-blur-2xl ">
                           <h1 className="mb-2 text-2xl font-bold">Xác nhận xóa</h1>
                           <h5>Bạn có chắc chắn muốn xóa bài viết này</h5>

                           <div className="mt-2 w-full flex justify-center items-center gap-4">
                              <Button size="sm" onClick={onClose}>
                                 Hủy
                              </Button>
                              <Button size="sm" color="danger" onClick={handleRemovePost} isLoading={isLoading}>
                                 Chắc chắn
                              </Button>
                           </div>
                        </div>
                     </ModalBody>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
}
