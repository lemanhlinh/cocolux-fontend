import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class BrandAPI {
    public static async list(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            params.attribute_code = 'product_attribute_thuong_hieu';
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/attribute-values?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detail(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/attribute-values/${id}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
