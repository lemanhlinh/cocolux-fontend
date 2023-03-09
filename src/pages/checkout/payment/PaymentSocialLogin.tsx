import React, { useState } from 'react';
import { pick } from 'lodash';

// Service & Redux
import { Storage, Cookie } from 'src/helpers/utilities';
import { AuthAPI } from 'src/helpers/services';

// Config & Helper
import { google } from 'config/vars';
const PaymentSocialLogin = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

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

    return (
        <div className='order--form_group order--form_note'>
            <span>Với tài khoản</span>
            <div className='social-btn-group' >
                <button
                    className='btn btn-facebook'
                    onClick={() => onLoginFacebook()}
                >
                    <img src='/media/images/ic-btn-fb.svg' />
                Facebook
                </button>
                <button
                    className='btn btn-google'
                    onClick={() => onLoginGoogle()}
                >
                    <img src='/media/images/ic-btn-gg-white.svg' />
                    Google
                </button>
            </div>
            <div className='social-message'>
                {
                    errorMessage
                        ? <span className='text-danger'>{errorMessage}</span>
                        : null
                }
            </div>
        </div>
    );
};

export default PaymentSocialLogin;
