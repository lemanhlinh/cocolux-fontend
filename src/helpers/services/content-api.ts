import { apiUrlNew } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class ContentAPI {
    public static async detail(alias: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrlNew}/api/contents/get_content?alias=${alias}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
