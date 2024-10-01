import { IResponse } from '../model/Common.model';
import { IToken } from '../model/Token.model';
import { IUser } from '../model/User.model';
import { jwtDecode } from 'jwt-decode';

export async function fetchUserInfoGoogle(accessToken: string): Promise<IUser | null> {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching user info: ${response.status}`);
        }
        const user = await response.json();
        const userInfo: IUser = {
            email: user.email,
            password: '',
            firstName: user.given_name,
            lastName: user.family_name,
            avatar: user.picture,
        };
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}

export function decodeUserInfoFromJWT(token: string): IUser | null {
    try {
        const userInfo = jwtDecode<any>(token);
        return {
            email: userInfo?.email,
            password: '',
            firstName: userInfo?.given_name,
            lastName: userInfo?.family_name,
            avatar: userInfo?.picture,
        };
    } catch (error) {
        return null;
    }
}

export async function fetchLoginWithGoogle(data: IUser): Promise<IResponse<IUser, IToken>> {
    try {
        const response = await fetch('https://localhost:7005/api/auth/login-with-google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorMessage = `HTTP error! Status: ${response.status}`;
            console.error('Error during login:', errorMessage);
            throw new Error(errorMessage);
        }
        const responseData: IResponse<IUser, IToken> = await response.json();

        return responseData;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}
