// Type Data
export const CONFIG_LIST_FOOTER = 'CONFIG/FOOTERS';
export const CONFIG_LIST_CATEGORY = 'CONFIG/CATEGORIES';
export const CONFIG_CHECK_LOGGED_IN = 'CONFIG/CHECK/LOGGED_IN';

// Type Form
export const CONFIG_LOGIN_FORM = 'CONFIG/LOGIN_FORM';
export const CONFIG_PHONE_FORM = 'CONFIG/PHONE_FORM';
export const CONFIG_USER_ACTIVE_FORM = 'CONFIG/USER_ACTIVE_FORM';
export const CONFIG_PRODUCT_FOLLOW_FORM = 'CONFIG/PRODUCT_FOLLOW_FORM';
export const CONFIG_USER_ADDRESS_FORM = 'CONFIG/USER/ADDRESS_FORM';
export const CONFIG_FORGOT_PASSWORD_FORM = 'CONFIG/FORGOT_PASSWORD_FORM';

/**
 * Check Logged In
 * @param {*} isUserLoggedIn
 */
export const checkUserLoggedIn = (isUserLoggedIn: boolean) => ({
    type: CONFIG_CHECK_LOGGED_IN,
    payload: {
        isUserLoggedIn
    }
});

/**
 * Add Categories
 * @param {*} categories
 */
export const addCategories = (payload: any) => ({
    type: CONFIG_LIST_CATEGORY,
    payload: payload
});

/**
 * Show Login Form
 * @param {*} visible
 */
export const addLoginForm = (visible: boolean, tab: string) => ({
    type: CONFIG_LOGIN_FORM,
    payload: {
        visible,
        tab
    }
});

/**
 * Show Change Phone Form
 * @param {*} visible
 */
export const addChangePhoneForm = (visible: boolean) => ({
    type: CONFIG_PHONE_FORM,
    payload: {
        visible
    }
});

/**
 * Show User Phone Form
 * @param {*} visible
 */
export const addForgotPasswordForm = (visible: boolean) => ({
    type: CONFIG_FORGOT_PASSWORD_FORM,
    payload: {
        visible
    }
});

/**
 * Show Product Follow Form
 * @param {*} visible
 */
export const addProductFollowForm = (visible: boolean) => ({
    type: CONFIG_PRODUCT_FOLLOW_FORM,
    payload: {
        visible
    }
});

/**
 * Show User Active Form
 * @param {*} visible
 * @param {*} phone
 */
export const addUserActiveForm = (visible: boolean, phone: string) => ({
    type: CONFIG_USER_ACTIVE_FORM,
    payload: {
        visible,
        phone
    }
});

/**
 * Show User Phone Form
 * @param {*} visible
 */
export const addUserAddressdForm = (visible: boolean, tab: string, address: any = {}) => ({
    type: CONFIG_USER_ADDRESS_FORM,
    payload: {
        tab,
        visible,
        address
    }
});
