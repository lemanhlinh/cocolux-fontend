import React, { useEffect, useState } from 'react';
import { ProductDeal } from 'src/helpers/models';

interface Props {
    event: ProductDeal;
}
const ItemProgressEvent: React.FC<Props> = ({ event }) => {
    const [progressWidth, setProgressWidth] = useState<number>(0);

    useEffect(() => {
        if (event && event.value) {
            const orderdQuantity = Math.ceil(
                event.max_quantity - event.total_available_quantity
            );
            const salePercent = Math.ceil((orderdQuantity / event.max_quantity) * 100);
            setProgressWidth(salePercent > 100 ? 100 : salePercent);
        }
    }, []);

    return (
        <div className='sale-progress'>
            <div className='progress__fill'>
                <div style={{ width: `${progressWidth}%` }}></div>
                {/* <span>Vừa mở bán</span> */}
            </div>
            <span className='sale__duration'>
                {
                    event?.id
                        ? (
                            <span>{Math.ceil(progressWidth)}%</span>
                        )
                        : 'Hết hạn'
                }
            </span>
        </div>
    );
};

export default ItemProgressEvent;
