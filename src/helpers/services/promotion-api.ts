import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';
const { v4: uuidv4 } = require('uuid');
const requestId = uuidv4();

export class PromotionAPI {
    public static async listPromotion(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/promotions?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailPromotion(promotionId: number): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/promotions/${promotionId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listItemPromotion(params: any = {}): Promise<any> {
        try {
            params.statuses = 'active';
            params.is_visible = true;
            params.order_by = params.order_by ? params.order_by : 'asc';
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/products/${requestId}/products?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async getPromotion(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/promotions/${id}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}

