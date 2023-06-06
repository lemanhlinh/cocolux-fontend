import { apiUrl,apiUrlNew } from 'config/vars';
import { stringify } from 'querystring';
import { ReqeustAPI } from './request-api';

export class ConfigAPI {
    public static BANNER_HOME_V1_POPUP = 'home_v1_popup';
    public static BANNER_HOME_V1_SLIDER = 'home_v1_slider';
    public static BANNER_HOME_V1_SUB_BANNER = 'home_v1_sub_banner'; // (2 cái ảnh nhỏ hiển thị cạnh banner)
    public static BANNER_HOME_V1_PRIMARY_BANNER_1 = 'home_v1_primary_banner_1'; // (2 cái ảnh hiển thị dưới danh sách thương hiệu)
    public static BANNER_HOME_V1_PRIMARY_BANNER_2 = 'home_v1_primary_banner_2'; // (3 ảnh hiển thị dưới cùng trên phần danh sách chi nhánh)
    public static BANNER_HOME_V1_CATEGORY_HOME_BANNER_1 = 'home_v1_category_home_banner_1'; // (1 ảnh hiển thị trong danh mục ở phần home)
    public static BANNER_HOME_V1_CATEGORY_HOME_BANNER_2 = 'home_v1_category_home_banner_2'; // (1 ảnh hiển thị trong danh mục ở phần home)
    public static BANNER_HOME_V1_CATEGORY_HOME_BANNER_3 = 'home_v1_category_home_banner_3'; // (1 ảnh hiển thị trong danh mục ở phần home)
    public static BANNER_HOME_V1_CATEGORY_HOME_BANNER_4 = 'home_v1_category_home_banner_4'; // (1 ảnh hiển thị trong danh mục ở phần home)
    public static BANNER_HOME_V1_CATEGORY_HOME_BANNER_5 = 'home_v1_category_home_banner_5'; // (1 ảnh hiển thị trong danh mục ở phần home)
    public static BANNER_FLASH_SALE_DETAIL_BANNER = 'flash_sale_detail_banner'; // (ảnh banner hiển thị ở trong 1 ct flash sale)
    public static BANNER_HOT_DEAL_DETAIL_BANNER = 'hot_deal_detail_banner'; // (ảnh banner hiển thị ở trong 1 ct hot deal)
    public static BANNER_PRODUCT_DETAIL_BANNER = 'product_detail_banner'; // (ảnh banner hiển thị trong sản p

    public static async listCategory(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/categories?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async detailCategory(categoryId: string): Promise<any> {
        try {
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/categories/${categoryId}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listAttribute(params: any = {}): Promise<any> {
        try {
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrl}/v1/attributes?${operations}`);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }

    public static async listBanner(params: any = {}) {
        // Perpare query parmas
        params.is_visible = true;
        const operations = stringify(params);
        const { data } = await ReqeustAPI.get(`${apiUrl}/v1/banners?${operations}`);
        return data;
    }

    public static async listStore(params: any = {}) {
        // Perpare query parmas
        params.is_visible = true;
        const operations = stringify(params);
        const { data } = await ReqeustAPI.get(`${apiUrl}/v1/stores?${operations}`);
        return data;
    }

    public static async listConfig(params: any = {}): Promise<any> {
        try {
            params.is_visible = true;
            const operations = stringify(params);
            const responses = await ReqeustAPI.get(`${apiUrlNew}/api/config/config_coco`,operations);
            return responses.data;
        } catch (e) {
            throw e;
        }
    }
}
