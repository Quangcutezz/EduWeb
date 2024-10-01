import { Button } from '@nextui-org/react';
import { MdOutlineAdd } from 'react-icons/md';
import { TiHome } from 'react-icons/ti';
import { BsJoystick } from 'react-icons/bs';
import { IoBookSharp } from 'react-icons/io5';
import { path } from '../enum/path';
import { useRouter } from '../hook';

function NavigateBar() {
   const router = useRouter();
   const navActions = [
      {
         name: 'Trang chủ',
         path: path.HOME,
         icon: <TiHome className="text-xl" />,
      },
      {
         name: 'Lộ trình',
         path: path.ROAD_MAP.INDEX,
         icon: <BsJoystick className="text-xl" />,
      },
      {
         name: 'Bài viêt',
         path: path.POST.VIEW,
         icon: <IoBookSharp className="text-xl" />,
      },
   ];
   return (
      <div className=" fixed bottom-4 select-none left-1/2 -translate-x-1/2 z-[100000] p-2 pl-4 pr-4 rounded-xl backdrop-blur-2xl max-w-[30rem] flex justify-center items-center gap-4">
         <Button onClick={() => router.push(path.POST.CREATE)} isIconOnly color="primary" aria-label="Like">
            <MdOutlineAdd className="text-2xl" />
         </Button>

         {navActions.map((action, index) => (
            <Button
               onClick={() => router.push(action.path)}
               key={index}
               variant="flat"
               className="hover:text-primary cursor-pointer "
               startContent={action.icon}
            >
               {action.name}
            </Button>
         ))}
      </div>
   );
}

export default NavigateBar;
