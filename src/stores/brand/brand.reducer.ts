import { BRAND_LOAD_DETAIL } from './brand.action';

const initialState = {
    data: {},
    isEmpty: false
};

const productReducer = (state = initialState, { type, payload }: any = {}) => {
    switch (type) {
        case BRAND_LOAD_DETAIL: {
            const { data } = payload;

            if (payload.isEmpty) {
                return {
                    ...state,
                    isEmpty: payload.isEmpty
                };
            }

            return {
                ...state,
                data: data
            };
        }
        default:
            return { ...state };
    }
};

export default productReducer;
