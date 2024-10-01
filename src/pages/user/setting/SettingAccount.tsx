import { Button, Input, Avatar } from '@nextui-org/react';
import UploadImg from '../../../components/UploadImg';
import { IUser } from '../../../model/User.model';
import { useState } from 'react';
import { useAuth } from '../../../context/authContext';

const updateUserById = async (id: any, newUser: IUser): Promise<IUser | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/user/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: IUser | null = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

type SettingAccountProps = {
    userDetail: IUser;
};
type InputType = {
    avatar: {
        value: string;
        isEdit: boolean;
        isLoading: boolean;
    };
    fullName: {
        value: string;
        isEdit: boolean;
        isLoading: boolean;
    };
    bio: {
        value: string;
        isEdit: boolean;
        isLoading: boolean;
    };
};

function SettingAccount(props: SettingAccountProps) {
    const { userDetail } = props;
    const { onUpdateUser } = useAuth();

    const [input, setInput] = useState<InputType>({
        avatar: {
            value: userDetail.avatar ?? '',
            isEdit: false,
            isLoading: false,
        },
        fullName: {
            value: userDetail.fullName ?? '',
            isEdit: false,
            isLoading: false,
        },
        bio: {
            value: userDetail.bio ?? '',
            isEdit: false,
            isLoading: false,
        },
    });

    const handleChangeInput = (key: keyof InputType, value: string) => {
        setInput((prevInput) => ({
            ...prevInput,
            [key]: {
                ...prevInput[key],
                value: value,
            },
        }));
    };

    const handleChangeEdit = (key: keyof InputType) => {
        setInput((prevInput) => ({
            ...prevInput,
            [key]: {
                ...prevInput[key],
                isEdit: !prevInput[key].isEdit,
            },
        }));
    };

    const handleChangeLoading = (key: keyof InputType) => {
        setInput((prevInput) => ({
            ...prevInput,
            [key]: {
                ...prevInput[key],
                isEdit: !prevInput[key].isEdit,
            },
        }));
    };

    const handleSaveChange = async (key: keyof InputType) => {
        const newUser = {
            ...userDetail,
            [key]: input[key].value,
        };

        console.log(newUser);

        handleChangeLoading(key);
        const result = await updateUserById(userDetail.id, newUser);
        result && onUpdateUser(result);
        handleChangeLoading(key);
        handleChangeEdit(key);
    };

    return (
        <div className="w-full p-10">
            <h5 className="font-extrabold border-b-[1px] border-gray-600/40 border-solid p-2">Thông tin cá nhân</h5>
            <div className="flex justify-between items-center p-4 mt-10">
                <div>
                    <h5 className="mb-2">Ảnh đại diện</h5>
                    <Avatar name="Joe" src={input.avatar.value} />
                </div>

                {!input.avatar.isEdit && (
                    <UploadImg
                        onResult={function (res: string): void {
                            if (!res) return;
                            handleChangeEdit('avatar');
                            handleChangeInput('avatar', res);
                        }}
                    />
                )}
                {input.avatar.isEdit && (
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            color="primary"
                            variant="bordered"
                            isLoading={input.avatar.isLoading}
                            onClick={async () => {
                                await handleSaveChange('avatar');
                            }}
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="bordered"
                            onClick={() => {
                                handleChangeEdit('avatar');
                                userDetail.avatar && handleChangeInput('avatar', userDetail.avatar);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center p-4 mt-10">
                <div>
                    <Input
                        value={input.fullName.value}
                        radius="lg"
                        variant="underlined"
                        type="email"
                        onChange={(e) => handleChangeInput('fullName', e.target.value)}
                        label="Họ tên"
                        disabled={!input.fullName.isEdit}
                        labelPlacement="outside"
                        placeholder="Nhập tên đầy đủ của bạn"
                        className="max-w-[220px]"
                    />
                    <h5 className="mt-2 ">
                        Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các hoạt động của bạn.
                    </h5>
                </div>
                {!input.fullName.isEdit && (
                    <Button variant="bordered" onClick={() => handleChangeEdit('fullName')}>
                        Chỉnh sửa
                    </Button>
                )}
                {input.fullName.isEdit && (
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            color="primary"
                            variant="bordered"
                            isLoading={input.fullName.isLoading}
                            onClick={async () => {
                                await handleSaveChange('fullName');
                            }}
                        >
                            Lưu
                        </Button>
                        <Button variant="bordered" onClick={() => handleChangeEdit('fullName')}>
                            Hủy
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center p-4 mt-10">
                <div>
                    <Input
                        onChange={(e) => handleChangeInput('bio', e.target.value)}
                        value={input.bio.value}
                        radius="lg"
                        variant="underlined"
                        label="Bio"
                        disabled={!input.bio.isEdit}
                        labelPlacement="outside"
                        placeholder="Nhập giới thiệu của bạn"
                        className="max-w-[220px]"
                    />
                    <h5 className="mt-2">Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của bạn.</h5>
                </div>

                {!input.bio.isEdit && (
                    <Button variant="bordered" onClick={() => handleChangeEdit('bio')}>
                        Chỉnh sửa
                    </Button>
                )}
                {input.bio.isEdit && (
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            isLoading={input.fullName.isLoading}
                            onClick={async () => {
                                await handleSaveChange('bio');
                            }}
                            color="primary"
                            variant="bordered"
                        >
                            Lưu
                        </Button>
                        <Button variant="bordered" onClick={() => handleChangeEdit('bio')}>
                            Hủy
                        </Button>
                    </div>
                )}
            </div>

            <div className=" p-4 mt-10">
                <Input
                    value={'5210099@student.tdtu.edu.vn'}
                    radius="lg"
                    disabled
                    variant="underlined"
                    label="Email"
                    labelPlacement="outside"
                    className="max-w-[220px]"
                />
            </div>
        </div>
    );
}

export default SettingAccount;
