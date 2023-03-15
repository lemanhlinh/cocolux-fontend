import moment from 'moment';
import Cookie from 'universal-cookie';
import { imageUrl } from 'config/vars';
import { ProductModel, ProductDeal, ProductPrice, ProductOption } from '../models';
import { isNil } from 'lodash';

export class Utilities {
    /**
     * Resize Image
     * @param {*} size
     * @param {*} image
     */
    public static resizeImage(size: number, image?: string) {
        if (image) {
            const imageSplit = image.replace(`${imageUrl}`, '').split('.');
            const newImageText = imageSplit[0];
            const newImageType = imageSplit[1];
            return `${imageUrl}/${newImageText}-${size}x${size}.${newImageType}`;
        }

        return `https://via.placeholder.com/${size}x${size}?text=Cocolux`;
    }

    /**
     * Pipe Currency
     * @param {*} price
     */
    public static currencyPipe = (price: any) => {
        // tslint:disable-next-line: prefer-template
        const y = Number(Math.round(Number(price + 'e' + 0)) + 'e-' + 0);
        const z = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${z} đ`;
    }

    /**
     * Get CountDown Time
     * @param {*} price
     */
    public static getCountDownTime = (secs: number) => {
        const days = Math.floor(secs / 86400);
        const divisorForHours = secs % 86400;
        const hours = Math.floor(divisorForHours / 3600);
        const divisorForMinutes = secs % 3600;
        const minutes = Math.floor(divisorForMinutes / 60);
        const divisorForSeconds = divisorForMinutes % 60;
        const seconds = Math.ceil(divisorForSeconds);
        return { d: days, h: hours, m: minutes, s: seconds };
    }

    /**
     * Get Current Item Deal
     * @param item
     */
    public static getCurrentItemDeal = (item: ProductModel) => {
        let deal = {} as ProductDeal;
        if (
            !isNil(item.flash_deal) &&
            item.flash_deal.id &&
            !isNil(item.hot_deal) &&
            item.hot_deal.id
        ) {
            deal = { ...item.flash_deal };
        }
        if (isNil(item.flash_deal) && !isNil(item.hot_deal) && item.hot_deal.id) {
            deal = { ...item.hot_deal };
        }
        if (isNil(item.hot_deal) && !isNil(item.flash_deal) && item.flash_deal.id) {
            deal = { ...item.flash_deal };
        }
        return deal;
    }

        /**
     * Get Current Item Deal
     * @param item
     */
        public static getCurrentItemDealOption = (item: ProductOption) => {
            let deal = {} as ProductDeal;
            if (
                !isNil(item.flash_deal) &&
                item.flash_deal.id &&
                !isNil(item.hot_deal) &&
                item.hot_deal.id
            ) {
                deal = { ...item.flash_deal };
            }
            if (isNil(item.flash_deal) && !isNil(item.hot_deal) && item.hot_deal.id) {
                deal = { ...item.hot_deal };
            }
            if (isNil(item.hot_deal) && !isNil(item.flash_deal) && item.flash_deal.id) {
                deal = { ...item.flash_deal };
            }
            return deal;
        }

    /**
     * Get Current Price Item
     * @param item
     */
    public static getCurrentPriceItem = (item: ProductModel) => {
        const operator = {
            price: item.price,
            normal_price: item.normal_price,
        } as ProductPrice;
        if (
            !isNil(item.hot_deal) &&
            item.hot_deal.id &&
            !isNil(item.flash_deal) &&
            item.flash_deal.id
        ) {
            operator.price = item.flash_deal.price;
            operator.normal_price = item.flash_deal.normal_price;
        }
        if (isNil(item.flash_deal) && isNil(item.hot_deal)) {
            operator.price = item.price;
            operator.normal_price = item.normal_price;
        }
        if (isNil(item.flash_deal) && !isNil(item.hot_deal) && item.hot_deal.id) {
            operator.price = item.hot_deal.price;
            operator.normal_price = item.hot_deal.normal_price;
        }
        if (isNil(item.hot_deal) && !isNil(item.flash_deal) && item.flash_deal.id) {
            operator.price = item.flash_deal.price;
            operator.normal_price = item.flash_deal.normal_price;
        }
        return operator;
    }

    /**
     * Get Current Price Item
     * @param item
     */
    public static getCurrentPriceItemOption = (item: ProductOption) => {
        const operator = {
            price: item.price,
            normal_price: item.normal_price,
        } as ProductPrice;
        if (
            !isNil(item.hot_deal) &&
            item.hot_deal.id &&
            !isNil(item.flash_deal) &&
            item.flash_deal.id
        ) {
            operator.price = item.flash_deal.price;
            operator.normal_price = item.flash_deal.normal_price;
        }
        if (isNil(item.flash_deal) && isNil(item.hot_deal)) {
            operator.price = item.price;
            operator.normal_price = item.normal_price;
        }
        if (isNil(item.flash_deal) && !isNil(item.hot_deal) && item.hot_deal.id) {
            operator.price = item.hot_deal.price;
            operator.normal_price = item.hot_deal.normal_price;
        }
        if (isNil(item.hot_deal) && !isNil(item.flash_deal) && item.flash_deal.id) {
            operator.price = item.flash_deal.price;
            operator.normal_price = item.flash_deal.normal_price;
        }
        return operator;
    }

    /**
     * Replace All Special Character
     * @param {*} value
     */
    public static replaceAllSpecial(value: string) {
        let str = value;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        str = str.replace(/\s?-\s/g, '-');
        str = str.replace(/\s/g, '-');
        str = str.replace(/\//g, '-');
        str = str.toLowerCase();
        return str;
    }

    /**
     * Add class no-scroll to body (use for mobile)
     * @param {*} type
     */
    public static toggleNoScroll = (type?: true | false) => {
        if (typeof document !== 'undefined') {
            if (type) {
                if (!document.body.classList.contains('no-scroll')) {
                    document.body.classList.add('no-scroll');
                }
            } else if (!type) {
                document.body.classList.remove('no-scroll');
            } else {
                if (document.body.classList.contains('no-scroll')) {
                    document.body.classList.remove('no-scroll');
                } else {
                    document.body.classList.add('no-scroll');
                }
            }
        }
    }

    /**
     * Set Loading: true | flase
     * @param {*} type
     */
    public static setLoading = (type: any) => {
        if (typeof document !== 'undefined') {
            const loading: any = document.getElementsByClassName('domain-loading')[0];
            if (type) {
                loading.style.display = '';
            } else {
                loading.style.display = 'none';
            }
        }
    }

    /**
     * Throttle
     * @param {*} func
     * @param {*} delay
     */
    public static throttle = (func: any, delay: number) => {
        let timeoutHandler: any = null;
        return function () {
            if (timeoutHandler == null) {
                timeoutHandler = setTimeout(() => {
                    func();
                    clearInterval(timeoutHandler);
                    timeoutHandler = null;
                }, delay);
            }
        };
    }

    /**
     * Debounce
     * @param callback
     * @param delay
     */
    public static debounce = (callback: any, delay: number) => {
        let timeoutHandler: any = null;
        return function () {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(() => {
                callback();
            }, delay);
        };
    }

    /**
     * Format Date
     * @param {*} date
     * @param {*} format
     * @param {*} dataFormat
     */
    public static formatDate = (date: any, format: any = 'DD/MM/YY', dataFormat: any = null) => {
        let newDateTime: any;
        if (dataFormat) {
            newDateTime = moment(date, dataFormat).format(format);
        } else {
            newDateTime = moment(date).format(format);
        }
        return newDateTime;
    }

    /**
     * Check Device
     */
    public static isWebView = () => {
        const cookie = new Cookie();
        return cookie.get('data_user');
    }

    /**
     * Ramdom Id
     */
    public static generateId = () => {
        // tslint:disable-next-line: prefer-template
        return Math.floor(Math.random() * 10000000000001) + ':' + Date.now();
    }
}
