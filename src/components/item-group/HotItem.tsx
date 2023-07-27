import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';
import { isNil } from 'lodash';

// Helpers
import { Utilities } from 'src/helpers/utilities';

// Modules
// import { addItem } from 'src/stores/checkout';
import { ProductModel, ProductDeal } from 'src/helpers/models';

// Components
import { Image } from 'src/components/base-group';

interface Props {
    hotItem: ProductModel;
    // shopNow?: boolean;
    className?: string;
}

export const HotItem: React.FC<Props> = ({ hotItem, className }) => {
    // Declaration State
    // const dispatch = useDispatch();
    const [price, setPrice] = useState<number>(0);
    const [normalPrice, setNormalPrice] = useState<number>(0);
    const [itemDeal, setItemDeal] = useState<ProductDeal>({} as ProductDeal);

    /**
     * Load Quantity
     * @param {*} index
     */
    // const loadTotalQuantity = (stocks: any[]) => {
    //     // Nếu SP có khuyến mãi
    //     // phải check total_available_quantity > 0 && stock > 0 thì mới cho mua hàng
    //     let total = 0;
    //     stocks.map((stock: any) => total += stock.total_quantity);
    //     return hotItem.discount?.id
    //         ? hotItem.discount?.total_available_quantity
    //         : total < 0 ? 0 : total;
    // };

    /**
     * Add To Cart
      @param {} payload
     */
    // const onAddToCart = (payload: any = {}) => {
    //     dispatch(
    //         addItem({
    //             id: payload.id,
    //             option_id: payload.option_id,
    //             total_quantity: 1,
    //         })
    //     );
    // };

    useEffect(() => {
        if (!isNil(hotItem)) {
            // Get item price
            const item = Utilities.getCurrentPriceItem(hotItem);
            if (!isNil(item.price) && !isNil(item.normal_price)) {
                setPrice(item.price);
                setNormalPrice(item.normal_price);
            }

            // Get item deal
            const currentDeal = Utilities.getCurrentItemDeal(hotItem);
            if (!isNil(currentDeal) && currentDeal.id) {
                setItemDeal(currentDeal);
            }

            if (hotItem.attributes && hotItem.attributes[0] && hotItem.attributes?.length) {
                // Load detail brand
                const brand = hotItem.attributes.find(
                    (i: any) => i.value && i.name.toLowerCase() === 'thương hiệu'
                );
                if (brand && brand?.value) {
                    hotItem.brand = brand.value.name;
                }
            }
        }
    }, [hotItem]);

    return (
        <>
            <div className={className}>
                <div className='card'>
                    <div className='card--top'>
                        <div
                            className='discount-tag'
                            style={{ display: itemDeal.id && itemDeal.value ? '' : 'none' }}
                        >
                            {
                                itemDeal.id && itemDeal.value
                                    ? <span>-{itemDeal.rate}%</span>
                                    : null
                            }
                        </div>
                        {
                            hotItem?.campaign &&
                            <div className='campaign-tag'>
                                <span>{hotItem?.campaign?.name || ''}</span>
                            </div>
                        }
                        <Link href={{ pathname: '/item-detail', query: { slug: hotItem.slug } }} as={`/${hotItem.slug}`}>
                            <a className='thumbnail'>
                                <Image
                                    alt={hotItem.name}
                                    title={hotItem.name}
                                    src={Utilities.resizeImage(300, hotItem.thumbnail_url)}
                                />
                                {
                                    itemDeal.image_layer
                                        ? (
                                            <div className='thumbnail__mask'>
                                                <img
                                                    alt={hotItem.name}
                                                    title={hotItem.name}
                                                    src={Utilities.resizeImage(300, itemDeal.image_layer)}
                                                    onError={(e: any) => {
                                                        if (e && e.target && e.target.style) {
                                                            e.target.style.display = 'none';
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : null
                                }
                            </a>
                        </Link>
                    </div>
                    <div className='card--bottom'>
                        <div className={`price ${price > 1000000 ? 'vertical' : ''}`}>
                            <div className='price-section'>
                                <p className='public-price'>{Utilities.currencyPipe(price)}</p>
                                {
                                    itemDeal.id && itemDeal.value
                                        ? <p className={`origin-price ${price > 1000000 && normalPrice > 1000000 ? 'price-overflow' : null}`}>
                                            {Utilities.currencyPipe(normalPrice)}
                                        </p>
                                        : null
                                }
                            </div>
                        </div>
                        <p className='brand'>
                            {
                                hotItem.brand
                                    ? hotItem.brand
                                    : 'Cocolux'
                            }
                        </p>
                        <h3 className='title'>
                            <Link href={{ pathname: '/item-detail', query: { slug: hotItem.slug.toLocaleLowerCase() } }} as={`/${hotItem.slug.toLocaleLowerCase()}`}>
                                <a>{hotItem.name}</a>
                            </Link>
                        </h3>
                        {/* {
                            shopNow
                                ? (
                                    loadTotalQuantity(hotItem?.stocks) > 1
                                        ? (
                                            <button
                                                className='btn btn-secondary'
                                                style={{ margin: '10px 0 0', display: 'block', width: '100%' }}
                                                onClick={() => onAddToCart(hotItem)}
                                            >
                                                Thêm vào giỏ
                                            </button>
                                        )
                                        : (
                                            <button
                                                className='btn btn-secondary'
                                                style={{ margin: '10px 0 0', display: 'block', width: '100%' }}
                                                type='button'
                                            >
                                                Hết hàng
                                            </button>
                                        )
                                )
                                : null
                        } */}
                    </div>
                </div>
            </div>
        </>
    );
};
