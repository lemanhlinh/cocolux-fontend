import { apiUrl } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class LocationAPI {
    public static async listProvinces(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/provinces?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
    public static async listDistricts(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/districts?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
    public static async listWard(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/wards?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}

