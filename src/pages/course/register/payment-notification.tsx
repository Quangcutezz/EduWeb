import { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import PaymentFailed from '../../../assets/img/payment-failed.gif';
import PaymentSuccess from '../../../assets/img/payment-success.gif';
import { useRouter } from '../../../hook';
import { path } from '../../../enum/path';
import { confirmPayment as confirm } from '../service';

function PaymentNotification() {
   const router = useRouter();
   const [status, setStatus] = useState({
      vnp_TransactionStatus: '',
      vnp_OrderInfo: '', // it is payment history ID
   });

   useEffect(() => {
      const confirmPayment = async (paymentId: string | number) => {
         if (statusParams.vnp_TransactionStatus === '00') {
            await confirmPayment(paymentId);
         }
      };
      const searchParams = new URLSearchParams(window.location.search);
      const statusParams: { [key: string]: string } = {};

      // Extract payment status parameters
      for (const [key, value] of searchParams.entries()) {
         statusParams[key] = value;
      }

      // Update the status state
      setStatus({
         vnp_TransactionStatus: statusParams.vnp_TransactionStatus,
         vnp_OrderInfo: statusParams.vnp_OrderInfo,
         ...statusParams,
      });

      statusParams.vnp_TransactionStatus === '00' && confirm(statusParams.vnp_OrderInfo);
   }, []);

   return (
      <div className="fixed top-0 bg-black right-0 left-0 bottom-0 z-[1000000] flex justify-center items-center">
         {/* payment failed */}
         {status.vnp_TransactionStatus !== '00' && (
            <>
               <Image src={PaymentFailed} width={100} height={100} />
               <div className="m-4 flex flex-col gap-4">
                  <h1 className="">Thanh toán không thành công , vui lòng thử lại!</h1>
                  <Button onClick={() => router.push(path.COURSE.MY_COURSE)} color="primary" variant="flat">
                     Quay lại khóa học của tôi
                  </Button>
               </div>
            </>
         )}
         {status.vnp_TransactionStatus === '00' && (
            <>
               <Image src={PaymentSuccess} width={200} height={200} />
               <div className="m-4 flex flex-col gap-4">
                  <h1 className="">Thanh toán thành công , vui lòng thử lại!</h1>
                  <Button onClick={() => router.replace(path.COURSE.MY_COURSE)} color="primary" variant="flat">
                     Quay lại khóa học của tôi
                  </Button>
               </div>
            </>
         )}

         {/* payment successfully */}
      </div>
   );
}

export default PaymentNotification;
