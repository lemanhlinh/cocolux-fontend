import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import $ from 'jquery';

// Modules
import { VoucherAPI } from 'src/helpers/services';
import { Utilities } from 'src/helpers/utilities';

// Components
import { CouponPublicModal } from 'src/components/modal-group';

interface Props {
    optionId: string;
}

const ItemListCoupon: React.FC<Props> = ({ optionId }) => {
    const appNavigator = (navigator?.userAgent) as any;
    const [coupons, setCoupon] = useState<[]>([]);
    const [isShowBtn, setShowBtn] = useState<Boolean>(false);
    const [isShowModal, setShowModal] = useState<Boolean>(false);
    const isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(appNavigator);

    useEffect(() => {
        async function fetchListCoupon() {
            await VoucherAPI.list({
                skip: 0,
                limit: 10,
                is_expired: true,
                is_visible: true,
                statuses: 'active',
                product_id: optionId
            }).then((respone: any) => {
                if (respone.code) return;
                setCoupon(respone.data || []);
                if (!isNil($('#coupon__list'))) {
                    setShowBtn(false);
                    const width = Number($('#coupon__list').width());
                    if (isMobile) {
                        setShowBtn(true);
                    }
                    if (!isMobile && width > 489) {
                        setShowBtn(true);
                    }
                }
            }).catch((error) => {
                throw Error(error);
            });
        }

        fetchListCoupon();
    }, [optionId]);

    return (
        coupons.length
            ? (
                <div className={`coupon-collection ${isMobile ? 'mobile' : 'desktop'}`}>
                    <span
                        className='coupon__title'
                        title='Nhấn để xem thêm hàng ngàn ưu đãi'
                        onClick={() => setShowModal(true)}
                    >
                        Mã giảm giá
                    </span>
                    <div className='coupon__box'>
                        <div id='coupon__list' className='coupon__list'>
                            {
                                coupons.slice(0, isMobile ? 2 : 5).map((el: any, index: number) => (
                                    <div
                                        title='Nhấn để xem chi tiết ưu đãi'
                                        onClick={() => setShowModal(true)}
                                        className='coupon__item'
                                        key={index}
                                    >
                                        <span className='coupon__discount'>
                                            GIẢM
                                            {
                                                el.discount_type === 1
                                                    ? ` ${el.discount_value}%`
                                                    : ` ${Utilities.currencyPipe(el.discount_value)}`
                                            }
                                        </span>
                                    </div>
                                ))
                            }
                            <div
                                className='mask__list'
                                onClick={() => setShowModal(true)}
                                title='Nhấn để xem chi tiết ưu đãi'
                                style={{ display: !isMobile && isShowBtn ? '' : 'none' }}
                            />
                        </div>
                        <span
                            className='btn-seeAll'
                            onClick={() => setShowModal(true)}
                            title='Nhấn để xem tất cả ưu đãi'
                            style={{ display: isShowBtn ? '' : 'none' }}
                        >
                            <img src='/media/icons/ic-next.svg' alt='cocolux' />
                        </span>
                    </div>
                    {
                        isShowModal &&
                        <CouponPublicModal
                            optionId={optionId}
                            onCallback={() => setShowModal(false)}
                        />
                    }
                </div>
            )
            : null
    );
};

export default ItemListCoupon;
