import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { pick } from 'lodash';

// Config & Helper
import { Storage } from 'src/helpers/utilities';

// Form
import { ErrorMessage, Field, Form, Formik } from 'formik';

// Service & Redux
import { AccountAPI, LocationAPI } from 'src/helpers/services';
import { addUserAddressdForm } from 'src/stores/layout';
import { listAddress } from 'src/stores/account';

// Component
import Modal from './BaseModal';

// Schema
const addressValidation = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Họ và tên không được vượt quá 255 ký tự')
        .required('Vui lòng nhập tên người nhận hàng'),
    phone: Yup.string()
        .min(10, 'Số điện thoại phải lớn hơn 10 ký tự')
        .required('Vui lòng nhập số điện thoại nhận hàng'),
    address: Yup.string()
        .required('Vui lòng nhập địa chỉ giao hàng'),
    // address_name: Yup.string()
    //     .required('Vui lòng nhập tên địa chỉ'),
    province_code: Yup.string()
        .required('Vui lòng chọn tỉnh/ thành phố'),
    district_code: Yup.string()
        .required('Vui lòng chọn quận/ huyện'),
    ward_code: Yup.string()
        .required('Vui lòng chọn phường/ xã'),
});

export const UserAddressModal = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { userAddressModal } = useSelector((state: any) => state.layout);
    const { tab, visible, address } = userAddressModal;

    // Declaration State
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [addressState, setAddressState] = useState<any>(pick(address, ['id', 'type', 'name', 'phone', 'address']));
    const [districts, setDistrict] = useState<[]>([]);
    const [provinces, setProvince] = useState<[]>([]);
    const [wards, setWard] = useState<[]>([]);
    const [provinceSelect, setProvinceSelect] = useState<any>({ ...address.province });
    const [districtSelect, setDistrictSelect] = useState<any>({ ...address.district });
    const [wardSelect, setWardSelect] = useState<any>({ ...address.ward });
    const [reactPixel, setReactPixel] = useState<any>();

    useEffect(() => {
        const ReactPixel = require('react-facebook-pixel');
        ReactPixel.default.init('119758555309111');
        setReactPixel(ReactPixel);
    }, []);

    /**
     * Load Data
     * @private
     */
    useEffect(() => {
        // Handle load provinces
        const handleFetchLocations = async () => {
            await LocationAPI.listProvinces({
                skip: 0,
                limit: 100,
            }).then((res: any) => {
                setProvince(res.data ? res.data : []);
            });

            if (tab === 'edit') {
                // Handle load districts data
                await LocationAPI.listDistricts({
                    skip: 0,
                    limit: 100,
                    province_code: provinceSelect ? provinceSelect.code : 0
                }).then((res: any) => {
                    setDistrict(res.data
                        ? res.data
                        : []
                    );
                }).catch((error: any) => {
                    throw Error(error);
                });

                // Handle load wards data
                await LocationAPI.listWard({
                    skip: 0,
                    limit: 100,
                    district_code: districtSelect ? districtSelect.code : 0
                }).then((res: any) => {
                    setWard(res.data
                        ? res.data
                        : []
                    );
                }).catch((error: any) => {
                    throw Error(error);
                });
            }
        };
        setAddressState({
            ...addressState,
            province_code: address && address.province && address.province.code,
            district_code: address && address.district && address.district.code,
            ward_code: address && address.ward && address.ward.code
        });
        if (tab === 'create') {
            setDistrictSelect(null);
            setWardSelect(null);
        }

        // Handle request
        handleFetchLocations();
        setErrorMessage('');
    }, []);

    /**
     * On change province
     * @param provinceId
     */
    const onChangeProvince = async (provinceId: string) => {
        const found: any = provinces.find((el: any) => el.code === provinceId);
        setProvinceSelect({ id: `${found?.id}`, name: found?.name, code: found?.code });
        setDistrictSelect(null);
        setWardSelect(null);
        if (provinceId) {
            await LocationAPI.listDistricts({
                skip: 0,
                limit: 100,
                province_code: provinceId
            }).then((res: any) => {
                setDistrict(res.data
                    ? res.data
                    : []
                );
                setWard([]);
            }).catch((error: any) => {
                throw Error(error);
            });
        }
    };

    /**
     * On change district
     * @param districtId
     */
    const onChangeDistrict = async (districtId: string) => {
        const found: any = districts.find((el: any) => el.code === districtId);
        setDistrictSelect({ id: `${found?.id}`, name: found?.name, code: found?.code });
        setWardSelect(null);
        if (districtId) {
            await LocationAPI.listWard({
                skip: 0,
                limit: 100,
                district_code: districtId
            }).then((res: any) => {
                setWard(res.data
                    ? res.data
                    : []
                );
            }).catch((error: any) => {
                throw Error(error);
            });
        }
    };

    /**
     *
     * @params wardId
     */
    const onChangeWard = (wardId: string) => {
        const found: any = wards.find((el: any) => el.code === wardId);
        setWardSelect({ id: `${found?.id}`, name: found?.name, code: found?.code });
    };

    /**
     * Close Form
     * @param modalId
     */
    const onCloseForm = () => dispatch(addUserAddressdForm(false, 'create'));

    /**
     * Complete
     * @param {*} values
     */
    const onComplete = async (values: any) => {
        // Prepare params
        const user = JSON.parse(Storage.get('user'));
        const params = {
            id: address.id,
            phone: values.phone, name: values.name,
            address: values.address,
            user: { id: user.id, name: user.name }, type: 'home', province: provinceSelect, district: districtSelect, ward: wardSelect
        };

        // submit request
        const response =
            tab === 'create'
                ? await AccountAPI.addAddress(params)
                : await AccountAPI.editAddress(params.id, params) as any;

        if (response.code) {
            setErrorMessage(response.message);
            return null;
        }

        // handle success
        dispatch(listAddress());
        dispatch(addUserAddressdForm(false, tab));
        reactPixel.default.track('AddPaymentInfo', params);
        return null;
    };

    return (
        <Modal visible={visible}>
            <div className='modal-content modal-address'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>{tab === 'create' ? 'THÊM ĐỊA CHỈ MỚI' : 'CHỈNH SỬA ĐỊA CHỈ'}</h3>
                </div>
                <div className='modal-body'>
                    <Formik
                        initialValues={addressState}
                        enableReinitialize={true}
                        validationSchema={addressValidation}
                        onSubmit={values => onComplete(values)}
                    >
                        {({ handleChange }) => (
                            <Form>
                                <div className='coco-form'>
                                    <div className='form-group'>
                                        <div className='form-input'>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='address'
                                                    className='ccs-input'
                                                    placeholder='Địa chỉ nhận hàng'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='address' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='name'
                                                    className='ccs-input'
                                                    placeholder='Họ và tên'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='name' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    type='tel'
                                                    name='phone'
                                                    className='ccs-input'
                                                    placeholder='Số điện thoại nhận hàng'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='phone' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    as='select'
                                                    name='province_code'
                                                    value={provinceSelect ? provinceSelect.code : null}
                                                    className='ccs-selectbox'
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                        onChangeProvince(e.target.value);
                                                    }}
                                                >
                                                    <option value='' selected disabled hidden>{provinceSelect && provinceSelect.name ? provinceSelect.name : 'Chọn Tỉnh/ TP'}</option>
                                                    {
                                                        provinces.map((province: any = {}) => (
                                                            <option
                                                                value={province.code}
                                                                key={province.id}
                                                            >
                                                                {province.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                                <div className='message'>
                                                    <ErrorMessage name='province_code' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    as='select'
                                                    name='district_code'
                                                    value={districtSelect ? districtSelect.code : null}
                                                    className='ccs-selectbox'
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                        onChangeDistrict(e.target.value);
                                                    }}
                                                >
                                                    <option value='' hidden>{districtSelect && addressState && districtSelect.code === addressState.district_code ? districtSelect.name : 'Chọn Quận/ Huyện'}</option>
                                                    {
                                                        districts.map((district: any = {}) => (
                                                            <option
                                                                value={district.code}
                                                                key={district.id}
                                                            >
                                                                {district.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                                <div className='message'>
                                                    <ErrorMessage name='district_code' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    as='select'
                                                    name='ward_code'
                                                    value={wardSelect && wardSelect.code ? wardSelect.code : null}
                                                    className='ccs-selectbox'
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                        onChangeWard(e.target.value);
                                                    }}
                                                >
                                                    <option value='' hidden>{wardSelect && addressState && wardSelect.code === addressState.ward_code ? wardSelect.name : 'Chọn Phường/ Xã'}</option>
                                                    {
                                                        wards.map((ward: any = {}) => (
                                                            <option
                                                                value={ward.code}
                                                                key={ward.id}
                                                            >
                                                                {ward.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                                <div className='message'>
                                                    <ErrorMessage name='ward_code' />
                                                </div>
                                            </div>


                                        </div>
                                        <div className='form-message'>
                                            {errorMessage && <div className='message'>{errorMessage}</div>}
                                        </div>
                                    </div>
                                    <div className='form-footer'>
                                        <button
                                            className='btn btn-light mr-5'
                                            onClick={() => onCloseForm()}
                                        >
                                            TRỞ LẠI
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-danger'>
                                            HOÀN THÀNH
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div >
        </Modal >
    );
};
