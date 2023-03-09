import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Form
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { AuthAPI, AccountAPI } from 'src/helpers/services';
import { addChangePhoneForm } from 'src/stores/layout';

// Component
import Modal from './BaseModal';

export const ChangePhoneModal = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { changePhoneModal } = useSelector((state: any) => state.layout);

    // Declaration State
    const [formStep, setFormStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [formState, setFormState] = useState<any>({ code: '', phone: '' });

    /**
     * Close Form
     * @private
     */
    const onCloseForm = () => {
        dispatch(addChangePhoneForm(false));
    };

    /**
     * Send Request Code
     * @param {*} value
     */
    const onRequestCode = async (value: any) => {
        await AuthAPI.requestChangePhone(
            value.phone
        ).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Số điện thoại đã tồn tại trong hệ thống');
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
     * @param {*} value
     */
    const onChangePhone = async (value: any) => {
        await AccountAPI.changePhone(
            value.phone,
            value.code
        ).then((respone: any) => {
            if (respone.code) {
                setErrorMessage('Thông tin không hợp lệ');
                return false;
            }

            // Handle success
            dispatch(addChangePhoneForm(false));
            setFormStep(1);
            return true;
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    return (
        <Modal visible={changePhoneModal.visible}>
            <div className='modal-content modal-sm modal-login'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>ĐỔI SỐ ĐIỆN THOẠI</h3>
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
                                                .required('Vui lòng nhập số điện thoại mới')
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
                                            code: Yup.string()
                                                .required('Vui lòng mã xác thực')
                                        })
                                    }
                                    onSubmit={
                                        values => onChangePhone(values)
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
                                                <div className='form-group'>
                                                    <div className='form-input'>
                                                        <Field
                                                            type='text'
                                                            name='phone'
                                                            className='ccs-input'
                                                            placeholder='Nhập số điện thoại mới'
                                                            disabled='disabled'
                                                        />
                                                        <div className='message'>
                                                            <ErrorMessage name='phone' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-button'>
                                                    <button
                                                        className='btn text-uppercase w-100'
                                                        onClick={() => setFormStep(1)}
                                                    >
                                                        Quay lại
                                                    </button>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-danger text-uppercase w-100 ml-1'
                                                    >
                                                        Đổi số điện thoại
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
