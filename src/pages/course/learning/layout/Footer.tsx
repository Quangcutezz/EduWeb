import { Button } from '@nextui-org/react';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

function Footer() {
   return (
      <footer className=" border-t-[1px] border-solid dark:border-gray-900 fixed z-[100000] p-4 backdrop-blur-2xl flex justify-between items-center h-footer bottom-0 right-0 left-0">
         <div className="w-1/3"></div>
         <div className="w-1/3 flex justify-center items-center gap-4">
            <Button className="bg-transparent hover:text-primary" startContent={<GrFormPrevious className="text-xl" />}>
               Bài trước
            </Button>
            <Button color="primary" variant="bordered" endContent={<GrFormNext className="text-xl" />}>
               Bài sau
            </Button>
         </div>
         <div className="w-1/3 flex justify-end items-center">
            <span>3. Cơ bản về HTML</span>
         </div>
      </footer>
   );
}

export default Footer;
