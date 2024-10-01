import { Button, Input, Link } from '@nextui-org/react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineEmail } from 'react-icons/md';
import { TbPassword } from 'react-icons/tb';
import { path } from '../../enum/path';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/loadingContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IResponse } from '../../model/Common.model';
import { IUser } from '../../model/User.model';
import { IToken } from '../../model/Token.model';
import { useAuth } from '../../context/authContext';

type LoginWithEmailProps = {
    onBack: () => void;
};
type Inputs = {
    email: string;
    password: string;
};

const loginFetch = async (userData: { email: string; password: string }): Promise<IResponse<IUser, IToken>> => {
    try {
        const response = await fetch('https://localhost:7005/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: IResponse<IUser, IToken> = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; // You might want to handle or log the error differently
    }
};
function LoginWithEmail(props: LoginWithEmailProps) {
    const loading = useLoading();
    const history = useNavigate();
    const { login } = useAuth();

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const registerUser = {
            email: data.email,
            password: data.password,
        };

        if (!registerUser.email || !registerUser.password) {
            toast.success('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        loading.startLoading();
        const response = await loginFetch(registerUser);
        loading.stopLoading();

        if (response.status === 200) {
            toast.success(response.message);
            response.data && login(response.meta, response.data);
            history(path.HOME);
        } else {
            toast.error(response.message);
        }
    };
    return (
        <div className="flex flex-col gap-4 justify-center w-full items-start">
            <Button onClick={props.onBack} isIconOnly className="bg-transparent">
                <IoIosArrowBack className="text-xl" />
            </Button>
            <div className="flex w-full flex-col gap-6 justify-center items-center">
                <h5 className="font-extrabold text-2xl">Đăng nhập bằng email</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <Input
                        {...register('email')}
                        startContent={<MdOutlineEmail className="text-xl" />}
                        type="text"
                        label="Email"
                        labelPlacement={'outside'}
                        placeholder="Nhập email của bạn..."
                    />
                    <Input
                        {...register('password')}
                        startContent={<TbPassword className="text-xl" />}
                        type="password"
                        label="Mật khẩu"
                        labelPlacement={'outside'}
                        placeholder="Nhập mật khẩu của bạn..."
                    />
                    <Button color="primary" type="submit">
                        Đăng nhập
                    </Button>
                </form>
                <span className="text-center text-sm">
                    Việc bạn tiếp tục sử dụng trang web, đồng nghĩa bạn đồng ý với
                    <Link href={path.AUTH.REGISTER} className="underline text-gray-500 ml-2 mr-2">
                        điều khoản sử dụng
                    </Link>
                    của chúng tôi
                </span>
            </div>
        </div>
    );
}

export default LoginWithEmail;
