/* eslint-disable no-script-url */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pick } from 'lodash';
import * as Yup from 'yup';

// Config & Helper
import { google } from 'config/vars';
import { Cookie, Storage } from 'src/helpers/utilities';

// Form
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { AuthAPI } from 'src/helpers/services';
import { addUserActiveForm, addLoginForm } from 'src/stores/layout';

// Component
import Modal from './BaseModal';

// Schema
const registerValidation = Yup.object().shape({
    name: Yup.string()
        .min(6, 'Họ và tên phải lớn hơn 6 ký tự')
        .max(255, 'Họ và tên không được vượt quá 255 ký tự')
        .required('Vui lòng nhập họ và tên'),
    phone: Yup.string()
        .min(10, 'Số điện thoại phải lớn hơn 10 ký tự')
        .required('Vui lòng nhập số điện thoại'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải lớn hơn 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),
    gender: Yup.string()
        .oneOf(['male', 'female'], 'Giới tính không hợp lệ')
        .required('Vui lòng chọn giới tính')
});

export const ModalRegister = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { loginModal, isLoading } = useSelector((state: any) => state.layout);

    // Declaration State
    const [
        errorMessage,
        setErrorMessage
    ] = useState('');
    const [registerState] = useState({
        name: '',
        phone: '',
        password: '',
        gender: ''
    });

    /**
     * Register
     * @param {*} values
     */
    const onRegister = async (values: any) => {
        if (!isLoading) {
            // transform data
            const valueTranformed = { ...values };
            const params = pick(
                valueTranformed,
                [
                    'name',
                    'phone',
                    'password',
                    'gender'
                ]
            );

            // submit data
            const respone = await AuthAPI.register(
                params
            );
            if (respone.code) {
                setErrorMessage(respone.message);
                return null;
            }

            // handle success
            onShowLoginForm(false, 'register');
            onActiveForm(params.phone);
            return respone.data;
        }

        return null;
    };

    /**
     * Login With Facebook
     * @private
     */
    const onLoginFacebook = () => {
        (window as any).FB.login(
            async ({ status, authResponse }: any) => {
                if (status !== 'connected') {
                    return null;
                }

                // handle when facebook auth success
                const respone = await AuthAPI.loginToken({
                    type: 'facebook',
                    token: authResponse.accessToken
                });
                if (respone.code) {
                    setErrorMessage(respone.message);
                    return null;
                }

                // handle when coco auth success
                handleLoginSuccess(respone.data);
                return authResponse;
            },
            {
                scope: 'email,public_profile'
            }
        );
    };

    /**
     * Login With Google
     * @private
     */
    const onLoginGoogle = () => {
        (window as any).gapi.auth.signIn({
            callback: async (result: any) => {
                if (result.error) {
                    console.log(result.error);
                    return null;
                }

                // handle when google auth success
                const respone = await AuthAPI.loginToken({
                    type: 'google',
                    token: result.id_token
                });
                if (respone.code) {
                    setErrorMessage(respone.message);
                    return null;
                }

                // handle when coco auth success
                handleLoginSuccess(respone.data);
                return result;
            },
            clientid: google.clientId,
            cookiepolicy: 'single_host_origin',
            requestvisibleactions: 'http://schema.org/AddAction',
            scope: 'profile email openid'
        });
    };

    /**
     * Handle Login Success
     * @param {*} token
     * @param {*} data
     */
    const handleLoginSuccess = ({ token, user }: any) => {
        Cookie.add({ name: Cookie.ACCESS_TOKEN, value: token.access_token, expired: 10 });
        Cookie.add({ name: Cookie.REFRESH_TOKEN, value: token.refresh_token, expired: 30 });
        Storage.add({ key: Storage.USER, value: JSON.stringify(pick(user, ['id', 'name', 'avatar', 'phone'])) });
        Storage.add({ key: Storage.USER_LOCATION, value: JSON.stringify(pick(user, ['province_code', 'street_code', 'ward_code', 'address'])) });
        Storage.add({ key: Storage.USER_STATUS, value: JSON.stringify(pick(user, ['is_verify_email', 'is_verify_password', 'is_verify_phone'])) });
        Storage.add({ key: Storage.USER_METRIC, value: JSON.stringify(pick(user, ['total_debt', 'total_point', 'total_price', 'total_invoice_price'])) });
        window.location.reload();
        return true;
    };

    /**
     * Show Active Form
     * @param {*} phone
     */
    const onActiveForm = (phone: string) => {
        dispatch(addUserActiveForm(true, phone));
    };

    /**
    * Show Login Form
    * @param {*} visible
    * @param {*} tab
    */
    const onShowLoginForm = (visible: boolean, tab: string) => {
        dispatch(addLoginForm(visible, tab));
    };

    return (
        <Modal visible={loginModal.visible}>
            <div className='modal-content modal-sm modal-login'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onShowLoginForm(false, 'register')}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3> TẠO TÀI KHOẢN COCOLUX </h3>
                </div>
                <div className='modal-body'>
                    <Formik
                        initialValues={registerState}
                        validationSchema={registerValidation}
                        onSubmit={values => onRegister(values)}
                    >
                        <Form>
                            <div className='ccs-login-wrap ccs-register-form'>
                                <div>
                                    {
                                        errorMessage &&
                                        <span className='error-message'>{errorMessage}</span>
                                    }
                                </div>
                                <div className='ccs-login-bottom'>
                                    <div className='login-bottom--left form'>
                                        <div className='form-group'>
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
                                                    type='text'
                                                    name='phone'
                                                    className='ccs-input'
                                                    placeholder='Số điện thoại'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='phone' />
                                                </div>
                                            </div>
                                            <div className='form-input'>
                                                <Field
                                                    type='password'
                                                    name='password'
                                                    className='ccs-input'
                                                    placeholder='Mật khẩu'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='password' />
                                                </div>
                                            </div>
                                            <div className='bottom-left_radiogr form-input'>
                                                <div className='form-radio'>
                                                    <div className='ccs-radio'>
                                                        <label>
                                                            <Field
                                                                type='radio'
                                                                name='gender'
                                                                value='male'
                                                            />
                                                            Nam <span></span>
                                                        </label>
                                                    </div>
                                                    <div className='ccs-radio'>
                                                        <label>
                                                            <Field
                                                                type='radio'
                                                                name='gender'
                                                                value='female'
                                                            />
                                                            Nữ <span></span>
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className='message'>
                                                    <ErrorMessage name='gender' />
                                                </div>
                                            </div>
                                            <div className='checkbox checkbox-success checkbox-promotion'>
                                                <label>
                                                    <input className='styled' type='checkbox' />
                                                    Nhận thông tin khuyến mãi qua e-mail
                                                </label>
                                            </div>
                                            <div className='checkbox checkbox-success checkbox-certificate'>
                                                <label>
                                                    Tôi đã đọc và đồng ý thực hiện mọi giao dịch
                                                    mua bán theo điều kiện sử dụng và chính sách
                                                    của COCOLUX
                                                </label>
                                            </div>
                                            <button
                                                type='submit'
                                                className='btn btn-lg btn-danger text-uppercase'
                                            >
                                                Đăng kí tài khoản
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-group'>
                                    Bạn đã có tài khoản?
                                    <a href='#' onClick={() => onShowLoginForm(true, 'login')}>
                                        Đăng nhập
                                    </a>
                                </div>
                                <div className='ccs-login-middle'>
                                    <div className='login-middle--line'></div>
                                    <span>Hoặc đăng nhập với</span>
                                    <div className='login-middle--line'></div>
                                </div>
                                <div className='ccs-login-top'>
                                    <button
                                        type='button'
                                        className='btn btn-facebook w-100'
                                        onClick={() => onLoginFacebook()}
                                    >
                                        <img src='/media/images/ic-btn-fb.svg' />
                                        Facebook
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-google w-100'
                                        onClick={() => onLoginGoogle()}
                                    >
                                        <img src='/media/images/ic-btn-gg-white.svg' />
                                        Google
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};
