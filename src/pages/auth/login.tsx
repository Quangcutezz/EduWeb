import { Breadcrumbs, BreadcrumbItem, Image, Button, Link } from '@nextui-org/react';
import logo from '../../assets/img/logo.png';
import { BsFillPersonFill } from 'react-icons/bs';
import { TiSocialFacebook } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { path } from '../../enum/path';
import React, { useEffect, useState } from 'react';
import LoginWithEmail from './_login_email';
import { useGoogleLogin } from '@react-oauth/google';
import { useLoading } from '../../context/loadingContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchLoginWithGoogle, fetchUserInfoGoogle } from '../../services/auth.service';
import { useAuth } from '../../context/authContext';
import ModalEnterEmail from './modal-enter-email';
import { useRouter } from '../../hook';
import { Helmet } from 'react-helmet-async';

enum keyOptionLogin {
   EMAIL = 'email',
   FACEBOOK = 'facbooke',
   GITHUB = 'github',
   GOOGLE = 'google',
}

type IOptionLogin = {
   name: string;
   icon: React.ReactNode;
   key: keyOptionLogin;
   action?: () => void;
};

function Login() {
   const loading = useLoading();
   const router = useRouter();
   const { login, isAuthenticated } = useAuth();
   const [typeLogin, setTypeLogin] = useState<keyOptionLogin | -1>(-1);
   const loginWithGoogle = useGoogleLogin({
      onSuccess: async (codeResponse) => {
         const userInfo = await fetchUserInfoGoogle(codeResponse.access_token);
         if (!userInfo) return;
         loading.startLoading();
         const response = await fetchLoginWithGoogle(userInfo);
         loading.stopLoading();

         if (response.status === 200) {
            toast.success(response.message);
            response.data && login(response.meta, response.data);
            router.push(path.HOME);
         } else {
            toast.error(response.message);
         }
      },
      scope: 'profile',
   });

   const optionLogin: IOptionLogin[] = [
      {
         name: 'Sử dụng email',
         icon: <BsFillPersonFill className="text-xl" />,
         key: keyOptionLogin.EMAIL,
      },
      {
         name: 'Sử dụng facebook',
         icon: <TiSocialFacebook className="text-xl text-blue-700" />,
         key: keyOptionLogin.FACEBOOK,
      },
      {
         name: 'Sử dụng google',
         icon: <FcGoogle className="text-xl " />,
         key: keyOptionLogin.GOOGLE,
         action: loginWithGoogle,
      },
      {
         name: 'Sử dụng github',
         icon: <FaGithub className="text-xl" />,
         key: keyOptionLogin.GITHUB,
      },
   ];

   useEffect(() => {
      if (isAuthenticated) {
         router.push(path.HOME);
      }
   }, [isAuthenticated]);

   return (
      <div className="max-w-2xl m-auto mt-5 select-none">
         <Helmet>
            {/* Standard metadata tags */}
            <title>{typeLogin === keyOptionLogin.EMAIL ? 'Đăng nhập với gmail ' : 'Đăng nhập'}</title>
         </Helmet>
         <Breadcrumbs isDisabled>
            <BreadcrumbItem>Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>Đăng nhập</BreadcrumbItem>
         </Breadcrumbs>

         <div className="flex flex-col gap-4 p-10 mt-5 rounded-lg border-solid border-second border-[1px] ">
            {typeLogin === -1 && (
               <>
                  <div className="flex justify-start items-center gap-10 ">
                     <Image className="" isBlurred width={50} src={logo} alt="NextUI Album Cover" />
                     <h5 className="font-semibold">Đăng nhập để tiếp tục với nhiều khóa học hấp dẫn</h5>
                  </div>
                  <div className="flex flex-col gap-6 justify-center items-center">
                     <h5 className="font-extrabold text-2xl">Đăng nhập vào Course EDU👌</h5>

                     {optionLogin.map((bt, index) => (
                        <Button
                           onClick={() => {
                              bt.action ? bt.action() : setTypeLogin(bt.key);
                           }}
                           className="w-1/2"
                           key={index}
                           startContent={bt.icon}
                        >
                           {bt.name}
                        </Button>
                     ))}
                     <span>
                        Bạn chưa có tài khoản?
                        <Link href={path.AUTH.REGISTER} className="text-primary ml-2">
                           Đăng ký
                        </Link>
                     </span>

                     <ModalEnterEmail>
                        <div className="text-primary ml-2">Quên mật khẩu</div>
                     </ModalEnterEmail>
                     <span className="text-center text-sm">
                        Việc bạn tiếp tục sử dụng trang web, đồng nghĩa bạn đồng ý với
                        <Link href={path.AUTH.REGISTER} className="underline text-gray-500 ml-2 mr-2">
                           điều khoản sử dụng
                        </Link>
                        của chúng tôi
                     </span>
                  </div>
               </>
            )}
            {typeLogin === keyOptionLogin.EMAIL && <LoginWithEmail onBack={() => setTypeLogin(-1)} />}
         </div>
      </div>
   );
}

export default Login;
