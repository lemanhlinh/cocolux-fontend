import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Helpers
import { Utilities } from 'src/helpers/utilities';

// Modules
import { ProductDeal, ProductOption } from 'src/helpers/models';

// Components
import { Image } from 'src/components/base-group';
import { isNil } from 'lodash';

interface Props {
    column: string;
    item: ProductOption;
}

export const ProductItemVariation: React.FC<Props> = ({ item, column }) => {
    console.log(item);
    const [price, setPrice] = useState<number>(0);
    const [normalPrice, setNormalPrice] = useState<number>(0);
    const [itemDeal, setItemDeal] = useState<ProductDeal>({} as ProductDeal);

    useEffect(() => {
        if (!isNil(item)) {
            // Get item price
            const _item = Utilities.getCurrentPriceItemOption(item);
            if (!isNil(_item.price) && !isNil(_item.normal_price)) {
                setPrice(_item.price);
                setNormalPrice(_item.normal_price);
            }

            // Get item deal
            const currentDeal = Utilities.getCurrentItemDealOption(item);
            if (!isNil(currentDeal) && currentDeal.id) {
                setItemDeal(currentDeal);
            }
        }
    }, [parent]);

    return (
        <div className={column}>
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
                    <Link href={{ pathname: '/item-detail', query: { slug: item.slug.toLocaleLowerCase() } }} as={`/${item.slug.toLocaleLowerCase()}`}>
                        <a className='thumbnail'>
                            <Image
                                alt={item.name}
                                title={item.name}
                                src={Utilities.resizeImage(300, item.images?item.images[0]:'')}
                            />
                            {
                                itemDeal.image_layer
                                    ? (
                                        <div className='thumbnail__mask'>
                                            <img
                                                alt={item.name}
                                                title={item.name}
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
                            item.brand
                                ? item.brand
                                : 'Cocolux'
                        }
                    </p>
                    <h2 className='title'>
                        <Link href={{ pathname: '/item-detail', query: { slug: item.slug ? item.slug.toLocaleLowerCase() : parent.slug.toLocaleLowerCase() } }} as={`/${item.slug ? item.slug.toLocaleLowerCase() : parent.slug.toLocaleLowerCase()}`}>
                            <a>{item.name}</a>
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};
