import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Modules
import { Utilities } from 'src/helpers/utilities';
import { PromotionAPI } from 'src/helpers/services';

// Components
import { Carousel } from 'src/components/base-group';
import { SaleItem } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';

const HomeListSaleItem = () => {
    const [count, setCount] = useState(0);
    const [items, setListItems] = useState<[]>([]);
    const [flashSale, setFlashSale] = useState<any>({});
    const [loading, setLoading] = useState<Boolean>(true);
    const [date, setDate] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const format = (value: number) => value < 10 ? `0${value}` : value;

    /**
     * Get Flash Sale
     */
    const onGetFlashSale = async () => {
        const response = await PromotionAPI.listPromotion({
            skip: 0,
            limit: 1,
            type: 'flash_deal',
            statuses: 'starting'
        });
        if (response.code) {
            return null;
        }
        return !response.code
            ? response.data[0]
            : null;
    };

    /**
     * Get List Item Sale
     */
    const fetchListItems = async () => {
        const deal = await onGetFlashSale();
        if (deal && deal.id) {
            const stopSeconds = Number(deal.applied_stop_time);
            const currentSeconds = moment(new Date()).unix() * 1000;
            const seconds = Math.round((stopSeconds * 1000 - currentSeconds) / 1000);
            setCount(seconds);
            await PromotionAPI.listItemPromotion({
                skip: 0,
                limit: 10,
                flash_deal_id: deal.id,
                sort_by: 'flash_deal_position'
            }).then((res: any) => {
                if (res.code) return;
                setFlashSale(deal);
                setListItems(res.data);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListItems();
    }, []);

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
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [count]);

    return (
        <section className='bg-white'>
            {
                loading
                    ? (
                        <div className='lazy-warpper'>
                            <LazyLoadProduct />
                        </div>
                    )
                    : (
                        items.length
                            ? (
                                <section className='section'>
                                    <div className='section--header'>
                                        <img src='/media/images/hot_icon.svg' alt='Flash Deal' />
                                        <h2 className='section-title flash-sale-title'>
                                            <Link href='/flash-sale'>
                                                <a className='color-secondary'>
                                                    Flash Deal
                                                </a>
                                            </Link>
                                            <div className='flash-block-timer'>
                                                <div className='timer__seperator'></div>
                                                <div className='timer__process'>
                                                    <span className='timer__process__title'>
                                                        KẾT THÚC TRONG
                                                    </span>
                                                    {
                                                        date.d > 0
                                                            ? (
                                                                <>
                                                                    <div>
                                                                        <span>{date.d}</span>
                                                                    </div>
                                                                    <span className='timer__dot'>:</span>
                                                                </>
                                                            ) : null
                                                    }
                                                    <div>
                                                        <span>{format(date.h)}</span>
                                                    </div>
                                                    <span className='timer__dot'>:</span>
                                                    <div>
                                                        <span>{format(date.m)}</span>
                                                    </div>
                                                    <span className='timer__dot'>:</span>
                                                    <div>
                                                        <span>{format(date.s)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </h2>
                                        <Link href='/flash-sale'>
                                            <a className='show-more'>
                                                Xem Tất Cả
                                            </a>
                                        </Link>
                                    </div>
                                    <div className='section--body p-5'>
                                        {
                                            items.length >= 5
                                                ? (
                                                    <Carousel type={1}>
                                                        {
                                                            items.map((item, index) => (
                                                                <SaleItem
                                                                    key={index}
                                                                    dealItem={item}
                                                                    dealInfo={flashSale}
                                                                    className={'col-6 col-md-4 col-1over5'}
                                                                />
                                                            ))
                                                        }
                                                    </Carousel>
                                                )
                                                : (
                                                    <div className='row'>
                                                        {
                                                            items.map((item, index) => (
                                                                <SaleItem
                                                                    key={index}
                                                                    dealItem={item}
                                                                    dealInfo={flashSale}
                                                                    className={'col-6 col-md-4 col-1over5'}
                                                                />
                                                            ))
                                                        }
                                                    </div>
                                                )
                                        }
                                    </div>
                                </section>
                            )
                            : null
                    )
            }
        </section>
    );
};

export default HomeListSaleItem;
