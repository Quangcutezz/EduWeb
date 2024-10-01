import { Button } from '@nextui-org/react';
import Search from '../../../components/Search';
import { GrPowerReset } from 'react-icons/gr';
import { useState } from 'react';

type PropsType = {
   onChange: (text: string) => void;
};
function FilterBarUser({ onChange }: PropsType) {
   const [search, setSearch] = useState('');
   return (
      <div className="flex mt-10 justify-between items-end gap-10 rounded-xl shadow-xl bg-light-sidebar backdrop-blur-xl dark:bg-dark-sidebar w-full p-4">
         <div className="w-full flex  items-center gap-6">
            <Search
               value={search}
               onChange={(text) => {
                  setSearch(text);
                  onChange(text);
               }}
               placeholder="Tìm kiếm theo tên, email, ..."
            />
            <Button
               onClick={() => {
                  onChange('');
                  setSearch('');
               }}
               startContent={<GrPowerReset className="text-xl" />}
               variant="flat"
               color="primary"
            >
               Làm mới lọc
            </Button>
         </div>
      </div>
   );
}

export default FilterBarUser;
