import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { pick } from 'lodash';

// Modules
import { CartAPI } from 'src/helpers/services';
import { Toastr, Utilities } from 'src/helpers/utilities';
import { getCart, replaceItem } from 'src/stores/checkout';
import { VoucherModal } from 'src/components/modal-group';

interface Props {
    onInit?: any;
    onCallback?: any;
}

const PaymentSelectCoupon: React.FC<Props> = ({ onInit, onCallback }) => {
    // Declaration State
    const [voucher, setVoucher] = useState<any>({});
    const [isFirstLoad, setFirstLoad] = useState<Boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // Declaration
    const dispatch = useDispatch();
    const { cartInfo } = useSelector((state: any) => state.checkout);

    useEffect(() => {
        if (
            cartInfo &&
            isFirstLoad &&
            cartInfo.payments &&
            cartInfo.payments.length > 0
        ) {
            const voucherMethod = cartInfo.payments.find(
                (v: any) => v.method === 8
            );
            const bankMethod = cartInfo.payments.find(
                (v: any) => v.method === 2
            );
            if (voucherMethod) {
                clearVoucher();
            }
            if (!bankMethod) {
                onInit(true);
            }
        }
    }, [cartInfo]);

    /**
     * Clear vourcher
     */
    const clearVoucher = () => {
        CartAPI.removePayment(
            8
        ).then((response: any) => {
            if (response.code) {
                Toastr.error(response.message);
                return;
            }
            setVoucher({});
            onCallback(null);
            setFirstLoad(false);
            dispatch(getCart());
        });
    };

    /**
     * Get Vocuher Value
     * @param {*} voucher
     */
    const onGetValue = (voucher: any = {}) => {
        try {
            let totalValue = 0;
            const { total_price_before_discount } = cartInfo;
            const totalPrice = Number(total_price_before_discount);
            if (voucher.discount_type === 1) {
                const totalAfterDiscount = Math.ceil(
                    totalPrice * (100 - voucher.discount_value) / 100
                );
                totalValue = Math.ceil(
                    totalPrice - totalAfterDiscount
                );
            }
            if (voucher.discount_type === 2) {
                totalValue = Math.ceil(
                    voucher.discount_value
                );
            }
            if (
                voucher.max_discount_value > 0 &&
                totalValue > voucher.max_discount_value
            ) {
                totalValue = Math.ceil(
                    voucher.max_discount_value
                );
            }
            return totalValue;
        } catch (error: any) {
            throw Error(error);
        }
    };

    /**
     * Add Voucher
     * @param data
     */
    const onAddVoucher = async (data: any) => {
        try {
            if (data && data.id) {
                if (data.id === 2) {
                    const { products } = cartInfo;
                    const items = products.map((item: any) => {
                        if (
                            !item.discount ||
                            item.discount.id !== 2
                        ) {
                            if (item.brand === 'OBAGI') {
                                item.normal_price = Math.ceil(item.price);
                                item.price -= Math.ceil((item.price * data.discount_value) / 100);
                                item.discount = { id: data.id, name: data.name, rate: data.discount_value, value: item.normal_price - item.price };
                            }
                            if (item.discount) {
                                item.price = Math.ceil(
                                    item.normal_price - item.discount.value
                                );
                            }
                        }
                        item.total_price = Math.ceil(
                            item.total_quantity * item.price
                        );
                        item.total_price_before_discount = Math.ceil(
                            item.total_quantity * item.normal_price
                        );
                        item.total_discount_value = Math.ceil(
                            item.total_price_before_discount - item.total_price
                        );
                        return item;
                    });
                    dispatch(
                        replaceItem(
                            items
                        )
                    );
                    setFirstLoad(false);
                } else {
                    const params = [
                        'id',
                        'code',
                        'name',
                        'discount_type',
                        'discount_value'
                    ];
                    const operation = {
                        type: 1,
                        method: 8,
                        note: data.name,
                        value: onGetValue(data),
                        voucher: pick(data, params)
                    };
                    await CartAPI.addPayment(
                        operation
                    ).then((reponse) => {
                        if (reponse.code) {
                            Toastr.error(reponse.message);
                            return;
                        }

                        // success
                        onCallback([operation]);
                        setVoucher(operation);
                        setFirstLoad(false);
                        dispatch(getCart());
                        Toastr.success('Áp dụng mã voucher thành công');
                    });
                }
            }
        } catch (error: any) {
            throw Error(error);
        }
    };

    return (
        <>
            <div className='form'>
                <div className='form-group'>
                    <div className='form-input'>
                        <div className='promotion-box'>
                            <div
                                className='promotion__info'
                                style={{ cursor: !voucher?.method ? 'pointer' : 'default' }}
                                onClick={() => !voucher?.method && setModalVisible(true)}
                            >
                                {
                                    voucher?.method
                                        ? (
                                            <div className='hightlight__code'>
                                                <span>{voucher.note}</span>
                                                <span> ({Utilities.currencyPipe(voucher?.value)})</span>
                                            </div>
                                        )
                                        : (
                                            <span className='placeholder'>
                                                Chọn mã giảm giá
                                            </span>
                                        )
                                }
                            </div>
                            {
                                !voucher?.method
                                    ? (
                                        <button
                                            className='btn btn-danger font-bold w-100'
                                            onClick={() => setModalVisible(true)}
                                        >
                                            Chọn mã
                                        </button>
                                    )
                                    : (
                                        <button
                                            className='btn btn-danger font-bold w-100'
                                            onClick={() => clearVoucher()}
                                        >
                                            Xóa
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* VoucherModal */}
            {
                modalVisible &&
                <VoucherModal
                    onCallback={() => setModalVisible(false)}
                    onSelected={(data: any) => {
                        if (data && data?.id) {
                            onAddVoucher(data);
                            setModalVisible(false);
                        }
                    }}
                />
            }
            {/* VoucherModal */}
        </>
    );
};

export default PaymentSelectCoupon;
