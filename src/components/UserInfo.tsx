import { Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { path } from '../enum/path';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from '../hook';
type UserActionItem = {
   name: string;
   path: string;
   action?: () => void;
};

function UserInfo() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const router = useRouter();
   const { logout, user } = useAuth();
   const userAction: UserActionItem[][] = [
      [
         {
            name: 'Trang cá nhân',
            path: '',
            action: () => {
               router.push(path.USER.PROFILE);
            },
         },
      ],
      [
         {
            name: 'Viết blog',
            path: '',
            action: () => {
               router.push(path.POST.CREATE);
            },
         },
         {
            name: 'Bài viết của tôi',
            path: path.USER.MANAGER_POST,
            action: () => {
               router.push(path.USER.MANAGER_POST);
            },
         },
      ],
      [
         {
            name: 'Bài viết đã lưu',
            path: '',
         },
      ],
      [
         {
            name: 'Cài đặt',
            path: path.USER.SETTING,
            action: () => {
               router.push(path.USER.SETTING);
            },
         },
         {
            name: 'Đăng xuất ',
            path: '',
            action: () => {
               logout();
               toast.success('Đăng xuất thành công!');
               router.push(path.AUTH.LOGIN);
            },
         },
      ],
   ];

   useEffect(() => {
      const handleCloseModal = () => {
         setIsOpen(false);
      };

      window.addEventListener('click', handleCloseModal);

      return () => {
         window.removeEventListener('click', handleCloseModal);
      };
   }, []);
   return (
      <Popover placement={'bottom-end'} isOpen={isOpen}>
         <PopoverTrigger>
            <User
               className="select-none  cursor-pointer hover:text-primary"
               name=""
               description=""
               avatarProps={{
                  src: user?.avatar,
               }}
               onClick={() => setIsOpen(true)}
            />
         </PopoverTrigger>
         <PopoverContent className=" light:text-black border-none w-[20rem] p-4 rounded-lg">
            <div className="flex  flex-col w-full justify-center items-start">
               <User
                  className="select-none mb-4 cursor-pointer  hover:text-primary"
                  name={user?.email}
                  description={'@' + user?.firstName + user?.lastName}
                  avatarProps={{
                     src: user?.avatar,
                  }}
               />
               <div className="w-full border-b-[1px] border-solid border-second mb-2"></div>
               {userAction.map((actions, index) => {
                  return (
                     <div key={index} className="flex flex-col w-full">
                        {actions.map((ac, index) => (
                           <div
                              onClick={ac.action}
                              key={index}
                              className="text-black/2 h-[2rem] hover:text-primary cursor-pointer"
                           >
                              {ac.name}
                           </div>
                        ))}
                        {index < userAction.length - 1 && (
                           <div className="w-full border-b-[1px] border-solid border-second mb-2 mt-2"></div>
                        )}
                     </div>
                  );
               })}
            </div>
         </PopoverContent>
      </Popover>
   );
}

export default UserInfo;
