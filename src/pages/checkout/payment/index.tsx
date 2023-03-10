import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import moment from 'moment-timezone';
import { includes, isNil, pick } from 'lodash';

// Service & Redux
import { getCart } from 'src/stores/checkout';
import { Storage, Toastr, Utilities } from 'src/helpers/utilities';
import { AccountAPI, CartAPI, VoucherAPI } from 'src/helpers/services';

// Components
import PaymentAddress from './PaymentAddress';
import PaymentSelectCoupon from './PaymentSelectCoupon';

const Sources = {
    SYSTEM: 'system',
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    OTHER: 'other'
};

const PaymentPage = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const [reactPixel, setReactPixel] = useState<any>();
    const [confirmCart, setConfirmCart] = useState(false);
    const [checkPayment, setcheckPayment] = useState(false);
    const [defaultPayment, setDefaultPayment] = useState(0);
    const [couponPayments, setCouponPayment] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const { cartInfo, shippingMethods, paymentMethods, deliveryCodes } = useSelector((state: any) => state.checkout);

    /**
     * Load order detail
     * @param {*} private
     */
    useEffect(() => {
        const ReactPixel = require('react-facebook-pixel');
        ReactPixel.default.init('119758555309111');
        setReactPixel(ReactPixel);
        dispatch(getCart());
    }, []);

    /**
     * Trasnform data
     * @param {*} private
     */
    useEffect(() => {
        onLoadCart();
    }, [cartInfo]);

    /**
     * Load Cart
     */
    const onLoadCart = () => {
        try {
            if (cartInfo) {
                setIsLoading(true);
                const deliveries = cartInfo.deliveries && cartInfo.deliveries[0];
                if (shippingMethods && shippingMethods?.length) {
                    shippingMethods.map((item: any) => {
                        item.checked = deliveries
                            ? +deliveries.service_id === item.method
                            : false;
                        return item;
                    });
                }

                if (cartInfo.payments && cartInfo.payments?.length === 0) {
                    CartAPI.addPayment(
                        pick(paymentMethods[0], ['name', 'method', 'value', 'type'])
                    ).then((reponse) => {
                        if (reponse.code) {
                            Toastr.error(reponse.message);
                            return;
                        }
                        dispatch(getCart());
                    });
                }

                if (cartInfo.payments &&
                    cartInfo.payments?.length > 0) {
                    cartInfo.payments.map((v: any) => {
                        if (v.method && v.type) {
                            setcheckPayment(true);
                            setDefaultPayment(v.method);
                        }
                    });
                }

                // update ph?? ship khi add delivery tr?????c
                if (deliveries) {
                    const shippingPrice = calShipFee();
                    if (shippingPrice !== deliveries.total_shipping_fee) {
                        const operation = {
                            receiver_name: deliveries.receiver_name,
                            receiver_phone: deliveries.receiver_phone.toString(),
                            receiver_address: deliveries.receiver_address,
                            receiver_province: deliveries.receiver_province,
                            receiver_district: deliveries.receiver_district,
                            receiver_ward: deliveries.receiver_ward,
                            service_id: deliveries.service_id,
                            payment_by: 'NGUOINHAN',
                            service_name: deliveries.service_name,
                            total_shipping_fee: shippingPrice
                        };
                        CartAPI.addDelivery(
                            operation
                        ).then((respone) => {
                            if (respone.code) {
                                Toastr.error(respone.message);
                                return;
                            }
                            dispatch(getCart());
                        }).catch((error) => {
                            throw Error(error);
                        });
                    }
                }
                if (!cartInfo.source) {
                    CartAPI.update({
                        source:
                            Storage.get(Storage.SOURCE_LOGIN) ? Storage.get(Storage.SOURCE_LOGIN) : Sources.OTHER
                    }).then((reponse) => {
                        if (reponse.code) {
                            Toastr.error(reponse.message);
                            return;
                        }
                        dispatch(getCart());
                    });
                    ;
                }

            }
        } catch (ex: any) {
            throw Error(ex);
        } finally {
            if (
                !isNil(cartInfo) &&
                cartInfo?.id &&
                cartInfo?.payments?.length
            ) {
                setIsLoading(false);
            }
        }
    };

    /**
     * Calculate Shipping Fee
     * @returns
     */
    const calShipFee = () => {
        let shippingPrice = 0;
        const address = cartInfo.deliveries && cartInfo.deliveries[0];
        if (address) {
            const checkShippingFree = deliveryCodes.provinces.find((el: any) =>
                el.code === address.receiver_province.code &&
                el.name === address.receiver_province.name
            );
            let count = 0;
            cartInfo.products.forEach((el: any) => {
                if (el.price > 99000) {
                    count += 1;
                }
            });
            // check trong n????? th??nh
            if (checkShippingFree && count >= 2) {
                shippingPrice = 0;
            }
            if (checkShippingFree && count < 2) {
                shippingPrice = 15000;
            }
            // check ngo???i th??nh n????? th??nh
            if (!checkShippingFree && count >= 3) {
                shippingPrice = 0;
            }
            if (!checkShippingFree && count < 3) {
                shippingPrice = 20000;
            }
        }
        return shippingPrice;
    };

    /**
     * Change Payment Method
     * @param {*} method
     */
    const onChangePaymentMethod = (method: any = {}) => {
        CartAPI.addPayment(method)
            .then((reponse) => {
                if (reponse.code) {
                    Toastr.error(reponse.code);
                    return;
                }
                const payments = [method];
                setCouponPayment(payments as []);
                dispatch(getCart());
            });

    };

    /**
     * Set Default Payment Cash
     */
    const onSetDefaultPaymentCash = () => {
        const payments = [];
        payments.push(pick(
            paymentMethods[0],
            ['name', 'method', 'value', 'type']
        ));
        setCouponPayment(payments as []);
    };

    /**
     * Change Delivery Method
     * @param {*} method
     */
    const onChangeDeliveryMethod = (data: any = {}) => {
        const address = cartInfo.deliveries && cartInfo.deliveries[0];
        if (address) {
            const shippingPrice = calShipFee();
            const operation = {
                receiver_name: address.receiver_name,
                receiver_phone: address.receiver_phone.toString(),
                receiver_address: address.receiver_address,
                receiver_province: address.receiver_province,
                receiver_district: address.receiver_district,
                receiver_ward: address.receiver_ward,
                service_id: data.method.toString(),
                payment_by: 'NGUOINHAN',
                service_name: data.name,
                total_shipping_fee: shippingPrice
            };
            CartAPI.addDelivery(
                operation
            ).then((respone) => {
                if (respone.code) {
                    Toastr.error(respone.message);
                    return;
                }
                dispatch(getCart());
            }).catch((error) => {
                throw Error(error);
            });
            reactPixel.default.track('AddPaymentInfo', operation);
        }
    };

    /**
     * Load Item Price
     * @param _product
     */
    const fetchPrice = (_product: any, type = 'price') => {
        const item = Utilities.getCurrentPriceItem(_product);
        return type === 'price'
            ? item.price
            : item.normal_price;
    };

    /**
     * Load Item Deal
     * @param _product
     */
    const fetchItemDeal = (_product: any) => {
        const currentDeal = Utilities.getCurrentItemDeal(_product);
        return currentDeal && currentDeal.id && currentDeal.value
            ? true
            : false;
    };

    /**
     * List messages
     * @returns
     */
    const onGetMessages = (voucher: any, userProfile: any) => {
        const { applied_sources, applied_for_days, applied_for_hours, applied_for_months } = voucher;
        const customerGroup = userProfile && userProfile?.group && userProfile?.group?.name;
        const userType = userProfile && userProfile?.type === 'individual' ? 'C?? nh??n' : userProfile?.type;
        return {
            NOT_FOUND: `Voucher ${voucher.code} kh??ng t???n t???i!`,
            INACTIVE: `R???t ti???c! Voucher ${voucher.code} ???? h???t hi???u l???c`,
            MEMBER: `R???t ti???c! B???n kh??ng c?? quy???n s??? d???ng voucher ${voucher.code}`,
            OUT_OF_QUANTITY: `R???t ti???c! Voucher ${voucher.code} ???? h???t l?????t s??? d???ng.`,
            STORE: `R???t ti???c! Voucher ${voucher.code} n??y kh??ng ??p d???ng cho h??nh th???c mua online`,
            OUT_OF_STOCK: `R???t ti???c! Voucher ${voucher.code} ch??a ???????c ph??t h??nh s??? l?????ng s??? d???ng`,
            USER: `R???t ti???c! Voucher ${voucher.code} kh??ng ??p d???ng cho kh??ch h??ng ${userProfile?.name || ''}`,
            USER_TYPE: `R???t ti???c! Voucher ${voucher.code} kh??ng ??p d???ng cho lo???i kh??ch ${userType || ''}`,
            OUT_SOURCE: `Voucher ${voucher.code} ch??? ??p d???ng cho n???n t???ng ${applied_sources?.join(', ') || ''}`,
            CATEGORY: `R???t ti???c! M???t trong nh???ng s???n ph???m b???n mua kh??ng n???m trong ??i???u ki???n nh??m h??ng theo voucher.`,
            DATE_INVALID: `R???t ti???c! Voucher ${voucher.code} ch??? ??p d???ng trong c??c ng??y: ${applied_for_days.join(', ')}`,
            MONTH_INVALID: `R???t ti???c! Voucher ${voucher.code} ch??? ??p d???ng trong c??c th??ng: ${applied_for_months.join(', ')}`,
            HOUR_INVALID: `R???t ti???c! Voucher ${voucher.code} ch??? ??p d???ng trong c??c khung gi???: ${applied_for_hours.join(', ')}`,
            USER_GROUP: customerGroup
                ? `R???t ti???c! Voucher ${voucher.code} kh??ng ??p d???ng cho nh??m kh??ch ${customerGroup || ''}`
                : `R???t ti???c! B???n ch??a thu???c nh??m kh??ch n??o ????? s??? d???ng voucher ${voucher.code}`,
            ORDER_VALUE: `Voucher ${voucher.code} ch??? ??p d???ng cho ????n h??ng t??? ${Utilities.currencyPipe(voucher.applied_order_value)}`,
            ITEM_INVALID: `R???t ti???c! S???n ph???m trong ????n h??ng c???a b???n kh??ng n???m trong ??i???u ki???n ??p d???ng c???a voucher ${voucher?.code}`,
            EXPIRED: `R???t ti???c! Voucher ${voucher.code} ???? k???t th??c v??o l??c: ${moment.unix(voucher.applied_stop_time).format('HH:mm DD/MM/YYYY')}`,
            NOT_RELEASE: `R???t ti???c! Voucher ${voucher.code} s??? ???????c b???t ?????u v??o l??c: ${moment.unix(voucher.applied_start_time).format('HH:mm DD/MM/YYYY')}`
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
                const userProfile = await AccountAPI.me()
                    .then((res: any) => !res.code
                        ? res.data
                        : {}
                    );
                const messages = onGetMessages(voucher, userProfile);
                const dateNow = moment(new Date()).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD HH:mm');
                const startDate = moment.unix(applied_start_time).format('YYYY/MM/DD HH:mm');
                const stopDate = moment.unix(applied_stop_time).format('YYYY/MM/DD HH:mm');
                const isBeforeStartDate = moment(dateNow).isBefore(startDate, 'second');
                const isBeforeStopDate = moment(dateNow).isBefore(stopDate, 'second');
                const currentDate = (moment(new Date()).tz('Asia/Ho_Chi_Minh').date()) as number;
                const currentHour = (moment(new Date()).tz('Asia/Ho_Chi_Minh').hour()) as number;
                const currentMonth = (moment(new Date()).tz('Asia/Ho_Chi_Minh').month()) as number;

                if (applied_stores?.length) {
                    // ??p d???ng cho chi nh??nh offline
                    return messages.STORE;
                }
                // Ng??y h???t h???n / ph??t h??nh voucher
                if (status !== 'active') return messages.INACTIVE;
                if (isBeforeStartDate) return messages.NOT_RELEASE;
                if (!isBeforeStopDate) return messages.EXPIRED;
                // SL ph??t h??nh voucher
                if (applied_max_quantity <= 0) return messages.OUT_OF_STOCK;
                if (applied_available_quantity <= 0) return messages.OUT_OF_QUANTITY;
                if (applied_for_days?.length && !applied_for_days.includes(currentDate)) {
                    // ??p d???ng theo c??c ng??y
                    return messages.DATE_INVALID;
                }
                if (applied_for_hours?.length && !applied_for_hours.includes(currentHour)) {
                    // ??p d???ng theo c??c khung gi???
                    return messages.HOUR_INVALID;
                }
                if (applied_for_months?.length && !applied_for_months.includes(currentMonth + 1)) {
                    // ??p d???ng theo c??c th??ng
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
                        // ??p d???ng cho ????n h??ng ch???a nh???ng s???n ph???m trong ??i???u ki???n
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
                        // Gi?? tr??? ????n h??ng t???i thi???u
                        return messages.ORDER_VALUE;
                    }
                }

                // Check user
                if (!isNil(userProfile)) {
                    if (
                        applied_user_types?.length &&
                        !applied_user_types.includes(userProfile?.type)
                    ) {
                        // ??p d???ng cho lo???i kh??ch
                        return messages.USER_TYPE;
                    }
                    if (applied_users?.length) {
                        // ??p d???ng cho KH
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
                        // ??p d???ng cho nh??m kh??ch
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
     * Check Voucher
     * @param voucherId
     */
    const onCheckVoucher = async (voucherId: any) => {
        if (voucherId) {
            const response = await VoucherAPI.detail(
                voucherId
            );
            if (response.code) {
                Toastr.error(response.message);
                return null;
            }
            const { data } = response;
            const status = await onIsValid(data);
            return status;
        }
        return null;
    };

    /**
     * Confirm
     * @param {*} order
     */
    const onConfirmCart = async () => {
        setConfirmCart(true);
        if (checkPayment) {
            const operation = {
                ...cartInfo,
                source: 'web',
                payments: couponPayments.length
                    ? couponPayments
                    : cartInfo.payments
            };
            if (operation.payments?.length) {
                // Check valid voucher
                const method = operation.payments.find(
                    (i: any) => i.method === 8
                ) as any;
                if (method && method?.voucher) {
                    const status = await onCheckVoucher(
                        method.voucher?.id
                    );
                    if (status) {
                        setConfirmCart(false);
                        return alert(status);
                    }
                }
            }

            // submit request
            await CartAPI.confirm(
                operation
            ).then((response: any) => {
                if (response.code) {
                    Toastr.error(response.message);
                    setConfirmCart(false);
                    return;
                }

                // Handler Success
                dispatch(getCart());
                const order = response.data;
                Toastr.success('?????t H??ng Th??nh C??ng');
                reactPixel.default.track('Purchase', { value: order.total_price, currency: 'VND' });
                Router.push(`/checkout/payment/${order.id}`);
            }).catch((error: any) => {
                throw error;
            }).finally(() => {
                setConfirmCart(false);
                setCouponPayment([]);
            });
        } else {
            Toastr.error('B???n c???n ch???n ph????ng th???c thanh to??n');
            setConfirmCart(false);
            setCouponPayment([]);
        }

    };

    return (
        <div className='ccs-order-process-wrap'>
            <Head>
                <title>Th??ng tin thanh to??n</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Cocolux - Chu???i c???a h??ng m??? ph???m ch??nh h??ng ch??m s??c da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - H??? th???ng m??? ph???m h??ng ?????u Vi???t Nam' />
            </Head>
            <div className='ccs-order-content'>
                <div className='ccs-order-left col-md-8'>
                    {/* begin:: address */}
                    <PaymentAddress />
                    {/* end:: address */}

                    {/* begin:: order method */}
                    <div className='ccs-order-deliver'>
                        <div className='order-deliver--header'>V???n chuy???n & Thanh to??n</div>
                        {
                            cartInfo &&
                            cartInfo.deliveries &&
                            cartInfo.deliveries?.length > 0 &&
                            <div className='order-deliver--option'>
                                <div className='deliver--option_title'>H??nh th???c v???n chuy???n</div>
                                {
                                    shippingMethods.map((delivery: any = {}) => {
                                        return (
                                            !delivery.disabled && <div className='deliver--option_item' key={delivery.method}>
                                                <div className='ccs-radio'>
                                                    <label>
                                                        <input
                                                            type='radio'
                                                            name={'delivery_method'}
                                                            defaultValue={delivery.method}
                                                            defaultChecked={delivery.method === +cartInfo.deliveries[0].service_id}
                                                            id={`delivery_method_${delivery.method}`}
                                                            onChange={() => onChangeDeliveryMethod(delivery)}
                                                        />
                                                        {delivery.label}
                                                        <span></span>
                                                    </label>
                                                </div>
                                                {/*
                                            <span className="option_item__warning">
                                                ????n h??ng kh??ng ????? ??i???u ki???n giao nhanh 2 gi???<a> (Xem th??m)</a>
                                            </span>
                                            */}
                                            </div>
                                        );
                                    })
                                }
                            </div>}

                        <div className='order-deliver--option'>
                            <div className='deliver--option_title'>H??nh th???c thanh to??n</div>
                            {
                                !isLoading &&
                                paymentMethods.map((payment: any = {}) => {
                                    return (
                                        <div className='deliver--option_item' key={payment.method}>
                                            <div className='ccs-radio'>
                                                <label>
                                                    <input
                                                        type='radio'
                                                        name='payment_method'
                                                        defaultValue={payment.method}
                                                        defaultChecked={defaultPayment ? defaultPayment === payment.method : payment.checked}
                                                        onChange={() => onChangePaymentMethod(pick(payment, ['name', 'method', 'value', 'type']))}
                                                    />
                                                    {payment.label}
                                                    <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    {/* begin:: order method */}
                </div>

                <div className='ccs-order-detail col-md-4'>
                    <div className='ccs-order-header'>
                        <span>Danh s??ch s???n ph???m</span>
                    </div>
                    <div className='ccs-order-list-product'>
                        {
                            cartInfo.products
                                ? (
                                    cartInfo.products.map((product: any = {}) => (
                                        <div key={product.option_id} className='ccs-cart-item-order'>
                                            <div className='ccs-cart-item-order--thumb'>
                                                <img
                                                    alt={product.name}
                                                    title={product.name}
                                                    src={Utilities.resizeImage(200, product.thumbnail_url)}
                                                />
                                            </div>
                                            <div className='ccs-cart-item-order--product'>
                                                <div className='product-info'>
                                                    <span className='product-info--brand'>{product.brand || 'Coco'}</span>
                                                    <div className='product-info--name' title=''>{product.name}</div>
                                                    {
                                                        product?.campaign?.id
                                                        && <span className='product-info--campaign'>{product?.campaign?.name}</span>
                                                    }
                                                    <span className='product-info--quantity'>SL: <b>{product.total_quantity}</b></span>
                                                </div>
                                                <div className='product-price'>
                                                    <p className='product-price--sale'>
                                                        {Utilities.currencyPipe(
                                                            !product?.campaign && fetchItemDeal(product)
                                                                ? fetchPrice(product)
                                                                : product.price
                                                        )}
                                                    </p>
                                                    <p
                                                        className='product-price--original'
                                                        style={{ display: fetchItemDeal(product) ? '' : 'none' }}
                                                    >
                                                        {Utilities.currencyPipe(
                                                            fetchPrice(product, 'normal_price')
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                                : null
                        }
                    </div>
                    <div className='ccs-order-form'>
                        <div className='ccs-order-label-group'>
                            <span>T???m t??nh:</span>
                            <p>{Utilities.currencyPipe(cartInfo.total_price_before_discount)}</p>
                        </div>
                        <div className='ccs-order-promotion'>
                            <PaymentSelectCoupon
                                onInit={(value: boolean) => {
                                    if (value) {
                                        onSetDefaultPaymentCash();
                                    }
                                }}
                                onCallback={(data: any) => {
                                    if (data) {
                                        setCouponPayment(data);
                                    } else {
                                        onSetDefaultPaymentCash();
                                    }
                                }}
                            />
                        </div>
                        {
                            cartInfo.discounts
                                ? (
                                    <div className='ccs-order-label-group label-discount'>
                                        <span>M?? gi???m gi??:</span>
                                        <div className='item' >
                                            {
                                                cartInfo.discounts?.length
                                                    ? (
                                                        cartInfo.discounts.map((d: any, index: number) => (
                                                            <span key={index}>{d?.discount_id}</span>
                                                        ))
                                                    ) : null
                                            }
                                        </div>
                                    </div>

                                ) : null
                        }
                        {
                            checkPayment &&
                                cartInfo.payments
                                ? cartInfo.payments.map((payment: any) => {
                                    return (
                                        <section key={payment.method}>
                                            {
                                                payment.method === 8 &&
                                                <div className='ccs-order-label-group'>
                                                    <span>Gi???m gi??:</span>
                                                    <p>- {Utilities.currencyPipe(payment.value)}</p>
                                                </div>
                                            }
                                            {

                                                payment.method === 9 &&
                                                <div className='ccs-order-label-group'>
                                                    <span>??i???m:</span>
                                                    <p>- {Utilities.currencyPipe(payment.value)}</p>
                                                </div>

                                            }
                                        </section>
                                    );
                                })
                                : null
                        }
                        <div className='ccs-order-label-group'>
                            <span>Ph?? v???n chuy???n:</span>
                            <p>{Utilities.currencyPipe(cartInfo.total_shipping_fee)}</p>
                        </div>
                        <div className='ccs-order-border'></div>
                        <div className='ccs-order-label-total'>
                            <span>T???NG C???NG</span>
                            {
                                cartInfo.total_paid
                                    ? <p>{Utilities.currencyPipe(cartInfo.total_unpaid)}</p>
                                    : <p>{Utilities.currencyPipe(cartInfo.total_price)}</p>
                            }
                        </div>
                        <div className='ccs-order-label-coin'>
                            <span>B???n s??? nh???n ???????c</span>
                            <p>{cartInfo.total_point} COCO COIN</p>
                        </div>
                        <button
                            disabled={confirmCart}
                            onClick={() => !isLoading && onConfirmCart()}
                            className='btn btn-lg btn-danger w-100 font-bold ccs-btn-order'
                        >
                            ?????T H??NG
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PaymentPage;
