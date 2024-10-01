import { useGoogleOneTapLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../context/loadingContext';
import { path } from '../../../enum/path';
import helper from '../../../helper';
import { decodeUserInfoFromJWT, fetchLoginWithGoogle } from '../../../services/auth.service';
import { useAuth } from '../../../context/authContext';

function LoginTap() {
    const loading = useLoading();
    const history = useNavigate();
    const { login } = useAuth();
    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
            console.log(credentialResponse);

            if (credentialResponse.credential) {
                const userInfo = decodeUserInfoFromJWT(credentialResponse.credential);

                if (!userInfo) return;

                loading.startLoading();
                const response = await fetchLoginWithGoogle(userInfo);
                loading.stopLoading();

                if (response.status === 200) {
                    toast.success(response.message);
                    response.data && helper.login(response.data);
                    login(response.meta);
                    history(path.HOME);
                } else {
                    toast.error(response.message);
                }
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
    });
    return <></>;
}

export default LoginTap;
