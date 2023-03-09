export const BRAND_LOAD_DETAIL = 'BRAND/LOAD/DETAIL';

/**
 * Load Product Detail
 * @param {*} payload
 */
export const loadBrandDetail = (payload: any = {}) => ({
    type: BRAND_LOAD_DETAIL,
    payload: payload
});
