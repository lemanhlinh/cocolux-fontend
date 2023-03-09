import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

// Form
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service & Redux
import { AccountAPI } from 'src/helpers/services';

// Config & Helper
import { Toastr, Storage } from 'src/helpers/utilities';

// Component
import { LayoutAccount } from 'src/components/layout-group';

// Schemas
const changePasswordValidation = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, 'Mật khẩu cũ không hợp lệ')
        .required('Vui lòng nhập mật khẩu hiện tại'),
    newPassword: Yup.string()
        .min(6, 'Mật khẩu mới phải lớn hơn 6 ký tự')
        .required('Vui lòng nhập mật khẩu mới'),
    rePassword: Yup.string()
        .oneOf(
            [Yup.ref('newPassword')],
            'Vui lòng nhập lại đúng mật khẩu mới của bạn'
        ).required('Vui lòng nhập lại mật khẩu')
});

const newPasswordValidation = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, 'Mật khẩu mới phải lớn hơn 6 ký tự')
        .required('Vui lòng nhập mật khẩu mới'),
    rePassword: Yup.string()
        .oneOf(
            [Yup.ref('newPassword')],
            'Vui lòng nhập lại đúng mật khẩu mới của bạn'
        ).required('Vui lòng nhập lại mật khẩu')
});

const ChangePasswordPage = () => {
    // Declaration State
    const [userState, setUserState] = useState<any>({});
    const [passwordVerifed, setPasswordVerifed] = useState<boolean>(false);
    const [formState, setFormState] = useState<any>({ oldPassword: '', newPassword: '', rePassword: '' });
    const [errorMessage, setErrorMessage] = useState<string>('');
    // Declarations Reducer
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    /**
     * Load data
     * @private
     */
    useEffect(() => {
        const userStatus = JSON.parse(Storage.get(Storage.USER_STATUS));
        setPasswordVerifed(userStatus.is_verify_password);
        setUserState({ ...userStatus });
    }, []);

    /**
     * Change Password
     * @param {*} values
     */
    const onChangePassword = async (values: any) => {
        const { oldPassword, newPassword } = values;
        await AccountAPI.changePassword(
            passwordVerifed
                ? oldPassword
                : newPassword,
            newPassword,
        ).then((res: any) => {
            if (res.code) {
                setErrorMessage(res.message);
            }

            // handle success
            const newUseState = {
                ...userState,
                is_verify_password: true
            };
            setUserState({
                ...newUseState
            });
            Storage.add({
                key: Storage.USER_STATUS,
                value: JSON.stringify(newUseState)
            });
            setFormState({
                oldPassword: '',
                newPassword: '',
                rePassword: ''
            });
            Toastr.success('Cập nhật mật khẩu thành công');
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    return (
        <LayoutAccount>
            <div className='content-title'>
                Thay đổi mật khẩu
            </div>
            <div className='content-detail password-detail'>
                {
                    isUserLoggedIn
                        ? (
                            <Formik
                                initialValues={formState}
                                validationSchema={
                                    passwordVerifed
                                        ? changePasswordValidation
                                        : newPasswordValidation
                                }
                                onSubmit={
                                    values => onChangePassword(values)
                                }
                            >
                                <Form className='form'>
                                    {
                                        passwordVerifed
                                            ? (
                                                <div className='form-group'>
                                                    <label className='form-label'>Mật khẩu hiện tại:</label>
                                                    <div className='form-input'>
                                                        <Field
                                                            type='password'
                                                            name='oldPassword'
                                                            className='form-control'
                                                            placeholder='Nhập mật khẩu'
                                                        />
                                                        <div className='message'>
                                                            <ErrorMessage name='oldPassword' />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : null
                                    }
                                    <div className='form-group'>
                                        <label className='form-label'>Mật khẩu mới:</label>
                                        <div className='form-input'>
                                            <Field
                                                type='password'
                                                name='newPassword'
                                                className='form-control'
                                                placeholder='Nhập mật khẩu'
                                            />
                                            <div className='message'>
                                                <ErrorMessage name='newPassword' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Nhập lại mật khẩu mới:</label>
                                        <div className='form-input'>
                                            <Field
                                                type='password'
                                                name='rePassword'
                                                className='form-control'
                                                placeholder='Nhập mật khẩu'
                                            />
                                            <div className='message'>
                                                <ErrorMessage name='rePassword' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        {errorMessage && <div className='message'>{errorMessage}</div>}
                                    </div>
                                    <button type='submit' className='btn btn-secondary w-100'>Cập nhật</button>
                                </Form>
                            </Formik>
                        )
                        : (
                            <div className='bg-white m-auto' style={{ textAlign: 'center', padding: '20px' }}>
                                Bạn cần đăng nhập để hiển thị chức năng này
                            </div>
                        )
                }

            </div>
        </LayoutAccount>
    );
};

export default ChangePasswordPage;
