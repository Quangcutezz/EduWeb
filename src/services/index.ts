import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getAuthToken = (): string | null => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null): void => {
    window.localStorage.setItem('auth_token', token || '');
};

export const setRefreshToken = (token: string, expirationDays = 7): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieValue = `auth_rftoken=${token}; expires=${expirationDate.toUTCString()}; path=/`;

    document.cookie = cookieValue;
};

export const getRefreshToken = (): string | null => {
    const cookieName = 'auth_rftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }

    return null;
};

axios.defaults.baseURL = 'http://localhost:7005/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const requestSign = async (
    method: AxiosRequestConfig['method'],
    url: string,
    data?: any,
): Promise<AxiosResponse> => {
    return await axios({
        method,
        url,
        data,
    });
};

export const request = async (
    method: AxiosRequestConfig['method'],
    url: string,
    data?: any,
): Promise<AxiosResponse | any> => {
    let headers: Record<string, string> = {};
    const authToken = getAuthToken();

    if (authToken !== null && authToken !== 'null') {
        headers = { Authorization: `Bearer ${authToken}` };
    }

    try {
        const response = await axios({
            method,
            url,
            headers,
            data,
        });

        return response;
    } catch (error) {
        // if (error.response && error.response.status === 401) {
        //     // Call the refresh token function
        //     await refreshToken();
        //     const newAuthToken = getAuthToken();

        //     if (newAuthToken !== null && newAuthToken !== 'null') {
        //         headers = { Authorization: `Bearer ${newAuthToken}` };

        //         try {
        //             // Make the request again with the updated token
        //             const response = await axios({
        //                 method,
        //                 url,
        //                 headers,
        //                 data,
        //             });

        //             return response;
        //         } catch (error) {
        //             console.error('Error making request after token refresh:', error);
        //             console.log(error);
        //             return error;
        //         }
        //     }
        // } else {
        //     return error;
        // }
        return error;
    }
};

// const refreshToken = async (): Promise<void> => {
//     const refreshToken = getRefreshToken();
//     try {
//         // Make the request again with the updated token
//         await axios({
//             method: 'POST',
//             url: '/api/v1/auth/refresh-token',
//             data: {
//                 token: refreshToken,
//             },
//         })
//             .then((response) => {
//                 const data = response.data;
//                 console.log('refresh token', data);
//                 setAuthHeader(data.token);
//                 setRefreshToken(data.refreshToken);
//                 return;
//             })
//             .catch((error) => {
//                 setAuthHeader(null);
//                 console.log(error);
//             });
//     } catch (error) {
//         console.error('Error making request after token refresh:', error);
//         console.log(error);
//     }
// };
