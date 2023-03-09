import {
    ACCOUNT_LIST_ORDERS,
    ACCOUNT_LIST_VOUCHERS,
    ACCOUNT_LIST_ADDRESS,
    ACCOUNT_LIST_WISHLIST
} from './account-action';

const initialState = {
    orders: {
        count: 0,
        data: []
    },
    vouchers: {
        count: 0,
        data: []
    },
    address: {
        count: 0,
        data: []
    },
    wishlist: {
        count: 0,
        data: []
    },
    notifications: {
        count: 0,
        data: []
    },
};

const accountReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case ACCOUNT_LIST_ADDRESS: {
            return {
                ...state,
                address: { ...payload }
            };
        }
        case ACCOUNT_LIST_VOUCHERS: {
            return {
                ...state,
                vouchers: { ...payload }
            };
        }
        case ACCOUNT_LIST_ORDERS: {
            return {
                ...state,
                orders: { ...payload }
            };
        }
        case ACCOUNT_LIST_WISHLIST: {
            return {
                ...state,
                wishlist: { ...payload }
            };
        }

        default:
            return { ...state };
    }
};

export default accountReducer;
