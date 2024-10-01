import { Button, Input } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { TbPassword } from 'react-icons/tb';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { path } from '../../enum/path';
import { useRouter } from '../../hook';
import { resetPassword } from './service';
import { Helmet } from 'react-helmet-async';

type Inputs = {
   password: string;
   confirmPassword: string;
};

function RecoveryPassword() {
   const { register, handleSubmit } = useForm<Inputs>();
   const [input, setInput] = useState({
      email: '',
      token: '',
   });
   const router = useRouter();
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const inputUser = {
         confirmPassword: data.confirmPassword,
         password: data.password,
      };

      if (!inputUser.confirmPassword || !inputUser.password) {
         toast.error('Vui lòng nhập đầy đủ thông tin!');
         return;
      }

      if (inputUser.password !== inputUser.confirmPassword) {
         toast.error('Xác nhận mật khẩu không khớp!');
         return;
      }

      const res = await resetPassword({
         password: inputUser.password,
         email: input.email,
         token: input.token,
      });

      if (res) {
         toast.success('Khôi phục mật khẩu thành công!');
         router.replace(path.AUTH.LOGIN);
      } else {
         toast.error('Khôi phục mật khẩu thất bại!');
      }
   };

   useEffect(() => {
      const verify = async () => {
         const urlSearchParams = new URLSearchParams(window.location.search);
         const params = Object.fromEntries(urlSearchParams.entries());
         const token = params.token;
         const email = params.email;

         setInput({
            email,
            token,
         });

         if (!token || !email) {
            toast.error('Đường link không hợp lệ!');
            router.replace(path.NOT_FOUND);
         }
      };

      verify();
   }, []);
   return (
      <div className="flex flex-col max-w-xl m-auto mt-5 gap-4 justify-center w-full items-start">
         <Helmet>
            <title>Lấy lại mật khẩu của bạn</title>
         </Helmet>
         <Button onClick={() => router.back()} isIconOnly className="bg-transparent">
            <IoIosArrowBack className="text-xl" />
         </Button>
         <div className="flex w-full flex-col gap-6 justify-center items-center">
            <h5 className="font-extrabold text-2xl">Lấy lại mật khẩu</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
               <Input
                  {...register('password')}
                  startContent={<TbPassword className="text-xl" />}
                  type="password"
                  label="Mật khẩu"
                  labelPlacement={'outside'}
                  placeholder="Nhập mật khẩu của bạn..."
               />
               <Input
                  {...register('confirmPassword')}
                  startContent={<TbPassword className="text-xl" />}
                  type="password"
                  label="Xác nhận mật khẩu"
                  labelPlacement={'outside'}
                  placeholder="Nhập xác nhận mật khẩu của bạn..."
               />
               <Button color="primary" type="submit">
                  Xác nhận
               </Button>
            </form>
         </div>
      </div>
   );
}

export default RecoveryPassword;
