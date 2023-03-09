export const PRODUCT_LOAD_DETAIL = 'PRODUCT/LOAD/DETAIL';
export const PRODUCT_ADD_VIEWED = 'PRODUCT/ADD/VIEWED';

/**
 * Load Product Detail
 * @param {*} payload
 */
export const loadProductDetail = (payload: any = {}) => ({
    type: PRODUCT_LOAD_DETAIL,
    payload: payload
});

/**
 * Add To List Viewed
 * @param {*} payload
 */
export const addToListViewed = (payload: any = {}) => ({
    type: PRODUCT_ADD_VIEWED,
    payload: payload
});
