import { CONFIG_LOAD_LIST } from './config.action';

const initialState = {
    config: {},
    isEmpty: false
};

const configReducer = (state = initialState, { type, payload }: any = {}) => {
    switch (type) {
        case CONFIG_LOAD_LIST: {
            return {
                ...state,
                config: payload,
            };
        }
        default:
            return { ...state };
    }
};

export default configReducer;
