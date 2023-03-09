/* eslint-disable camelcase */
import { pick } from 'lodash';
import { CartAPI } from 'src/helpers/services';
import { Toastr } from 'src/helpers/utilities';

// Types
export const CART_LOAD_DATA = 'CART/LOAD_DATE';
export const CART_GENERATED = 'CART/GENERATED';
export const CART_CONFIRMED = 'CART/CONFIRMED';
export const CART_UPDATED = 'CART/UPDATED';

export const CART_ADD_ITEM = 'CART/ADD_ITEM';
export const CART_UPDATE_ITEM = 'CART/UPDATE_ITEM';
export const CART_REMOVE_ITEM = 'CART/REMOVE_ITEM';
export const CART_REPLACE_ITEM = 'CART/REPLACE_ITEM';

export const CART_ADD_PAYMENT = 'CART/ADD/PAYMENT';
export const CART_ADD_PAYMENT_METHOD = 'CART/ADD/PAYMENT_METHOD';
export const CART_ADD_DISCOUNT_METHOD = 'CART/ADD/DISCOUNT_METHOD';
export const CART_ADD_SHIPPING_METHOD = 'CART/ADD/SHIPPING_METHOD';
export const CART_ADD_SHIPPING_ADDRESS = 'CART/ADD/SHIPPING_ADDRESS';

export const CART_REQUEST_PENDING = 'CART/REQUEST_PENDING';
export const CART_REQUEST_FAILURE = 'CART/REQUEST_FAILURE';

// Enums
export const EnumDiscountTypes = {
    PERCENT: 1,
    CASH: 2
};

/**
 * Handle request failure
 * @param {*} error
 * @private
 */
function handleRequestFailure(error: any) {
    Toastr.error(error.message);
    return { type: CART_REQUEST_FAILURE, error: error };
}

/**
 * Handle request pending
 * @private
 */
function handleRequestPending() {
    return { type: CART_REQUEST_PENDING };
}

/**
 * Create
 */
export function confirmCart() {
    return (dispatch: any) => {
        dispatch({ type: CART_CONFIRMED });
    };
}

/**
 * Get Cart
 * @param {*} clientId
 */
export function getCart() {
    return (dispatch: any) => {
        handleRequestPending();
        CartAPI.get()
            .then((respone) => {
                if (respone.code) {
                    handleRequestFailure(respone);
                    return;
                }

                // success
                dispatch({
                    type: CART_LOAD_DATA,
                    payload: respone.data
                });
            }).catch((error) => {
                handleRequestFailure(error);
                throw Error(error);
            });
    };
}

/**
 * Add Item
 * @param {*} coin
 * @param {*} point
 * @param {*} note
 */
export function updateCart(params: any = {}) {
    return (dispatch: any) => {
        handleRequestPending();
        CartAPI.update(
            params
        ).then((respone) => {
            if (respone.code) {
                handleRequestFailure(respone);
                return;
            }

            // success
            dispatch({
                type: CART_UPDATED,
                payload: { ...params }
            });
        }).catch((error) => {
            handleRequestFailure(error);
            throw Error(error);
        });
    };
}

/**
 * Add Item
 * @param {*} params
 */
export function addItem(params: any = {}) {
    return (dispatch: any) => {
        handleRequestPending();
        const payload = pick(
            params,
            [
                'id',
                'option_id',
                'total_quantity',
                'campaign_option_id'
            ]
        );

        // submit requst
        CartAPI.addItem(
            payload
        ).then((respone) => {
            if (respone.code) {
                handleRequestFailure(respone);
                return;
            }

            // success
            Toastr.success(
                'Thêm Sản Phẩm Thành Công'
            );
            dispatch({
                type: CART_ADD_ITEM,
                payload: payload
            });
        }).catch((error) => {
            handleRequestFailure(error);
            throw Error(error);
        });
    };
}

/**
 * Replace item
 * @param {*} products
 */
export function replaceItem(products: any = []) {
    return (dispatch: any) => {
        dispatch({
            type: CART_REPLACE_ITEM,
            payload: { products }
        });
    };
}


/**
 * Remove Item
 * @param {*} optionId - product option_id
 */
export function removeItem(optionId: string) {
    return (dispatch: any) => {
        handleRequestPending();
        CartAPI.removeItem(optionId)
            .then((respone) => {
                if (respone.code) {
                    handleRequestFailure(respone);
                    return;
                }

                // success
                Toastr.success(
                    'Xoá Sản Phẩm Thành Công'
                );
                dispatch({
                    type: CART_REMOVE_ITEM,
                    payload: { option_id: optionId }
                });
            }).catch((error) => {
                handleRequestFailure(error);
                throw Error(error);
            });
    };
}

/**
 * Add Item
 * @param {*} id
 * @param {*} quantity
 */
export function changeQuantity(params: any = {}) {
    return (dispatch: any) => {
        handleRequestPending();
        CartAPI.updateItem(
            params
        ).then((respone) => {
            if (respone.code) {
                handleRequestFailure(respone);
                return;
            }

            // success
            dispatch({
                type: CART_UPDATE_ITEM,
                payload: { ...params }
            });
        }).catch((error) => {
            handleRequestFailure(error);
            throw Error(error);
        });
    };
}

// /**
//  * Shipping Method
//  * @param {*} method
//  */
// export function addPaymentMethod(method: string) {
//     return (dispatch: any) => {
//         handleRequestPending();
//         CartAPI.paymentMeothod(
//             method
//         ).then((respone) => {
//             if (respone.code) {
//                 handleRequestFailure(respone);
//                 return;
//             }

//             // success
//             dispatch({
//                 type: CART_ADD_PAYMENT_METHOD,
//                 payload: { payment_method: method }
//             });
//         }).catch((error) => {
//             handleRequestFailure(error);
//             throw Error(error);
//         });
//     };
// }

// /**
//  * Shipping Method
//  * @param {*} method
//  */
// export function addShippingMethod(method: string) {
//     return (dispatch: any) => {
//         handleRequestPending();
//         CartAPI.shippingMethod(
//             method
//         ).then((respone) => {
//             if (respone.code) {
//                 handleRequestFailure(respone);
//                 return;
//             }

//             // success
//             dispatch({
//                 type: CART_ADD_SHIPPING_METHOD,
//                 payload: { shipping_method: method }
//             });
//         }).catch((error) => {
//             handleRequestFailure(error);
//             throw Error(error);
//         });
//     };
// }

// /**
//  * Shipping Method
//  * @param {*} shipping
//  */
// export function addShippingAddress(shipping: any = {}) {
//     return (dispatch: any) => {
//         handleRequestPending();
//         CartAPI.shippingMethod(
//             shipping
//         ).then((respone) => {
//             if (respone.code) {
//                 handleRequestFailure(respone);
//                 return;
//             }

//             // success
//             dispatch({
//                 type: CART_ADD_SHIPPING_ADDRESS,
//                 payload: { shipping }
//             });
//         }).catch((error) => {
//             handleRequestFailure(error);
//             throw Error(error);
//         });
//     };
// }

/**
 * Add Payment
 * @param {*} payment
 */
export function addPayment(payment: any = {}) {
    return (dispatch: any) => {
        dispatch({
            type: CART_ADD_PAYMENT,
            payload: { payment }
        });
    };
}
