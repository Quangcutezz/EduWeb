import { IoMdPerson } from 'react-icons/io';
import { HiShieldCheck } from 'react-icons/hi';
import { IoIosNotifications } from 'react-icons/io';
import { Button, User } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import SettingAccount from './SettingAccount';
import Security from './Security';
import SettingNotification from './SettingNotification';
import { IUser } from '../../../model/User.model';
import { useAuth } from '../../../context/authContext';
import { Helmet } from 'react-helmet-async';

const getDetailUserById = async (id: any): Promise<IUser | null> => {
   try {
      const response = await fetch('https://localhost:7005/api/user/' + id, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IUser | null = await response.json();

      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      throw error;
   }
};

function Setting() {
   const { user } = useAuth();
   const [active, setActive] = useState(0);
   const [userDetail, setUserDetail] = useState<IUser | null>(null);
   const nav = [
      {
         name: 'Cài đặt tài khoản',
         icon: <IoMdPerson />,
         key: 0,
      },
      {
         name: 'Bảo mật và đăng nhập',
         icon: <HiShieldCheck />,
         key: 1,
      },
      {
         name: 'Cài đặt thông báo',
         icon: <IoIosNotifications />,
         key: 2,
      },
   ];

   useEffect(() => {
      const initData = async (id: any) => {
         const userDetail = await getDetailUserById(id);
         setUserDetail(userDetail);
      };

      if (user?.id) initData(user.id);
   }, [user]);

   return (
      <div className="w-full flex justify-between items-start p-10 gap-10">
         <Helmet>
            <title>Chỉnh sửa cài đặt tải khoản của bạn - {userDetail?.fullName ?? ''}</title>
         </Helmet>
         <div className="flex flex-col gap-2">
            <h5 className="font-extrabold p-4">Cài đặt của bạn</h5>
            {nav.map((it, index) => (
               <Button
                  className="bg-transparent flex justify-start"
                  key={index}
                  variant="flat"
                  color={active === it.key ? 'primary' : 'default'}
                  onClick={() => setActive(it.key)}
                  startContent={it.icon}
               >
                  {it.name}
               </Button>
            ))}
         </div>

         <div className="mt-8 w-full">
            {active === 0 && userDetail && <SettingAccount userDetail={userDetail} />}
            {active === 1 && userDetail?.userSetting && <Security userSetting={userDetail.userSetting} />}
            {active === 2 && userDetail?.userSetting && <SettingNotification userSetting={userDetail.userSetting} />}
         </div>
      </div>
   );
}

export default Setting;
