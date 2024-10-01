import { Input } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';

type SearchProps = {
   className?: string;
   placeholder?: string;
   onChange?: (res: string) => void;
   value?: string;
};
function Search(props: SearchProps) {
   return (
      <Input
         className={`${props.className} max-w-[25rem] select-none w-1/3 min-w-[20rem]`}
         label=""
         value={props.value}
         onChange={(e) => props.onChange && props.onChange(e.target.value)}
         placeholder={props.placeholder ? props.placeholder : 'Tìm kiếm khóa học, bài viết , video,...'}
         labelPlacement="outside"
         startContent={<IoSearchOutline />}
      />
   );
}

export default Search;
