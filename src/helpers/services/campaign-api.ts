import { apiUrl } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class CampaignAPI {
    public static async detail(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/campaigns/${id}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async copy(id: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/campaigns/${id}/copy`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
