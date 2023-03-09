export class Cookie {
    public static CSRF_TOKEN = 'csrftoken';
    public static GUEST_TOKEN = 'guest_token';
    public static ACCESS_TOKEN = 'access_token';
    public static REFRESH_TOKEN = 'refresh_token';
    public static CART_CLIENT_ID = 'coco_cart_id';
    public static CLIENT_ID = 'coco_client_id';

    /**
     * Add cookie
     * @param {*} name
     * @param {*} value
     * @param {*} expired - total day active
     */
    public static add({ name, value, expired }: any) {
        const d = new Date();
        d.setTime(d.getTime() + (expired * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    /**
     * Get Cookie
     * @param {*} name
     */
    public static get(name: string) {
        const cookieName = `${name}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookie = decodedCookie.split(';');
        for (let i = 0; i < cookie.length; i += 1) {
            let c = cookie[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return null;
    }

    /**
     * Remove Cookie
     * @param {*} name
     */
    public static remove(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return true;
    }
}
