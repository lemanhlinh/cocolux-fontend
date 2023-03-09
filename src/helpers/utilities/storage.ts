export class Storage {
    // Storage name
    public static SEARCH_KEYWORD = 'search_keyword';
    public static CATEGORIES = 'categories';
    public static CART = 'cart_mine';
    public static USER = 'user';
    public static WISHLIST = 'wishlist';
    public static USER_STATUS = 'user_status';
    public static USER_METRIC = 'user_metric';
    public static USER_LOCATION = 'user_location';
    public static PRODUCT_VIEWED = 'product_viewed';
    public static POPUP_HISTORY = 'popup_history';
    public static SOURCE_LOGIN = 'source_login';

    /**
     * Add Storage
     * @param {*} key
     * @param {*} value
     */
    public static add({ key, value }: any) {
        localStorage.setItem(key, value);
        return true;
    }

    /**
     * Get Storage
     * @param {*} key
     */
    public static get(key: string): any {
        const storageItem = localStorage.getItem(key);
        return storageItem || null;
    }

    /**
     * Remove Storage
     * @param {*} key
     */
    public static remove(key: string) {
        localStorage.removeItem(key);
        return true;
    }
}
