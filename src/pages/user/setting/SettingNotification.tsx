import { Switch } from '@nextui-org/react';
import { IUser, IUserSetting } from '../../../model/User.model';
import { useAuth } from '../../../context/authContext';
import { Constant } from '../../../constant';

type SettingNotificationProps = {
    userSetting: IUserSetting;
};

const updateUserSettingById = async (id: any, newUserSetting: IUserSetting): Promise<IUserSetting | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'user/user-setting/update/' + id, {
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

function SettingNotification(props: SettingNotificationProps) {
    const { userSetting } = props;
    const { onUpdateUser } = useAuth();

    const handleSaveChange = async (key: keyof IUserSetting, value: boolean) => {
        const newUserSetting = {
            ...userSetting,
            [key]: value,
        };

        const result = await updateUserSettingById(userSetting.id, newUserSetting);
    };

    return (
        <div className="w-full p-10">
            <h5 className="font-extrabold border-b-[1px] border-gray-600/40 border-solid p-2">Email</h5>
            <div className="flex justify-between w-full items-center p-4 ">
                <h5>Gửi email cho bạn khi có bài học mới</h5>
                <Switch
                    defaultSelected={userSetting.isEmailForNewCourse}
                    onChange={async (e) => {
                        handleSaveChange('isEmailForNewCourse', e.target.checked);
                    }}
                />
            </div>
            <h5 className="font-extrabold border-b-[1px] border-gray-600/40 border-solid p-2">Thông báo</h5>
            <div className="flex justify-between w-full items-center p-4 ">
                <h5 className="text-gray-500 dark:text-gray-300/50">Bài học mới</h5>
                <Switch
                    defaultSelected={userSetting.isNotificationForNewCourse}
                    onChange={async (e) => {
                        handleSaveChange('isNotificationForNewCourse', e.target.checked);
                    }}
                />
            </div>
            <div className="flex justify-between w-full items-center p-4 ">
                <h5 className="text-gray-500 dark:text-gray-300/50">Trả lời bình luận</h5>
                <Switch
                    defaultSelected={userSetting.isNotificationForReplyCmt}
                    onChange={async (e) => {
                        handleSaveChange('isNotificationForReplyCmt', e.target.checked);
                    }}
                />
            </div>
            <div className="flex justify-between w-full items-center p-4 ">
                <h5 className="text-gray-500 dark:text-gray-300/50">Bình luận trong bài blog</h5>
                <Switch
                    defaultSelected={userSetting.isNotificationForCmtOfYourBlog}
                    onChange={async (e) => {
                        handleSaveChange('isNotificationForCmtOfYourBlog', e.target.checked);
                    }}
                />
            </div>
            <div className="flex justify-between w-full items-center p-4 ">
                <h5 className="text-gray-500 dark:text-gray-300/50">Câu trả lời được chọn trong màn thảo luận</h5>
                <Switch
                    defaultSelected={userSetting.isNotificationForPinInDiscuss}
                    onChange={async (e) => {
                        handleSaveChange('isNotificationForPinInDiscuss', e.target.checked);
                    }}
                />
            </div>
        </div>
    );
}

export default SettingNotification;
