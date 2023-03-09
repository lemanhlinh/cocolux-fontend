import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Form
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { ItemAPI } from 'src/helpers/services';
import { addProductFollowForm } from 'src/stores/layout';
import { Toastr } from 'src/helpers/utilities';

// Component
import Modal from './BaseModal';

interface Props {
    product: any;
}

export const ProductFollowModal: React.FC<Props> = ({ product }) => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { productFollowModal } = useSelector((state: any) => state.layout);

    // Declaration State
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Close Form
     * @private
     */
    const onCloseForm = () => {
        dispatch(addProductFollowForm(false));
    };

    /**
     * Register Notity When Product In Stock
     * @param values
     */
    const onRegisterProductFollow = async (values: any) => {
        if (product) {
            // Prepare param
            const params = {
                ...values,
                product: {
                    id: product.id,
                    name: product.name,
                    option_id: product.option_id,
                    thumbnail_url: product.images[0]
                }
            };

            // Submit request
            await ItemAPI.registerFollow(params)
                .then((res: any) => {
                    if (res.code) {
                        setErrorMessage(res.message);
                        return false;
                    }
                    // Handle success
                    Toastr.success('Đăng ký nhận thông báo thành công');
                    dispatch(addProductFollowForm(false));
                    return true;
                }).catch((error: any) => {
                    throw Error(error);
                });
        }
    };

    return (
        <Modal visible={productFollowModal.visible}>
            <div className='modal-content modal-sm'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCloseForm()}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>THÔNG BÁO KHI CÓ HÀNG ONLINE</h3>
                </div>
                <div className='modal-body'>
                    <Formik
                        initialValues={{
                            contact: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                contact: Yup.string()
                                    .required('Vui lòng nhập Email/ SĐT để nhận thông báo')
                            })
                        }
                        onSubmit={values => onRegisterProductFollow(values)}
                    >
                        <Form autoComplete='off'>
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
                                                name='contact'
                                                className='ccs-input'
                                                placeholder='Email'
                                            />
                                            <div className='message'>
                                                <ErrorMessage name='contact' />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-lg btn-danger text-uppercase w-100'
                                    >
                                        Gửi
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
