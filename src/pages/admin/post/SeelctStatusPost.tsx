import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { IStatusPost } from '../../../model/Post.model';
import { MdPublishedWithChanges } from 'react-icons/md';

export type ICategory = {
    id: any;
    nameState: string;
    value: IStatusPost;
};

type SelectStatePostProps = {
    onResult: (res: string) => void;
};

function SelectStatePost(props: SelectStatePostProps) {
    const categories: ICategory[] = [
        {
            id: 1,
            nameState: 'Chờ duyệt',
            value: IStatusPost.Pending,
        },
        {
            id: 2,
            nameState: 'Đã xuất bản',
            value: IStatusPost.Published,
        },
        {
            id: 3,
            nameState: 'Bản nháp',
            value: IStatusPost.UnPublished,
        },
    ];
    return (
        <Select
            onChange={(val) => {
                props.onResult(val.target.value);
            }}
            startContent={<MdPublishedWithChanges className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            label="Trạng thái của bài viết"
            className="max-w-[14rem]"
            selectorIcon={<TbSelector className="text-xl" />}
        >
            {categories.map((category: ICategory) => (
                <SelectItem key={category.value} value={category.value} variant="flat" color="secondary">
                    {category.nameState}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectStatePost;
