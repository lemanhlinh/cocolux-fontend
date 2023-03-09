import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class AccountAPI {
    public static async me(): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/users/me`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async editProfile(params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.put(`${apiUrl}/v1/users/me`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listAddress(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/address?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async addAddress(params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(`${apiUrl}/v1/address`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailAddress(addressId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/address/${addressId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async editAddress(addressId: number, params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.put(`${apiUrl}/v1/address/${addressId}`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async deleteAddress(addressId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.delete(`${apiUrl}/v1/address/${addressId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listOrders(): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/orders`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailOrder(orderId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/orders/${orderId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async changePassword(oldPassword: string, newPassword: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/users/change-password`,
                {
                    password: oldPassword,
                    newPassword: newPassword
                }
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async activeAccount(phone: string, code: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/users/active-account`,
                { phone, code }
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async changePhone(phone: string, code: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/users/change-phone`,
                { phone, code }
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async resetPassword(params: {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/users/reset-password`,
                params
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
