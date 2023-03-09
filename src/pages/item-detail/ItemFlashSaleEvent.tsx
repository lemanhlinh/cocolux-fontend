import React, { useEffect, useState } from 'react';
import moment from 'moment';

// Helpers
import { Utilities } from 'src/helpers/utilities';

// Service
import { PromotionAPI } from 'src/helpers/services';

interface Props {
    eventId: number;
}
const ItemFlashSaleEvent: React.FC<Props> = ({ eventId }) => {
    // Declaration State
    const [count, setCount] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<Boolean>(true);
    const [date, setDate] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const format = (value: number) => value < 10 ? `0${value}` : value;

    /**
     * Load Event Sale
     */
    const loadEventSale = async () => {
        await PromotionAPI.detailPromotion(
            eventId
        ).then((response: any) => {
            if (response.code) return;

            // Handle success
            const { applied_stop_time } = response.data;
            if (applied_stop_time) {
                const stopSeconds = Number(applied_stop_time);
                const currentSeconds = moment(new Date()).unix() * 1000;
                const seconds = Math.round((stopSeconds * 1000 - currentSeconds) / 1000);
                setCount(seconds > 864000 ? 864000 : seconds);
            }
        }).catch((err) => {
            throw Error(err);
        }).finally(() => {
            setFirstLoad(false);
        });
    };

    useEffect(() => {
        if (isFirstLoad) {
            loadEventSale();
        }

        // Countdown
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
        count > 0
            ? (
                <div className='item-sale-box'>
                    <span className='item-sale__title'>
                        <img src='/media/images/hot_icon.svg' alt='Flash Deal' />
                        FLASH SALE
                    </span>
                    <div className='item-sale__countdown'>
                        <span className='item-sale__title'>KẾT THÚC TRONG</span>
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
            ) : null
    );
};

export default ItemFlashSaleEvent;
