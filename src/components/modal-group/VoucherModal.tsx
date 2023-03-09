import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { includes, isEmpty, isNil } from 'lodash';
import moment from 'moment-timezone';

// Service & Redux
import { getCart } from 'src/stores/checkout';
import { addLoginForm } from 'src/stores/layout';
import { Toastr, Utilities } from 'src/helpers/utilities';
import { VoucherAPI, AccountAPI } from 'src/helpers/services';

// Components
import Modal from './BaseModal';

interface Props {
    onCallback: any;
    onSelected: any;
}

export const VoucherModal: React.FC<Props> = ({ onCallback, onSelected }) => {
    // Declaration State
    const [vouchers, setVouchers] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [userProfile, setUserProfile] = useState<any>({});
    const [couponCode, setCouponCode] = useState<string>('');

    // Declaration Redux
    const dispatch = useDispatch();
    const { cartInfo } = useSelector((state: any) => state.checkout);
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    /**
     * List messages
     * @returns
     */
    const onGetMessages = (voucher: any = {}) => {
        const { applied_sources, applied_for_days, applied_for_hours, applied_for_months } = voucher;
        const customerGroup = userProfile && userProfile?.group && userProfile?.group?.name;
        const userType = userProfile && userProfile?.type === 'individual' ? 'Cá nhân' : userProfile?.type;
        return {
            NOT_FOUND: `Voucher ${voucher.code} không tồn tại!`,
            INACTIVE: `Rất tiếc! Voucher ${voucher.code} đã hết hiệu lực`,
            MEMBER: `Rất tiếc! Bạn không có quyền sử dụng voucher ${voucher.code}`,
            OUT_OF_QUANTITY: `Rất tiếc! Voucher ${voucher.code} đã hết lượt sử dụng.`,
            STORE: `Rất tiếc! Voucher ${voucher.code} này không áp dụng cho hình thức mua online`,
            OUT_OF_STOCK: `Rất tiếc! Voucher ${voucher.code} chưa được phát hành số lượng sử dụng`,
            USER: `Rất tiếc! Voucher ${voucher.code} không áp dụng cho khách hàng ${userProfile?.name || ''}`,
            USER_TYPE: `Rất tiếc! Voucher ${voucher.code} không áp dụng cho loại khách ${userType || ''}`,
            OUT_SOURCE: `Voucher ${voucher.code} chỉ áp dụng cho nền tảng ${applied_sources?.join(', ') || ''}`,
            CATEGORY: `Rất tiếc! Một trong những sản phẩm bạn mua không nằm trong điều kiện nhóm hàng theo voucher.`,
            DATE_INVALID: `Rất tiếc! Voucher ${voucher.code} chỉ áp dụng trong các ngày: ${applied_for_days.join(', ')}`,
            MONTH_INVALID: `Rất tiếc! Voucher ${voucher.code} chỉ áp dụng trong các tháng: ${applied_for_months.join(', ')}`,
            HOUR_INVALID: `Rất tiếc! Voucher ${voucher.code} chỉ áp dụng trong các khung giờ: ${applied_for_hours.join(', ')}`,
            USER_GROUP: customerGroup
                ? `Rất tiếc! Voucher ${voucher.code} không áp dụng cho nhóm khách ${customerGroup || ''}`
                : `Rất tiếc! Bạn chưa thuộc nhóm khách nào để sử dụng voucher ${voucher.code}`,
            ORDER_VALUE: `Voucher ${voucher.code} chỉ áp dụng cho đơn hàng từ ${Utilities.currencyPipe(voucher.applied_order_value)}`,
            ITEM_INVALID: `Rất tiếc! Sản phẩm trong đơn hàng của bạn không nằm trong điều kiện áp dụng của voucher ${voucher?.code}`,
            EXPIRED: `Rất tiếc! Voucher ${voucher.code} đã kết thúc vào lúc: ${moment.unix(voucher.applied_stop_time).format('HH:mm DD/MM/YYYY')}`,
            NOT_RELEASE: `Rất tiếc! Voucher ${voucher.code} sẽ được bắt đầu vào lúc: ${moment.unix(voucher.applied_start_time).format('HH:mm DD/MM/YYYY')}`
        };
    };

    /**
     * Check Voucher Is Valid
     * @param {*} voucher
     */
    const onIsValid = async (voucher: any = {}) => {
        try {
            if (voucher) {
                const {
                    status,
                    applied_users,
                    applied_stores,
                    applied_sources,
                    applied_stop_time,
                    applied_start_time,
                    applied_for_days,
                    applied_for_hours,
                    applied_for_months,
                    applied_order_value,
                    applied_max_quantity,
                    applied_user_types,
                    applied_for_items,
                    applied_user_groups,
                    applied_available_quantity
                } = voucher;
                const messages = onGetMessages(voucher);
                const dateNow = moment(new Date()).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD HH:mm');
                const startDate = moment.unix(applied_start_time).format('YYYY/MM/DD HH:mm');
                const stopDate = moment.unix(applied_stop_time).format('YYYY/MM/DD HH:mm');
                const isBeforeStartDate = moment(dateNow).isBefore(startDate, 'second');
                const isBeforeStopDate = moment(dateNow).isBefore(stopDate, 'second');
                const currentDate = (moment(new Date()).tz('Asia/Ho_Chi_Minh').date()) as number;
                const currentHour = (moment(new Date()).tz('Asia/Ho_Chi_Minh').hour()) as number;
                const currentMonth = (moment(new Date()).tz('Asia/Ho_Chi_Minh').month()) as number;

                if (applied_stores?.length) {
                    // Áp dụng cho chi nhánh offline
                    return messages.STORE;
                }
                // Ngày hết hạn / phát hành voucher
                if (status !== 'active') return messages.INACTIVE;
                if (isBeforeStartDate) return messages.NOT_RELEASE;
                if (!isBeforeStopDate) return messages.EXPIRED;
                // SL phát hành voucher
                if (applied_max_quantity <= 0) return messages.OUT_OF_STOCK;
                if (applied_available_quantity <= 0) return messages.OUT_OF_QUANTITY;
                if (applied_for_days?.length && !applied_for_days.includes(currentDate)) {
                    // Áp dụng theo các ngày
                    return messages.DATE_INVALID;
                }
                if (applied_for_hours?.length && !applied_for_hours.includes(currentHour)) {
                    // Áp dụng theo các khung giờ
                    return messages.HOUR_INVALID;
                }
                if (applied_for_months?.length && !applied_for_months.includes(currentMonth + 1)) {
                    // Áp dụng theo các tháng
                    return messages.MONTH_INVALID;
                }
                if (applied_sources?.length && !applied_sources.includes('web')) {
                    return messages.OUT_SOURCE;
                }

                // Check cart
                if (!isNil(cartInfo)) {
                    const { products } = cartInfo;
                    const totalUnPaid = cartInfo.total_paid > 0
                        ? cartInfo.total_unpaid
                        : cartInfo.total_price;
                    if (applied_for_items?.length && products?.length) {
                        // Áp dụng cho đơn hàng chứa những sản phẩm trong điều kiện
                        const conditions: any = [];
                        applied_for_items.forEach((i: any) => {
                            const ids = i.split(':') as any[];
                            if (ids.length && ids[0]) {
                                conditions.push(ids[0]);
                            }
                        });
                        const itemValid = conditions.length && products.find(
                            (i: any) => includes(
                                conditions.map((c: any) => c), `${i.option_id}`
                            )
                        );
                        if (!itemValid) return messages.ITEM_INVALID;
                    }
                    if (applied_order_value > 0 && totalUnPaid < applied_order_value) {
                        // Giá trị đơn hàng tối thiểu
                        return messages.ORDER_VALUE;
                    }
                }

                // Check user
                if (!isNil(userProfile)) {
                    if (
                        applied_user_types?.length &&
                        !applied_user_types.includes(userProfile?.type)
                    ) {
                        // Áp dụng cho loại khách
                        return messages.USER_TYPE;
                    }
                    if (applied_users?.length) {
                        // Áp dụng cho KH
                        const conditions: any = [];
                        applied_users.forEach((i: any) => {
                            const ids = i.split(':') as any[];
                            if (ids.length && ids[2]) {
                                conditions.push(ids[2]);
                            }
                        });
                        if (conditions && !conditions.includes(`${userProfile?.id}`)) {
                            return messages.USER;
                        }
                    }
                    if (
                        applied_user_groups?.length &&
                        !applied_user_groups.includes(`${userProfile?.group?.id}`)
                    ) {
                        // Áp dụng cho nhóm khách
                        return messages.USER_GROUP;
                    }
                }
            }

            return null;
        } catch (error: any) {
            throw error;
        }
    };

    /**
     * Select Voucher
     * @param voucherId
     */
    const onSelectVoucher = async (voucherId: any) => {
        try {
            if (!cartInfo.products?.length) {
                alert('Đơn hàng của bạn chưa có sản phẩm nào để áp dụng voucher');
                return;
            }
            if (voucherId) {
                await VoucherAPI.detail(
                    voucherId
                ).then(async (response: any) => {
                    if (response.code) {
                        alert(response.message);
                        return null;
                    }
                    const { data } = response;
                    const status = await onIsValid(data);
                    if (status) return alert(status);

                    // Success
                    onSelected(data);
                });
            } else {
                alert('Xảy ra lỗi trong quá trình chọn voucher');
            }
        } catch (error: any) {
            throw Error(error);
        }
    };

    /**
     * Apply Voucher Code
     * @param voucherCode
     */
    const onApplyVoucher = async (voucherCode: string) => {
        try {
            const code = voucherCode.trim();
            if (!isEmpty(code)) {
                await VoucherAPI.detail(
                    code
                ).then(async (response: any) => {
                    if (response.code) {
                        alert('Mã khuyến mãi này không tồn tại. Vui lòng kiểm tra và điền mã khuyến mãi chính xác.');
                        return null;
                    }
                    const { data } = response;
                    const status = await onIsValid(data);
                    if (status) return alert(status);

                    // Success
                    onSelected(data);
                    setCouponCode('');
                });
            } else {
                alert('Vui lòng nhập mã khuyến mãi trước khi áp dụng.');
            }
        } catch (error: any) {
            throw Error(error);
        }
    };

    /**
     * Get User Profile
     */
    const onGetUserProfile = async () => {
        await AccountAPI.me()
            .then((respone: any) => {
                setUserProfile(
                    respone.data
                );
            }).catch((ex: any) => {
                throw Error(ex);
            });
    };

    /**
     * Get Vouchers
     */
    const onGetVouchers = () => {
        VoucherAPI.list({
            skip: 0,
            limit: 30,
            is_expired: true,
            is_visible: true,
            statuses: 'active'
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

    /**
     * Show Login Form
     * @private
     */
    const onShowLoginForm = () => {
        dispatch(addLoginForm(true, 'login'));
        onCallback(false);
    };

    useEffect(() => {
        onGetVouchers();
        dispatch(getCart());
        if (isUserLoggedIn) {
            onGetUserProfile();
        }
    }, []);

    return (
        <Modal visible={onCallback}>
            <div className='modal-content modal-sm'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCallback(false)}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>Mã giảm giá</h3>
                </div>
                <div className='modal-body modal-voucher'>
                    {
                        isUserLoggedIn
                            ? (
                                <div className='promotion-box'>
                                    <input
                                        type='text'
                                        name='voucher-code'
                                        maxLength={40}
                                        autoComplete='off'
                                        className='ccs-input'
                                        placeholder='Nhập mã giảm giá'
                                        onChange={($event: any) => setCouponCode($event.target.value)}
                                    />
                                    <button
                                        onClick={() => onApplyVoucher(couponCode)}
                                        className='btn btn-dark font-bold w-100'
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            )
                            : (
                                <div className='login-alert'>
                                    Vui lòng
                                    <span onClick={() => onShowLoginForm()}>đăng nhập</span>
                                    để sử dụng voucher.
                                </div>
                            )
                    }
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
                                                onClick={() => {
                                                    if (isUserLoggedIn) {
                                                        onSelectVoucher(voucher?.id);
                                                    } else {
                                                        alert('Vui lòng đăng nhập để sử dụng voucher');
                                                    }
                                                }}
                                                className='voucher-item'
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
                                                        <span className='coupon-action'>Áp dụng</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='no-data'>Chưa có voucher nào được phát hành.</span>
                                    )
                            )
                    }
                </div>
            </div >
        </Modal >
    );
};
