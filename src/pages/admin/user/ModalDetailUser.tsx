import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Spinner, User, Chip } from '@nextui-org/react';
import { IUser } from '../../../model/User.model';
import dayjs from 'dayjs';
import { getDetailUser } from './service';
type ModalDetailUserProps = {
   id: number;
   children?: React.ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
};

export default function ModalDetailUser(props: ModalDetailUserProps) {
   const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
   const [isLoading, setIsLoading] = useState(false);
   const [user, setUser] = useState<IUser | null>(null);

   useEffect(() => {
      if (!props.id) return;

      const initData = async () => {
         setIsLoading(true);
         const res = await getDetailUser(props.id);
         setIsLoading(false);

         setUser(res);
      };

      initData();
   }, [props.id]);
   return (
      <Modal
         className="min-w-[45rem] z-[1000000]"
         onClose={props.onClose}
         isOpen={props.isOpen}
         onOpenChange={onOpenChange}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                  <ModalBody>
                     {isLoading ? (
                        <Spinner />
                     ) : (
                        <div className="p-2 w-[40rem] rounded-lg flex flex-col gap-4 justify-center items-center bg-[rgba(0,0,0,0.1) backdrop-blur-2xl ">
                           <h1 className=" text-xl font-bold">Thông tin chi tiết người dùng</h1>

                           <div className="w-full flex-col flex justify-center items-center gap-4">
                              <User
                                 name={user?.fullName}
                                 description={user?.bio}
                                 avatarProps={{
                                    src: user?.avatar,
                                 }}
                              />
                              <div className="flex w-full justify-between gap-10">
                                 <div className="flex flex-col gap-10">
                                    <div className="flex justify-start items-center gap-4">
                                       <h5 className="font-bold">Họ và tên: </h5>
                                       <h5>{user?.fullName === '' ? 'Chưa cập nhật' : user?.fullName}</h5>
                                    </div>
                                    <div className="flex justify-start items-center gap-4">
                                       <h5 className="font-bold">Trạng thái: </h5>
                                       {user?.verifyAt ? (
                                          <Chip color="success" className="text-white ">
                                             Đã kích hoạt lúc(${dayjs(user.verifyAt).format('HH:MM, DD-MM-YYYY')})
                                          </Chip>
                                       ) : (
                                          <Chip color="danger">'Chưa kích hoạt'</Chip>
                                       )}
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-10">
                                    <div className="flex justify-start items-center gap-4">
                                       <h5 className="font-bold">Email: </h5>
                                       <h5>{user?.email}</h5>
                                    </div>
                                    <div className="flex justify-start items-center gap-4">
                                       <h5 className="font-bold">Bio: </h5>
                                       <h5>{user?.bio === '' ? 'Chưa cập nhật' : user?.bio}</h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </ModalBody>
               </>
            )}
         </ModalContent>
      </Modal>
   );
}
