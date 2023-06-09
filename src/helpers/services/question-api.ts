import { apiUrlNew } from 'config/vars';
import { ReqeustAPI } from './request-api';

export class QuestionAPI {
    public static async detail(alias: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrlNew}/api/question/get_question?alias=${alias}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listQuestion(): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrlNew}/api/question/question_coco`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
