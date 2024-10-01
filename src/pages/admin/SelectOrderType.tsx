import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { ImSortAlphaAsc, ImSortAlphaDesc } from 'react-icons/im';
import { useState } from 'react';

export enum EOrderType {
    ASCENDING,
    DECREASING,
}
export type IOrder = {
    id: any;
    nameOrder: string;
    value: EOrderType;
};

type SelectOrderTypeProps = {
    onResult: (res: string) => void;
    label?: string;
};

function SelectOrderType(props: SelectOrderTypeProps) {
    const categories: IOrder[] = [
        {
            id: 1,
            nameOrder: 'Tăng dần',
            value: EOrderType.ASCENDING,
        },
        {
            id: 2,
            nameOrder: 'Giảm dần',
            value: EOrderType.DECREASING,
        },
    ];
    const [value, setValue] = useState<string>('');
    return (
        <Select
            onChange={(val) => {
                setValue(val.target.value);
                props.onResult(val.target.value);
            }}
            startContent={
                value === EOrderType.DECREASING.toString() ? (
                    <ImSortAlphaDesc className="text-xl" />
                ) : (
                    <ImSortAlphaAsc className="text-xl" />
                )
            }
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            label={props.label ? props.label : 'Sắp xếp theo'}
            className="max-w-[14rem]"
            selectorIcon={<TbSelector className="text-xl" />}
        >
            {categories.map((category: IOrder) => (
                <SelectItem key={category.id} value={category.value} variant="flat" color="secondary">
                    {category.nameOrder}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectOrderType;
