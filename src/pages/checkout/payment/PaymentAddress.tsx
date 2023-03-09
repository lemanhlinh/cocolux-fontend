import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { Storage, Toastr } from 'src/helpers/utilities';
import { AccountAPI, CartAPI, LocationAPI } from 'src/helpers/services';
import { getCart } from 'src/stores/checkout';

// Components
import PaymentSocialLogin from './PaymentSocialLogin';
import { addUserAddressdForm } from 'src/stores/layout';
import { useDebounce } from 'src/helpers/hooks';

const PaymentAddress = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const [addDelivery, setAddDelivery] = useState(true);
    const [firstLoad, setfirstLoad] = useState(true);
    const [wards, setWard] = useState<[]>([]);
    const [districts, setDistrict] = useState<[]>([]);
    const [provinces, setProvince] = useState<[]>([]);
    const [listAddress, setListAddress] = useState<[]>([]);
    const [tabAddress, setTabAddress] = useState<string>('view');
    const [address, setAddress] = useState<any>({});
    const [provinceSelect, setProvinceSelect] = useState<any>({});
    const [districtSelect, setDistrictSelect] = useState<any>({});
    const [wardSelect, setWardSelect] = useState<any>({});
    const [reactPixel, setReactPixel] = useState<any>();
    const [note, setNote] = useState('');
    const debouncedSetNote = useDebounce(note, 300);
    // Delcation selector
    const { cartInfo, shippingMethods, deliveryCodes } = useSelector((state: any) => state.checkout);
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    const onChangeShippingMethod = (data: any) => {
        CartAPI.addDelivery(
            data
        ).then((respone) => {
            if (respone.code) {
                Toastr.error(respone.message);
                return;
            }
            dispatch(getCart());
        }).catch((error) => {
            throw Error(error);
        });
    };
    /**
     * set Address
     */
    const onSetAddress = () => {
        if (cartInfo && cartInfo.deliveries && cartInfo.deliveries[0]) {
            const deliveries = cartInfo.deliveries[0];
            setAddress({
                name: deliveries.receiver_name,
                phone: deliveries.receiver_phone,
                address: deliveries.receiver_address,
                province: deliveries.receiver_province,
                district: deliveries.receiver_district,
                ward: deliveries.receiver_ward
            });
            setProvinceSelect(deliveries.receiver_province);
            setDistrictSelect(deliveries.receiver_district);
            setWardSelect(deliveries.receiver_ward);

        }
    };

    /**
     * Fetch Address
     */
    const fetchAddress = async () => {
        const data = Storage.get(Storage.USER);
        const user = JSON.parse(data);
        if (!isEmpty(user)) {
            await AccountAPI.listAddress({
                skip: 0,
                limit: 100,
                user_id: user.id
            }).then((response: any) => {
                if (response.code) return;
                setListAddress(response.data);
            }).catch((error) => {
                throw Error(error);
            });
        }
    };

    /**
     * Fetch Provinces
     */
    const fetchProvinces = async () => {
        await LocationAPI.listProvinces({
            skip: 0,
            limit: 100,
            group: 'province'
        }).then((res: any) => {
            setProvince(res.data ? res.data : []);
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    /**
    * On change province
    * @param provinceId
    */
    const onChangeProvince = async (provinceId: number) => {
        setDistrictSelect({});
        setProvinceSelect({});
        setWardSelect({});
        if (provinceId) {
            await LocationAPI.listDistricts({
                skip: 0,
                limit: 100,
                province_code: provinceId
            }).then((res: any) => {
                setWard([]);
                setDistrict(res.data ? res.data : []);
            }).catch((error: any) => {
                throw Error(error);
            });
        }
    };

    /**
   * On change district
   * @param districtId
   */
    const onChangeDistrict = async (districtId: number) => {
        if (districtId) {
            await LocationAPI.listWard({
                skip: 0,
                limit: 100,
                district_code: districtId
            }).then((res: any) => {
                setWard(res.data ? res.data : []);
            }).catch((error: any) => {
                throw Error(error);
            });
        }
    };

    /**
     * Change Address
     * @param {*} address
     */
    const onChangeAddress = (address: any = {}) => {
        // let currentShip = 1;
        let shippingPrice = 0;
        const checkShippingFree = deliveryCodes.provinces.find((el: any) =>
            el.code === address.province.code &&
            el.name === address.province.name
        );
        let count = 0;
        cartInfo.products.forEach((el: any) => {
            if (el.price > 99000) {
                count += 1;
            }
        });
        // check trong nôị thành
        if (checkShippingFree && count >= 2) {
            shippingPrice = 0;
        }
        if (checkShippingFree && count < 2) {
            shippingPrice = 15000;
        }
        // check ngoại thành nôị thành
        if (!checkShippingFree && count >= 3) {
            shippingPrice = 0;
        }
        if (!checkShippingFree && count < 3) {
            shippingPrice = 20000;
        }

        const operations = {
            receiver_name: address.name,
            receiver_phone: address.phone.toString(),
            receiver_address: address.address,
            receiver_province: address.province,
            receiver_district: address.district,
            receiver_ward: address.ward,
            service_id: shippingMethods[0].method.toString(),
            payment_by: 'NGUOINHAN',
            service_name: 'Giao hàng nhanh',
            total_shipping_fee: shippingPrice
        };

        if (isUserLoggedIn) {
            if (address.id) {
                onChangeShippingMethod(operations);
            }
            setTabAddress('view');
        } else {
            if (address.id) {
                onChangeShippingMethod(operations);
            }
        }

        reactPixel.default.track(
            'AddPaymentInfo', operations
        );
    };

    /**
     * Change Note
     * @param {*} note
     */
    const onChangeNote = (note: string) => {
        setNote(note);
    };

    useEffect(
        () => {
            if (debouncedSetNote) {
                CartAPI.update({
                    note: debouncedSetNote,
                }).then((response) => {
                    if (response.code) {
                        Toastr.error(response.message);
                        return;
                    }
                    reactPixel.default.track('AddPaymentInfo', { note: debouncedSetNote });
                });
            }
        },
        [debouncedSetNote] // Only call effect if debounced change note term changes
    );
    /**
     * Show Address Form
     * @private
     */
    const onShowAddressForm = () => {
        dispatch(addUserAddressdForm(true, 'create'));
    };

    /**
     * Change Tab Address
     * @param {*} tabIndex
     */
    const onChangeViewAddress = (tabIndex: string) => {
        setTabAddress(tabIndex);
    };

    /**
     * Handle load provinces
     */
    useEffect(() => {
        if (isUserLoggedIn) {
            fetchAddress();
        }
        if (!provinces.length) {
            fetchProvinces();
        }
    }, [isUserLoggedIn]);

    /**
     * Handle update address
     */
    useEffect(() => {

        if (
            address.name &&
            address.phone &&
            address.address &&
            address.province &&
            address.district &&
            address.ward
        ) {

            if (isUserLoggedIn && !addDelivery) {
                onChangeAddress({
                    id: '0',
                    ...address
                });
                setAddDelivery(true);
                reactPixel.default.track('AddPaymentInfo', address);
            }
            if (!isUserLoggedIn && !addDelivery && firstLoad) {
                onChangeAddress({
                    id: '0',
                    ...address
                });
                setAddDelivery(true);
                setfirstLoad(true);
                reactPixel.default.track('AddPaymentInfo', address);
            }
        }
    }, [address]);

    /**
     * Lifecycle
     */
    useEffect(() => {
        const ReactPixel = require('react-facebook-pixel');
        ReactPixel.default.init('119758555309111');
        setReactPixel(ReactPixel);

    }, []);

    useEffect(() => {
        onSetAddress();
    }, [cartInfo]);

    if (isUserLoggedIn) {
        return (
            <div className='ccs-order-info-islogin'>
                <div className='order-info--title'>
                    <span>Thông tin nhận hàng</span>
                    <span>
                        <img src='/media/images/ic-check-correct.svg' alt='cocolux' />
                        Bạn đã đăng nhập
                    </span>
                </div>
                {
                    tabAddress === 'view'
                        ? (
                            <div className={'ccs-order--form form-active'}>
                                <div className='order--form_group order--form_address'>
                                    {
                                        address.name && address.district
                                            ? (
                                                <div className='address-item'>
                                                    <div className='user-info'>
                                                        <span>{address.name}</span>
                                                    </div>
                                                    <div className='address-info'>
                                                        <div className='info-detail'>
                                                            <span>{address.address}</span>
                                                            <a onClick={() => onChangeViewAddress('edit')} >
                                                                Thay đổi địa chỉ
                                                            </a>
                                                        </div>
                                                        <div className='info-detail'>
                                                            <span>Điện thoại: {address.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <div className='address-item'>
                                                    <div className='change-account-address'>
                                                        Vui lòng chọn 1 địa chỉ để giao hàng:
                                                        <span onClick={() => onChangeViewAddress('edit')}>
                                                            Thay đổi địa chỉ
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className='order--form_group order--form_note'>
                                    <span>Ghi chú</span>
                                    <textarea
                                        rows={2}
                                        name='note'
                                        placeholder='Nhập ghi chú nếu có'
                                        className='ccs-textarea note-textarea'
                                        defaultValue={cartInfo?.note}
                                        onChange={(event: any) => onChangeNote(event.target.value)}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        )
                        : (
                            <div className={'ccs-order--form address-setting form-active'}>
                                {
                                    listAddress.map((address: any) => (
                                        <label className='order--form_group' key={address.id}>
                                            <div className='ccs-radio'>
                                                <div>
                                                    <input
                                                        type='radio'
                                                        name='shipping_address'
                                                        defaultChecked={address.id === cartInfo?.shipping?.address?.id}
                                                        onChange={() => onChangeAddress(address)}
                                                    />
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className='address-item'>
                                                <div className='user-info'>
                                                    <span>{address.name}</span>
                                                    {
                                                        address.is_default
                                                            ? (
                                                                <div className='address-config'>
                                                                    <img src='/media/images/ic-flag.svg' alt='cocolux' />
                                                                    <span>Địa chỉ mặc định</span>
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                                <div className='address-info'>
                                                    <div className='info-detail'>
                                                        <span>{address.address}</span>
                                                    </div>
                                                    <div className='info-detail'>
                                                        <span>Điện thoại: {address.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))
                                }
                                <div className='group-buttons'>
                                    <button
                                        className='btn btn-light btn-outline-dark'
                                        onClick={() => setTabAddress('view')}
                                    >
                                        Trở lại
                                    </button>
                                    <button
                                        className='btn btn-light btn-outline-dark'
                                        onClick={() => onShowAddressForm()}
                                    >
                                        <img src='/media/images/ic-add.svg' />
                                        Thêm địa chỉ khác
                                    </button>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }

    return (
        <div className='ccs-order-info-islogin'>
            <div className='order-info--title'>
                <span>Thông tin nhận hàng</span>
                <span>
                    Đăng nhập để nhận hàng
                </span>
            </div>
            <div className='ccs-order--form form-active not-login'>
                {/* begin:: social login */}
                <PaymentSocialLogin />
                {/* end:: social login */}

                <div className='form-group'>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Họ và tên</span>
                        <input
                            type='text'
                            className='ccs-input'
                            name='customer_name'
                            defaultValue={address && address.name}
                            onChange={($event: any) => setAddress({ ...address, name: $event.target.value })}
                        />
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Số điện thoại nhận hàng</span>
                        <input
                            type='text'
                            className='ccs-input'
                            name='customer_phone'
                            defaultValue={address && address.phone}
                            onChange={$event => setAddress({ ...address, phone: $event.target.value })}
                        />
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Tỉnh thành</span>
                        <select
                            name='province_code'
                            className='ccs-selectbox'
                            onChange={(e: any) => {
                                const index = e.target.selectedIndex;
                                const optionElement = e.target.childNodes[index];
                                const id = optionElement.getAttribute('data-id');
                                const name = optionElement.getAttribute('data-name');
                                setAddress({ ...address, province: { id, name, code: e.target.value }, ward: null, district: null });
                                onChangeProvince(e.target.value);
                            }}
                        >
                            <option value='' selected disabled hidden>{provinceSelect && provinceSelect.name ? provinceSelect.name : 'Chọn Tỉnh/Thành Phố'}</option>
                            {
                                provinces && provinces.map((province: any = {}) => (
                                    <option
                                        data-id={province.id}
                                        data-name={province.name}
                                        value={province.code}
                                        key={province.id}
                                    >
                                        {province.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Quận huyện</span>
                        <select
                            name='district_code'
                            className='ccs-selectbox'
                            onChange={(e: any) => {
                                const index = e.target.selectedIndex;
                                const optionElement = e.target.childNodes[index];
                                const id = optionElement.getAttribute('data-id');
                                const name = optionElement.getAttribute('data-name');
                                setAddress({ ...address, district: { id, name, code: e.target.value }, ward: null });
                                onChangeDistrict(e.target.value);
                            }}
                        >
                            <option value='' hidden>{districtSelect && address && address.district && districtSelect.code === address.district.code ? districtSelect.name : 'Chọn Quận/Huyện'}</option>
                            {
                                districts && districts.map((district: any = {}) => (
                                    <option
                                        data-id={district.id}
                                        data-name={district.name}
                                        value={district.code}
                                        key={district.id}
                                    >
                                        {district.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Phường xã</span>
                        <select
                            name='ward_code'
                            className='ccs-selectbox'
                            onChange={(e: any) => {
                                const index = e.target.selectedIndex;
                                const optionElement = e.target.childNodes[index];
                                const id = optionElement.getAttribute('data-id');
                                const name = optionElement.getAttribute('data-name');
                                if (address.address) {
                                    setAddDelivery(false);
                                }
                                setAddress({ ...address, ward: { id, name, code: e.target.value } });
                            }}
                        >
                            <option value='' hidden>{wardSelect && address && address.ward && wardSelect.code === address.ward.code ? wardSelect.name : 'Chọn Phường/ Xã'}</option>
                            {
                                wards && wards.map((ward: any = {}) => (
                                    <option
                                        data-id={ward.id}
                                        data-name={ward.name}
                                        value={ward.code}
                                        key={ward.id}
                                    >
                                        {ward.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span className='required'>Địa chỉ chi tiết</span>
                        <input
                            type='text'
                            className='ccs-input'
                            defaultValue={address && address.address}
                            name='user_address'
                            onChange={($event) => {
                                if (address.ward) {
                                    setAddDelivery(false);
                                }
                                setAddress({ ...address, address: $event.target.value });
                            }}
                        />
                    </div>
                    <div className='order--form_group order--form_note'>
                        <span>Ghi chú</span>
                        <textarea
                            rows={2}
                            name='note'
                            placeholder='Nhập ghi chú nếu có'
                            className='ccs-textarea note-textarea'
                            defaultValue={cartInfo?.customer?.note}
                            onChange={(event: any) => onChangeNote(event.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </div >
    );

};

export default PaymentAddress;
