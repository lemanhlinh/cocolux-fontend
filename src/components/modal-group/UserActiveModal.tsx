import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Form
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { Toastr } from 'src/helpers/utilities';
import { AuthAPI, AccountAPI } from 'src/helpers/services';
import { addUserActiveForm, addLoginForm } from 'src/stores/layout';

// Component
import Modal from './BaseModal';

export const ModalUserActive = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { userActiveModal } = useSelector((state: any) => state.layout);

    // Declaration State
    let timerInterval: any;
    const [countDown, setCountDown] = useState<number>(60);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);

    /**
     * Close Form
     * @private
     */
    const onCloseForm = () => {
        dispatch(addUserActiveForm(false, ''));
    };

    /**
     * Send Request Code
     * @param {*} phone
     */
    const onRequestCode = async () => {
        setErrorMessage('');
        await AuthAPI.requestActiveAccount(
            userActiveModal.phone
        ).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Số điện thoại không tồn tại trong hệ thống');
                return false;
            }

            // Handle success
            Toastr.success(`Mã xác minh của bạn sẽ được gửi đến ${userActiveModal.phone}`);
            countDownTimer();
            setDisableButton(true);
            return true;
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    /**
     * Handle Verify User
     * @param {*} values
     */
    const onVerifyUser = async (values: any) => {
        await AccountAPI.activeAccount(
            userActiveModal.phone,
            values.code
        ).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Thông tin không hợp lệ');
                return false;
            }

            // Handle success
            Toastr.success('Xác thực tài khoản thành công');
            dispatch(addUserActiveForm(false, ''));
            dispatch(addLoginForm(true, 'login'));
            return true;
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    /**
     * Set countdown timer
     */
    const countDownTimer = () => {
        const TIME_LIMIT = 60;
        let timePassed = 0;
        let countTime = TIME_LIMIT;

        // Start countdown
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            countTime = TIME_LIMIT - timePassed;
            setCountDown(countTime);

            // Clear interval
            if (countTime === 0) {
                clearInterval(timerInterval);
                setDisableButton(false);
            }
        }, 1000);
    };

    return (
        <Modal visible={userActiveModal.visible}>
            <div className='modal-content modal-sm modal-login'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>XÁC THỰC TÀI KHOẢN</h3>
                </div>
                <div className='modal-body'>
                    <Formik
                        initialValues={{ code: '' }}
                        validationSchema={
                            Yup.object().shape({
                                code: Yup.string()
                                    .required('Vui lòng nhập mã xác nhận để xác thực')
                            })
                        }
                        onSubmit={
                            value => onVerifyUser(value)
                        }
                    >
                        <Form>
                            <div className='forgot-password-wrapper'>
                                <div className='form'>
                                    <div className='form-group'>
                                        {
                                            errorMessage
                                                ? (
                                                    <div className='message'>
                                                        <span className='message' >{errorMessage}</span>
                                                    </div>
                                                )
                                                : null
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <div className='form-input'>
                                            <div className='form-verify'>
                                                <input
                                                    type='text'
                                                    name='phone'
                                                    className='ccs-input'
                                                    value={userActiveModal.phone}
                                                    placeholder='Số điện thoại'
                                                    disabled={userActiveModal.phone ? true : false}
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => onRequestCode()}
                                                    disabled={disableButton}
                                                    style={{ opacity: disableButton ? '0.7' : '1' }}
                                                    className='btn btn-md btn-secondary text-uppercase'
                                                >
                                                    Gửi mã
                                                </button>
                                            </div>
                                            <div style={{ marginTop: '5px' }}>
                                                {
                                                    disableButton
                                                        ? `Vui lòng chờ ${countDown} giây để gửi lại.`
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='form-input'>
                                            <Field
                                                type='text'
                                                name='code'
                                                className='ccs-input'
                                                placeholder='Mã xác thực'
                                            />
                                            <div className='message'>
                                                <ErrorMessage name='code' />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-lg btn-danger text-uppercase w-100'
                                    >
                                        Xác thực
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </Modal >
    );
};
