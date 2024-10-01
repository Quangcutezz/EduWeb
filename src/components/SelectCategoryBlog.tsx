import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';

export type ICategory = {
    id: any;
    nameCategory: string;
};

type SelectCategoryBlogProps = {
    onResult: (res: string) => void;
};
function SelectCategoryBlog(props: SelectCategoryBlogProps) {
    const categories: ICategory[] = [
        {
            id: 1,
            nameCategory: 'Tech nololgy',
        },
        {
            id: 2,
            nameCategory: 'PHP',
        },
        {
            id: 3,
            nameCategory: 'Self-study',
        },
    ];
    return (
        <Select
            onChange={(val) => {
                console.log(val.target.value.split(','));

                const data = categories.filter((c) => val.target.value.split(',').includes(c.id.toString()));

                props.onResult(data.map((c) => c.nameCategory).join(','));
            }}
            startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            selectionMode="multiple"
            label="Bài viết thuộc danh mục nào"
            className="max-w-[14rem]"
            selectorIcon={<TbSelector className="text-xl" />}
        >
            {categories.map((category: ICategory) => (
                <SelectItem key={category.id} value={category.id} variant="flat" color="secondary">
                    {category.nameCategory}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectCategoryBlog;
