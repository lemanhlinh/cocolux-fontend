import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class ItemAPI {
    public static async detail(productId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/products/${productId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailOption(optionId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/product-options/${optionId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async list(params: any = {}): Promise<any> {
        try {
            params.statuses = 'active';
            params.is_visible = true;
            params.order_by = params.order_by ? params.order_by : 'asc';
            params.sort_by = params.sort_by ? params.sort_by : 'position';
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/products?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listComment(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/product-comments?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async addComment(params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(`${apiUrl}/v1/product-comments`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listRating(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/product-ratings?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async addRating(params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(`${apiUrl}/v1/product-ratings`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listPromotion(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/promotions?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listFlashSaleItem(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/flash-sales/items?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailHotDeal(dealId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/hot-deals/${dealId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listHotDeal(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/hot-deals?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listHotDealItem(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/hot-deals/items?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async registerFollow(params: any = {}): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(`${apiUrl}/v1/follows`, params);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
