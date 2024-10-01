import { Constant } from '../../constant';

// verify account
export const verifyAccount = async (verifyData: { token: string; email: string }): Promise<boolean> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'auth/verify-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verifyData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};

// recovery password
export const resetPassword = async (resetPasswordData: {
    token: string;
    email: string;
    password: string;
}): Promise<boolean> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resetPasswordData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};

// send link reset password
export const sendLinkResetPassword = async (sendLinkData: { email: string }): Promise<boolean> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'auth/send-link-reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendLinkData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        console.error('Error during registration:', error);
        throw new Error('Không thể gửi link khôi phục vui lòng thử lại!');
    }
};
