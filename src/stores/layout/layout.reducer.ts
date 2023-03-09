import {
    CONFIG_LIST_CATEGORY,
    CONFIG_LOGIN_FORM,
    CONFIG_PHONE_FORM,
    CONFIG_CHECK_LOGGED_IN,
    CONFIG_FORGOT_PASSWORD_FORM,
    CONFIG_USER_ADDRESS_FORM,
    CONFIG_USER_ACTIVE_FORM,
    CONFIG_PRODUCT_FOLLOW_FORM
} from './layout.action';

const initialState = {
    menus: [],
    footers: [],
    categories: [],
    categoryPublics: [],
    isUserLoggedIn: null,
    isLoading: false,

    // modal
    loginModal: {
        tab: '',
        visible: false
    },
    userAddressModal: {
        tab: 'create',
        address: {},
        visible: false
    },
    userActiveModal: {
        visible: false,
        phone: ''
    },
    changePhoneModal: {
        visible: false
    },
    forgotPasswordModal: {
        visible: false
    },
    productFollowModal: {
        visible: false
    }
};

const configReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case CONFIG_CHECK_LOGGED_IN: {
            const { isUserLoggedIn } = payload;
            return {
                ...state,
                isUserLoggedIn: isUserLoggedIn || false
            };
        }
        case CONFIG_LIST_CATEGORY: {
            const newCategories = [...payload];
            const categoryPublics = [...payload.filter((c: any) => c.is_home_visible === true)];
            return {
                ...state,
                categories: [...newCategories],
                categoryPublics: [...categoryPublics]
            };
        }
        case CONFIG_LOGIN_FORM: {
            const { visible, tab } = payload;
            const { loginModal } = state;
            return {
                ...state,
                loginModal: {
                    ...loginModal,
                    visible,
                    tab
                }
            };
        }
        case CONFIG_PHONE_FORM: {
            const { visible } = payload;
            const { changePhoneModal } = state;
            return {
                ...state,
                changePhoneModal: {
                    ...changePhoneModal,
                    visible
                }
            };
        }
        case CONFIG_FORGOT_PASSWORD_FORM: {
            const { visible } = payload;
            const { forgotPasswordModal } = state;
            return {
                ...state,
                forgotPasswordModal: {
                    ...forgotPasswordModal,
                    visible
                }
            };
        }
        case CONFIG_USER_ADDRESS_FORM: {
            const { userAddressModal } = state;
            return {
                ...state,
                userAddressModal: {
                    ...userAddressModal,
                    ...payload
                }
            };
        }
        case CONFIG_PRODUCT_FOLLOW_FORM: {
            const { visible } = payload;
            const { productFollowModal } = state;
            return {
                ...state,
                productFollowModal: {
                    ...productFollowModal,
                    visible
                }
            };
        }
        case CONFIG_USER_ACTIVE_FORM: {
            const { visible, phone } = payload;
            return {
                ...state,
                userActiveModal: {
                    visible,
                    phone
                }
            };
        }
        default:
            return state;
    }
};

export default configReducer;
