import {
    // Types
    CART_GENERATED,
    CART_LOAD_DATA,
    CART_ADD_ITEM,
    CART_UPDATE_ITEM,
    CART_REMOVE_ITEM,
    CART_REPLACE_ITEM,
    CART_ADD_PAYMENT,
    CART_ADD_SHIPPING_ADDRESS,
    CART_REQUEST_FAILURE,
    CART_ADD_SHIPPING_METHOD
} from './checkout.action';

const initialState = {
    cartInfo: {} as any,
    totalQuantity: 0,
    shippingMethods: [
        {
            method: 1,
            label: 'Giao hàng trong 48 giờ',
            name: 'Giao hàng trong 48 giờ',
            checked: false,
            disabled: false,
            isValid: true,
            shipping_price: 20000
        },
    ],
    paymentMethods: [
        {
            id: 1,
            method: 1,
            checked: true,
            name: 'Tiền mặt',
            value: 0,
            type: 1,
            label: 'Thanh toán khi nhận hàng (COD)',
            img: ''
        },
        // {
        //     id: 2,
        //     label: 'Thanh toán trực tuyến (Thẻ nội địa - Visa - Master Card - Miễn phí thanh toán)'
        // },
        {
            id: 3,
            method: 2,
            checked: false,
            name: 'Chuyển khoản',
            type: 1,
            value: 0,
            label: 'Chuyển khoản: Tên tài khoản: Phạm Tiến Lợi \n\
                    - Vietcombank : 103878062018 TP Hà Nội - Hội sở',
            img: '/media/images/payment-coco.jpg'
        }
    ],
    deliveryCodes: {
        provinces: [
            {
                code: '201',
                name: 'Hà Nội'
            }
        ],
        districts: [
            {
                name: 'Quận Ba Đình',
                code: '1484',
                parent_code: '201'
            },
            {
                name: 'Quận Hoàn Kiếm',
                code: '1489',
                parent_code: '201'
            },
            {
                name: 'Quận Tây Hồ',
                code: '1492',
                parent_code: '201'
            },
            {
                name: 'Quận Long Biên',
                code: '1491',
                parent_code: '201'
            },
            {
                name: 'Quận Cầu Giấy',
                code: '1485',
                parent_code: '201'
            },
            {
                name: 'Quận Đống Đa',
                code: '1486',
                parent_code: '201'
            },
            {
                name: 'Quận Hai Bà Trưng',
                code: '1488',
                parent_code: '201'
            },
            {
                name: 'Quận Hoàng Mai',
                code: '1490',
                parent_code: '201'
            },
            {
                name: 'Quận Thanh Xuân',
                code: '1493',
                parent_code: '201'
            },
            {
                name: 'Quận Nam Từ Liêm',
                code: '3440',
                parent_code: '201'
            },
            {
                name: 'Quận Bắc Từ Liêm',
                code: '1482',
                parent_code: '201'
            },
            {
                name: 'Quận Hà Đông',
                code: '1542',
                parent_code: '201'
            }
        ]
    },

    // handle request
    successDialog: {
        visible: false,
        message: null
    },
    errorDialog: {
        visible: false,
        message: null
    }
};


/**
 * Calculate amount
 * @param {*} data
 */
function calTotalPrice(data: any = {}) {
    const returnAmount = {
        total_quantity: 0,
        total_point: 0,
        total_price_before_discount: 0,
        total_price_after_discount: 0,
        total_discount_value: 0,
        total_original_price: 0,
        total_price: 0,
        total_paid: 0,
        total_unpaid: 0
    };
    if (data.products && data.products.length) {
        data.products.forEach((product: any) => {
            returnAmount.total_quantity += Math.ceil(product.total_quantity);
            returnAmount.total_price_after_discount += Math.ceil(product.total_price);
            returnAmount.total_original_price += Math.ceil(product.total_original_price);
            returnAmount.total_price_before_discount += Math.ceil(product.total_price);
        });
    }
    if (data.discounts && data.discounts.length) {
        data.discounts.forEach((discount: any) => {
            // percent discount
            if (discount.type === 1) {
                returnAmount.total_price_after_discount = Math.ceil(
                    returnAmount.total_price_after_discount * (100 - discount.value) / 100
                );
            }

            // cash discount
            if (discount.type === 2) {
                returnAmount.total_price_after_discount -= discount.value;
            }
        });
    }
    if (data.payments && data.payments.length) {
        data.payments.forEach((payment: any) => {
            returnAmount.total_paid += payment.value;
        });
    }
    returnAmount.total_point = Math.ceil(
        returnAmount.total_price_after_discount * (1 / 100)
    );
    returnAmount.total_discount_value = Math.ceil(
        returnAmount.total_price_before_discount - returnAmount.total_price_after_discount
    );
    returnAmount.total_price_after_discount = Math.ceil(
        returnAmount.total_price_after_discount + (data.total_shipping_fee || 0)
    );
    returnAmount.total_price = Math.ceil(
        returnAmount.total_price_after_discount - (data.total_exchange_price || 0)
    );
    returnAmount.total_unpaid = returnAmount.total_price >= returnAmount.total_paid
        ? returnAmount.total_price - returnAmount.total_paid
        : 0;
    return returnAmount;
}

const checkoutReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        // Info action
        case CART_GENERATED:
        case CART_LOAD_DATA: {
            return {
                ...state,
                cartInfo: payload,
                totalQuantity: payload.total_quantity
            };
        }

        case CART_ADD_ITEM: {
            const { cartInfo } = state;
            const trasnformed = { ...cartInfo };
            const indexOf = trasnformed.products.findIndex(
                (p: any) => p.option_id === payload.option_id
            );
            if (indexOf !== -1) {
                trasnformed.products.map((item: any) => {
                    if (item.option_id === payload.option_id) {
                        item.total_quantity += payload.total_quantity;
                    }
                    return item;
                });
            } else {
                trasnformed.products.push({
                    ...payload
                });
            }
            // Handle transform data
            const operation = calTotalPrice(
                trasnformed
            );
            return {
                ...state,
                cartInfo: { ...cartInfo, ...operation },
                totalQuantity: operation.total_quantity
            };
        }

        case CART_UPDATE_ITEM: {
            const { cartInfo } = state;
            const trasnformed = { ...cartInfo };
            const indexOf = trasnformed.products.findIndex(
                (p: any) => p.option_id === payload.option_id
            );
            if (indexOf !== -1) {
                trasnformed.products.map((item: any) => {
                    if (item.option_id === payload.option_id) {
                        item.total_quantity = payload.total_quantity;
                        item.total_price = Math.ceil(item.price * payload.total_quantity);
                    }
                    return item;
                });
            } else {
                trasnformed.products.push({
                    ...payload
                });
            }
            // Handle transform data
            const operation = calTotalPrice(
                trasnformed
            );
            return {
                ...state,
                cartInfo: { ...cartInfo, ...operation },
                totalQuantity: operation.total_quantity
            };
        }

        case CART_REMOVE_ITEM: {
            const { cartInfo } = state;
            const trasnformed = { ...cartInfo };
            trasnformed.products = trasnformed.products.filter(
                (item: any) => item.option_id !== payload.option_id
            );
            const operation = calTotalPrice(
                trasnformed
            );
            return {
                ...state,
                cartInfo: { ...trasnformed, ...operation },
                totalQuantity: operation.total_quantity
            };
        }

        case CART_REPLACE_ITEM: {
            const { cartInfo } = state;
            const { products } = payload;
            const trasnformed = { ...cartInfo };
            trasnformed.products = [...products];
            const operation = calTotalPrice(trasnformed);
            return {
                ...state,
                cartInfo: { ...trasnformed, ...operation },
                totalQuantity: operation.total_quantity
            };
        }

        case CART_ADD_PAYMENT: {
            const { cartInfo } = state;
            const { payment } = payload;
            cartInfo.payments = [payment];

            // Handle transform data
            const operation = calTotalPrice(cartInfo);
            const trasnformed = { ...cartInfo, ...operation };
            return {
                ...state,
                cartInfo: trasnformed,
                totalQuantity: trasnformed.total_quantity
            };
        }

        case CART_ADD_SHIPPING_ADDRESS: {
            const { cartInfo } = state;
            const { shipping } = payload;
            cartInfo.shipping = shipping;
            return {
                ...state,
                cartInfo
            };
        }
        case CART_ADD_SHIPPING_METHOD: {
            const { cartInfo } = state;
            const { shipping_method } = payload;
            cartInfo.shipping = shipping_method;
            return {
                ...state,
                cartInfo
            };
        }

        // Handle request
        case CART_REQUEST_FAILURE: {
            const { message } = payload;
            const errorDialog = {
                visible: true,
                message: message
            };
            return {
                ...state,
                errorDialog
            };
        }
        default:
            return { ...state };
    }
};

export default checkoutReducer;
