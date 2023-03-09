import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, omitBy, pick } from 'lodash';
import moment from 'moment';

// Form
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Service
import { Toastr } from 'src/helpers/utilities';
import { AccountAPI, UploadAPI } from 'src/helpers/services';

// Components
import { LayoutAccount } from 'src/components/layout-group';
import { User } from 'src/helpers/models';

const ProfilePage = () => {
    // Declaration State & Redux
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [profileState, setProfileState] = useState<User>({} as any);
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    /**
     * Fetch account
     * @private
     */
    useEffect(() => {
        const handleFecthProfile = async () => {
            await AccountAPI.me()
                .then((respone: any) => {
                    const { data } = respone;
                    setProfileState(
                        {
                            ...respone.data,
                            birthday: data.birthday
                                ? moment.unix(data.birthday).format('YYYY-MM-DD')
                                : null
                        }
                    );
                });
        };

        // Handle Request
        handleFecthProfile();
    }, []);

    /**
     * Upload image
     * @param {*} event
     */
    const onUploadImage = async (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append('file', event.target.files[0]);

            // submit request
            await UploadAPI.single(
                UploadAPI.UPLOAD_CUSTOMER,
                formData,
            ).then((res: any) => {
                if (res.code) {
                    setErrorMessage(res.message);
                    return null;
                }

                setProfileState({
                    ...profileState,
                    avatar: res.url
                });
            }).catch((ex: any) => {
                throw new Error(ex);
            });
        }
    };

    /**
     * Update profile user
     * @param {*} values
     */
    const onUpdateProfile = async (values: any) => {
        if (values) {
            const valueTranformed = omitBy(values, isEmpty);
            const paramChanged = pick(
                valueTranformed,
                [
                    'name',
                    'avatar',
                    'email',
                    'gender',
                    'birthday',
                    'address'
                ]
            );
            // Submit data
            const response = await AccountAPI.editProfile(paramChanged);

            if (response.code) {
                setErrorMessage(response.message);
                return null;
            }

            // Success
            Toastr.success('Cập nhật thông tin thành công');
        }
        return null;
    };

    return (
        <LayoutAccount>
            <div className='content-title'>
                Thông tin tài khoản
            </div>
            {
                isUserLoggedIn
                    ? (
                        <Formik
                            // validationSchema={profileValidation}
                            initialValues={profileState}
                            enableReinitialize={true}
                            onSubmit={values => onUpdateProfile(values)}
                        >
                            <Form>
                                <div className='content-detail account-detail'>
                                    <div className='account-detail--left'>
                                        {
                                            profileState.avatar
                                                ? (
                                                    <div className='avatar'>
                                                        <img src={profileState.avatar} alt={profileState.name} />
                                                    </div>
                                                )
                                                : (
                                                    <div className='avatar non-avatar'>
                                                        <img src='/media/images/ic-lazy-load.svg' alt='avatar' />
                                                    </div>
                                                )
                                        }
                                        <label className='btn btn-secondary' style={{ marginTop: '10px' }}>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                name='avatar'
                                                onChange={(e: any) => onUploadImage(e)}
                                                style={{ width: '0', opacity: '0' }}
                                            />
                                            Chọn ảnh
                                        </label>
                                    </div>
                                    <div className='account-detail--right form'>
                                        <div>
                                            {
                                                errorMessage &&
                                                <span className='error-message'>{errorMessage}</span>
                                            }
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>
                                                Họ và tên
                                            </label>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='name'
                                                    className='form-control'
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>
                                                <div className='group-labels'>
                                                    Số điện thoại
                                                    {/* <a
                                                        className='btn-edit'
                                                        onClick={() => onShowChangePhoneModal()}
                                                    >
                                                        Chỉnh sửa
                                                    </a> */}
                                                </div>
                                            </label>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='phone'
                                                    disabled='disabled'
                                                    className='form-control'
                                                    placeholder='Nhập số điện thoại'
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>
                                                <div className='group-labels'>
                                                    Email
                                                </div>
                                            </label>
                                            <div className='form-input'>
                                                <Field
                                                    type='email'
                                                    name='email'
                                                    className='form-control'
                                                    placeholder='Nhập địa chỉ email'
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group radio-group'>
                                            <label className='form-label'>
                                                Giới tính:
                                            </label>
                                            <div className='form-radio'>
                                                <div className='ccs-radio'>
                                                    <label>
                                                        <Field
                                                            type='radio'
                                                            name='gender'
                                                            value='male'
                                                        />
                                                        Nam
                                                        <span></span>
                                                    </label>
                                                </div>
                                                <div className='ccs-radio'>
                                                    <label>
                                                        <Field
                                                            type='radio'
                                                            name='gender'
                                                            value='female'
                                                        />
                                                        Nữ
                                                        <span></span>
                                                    </label>
                                                </div>
                                                <div className='message'>
                                                    <ErrorMessage name='gender' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>Ngày sinh</label>
                                            <div className='form-input'>
                                                <Field
                                                    type='date'
                                                    name='birthday'
                                                    className='form-control'
                                                    min='1000-01-01'
                                                    max='3029-12-31'
                                                />
                                            </div>
                                            <div className='message'>
                                                <ErrorMessage name='birthday' />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>Địa chỉ</label>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='address'
                                                    className='form-control'
                                                />
                                            </div>
                                            <div className='message'>
                                                <ErrorMessage name='address' />
                                            </div>
                                        </div>
                                        <button
                                            type='submit'
                                            className='btn btn-secondary w-100'
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    )
                    :
                    (
                        <div className='bg-white' style={{ textAlign: 'center', padding: '20px' }}>
                            Bạn cần đăng nhập để hiển thị chức năng này
                        </div>
                    )
            }

        </LayoutAccount >
    );
};

export default ProfilePage;
