import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdPublishedWithChanges } from 'react-icons/md';
import { IStatusCourse } from '../../../model/Course.model';

export type ICategory = {
   id: any;
   nameState: string;
   value: number;
};

type SelectStatusCourseProps = {
   onResult: (res: IStatusCourse) => void;
   value?: any;
};

function SelectStatusCourse(props: SelectStatusCourseProps) {
   const categories: ICategory[] = [
      {
         id: 1,
         nameState: 'Chờ ra mắt',
         value: IStatusCourse.ComingSoon,
      },
      {
         id: 2,
         nameState: 'Xuất bản',
         value: IStatusCourse.Published,
      },
   ];
   return (
      <Select
         onChange={(val: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = val.target;
            props.onResult(+value);
         }}
         startContent={<MdPublishedWithChanges className="text-xl" />}
         labelPlacement="outside"
         disableSelectorIconRotation
         placeholder="Chọn"
         label="Trạng thái của khóa học"
         className="max-w-[14rem]"
         selectorIcon={<TbSelector className="text-xl" />}
         value={props.value}
         selectedKeys={props.value ? [props.value.toString()] : []}
      >
         {categories.map((category: ICategory) => (
            <SelectItem key={category.id} value={category.value} variant="flat" color="secondary">
               {category.nameState}
            </SelectItem>
         ))}
      </Select>
   );
}

export default SelectStatusCourse;
