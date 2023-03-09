import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';

// Service & Redux
import { listOrders } from 'src/stores/account';
import { AccountAPI } from 'src/helpers/services';

// Component
import { LayoutAccount } from 'src/components/layout-group';

const MyCoin = () => {
    // Declaration redux
    const dispatch = useDispatch();
    const { orders } = useSelector((state: any) => state.account);

    // Declaration state
    const [profile, setProfileState] = useState<any>({});

    /**
     * Fetch account
     * @private
     */
    useEffect(() => {
        async function handleFecthProfile() {
            await AccountAPI.me()
                .then((res: any) => {
                    setProfileState(res.data);
                });
        }

        // Handle Request
        dispatch(listOrders());
        handleFecthProfile();
    }, []);

    return (
        <LayoutAccount>
            <div className='content-title'>
                Quản lý COCO COIN
            </div>
            <div className='content-detail my-coin-detail'>
                <div className='total-coin'>
                    <img src='/media/images/ic-coin.svg' alt={profile.name} />
                    <div className='coin-value'>{profile.total_point || 0}</div>
                    <span>Bạn có {profile.total_point || 0} COCO COIN trong tài khoản của bạn, 1000 cococoin = 1000vnđ</span>
                </div>
            </div>
            <div className='content-title mt-25'>
                Lịch sử COCO COIN
            </div>
            <div className='content-detail'>
                <table className='ccs-table account-table coin-history-table'>
                    <thead>
                        <tr>
                            <th style={{ width: '300px' }}>Mã đơn hàng</th>
                            <th style={{ width: '200px' }}>Ngày mua</th>
                            <th style={{ width: '200px' }}>COCO COIN</th>
                            <th style={{ width: '200px' }}>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.data.length > 0
                                ? (
                                    orders.data.map((order: any = {}) => {
                                        if (order.status === 'completed' && order.type === 'retail') {
                                            return (
                                                <tr key={order.id}>
                                                    <td>
                                                        <a>{order.order ? order.order.id : order.id}</a>
                                                    </td>
                                                    <td>{moment.unix(order.created_at).format('YYYY-MM-DD')}</td>
                                                    <td>{order.total_point}</td>
                                                    <td>{order.status_name}</td>
                                                </tr>
                                            );
                                        }

                                    })
                                )
                                : (
                                    <tr className='tr-bottom'>
                                        <td colSpan={4}>
                                            Bạn chưa có đơn hàng nào.
                                            Trở thành thành viên của Cocolux với chỉ 1 đơn hàng để nhận nhiều ưu đãi!
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </LayoutAccount>
    );
};

export default MyCoin;
