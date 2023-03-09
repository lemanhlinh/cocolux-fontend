import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Form
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { AuthAPI, AccountAPI } from 'src/helpers/services';
import { addForgotPasswordForm, addLoginForm } from 'src/stores/layout';

// Component
import Modal from './BaseModal';

export const ModalForgotPassword = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { forgotPasswordModal } = useSelector((state: any) => state.layout);

    // Declaration State
    const [formStep, setFormStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [formState, setFormState] = useState<any>({ code: '', phone: '', password: '', rePassword: '' });

    /**
     * Close Form
     * @private
     */
    const onCloseForm = () => {
        dispatch(addForgotPasswordForm(false));
    };

    /**
     * Send Request Code
     * @param {*} value
     */
    const onRequestCode = async (value: any) => {
        setErrorMessage('');
        await AuthAPI.requestForgetPassword(
            value.phone
        ).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Số điện thoại không tồn tại trong hệ thống');
                return false;
            }

            // Handle success
            setFormStep(2);
            setFormState({ ...value });
            return true;
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    /**
     * Change Phone
     * @param {*} values
     */
    const onChangePassword = async (values: any) => {
        await AccountAPI.resetPassword({
            ...values
        }).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Thông tin không hợp lệ');
                return false;
            }

            // Handle success
            dispatch(addForgotPasswordForm(false));
            dispatch(addLoginForm(true, 'login'));
            return true;
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    return (
        <Modal visible={forgotPasswordModal.visible}>
            <div className='modal-content modal-sm modal-login'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>ĐẶT LẠI MẬT KHẨU</h3>
                </div>
                <div className='modal-body'>
                    {
                        formStep === 1
                            ? (
                                <Formik
                                    initialValues={formState}
                                    validationSchema={
                                        Yup.object().shape({
                                            phone: Yup.string()
                                                .required('Vui lòng nhập SĐT để nhận mã')
                                        })
                                    }
                                    onSubmit={
                                        value => onRequestCode(value)
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
                                                </div>
                                                <button
                                                    type='submit'
                                                    className='btn btn-lg btn-danger text-uppercase w-100'
                                                >
                                                    Gửi mã
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            )
                            : (
                                <Formik
                                    initialValues={formState}
                                    validationSchema={
                                        Yup.object().shape({
                                            phone: Yup.string()
                                                .required('Vui lòng nhập SĐT để nhận mã'),
                                            code: Yup.string()
                                                .required('Vui lòng mã xác thực'),
                                            password: Yup.string()
                                                .min(6)
                                                .required('Vui lòng nhập mật khẩu tối thiểu 6 ký tự'),
                                            rePassword: Yup.string()
                                                .oneOf(
                                                    [Yup.ref('password')],
                                                    'Vui lòng nhập lại đúng mật khẩu mới của bạn'
                                                )
                                        })
                                    }
                                    onSubmit={
                                        values => onChangePassword(values)
                                    }
                                >
                                    <Form>
                                        <div className='forgot-password-wrapper'>
                                            <form className='form'>
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
                                                        <Field
                                                            type='text'
                                                            name='code'
                                                            className='ccs-input'
                                                            placeholder='Mã xác nhận'
                                                        />
                                                        <div className='message'>
                                                            <ErrorMessage name='code' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <div className='form-input'>
                                                        <Field
                                                            type='password'
                                                            name='password'
                                                            className='ccs-input'
                                                            placeholder='Mật khẩu mới'
                                                        />
                                                        <div className='message'>
                                                            <ErrorMessage name='password' />
                                                        </div>
                                                    </div>
                                                    <div className='form-input'>
                                                        <Field
                                                            type='password'
                                                            name='rePassword'
                                                            className='ccs-input'
                                                            placeholder='Xác nhận mật khẩu'
                                                        />
                                                        <div className='message'>
                                                            <ErrorMessage name='rePassword' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-button'>
                                                    <button
                                                        type='button'
                                                        className='btn text-uppercase w-100'
                                                        onClick={() => setFormStep(1)}
                                                    >
                                                        Quay lại
                                                    </button>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-danger text-uppercase w-100 ml-1'
                                                    >
                                                        Đặt lại mật khẩu
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Form>
                                </Formik>
                            )
                    }
                </div>
            </div >
        </Modal >
    );
};
