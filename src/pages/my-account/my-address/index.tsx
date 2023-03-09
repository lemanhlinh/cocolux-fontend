import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Service, Helper & Redux
import { listAddress } from 'src/stores/account';
import { addUserAddressdForm } from 'src/stores/layout';
import { AccountAPI } from 'src/helpers/services';
import { Toastr } from 'src/helpers/utilities';

// Components
import { LayoutAccount } from 'src/components/layout-group';

const MyAddressPage = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { address } = useSelector((state: any) => state.account);

    // Declaration state
    const [listData, setListData] = useState<[]>([]);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isDeleteAddres, setIsDeleteAddress] = useState<boolean>(true);
    /**
     * Fetch Address
     * @private
     */
    useEffect(() => {
        if (isFirstLoad) {
            dispatch(listAddress());
        }

        const { data } = address;
        setFirstLoad(false);
        setListData(data);
    }, [address]);

    useEffect(() => {
        if (!isDeleteAddres) {
            dispatch(listAddress());
        }
    }, [isDeleteAddres]);
    /**
     * Show Address Form
     * @private
     */
    const onShowAddressForm = () => {
        dispatch(addUserAddressdForm(true, 'create'));
    };

    /**
     * Show Modal Edit
     * @param {*} addressId
     */
    const onShowEditModal = async (addressId: string) => {
        try {
            await AccountAPI.detailAddress(addressId)
                .then((respone: any) => {
                    if (!respone.code) {
                        dispatch(addUserAddressdForm(true, 'edit', respone.data));
                    }
                });
        } catch (ex) {
            throw Error(ex);
        }
    };

    /**
     * Change Default Address
     * @param {*} addressId
     */
    const onSetDefault = async (addressId: number) => {
        const response = await AccountAPI.editAddress(
            addressId,
            {
                is_default: true
            }
        );
        if (response.code) {
            setErrorMessage(response.message);
        }

        // handle success
        const newListData = [
            ...listData
        ];
        setListData(
            newListData.map((element: any = {}) => {
                const newElement = { ...element };
                newElement.is_default = element.id === addressId;
                return newElement;
            }) as []
        );
        Toastr.success('Thiết lập địa chỉ mặc định thành công');
    };

    /**
     * Delete address
     * @param addressId
     */
    const deleteAddress = async (addressId: string) => {
        const response = await AccountAPI.deleteAddress(addressId);
        if (response.code) {
            setErrorMessage(response.message);
        }
        setIsDeleteAddress(false);
        Toastr.success('Xoá địa chỉ thành công');
        setIsDeleteAddress(true);
    };

    return (
        <LayoutAccount>
            <div className='content-title'>
                Thông tin tài khoản
            </div>
            <div className='content-detail address-detail'>
                <button
                    className='btn btn-lg btn-light w-100'
                    onClick={() => onShowAddressForm()}
                >
                    <img src='/media/images/ic-add-blue.svg' alt='cocolux' />
                    Thêm địa chỉ mới
                </button>
                <div className='list-addresses'>
                    {
                        listData.map((item: any = {}) => (
                            <div className='address-item' key={item.id}>
                                <div className='block-left'>
                                    <div className='user-info'>
                                        <span>{item.name}</span>
                                        <div className='address-config' style={{ display: item.is_default ? '' : 'none' }}>
                                            <img src='/media/images/ic-flag.svg' alt='cocolux' />
                                            <span>Địa chỉ mặc định</span>
                                        </div>
                                    </div>
                                    <div className='address-info'>
                                        <div className='info-detail'>
                                            Địa chỉ:
                                            <span> {item.address}</span>
                                        </div>
                                        <div className='info-detail'>
                                            Điện thoại:
                                            <span> {item.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='block-right'>
                                    <div className='action-group'>
                                        <button
                                            className='btn btn-google'
                                            onClick={() => onShowEditModal(item.id)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => deleteAddress(item.id)}
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                    {
                                        !item.is_default
                                            ? (
                                                <button
                                                    className='btn btn-outlined'
                                                    onClick={() => onSetDefault(item.id)}
                                                >
                                                    Đặt làm địa chỉ mặc định
                                                </button>
                                            ) : null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='error-message'>
                    {errorMessage && <span>{errorMessage}</span>}
                </div>
            </div>
        </LayoutAccount >
    );
};

export default MyAddressPage;
