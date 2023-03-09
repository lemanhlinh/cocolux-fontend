import React, { useEffect, useState } from 'react';

// Service & Redux
import { Toastr, Utilities } from 'src/helpers/utilities';
import { VoucherAPI } from 'src/helpers/services';

// Components
import Modal from './BaseModal';
import moment from 'moment';

interface Props {
    optionId: string;
    onCallback: any;
}

export const CouponPublicModal: React.FC<Props> = ({ optionId, onCallback }) => {
    // Declaration State
    const [vouchers, setVouchers] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    /**
     * Get Vouchers
     */
    const onGetVouchers = () => {
        VoucherAPI.list({
            skip: 0,
            limit: 30,
            is_expired: true,
            is_visible: true,
            statuses: 'active',
            product_id: optionId
        }).then((response: any) => {
            if (response.code) {
                Toastr.error(response.message);
                return;
            }

            // success
            setLoading(false);
            setVouchers(response.data || []);
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    useEffect(() => {
        onGetVouchers();
    }, []);

    return (
        <Modal visible={onCallback}>
            <div className='modal-content modal-sm'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCallback(false)}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>Ưu đãi dành riêng cho bạn</h3>
                </div>
                <div className='modal-body modal-voucher beautify-scroll s-grey'>
                    {
                        loading
                            ? (
                                <span className='no-data'>Đang tải dữ liệu...</span>
                            )
                            : (
                                vouchers?.length > 0
                                    ? (
                                        vouchers.map((voucher: any = {}) => (
                                            <div
                                                className='voucher-item preview-mode'
                                                key={voucher.id}
                                            >
                                                <div className='voucher__logo'>
                                                    <img
                                                        src={
                                                            voucher.thumbnail_url
                                                                ? Utilities.resizeImage(200, voucher.thumbnail_url)
                                                                : '/media/images/ic-lazy-load.svg'
                                                        }
                                                        className={voucher.thumbnail_url ? 'logo-fill' : 'logo-fit'}
                                                        alt='cocolux'
                                                    />
                                                </div>
                                                <div className='voucher__info'>
                                                    <div className='info__title'>{voucher.content}</div>
                                                    <div className='info__detail'>
                                                        <span className='coupon-code'>
                                                            {voucher.code}
                                                        </span>
                                                        <span className='coupon-date'>
                                                            HSD: {moment.unix(voucher.applied_stop_time).format('MM/DD/YYYY HH:mm')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='no-data'>Chưa có ưu đãi nào.</span>
                                    )
                            )
                    }
                </div>
            </div >
        </Modal >
    );
};
