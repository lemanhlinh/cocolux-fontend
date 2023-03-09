import moment from 'moment';

const ItemDeliveryTime = ({ deliveryTime }: any) => {

    return (
        <div className='product-delivery'>
            {
                deliveryTime.current_hours
                    ? (
                        <>
                            <img src='/media/images/ic-transpoter.svg' alt='cocolux' />
                            <span>
                                HN: Bạn muốn nhận hàng trước
                                <span> {new Date(deliveryTime.event_time).getHours()}h </span>
                                {
                                    deliveryTime.current_hours >= 18
                                        ? 'ngày mai. '
                                        : 'hôm nay. '
                                }
                                {
                                    deliveryTime.current_hours >= 18
                                        ? (
                                            <>
                                                Đặt hàng trước <span>24h</span> và chọn giao hàng
                                            </>
                                        )
                                        : (
                                            <>
                                                Đặt hàng trong <span>{moment(deliveryTime.expired_at).diff(moment(), 'minute')} </span> phút tới và chọn giao hàng
                                            </>
                                        )
                                }
                                <span> 2H </span>
                                ở bước thanh toán. Xem chi tiết
                            </span>
                        </>
                    )
                    : null
            }
        </div>
    );
};

export default ItemDeliveryTime;
