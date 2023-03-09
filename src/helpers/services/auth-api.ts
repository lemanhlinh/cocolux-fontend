import { apiUrl } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class AuthAPI {
    /**
     * Login
     * @param {*} username
     * @param {*} password
     */
    public static async login({ username, password }: any) {
        const url = `${apiUrl}/v1/auth/login-password?group=web`;
        const { data } = await ReqeustAPI.post(url, { username, password });
        return data;
    }

    /**
     * Login with token
     * @param {*} token
     */
    public static async loginToken({ type, token }: any) {
        // Perpare query parmas
        const url = `${apiUrl}/v1/auth/login-token/web`;
        const { data } = await ReqeustAPI.post(url, { type, token });
        return data;
    }

    /**
     * Register
     * @param {*} name
     * @param {*} phone
     * @param {*} password
     */
    public static async register({
        name,
        phone,
        gender,
        birthday,
        password
    }: any) {
        // Perpare query parmas
        const url = `${apiUrl}/v1/auth/register`;
        const { data } = await ReqeustAPI.post(
            url,
            {
                name,
                phone,
                gender,
                birthday,
                password,
            }
        );
        return data;
    }

    /**
     * Request Forget Pass
     * @param {*} phone
     */
    public static async requestForgetPassword(phone: string) {
        // Perpare query parmas
        const url = `${apiUrl}/v1/auth/request-forget-password`;
        const { data } = await ReqeustAPI.post(url, { phone });
        return data;
    }

    /**
     * Request Active Account
     * @param {*} phone
     */
    public static async requestActiveAccount(phone: string) {
        // Perpare query parmas
        const url = `${apiUrl}/v1/auth/request-active-account`;
        const { data } = await ReqeustAPI.post(url, { phone });
        return data;
    }

    /**
     * Request Change Phone
     * @param {*} phone
     */
    public static async requestChangePhone(phone: string) {
        // Perpare query parmas
        const url = `${apiUrl}/v1/auth/request-change-phone`;
        const { data } = await ReqeustAPI.post(url, { phone });
        return data;
    }
}
