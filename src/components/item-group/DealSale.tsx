import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { isNil } from 'lodash';

// Helpers
import { Utilities } from 'src/helpers/utilities';

// Components
import { ProductModel, ProductDeal } from 'src/helpers/models';
import { Image } from 'src/components/base-group';

interface Props {
    className?: string;
    dealItem: ProductModel;
    dealInfo: {
        id: number;
        code: string;
        content: string;
        total_time: number;
        thumbnail_url: string;
        applied_start_time: string;
        applied_stop_time: string;
    };
}

export const SaleItem: React.FC<Props> = ({ dealInfo, dealItem, className }) => {
    // Declaration State
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState<number>(0);
    const [percent, setPercent] = useState<number>(0);
    const [normalPrice, setNormalPrice] = useState<number>(0);
    const [date, setDate] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const format = (value: number) => value < 10 ? `0${value}` : value;
    const [itemDeal, setItemDeal] = useState<ProductDeal>({} as ProductDeal);

    /**
     * Handle calculate discount time
     */
    useEffect(() => {
        if (dealInfo?.id) {
            const currentSeconds = moment(new Date()).unix() * 1000;
            const stopSeconds = Number(dealInfo.applied_stop_time) * 1000;
            const startSeconds = Number(dealInfo.applied_start_time) * 1000;
            const remainSeconds = Math.round((stopSeconds - currentSeconds) / 1000);
            dealInfo.total_time = Math.round(stopSeconds - startSeconds);
            setCount(remainSeconds > 864000 ? 864000 : remainSeconds);
        }
    }, [dealInfo]);

    useEffect(() => {
        if (!isNil(dealItem)) {
            // Get item price
            const item = Utilities.getCurrentPriceItem(dealItem);
            if (!isNil(item.price) && !isNil(item.normal_price)) {
                setPrice(item.price);
                setNormalPrice(item.normal_price);
            }

            // Get item deal
            const currentDeal = Utilities.getCurrentItemDeal(dealItem);
            if (!isNil(currentDeal) && currentDeal.id) {
                const orderdQuantity = Math.ceil(
                    currentDeal.max_quantity - currentDeal.total_available_quantity
                );
                const salePercent = Math.ceil((orderdQuantity / currentDeal.max_quantity) * 100);
                setPercent(salePercent || 0);
                setItemDeal(currentDeal);
            }

            // Load detail brand
            if (dealItem.attributes && dealItem.attributes?.length) {
                const brand = dealItem.attributes.find(
                    (i: any) => i.value && i.name.toLowerCase() === 'thương hiệu'
                );
                if (brand && brand?.value) {
                    dealItem.brand = brand.value.name;
                }
            }
        }
    }, [dealItem]);

    /**
     * Countdown
     * @hooks
     */
    useEffect(() => {
        let interval: any;
        if (count >= 0) {
            interval = setInterval(() => {
                setCount((c: any) => c - 1);
                setDate(Utilities.getCountDownTime(count));

                // Calculate time percent
                const totalTime = Number(dealInfo.total_time);
                const timePercent = Number(100 - 100 * (count * 1000) / totalTime);
                setPercent(Number(timePercent.toFixed(2)));
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [count]);

    return (
        <>
            <div className={className}>
                <div className='card'>
                    <div className='card--top'>
                        {/* <div className='product-is-new'
                            style={{ display: diffDays < 0 ? 'block' : 'none' }}
                        >
                            <img src='/media/images/ic-new.svg' alt='cocolux'/>
                        </div> */}
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
                            dealItem?.campaign &&
                            <div className='campaign-tag'>
                                <span>{dealItem?.campaign?.name || ''}</span>
                            </div>
                        }
                        <Link href={{ pathname: '/item-detail', query: { slug: dealItem.slug } }} as={`/${dealItem.slug}`}>
                            <a className='thumbnail'>
                                <Image
                                    alt={dealItem.name}
                                    title={dealItem.name}
                                    src={Utilities.resizeImage(300, dealItem.thumbnail_url)}
                                />
                                {
                                    itemDeal.image_layer
                                        ? (
                                            <div className='thumbnail__mask'>
                                                <img
                                                    alt={dealItem.name}
                                                    title={dealItem.name}
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
                                <p className='public-price'>
                                    {Utilities.currencyPipe(price)}
                                </p>
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
                                dealItem.brand
                                    ? dealItem.brand
                                    : 'Cocolux'
                            }
                        </p>
                        <h3 className='title'>
                            <Link href={{ pathname: '/item-detail', query: { slug: dealItem.slug } }} as={`/${dealItem.slug}`}>
                                <a>{dealItem.name}</a>
                            </Link>
                        </h3>
                        {
                            itemDeal.id && itemDeal.value
                                ? (
                                    <div className='deal-block-timer'>
                                        <div className='deal-timer__process'>
                                            <span className='deal-timer__fill' style={{ width: `${percent || 5}%` }}></span>
                                            <span className='deal-timer__countdown'>
                                                <span>
                                                    {
                                                        count > 0
                                                            ? `Còn ${date.d} ngày ${format(date.h)}:${format(date.m)}:${format(date.s)}`
                                                            : 'Đã kết thúc'
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        {/* <span className='deal-timer__percent'>
                                            {percent}
                                        </span> */}
                                    </div>
                                )
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
