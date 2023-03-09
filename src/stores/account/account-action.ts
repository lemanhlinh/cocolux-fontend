import { isNil } from 'lodash';
import { Storage } from 'src/helpers/utilities';
import { AccountAPI, VoucherAPI } from 'src/helpers/services';

export const ACCOUNT_LIST_ORDERS = 'ACCOUNT/LIST/ORDERS';
export const ACCOUNT_LIST_VOUCHERS = 'ACCOUNT/LIST/VOUCHERS';
export const ACCOUNT_LIST_ADDRESS = 'ACCOUNT/LIST/ADDRESS';
export const ACCOUNT_LIST_WISHLIST = 'ACCOUNT/LIST/WISHLIST';

export const ACCOUNT_REQUEST_PENDING = 'ACCOUNT/REQUEST_PENDING';
export const ACCOUNT_REQUEST_FAILURE = 'ACCOUNT/REQUEST_FAILURE';

/**
 * Handle request failure
 * @param {*} error
 * @private
 */
function handleRequestFailure(error: any) {
    return {
        type: ACCOUNT_REQUEST_PENDING,
        error: error
    };
}

/**
 * Handle request pending
 * @private
 */
function handleRequestPending() {
    return {
        type: ACCOUNT_REQUEST_FAILURE
    };
}

/**
 * List Address
 * @param {*} userId
 */
export function listAddress() {
    return (dispatch: any) => {
        handleRequestPending();
        // Load user from local
        const user = Storage.get(Storage.USER);
        const userParse = JSON.parse(user);

        AccountAPI.listAddress({
            order_by: 'desc',
            sort_by: 'created_at',
            user_id: userParse.id
        }).then((respone: any) => {
            if (respone.code) {
                handleRequestFailure(respone);
                return;
            }

            // success
            dispatch({
                type: ACCOUNT_LIST_ADDRESS,
                payload: { ...respone }
            });
        }).catch((error: any) => {
            handleRequestFailure(error);
            throw Error(error);
        });
    };
}

/**
 * List Voucher
 * @param {*} userId
 */
export function listVouchers() {
    return (dispatch: any) => {
        handleRequestPending();
        VoucherAPI.list({
            skip: 0,
            limit: 30,
            is_expired: true,
            is_visible: true,
            statuses: 'active'
        }).then((respone: any) => {
            if (respone.code) {
                handleRequestFailure(respone);
                return;
            }

            // success
            dispatch({
                type: ACCOUNT_LIST_VOUCHERS,
                payload: { ...respone }
            });
        }).catch((error: any) => {
            handleRequestFailure(error);
            throw Error(error);
        });
    };
}

/**
 * List Orders
 * @param {*} status
 */
export function listOrders() {
    return (dispatch: any) => {
        handleRequestPending();
        AccountAPI.listOrders()
            .then((respone: any) => {
                if (respone.code) {
                    handleRequestFailure(respone);
                    return;
                }
                // success
                dispatch({
                    type: ACCOUNT_LIST_ORDERS,
                    payload: { ...respone }
                });
            }).catch((error: any) => {
                handleRequestFailure(error);
                throw Error(error);
            });
    };
}

/**
 * Fetch Wishlist
 * @param {*} userId
 */
export function fetchWishlist() {
    return (dispatch: any) => {
        const data = Storage.get(Storage.WISHLIST);
        const listData = data ? JSON.parse(data) : [];
        dispatch({
            type: ACCOUNT_LIST_WISHLIST,
            payload: {
                count: listData.length || 0,
                data: listData
            }
        });
    };
}

/**
 * Set Item To Wishlist
 * @param {*} product
 */
export function setItemToWishlist(product: any) {
    return (dispatch: any) => {
        let listData = JSON.parse(
            Storage.get(Storage.WISHLIST)
        ) || [];

        // check product exist
        const isExist = listData.find(
            (x: any) => x.id === product.id
        );
        if (isNil(isExist)) {
            listData.push({ ...product });
            Storage.add({
                key: Storage.WISHLIST,
                value: JSON.stringify(listData)
            });
        } else {
            listData = listData.filter(
                (x: any) => x.id !== product.id
            );
            Storage.add({
                key: Storage.WISHLIST,
                value: JSON.stringify(listData)
            });
        }

        dispatch({
            type: ACCOUNT_LIST_WISHLIST,
            payload: {
                count: listData.length || 0,
                data: listData
            }
        });
    };
}
