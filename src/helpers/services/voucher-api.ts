import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class VoucherAPI {
    public static async list(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/vouchers?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detail(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/vouchers/${id}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}

