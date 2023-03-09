import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class ArticleAPI {
    public static async list(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/posts?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listCategories(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/post-categories?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detail(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/posts/${id}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
