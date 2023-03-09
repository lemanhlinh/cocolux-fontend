import { apiUrl } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class CartAPI {

    /**
     * Get
     * @param {*} clientId
     */
    public static async get() {
        const { data } = await ReqeustAPI.get(`${apiUrl}/v1/carts`);
        return data;
    }

    /**
     * Update
     * @param {*} coin
     * @param {*} note
     * @param {*} customer
     */
    public static async update({ coin, note, customer, source }: any) {
        const { data } = await ReqeustAPI.put(`${apiUrl}/v1/carts`, { coin, note, customer, source });
        return data;
    }

    /**
     * Confirm
     * @param {*} payload
     */
    public static async confirm(payload: any = {}) {
        const { data } = await ReqeustAPI.post(`${apiUrl}/v1/carts/confirm`, payload);
        return data;
    }

    /**
     * Add Item
     * @param {*} id
     * @param {*} payload
     */
    public static async addItem(payload: any = {}) {
        const url = `${apiUrl}/v1/carts/items`;
        const { data } = await ReqeustAPI.post(url, payload);
        return data;
    }

    /**
     * Update Item
     * @param {*} option_id
     * @param {*} total_quantity
     */
    public static async updateItem({ option_id, total_quantity }: any) {
        const url = `${apiUrl}/v1/carts/items/${option_id}`;
        const { data } = await ReqeustAPI.put(url, { total_quantity });
        return data;
    }

    /**
     * Remove Item
     * @param {*} optionId
     */
    public static async removeItem(optionId: string) {
        const url = `${apiUrl}/v1/carts/items/${optionId}`;
        const { data } = await ReqeustAPI.delete(url);
        return data;
    }

    public static async addDelivery(body: any): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/carts/deliveries`,
                body
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async addPayment(body: any): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/carts/payments`,
                body
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
    public static async removePayment(methodId: number): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(
                `${apiUrl}/v1/carts/payments/${methodId}`,
                null
            );
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
