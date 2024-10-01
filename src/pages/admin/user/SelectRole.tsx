import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdPerson } from 'react-icons/md';

enum TypeRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
export type IOrder = {
    id: any;
    nameRole: string;
    value: TypeRole;
};

type SelectTypeOrderProps = {
    onResult: (res: string) => void;
    label?: string;
};

function SelectTypeOrder(props: SelectTypeOrderProps) {
    const roles: IOrder[] = [
        {
            id: 1,
            nameRole: 'Quản trị viên',
            value: TypeRole.ADMIN,
        },
        {
            id: 2,
            nameRole: 'Người dùng',
            value: TypeRole.USER,
        },
    ];
    return (
        <Select
            onChange={(val) => {
                props.onResult(val.target.value);
            }}
            startContent={<MdPerson className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            label={props.label ? props.label : 'Sắp xếp bài viết theo'}
            className="max-w-[14rem]"
            selectorIcon={<TbSelector className="text-xl" />}
        >
            {roles.map((role: IOrder) => (
                <SelectItem key={role.id} value={role.value} variant="flat" color="secondary">
                    {role.nameRole}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectTypeOrder;
