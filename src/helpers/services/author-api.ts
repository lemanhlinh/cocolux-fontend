import { apiUrl } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class AuthorAPI {
    public static async detail(slug: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/authors/${slug}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
