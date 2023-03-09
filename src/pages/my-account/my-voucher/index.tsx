import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Service & Redux
import { listVouchers } from 'src/stores/account';

// Components
import { LayoutAccount } from 'src/components/layout-group';
import Link from 'next/link';

const MyVoucher = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { vouchers } = useSelector((state: any) => state.account);
    // Declarations Reducer
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    /**
     * Get Orders
     * @private
     */
    useEffect(() => {
        dispatch(listVouchers());
    }, []);

    return (
        <LayoutAccount>
            <div className='content-title'>
                VOUCHER CỦA TÔI
            </div>
            <div className='content-detail voucher-container'>
                <div className='list-vouchers'>
                    {
                        isUserLoggedIn
                            ? (
                                <div className='vouchers-collection'>
                                    {
                                        vouchers.data.length > 0
                                            ? (
                                                vouchers.data.map((voucher: any = {}) => (
                                                    <div className='voucher-item' key={voucher.id}>
                                                        <div className='voucher-logo'>
                                                            <img src={voucher.thumbnail_url} alt='cocolux' />
                                                        </div>
                                                        <div className='voucher-info'>
                                                            <div className='voucher-info--title'>{voucher.name}</div>
                                                            <div className='voucher-info--time'>{voucher.description}</div>
                                                            {/* <button className='btn btn-light btn-outline-danger'>
                                                                {
                                                                    voucher.is_multiple
                                                                        ? 'Áp dụng sử dụng chung với các voucher'
                                                                        : 'Chỉ áp dụng cho 1 voucher duy nhất'
                                                                }
                                                            </button> */}
                                                            <div className='voucher-info--actions mt-1'>
                                                                <Link href='/checkout/payment'>
                                                                    <a>
                                                                        Dùng ngay
                                                                        <img src='/media/images/ic-back-red.svg' alt={voucher.name} />
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Bạn chưa có vouncher nào trong ví.</div>
                                            )
                                    }
                                </div>
                            )
                            : (
                                <div className='bg-white' style={{ textAlign: 'center', padding: '20px' }}>
                                    Bạn cần đăng nhập để hiển thị chức năng này
                                </div>
                            )
                    }

                </div>

            </div>
        </LayoutAccount >
    );
};

export default MyVoucher;
