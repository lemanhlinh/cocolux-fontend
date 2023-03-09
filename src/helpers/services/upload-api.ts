import { apiUrl } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class UploadAPI {
    public static UPLOAD_USER = 'users';
    public static UPLOAD_PRODUCT = 'products';
    public static UPLOAD_CUSTOMER = 'customers';
    public static UPLOAD_COMMENT = 'comments';

    public static async single(group: string, formData: any): Promise<any> {
        try {
            const responses = await ReqeustAPI.post(`${apiUrl}/v1/images/upload-single?group=${group}`, formData);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
