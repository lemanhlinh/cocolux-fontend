import { isEmpty, isNil } from 'lodash';

// Modules
import { Storage } from 'src/helpers/utilities';
import { ProductModel } from 'src/helpers/models';

// Actions
import { PRODUCT_LOAD_DETAIL, PRODUCT_ADD_VIEWED } from './product.action';

const initialState = {
    data: {} as ProductModel,
    brandItem: {
        id: '10000',
        name: 'Cocolux',
    },
    deliveryTime: {
        current_hours: 0,
        event_time: 0,
        expired_at: 0,
    },
    followModal: {
        visible: false,
    },
    isEmpty: false,
};

/**
 * Generate Time Delivery
 * @param {*} content
 */
function generateDeliveryTime() {
    // caculate time
    const eventTime = new Date();
    const expiredAt = new Date();
    const currenHours = new Date().getHours();
    if (currenHours >= 8 && currenHours <= 9) {
        expiredAt.setHours(9, 0, 0, 0);
        eventTime.setHours(11, 0, 0, 0);
    }
    if (currenHours >= 9 && currenHours <= 10) {
        expiredAt.setHours(10, 0, 0, 0);
        eventTime.setHours(12, 0, 0, 0);
    }
    if (currenHours >= 10 && currenHours <= 11) {
        expiredAt.setHours(11, 0, 0, 0);
        eventTime.setHours(13, 0, 0, 0);
    }
    if (currenHours >= 11 && currenHours <= 12) {
        expiredAt.setHours(12, 0, 0, 0);
        eventTime.setHours(14, 0, 0, 0);
    }
    if (currenHours >= 12 && currenHours <= 13) {
        expiredAt.setHours(13, 0, 0, 0);
        eventTime.setHours(15, 0, 0, 0);
    }
    if (currenHours >= 13 && currenHours <= 14) {
        expiredAt.setHours(14, 0, 0, 0);
        eventTime.setHours(16, 0, 0, 0);
    }
    if (currenHours >= 14 && currenHours <= 15) {
        expiredAt.setHours(15, 0, 0, 0);
        eventTime.setHours(17, 0, 0, 0);
    }
    if (currenHours >= 15 && currenHours <= 16) {
        expiredAt.setHours(16, 0, 0, 0);
        eventTime.setHours(18, 0, 0, 0);
    }
    if (currenHours >= 16 && currenHours <= 18) {
        expiredAt.setHours(18, 0, 0, 0);
        eventTime.setHours(20, 0, 0, 0);
    }
    if (currenHours >= 18 && currenHours <= 24) {
        eventTime.setDate(eventTime.getDate() + 1);
        eventTime.setHours(10, 59, 59, 59);
    }
    if (currenHours >= 24 && currenHours <= 8) {
        expiredAt.setHours(8, 0, 0, 0);
        eventTime.setHours(10, 59, 59, 59);
    }

    return {
        current_hours: currenHours,
        event_time: eventTime,
        expired_at: expiredAt,
    };
}

function loadBrand(attributes: any[]) {
    const brand = attributes.find((i: any) => i.value && i.name.toLowerCase() === 'thương hiệu');
    if (brand) {
        return {
            id: brand.value.id,
            master_id: brand.id,
            name: brand.value.name,
        };
    }
    return {
        id: 1000,
        name: 'Cocolux',
    };
}

/**
 * Parse data
 * @param state
 * @returns
 */
function onParseState(data: any = {}) {
    const item = { ...data };

    // transform options
    if (data.products) {
        item.products = data.products.map((item: any) => {
            if (isEmpty(item.slug)) {
                const getSlug = data.slug.split('-i.')[0];
                item.slug = `${getSlug}-i.${item.sku}`;
            }
            return item;
        });
    }

    // transform slug
    if (data.name) {
        const { path } = data.query;
        const optionId = path.split('-i.')[1];
        const product = data.products.find((i: any) => i.sku === optionId);
        item.meta_title = isNil(data.meta_title)
            ? `${data.name} ${product ? `- ${product.option_name}` : ''}`
            : `${data.meta_title} ${product ? `- ${product.option_name}` : ''}`;
        item.meta_url = isNil(data.meta_url) ? data.slug : data.meta_url;
    }

    return item;
}

const productReducer = (state = initialState, { type, payload }: any = {}) => {
    switch (type) {
        case PRODUCT_LOAD_DETAIL: {
            const { data, query } = payload;

            if (payload.isEmpty) {
                return {
                    ...state,
                    isEmpty: payload.isEmpty,
                };
            }

            return {
                ...state,
                isEmpty: false,
                data: onParseState({ ...data, query }),
                brandItem: loadBrand(data.attributes),
                deliveryTime: generateDeliveryTime(),
            };
        }
        case PRODUCT_ADD_VIEWED: {
            // load data from local storage
            const listViewRaw = Storage.get(Storage.PRODUCT_VIEWED);
            let listViewParsed = listViewRaw ? (JSON.parse(listViewRaw) as any[]) : [];

            // check item exist
            const oldItem = listViewParsed.find((i: any = {}) => i.id === payload.id);
            if (!oldItem) listViewParsed = [payload, ...listViewParsed];

            // add item to list viewed
            Storage.add({
                key: Storage.PRODUCT_VIEWED,
                value: JSON.stringify(listViewParsed.splice(0, 10)),
            });
            return { ...state };
        }
        default:
            return { ...state };
    }
};

export default productReducer;