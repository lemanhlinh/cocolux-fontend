import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class AttributeAPI {
    public static async listAttribute(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/attributes?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listAttributeValue(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/attribute-values?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
