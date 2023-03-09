import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { pick } from 'lodash';
import * as Yup from 'yup';

// Modules
import { google } from 'config/vars';
import { Cookie, Storage } from 'src/helpers/utilities';
import { AuthAPI, CartAPI } from 'src/helpers/services';
import { addLoginForm, addForgotPasswordForm, addUserActiveForm } from 'src/stores/layout';

// Components
import Modal from './BaseModal';

// Schemas
const loginValidation = Yup.object().shape({
    username: Yup.string()
        .required('Vui lòng nhập Email hoặc SĐT'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải lớn hơn 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),
});

const Sources = {
    SYSTEM: 'system',
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
    OTHER: 'other'
};



export const LoginModal = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { loginModal, isLoading } = useSelector((state: any) => state.layout);

    // Declaration State
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loginState] = useState<any>({ username: '', password: '' });


    /**
     * Handle Login Success
     * @param {*} token
     * @param {*} data
     */
    const handleLoginSuccess = ({ token, user, source }: any) => {
        Cookie.add({ name: Cookie.ACCESS_TOKEN, value: token.access_token, expired: 10 });
        Cookie.add({ name: Cookie.REFRESH_TOKEN, value: token.refresh_token, expired: 30 });
        Storage.add({ key: Storage.USER, value: JSON.stringify(pick(user, ['id', 'name', 'avatar', 'phone'])) });
        Storage.add({ key: Storage.USER_LOCATION, value: JSON.stringify(pick(user, ['province_code', 'street_code', 'ward_code', 'address'])) });
        Storage.add({ key: Storage.USER_STATUS, value: JSON.stringify(pick(user, ['is_verify_email', 'is_verify_password', 'is_verify_phone'])) });
        Storage.add({ key: Storage.USER_METRIC, value: JSON.stringify(pick(user, ['total_debt', 'total_point', 'total_price', 'total_invoice_price'])) });
        Storage.add({ key: Storage.SOURCE_LOGIN, value: source });
        window.location.reload();
        return true;
    };

    /**
    * Show Forgot Password Form
    * @private
    */
    const onShowForgotPasswordForm = () => {
        dispatch(addForgotPasswordForm(true));
        dispatch(addLoginForm(false, 'login'));
    };

    /**
     * Close Form
     * @private
     */
    const onCloseForm = () => {
        dispatch(addLoginForm(false, 'login'));
    };

    /**
     * Change Tab
     * @param {*} tabIndex
     */
    const onChangeTab = (tabIndex: string) => {
        dispatch(addLoginForm(true, tabIndex));
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
                await CartAPI.update({
                    source: Sources.FACEBOOK
                });
                respone.data.source = Sources.FACEBOOK;
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
                await CartAPI.update({
                    source: Sources.GOOGLE
                });
                respone.data.source = Sources.GOOGLE;
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
     * Login With Coco
     * @private
     */
    const onLoginCoco = async (params: any = {}) => {
        if (!isLoading) {
            setErrorMessage('');
            const respone = await AuthAPI.login(
                params
            );
            if (respone.code) {
                if (respone.message === 'user_inactive') {
                    dispatch(addLoginForm(false, 'login'));
                    dispatch(addUserActiveForm(true, params.username));
                }
                setErrorMessage(respone.message);
                return null;
            }
            await CartAPI.update({
                source: Sources.SYSTEM
            });
            respone.data.source = Sources.SYSTEM;
            // handle success
            handleLoginSuccess(respone.data);
            return respone.data;
        }

        return null;
    };

    return (
        <Modal visible={loginModal.visible}>
            <div className='modal-content modal-sm modal-login'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>ĐĂNG NHẬP</h3>
                </div>
                <div className='modal-body'>

                    <Formik
                        initialValues={loginState}
                        validationSchema={loginValidation}
                        onSubmit={values => onLoginCoco(values)}
                    >
                        <Form>
                            <div className='ccs-login-form'>
                                <div className='ccs-login-form--middle form'>
                                    <div className='form-group'>
                                        <div className='form-input'>
                                            <Field
                                                type='text'
                                                name='username'
                                                className='ccs-input'
                                                placeholder='Email/SĐT'
                                            />
                                            <div className='message'>
                                                <ErrorMessage name='username' />
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
                                        <div className='form-error'>
                                            {
                                                errorMessage &&
                                                <div className='message'>
                                                    {errorMessage}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='action-group'>
                                        <div className='checkbox checkbox-success checkbox-promotion'>
                                            <label>
                                                <input className='styled' type='checkbox' />
                                                <span>Nhớ mật khẩu</span>
                                            </label>
                                        </div>
                                        <a
                                            onClick={() => onShowForgotPasswordForm()}
                                        >
                                            Quên mật khẩu
                                        </a>
                                    </div>

                                    <button
                                        type='submit'
                                        className='btn btn-lg btn-danger text-uppercase w-100'
                                    >
                                        Đăng nhập
                                    </button>
                                    <div className='text-group'>
                                        Bạn chưa có tài khoản?
                                        <a href='#' onClick={() => onChangeTab('register')}>
                                            Đăng kí
                                        </a>
                                    </div>
                                    <div className='line-container'>
                                        <div></div>
                                        <span>Hoặc đăng nhập với</span>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                            <div className='ccs-login-form--top'>
                                <button
                                    type='button'
                                    className='btn btn-facebook w-100'
                                    onClick={() => onLoginFacebook()}
                                >
                                    <img src='/media/images/ic-btn-fb.svg' alt='cocolux' />
                                    Facebook
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-google w-100'
                                    onClick={() => onLoginGoogle()}
                                >
                                    <img src='/media/images/ic-btn-gg-white.svg' alt='cocolux' />
                                    Google
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </Modal >
    );
};
