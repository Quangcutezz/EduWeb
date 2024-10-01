import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { IUserSetting } from '../../../model/User.model';
import { useAuth } from '../../../context/authContext';

const updateUserSettingById = async (id: any, newUserSetting: IUserSetting): Promise<IUserSetting | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/user/user-setting/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserSetting),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: IUserSetting | null = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

type SecurityProps = {
    userSetting: IUserSetting;
};

type InputType = {
    facebookLink: {
        value: string;
        isEdit: boolean;
        isLoading: boolean;
    };
    githubLink: {
        value: string;
        isEdit: boolean;
        isLoading: boolean;
    };
};

function Security(props: SecurityProps) {
    const { userSetting } = props;
    const { onUpdateUser, user } = useAuth();

    console.log(userSetting);
    const [input, setInput] = useState<InputType>({
        facebookLink: {
            value: userSetting.facebookLink ?? '',
            isEdit: false,
            isLoading: false,
        },
        githubLink: {
            value: userSetting.githubLink ?? '',
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
        const newUserSetting = {
            ...userSetting,
            [key]: input[key].value,
        };

        handleChangeLoading(key);
        const result = await updateUserSettingById(userSetting.id, newUserSetting);
        result &&
            user?.userSetting &&
            onUpdateUser({
                ...user,
                userSetting: {
                    ...user?.userSetting,
                    facebookLink: result.facebookLink,
                    githubLink: result.githubLink,
                },
            });

        handleChangeLoading(key);
        handleChangeEdit(key);
    };

    return (
        <div className="w-full p-10">
            <h5 className="font-extrabold border-b-[1px] border-gray-600/40 border-solid p-2">Mạng xã hội</h5>

            <div className="flex justify-between w-full items-center p-4 mt-10">
                <div>
                    <Input
                        value={input.facebookLink.value}
                        onChange={(e) => handleChangeInput('facebookLink', e.target.value)}
                        className="w-[20rem]"
                        radius="lg"
                        disabled={!input.facebookLink.isEdit}
                        variant="underlined"
                        label="Đường dẫn tới facebook của bạn"
                        labelPlacement="outside"
                        placeholder="Nhập đường dẫn tới facebook của bạn"
                    />
                </div>

                {!input.facebookLink.isEdit && (
                    <Button variant="bordered" onClick={() => handleChangeEdit('facebookLink')}>
                        Chỉnh sửa
                    </Button>
                )}
                {input.facebookLink.isEdit && (
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            color="primary"
                            variant="bordered"
                            isLoading={input.facebookLink.isLoading}
                            onClick={async () => {
                                await handleSaveChange('facebookLink');
                            }}
                        >
                            Lưu
                        </Button>
                        <Button variant="bordered" onClick={() => handleChangeEdit('facebookLink')}>
                            Hủy
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex justify-between w-full items-center p-4 mt-10">
                <div>
                    <Input
                        disabled={!input.githubLink.isEdit}
                        value={input.githubLink.value}
                        onChange={(e) => handleChangeInput('githubLink', e.target.value)}
                        className="w-[20rem]"
                        radius="lg"
                        variant="underlined"
                        label="Đường dẫn tới github của bạn"
                        labelPlacement="outside"
                        placeholder="Nhập đường dẫn github của bạn"
                    />
                </div>

                {!input.githubLink.isEdit && (
                    <Button variant="bordered" onClick={() => handleChangeEdit('githubLink')}>
                        Chỉnh sửa
                    </Button>
                )}
                {input.githubLink.isEdit && (
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            color="primary"
                            variant="bordered"
                            isLoading={input.githubLink.isLoading}
                            onClick={async () => {
                                await handleSaveChange('githubLink');
                            }}
                        >
                            Lưu
                        </Button>
                        <Button variant="bordered" onClick={() => handleChangeEdit('githubLink')}>
                            Hủy
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Security;
