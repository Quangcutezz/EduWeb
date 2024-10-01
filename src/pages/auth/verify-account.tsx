import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { verifyAccount } from './service';
import { useRouter } from '../../hook';
import { path } from '../../enum/path';
import { Helmet } from 'react-helmet-async';

function VerifyAccount() {
   const router = useRouter();
   useEffect(() => {
      const verify = async () => {
         const urlSearchParams = new URLSearchParams(window.location.search);
         const params = Object.fromEntries(urlSearchParams.entries());
         const token = params.token;
         const email = params.email;
         const res = await verifyAccount({ token, email });
         if (res) {
            toast.success('kích hoạt tài khoản thành công!');
            router.push(path.AUTH.LOGIN);
         } else {
            toast.error('Kích hoạt tài khoản không thành công ! Có lỗi gì đó !');
         }
      };

      verify();
   }, []);

   return (
      <div>
         <Helmet>
            <title>Kích hoạt tài khoản</title>
         </Helmet>
      </div>
   );
}

export default VerifyAccount;
