import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';

// Service & Redux
import { listOrders } from 'src/stores/account';
import { Utilities } from 'src/helpers/utilities';

// Component
import { LayoutAccount } from 'src/components/layout-group';

const OrderPage = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { orders } = useSelector((state: any) => state.account);

    // Declarations Reducer
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    // Declaration State
    const [listAll, setListOrder] = useState([]);
    const [curentTab, setCurrentTab] = useState(0);
    const listTab = [
        {
            id: 0,
            name: 'CHỜ XÁC NHẬN'
        },
        {
            id: 1,
            name: 'ĐANG XỬ LÍ'
        },
        {
            id: 2,
            name: 'ĐANG GIAO'
        },
        {
            id: 3,
            name: 'ĐÃ GIAO'

        },
        {
            id: 4,
            name: 'ĐÃ HỦY'
        },
    ];

    /**
     * Get Orders
     * @private
     */
    useEffect(() => {
        dispatch(listOrders());
    }, []);

    /**
     * Handle Data Change
     */
    useEffect(() => {
        const { data } = orders;
        setListOrder(data.map((order: any) => order));
    }, [orders]);

    return (
        <>
            <LayoutAccount>
                <div className='content-title'>
                    Đơn hàng của tôi
                </div>
                <div className='content-detail'>
                    <div className='nav-container'>
                        <ul className='nav-group order-tab-list'>
                            {
                                listTab.map((item: any, index: number) => (
                                    <li
                                        key={index}
                                        onClick={() => { setCurrentTab(item.id); }}
                                        className={`nav-item ${curentTab === item.id ? 'nav-active' : ''}`}
                                    >
                                        <a>{item.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        isUserLoggedIn
                            ? (
                                <div className='tab-panel'>
                                    <div className='table-responsive'>
                                        <table id='orderAll' className='ccs-table account-table list-order-table'>
                                            <thead>
                                                <tr>
                                                    <th>Mã đơn hàng</th>
                                                    <th>Ngày mua</th>
                                                    <th>Tổng tiền</th>
                                                    <th>Giảm giá</th>
                                                    <th>Thành tiền</th>
                                                    <th>Trạng thái đơn hàng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listAll.map((item: any = {}, index: number) => {
                                                        switch (curentTab) {
                                                            case 0: {
                                                                if (item.status === 'draft' && item.type === 'order') {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className='order-code'>
                                                                                <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${item.id}`}>
                                                                                    <a>
                                                                                        {item.code}
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                {moment.unix(item.created_at).format('MM/DD/YYYY')}
                                                                            </td>
                                                                            <td>{Utilities.currencyPipe(item.total_price_before_discount)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_discount_value)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_price)}</td>
                                                                            <td>{item.status_name}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                            case 1: {
                                                                if (item.status === 'processing' && item.type === 'order') {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className='order-code'>
                                                                                <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${item.id}`}>
                                                                                    <a>
                                                                                        {item.code}
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                {moment.unix(item.created_at).format('MM/DD/YYYY')}
                                                                            </td>
                                                                            <td>{Utilities.currencyPipe(item.total_price_before_discount)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_discount_value)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_price)}</td>
                                                                            <td>{item.status_name}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                            case 2: {
                                                                if (item.status === 'processing' && item.type === 'retail') {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className='order-code'>
                                                                                <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${item.id}`}>
                                                                                    <a>
                                                                                        {item.code}
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                {moment.unix(item.created_at).format('MM/DD/YYYY')}
                                                                            </td>
                                                                            <td>{Utilities.currencyPipe(item.total_price_before_discount)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_discount_value)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_price)}</td>
                                                                            <td>{item.status_name}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                            case 3: {
                                                                if (item.status === 'completed' && item.type === 'retail') {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className='order-code'>
                                                                                <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${item.id}`}>
                                                                                    <a>
                                                                                        {item.code}
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                {moment.unix(item.created_at).format('MM/DD/YYYY')}
                                                                            </td>
                                                                            <td>{Utilities.currencyPipe(item.total_price_before_discount)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_discount_value)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_price)}</td>
                                                                            <td>{item.status_name}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                            case 4: {
                                                                if (item.type === 'order' && item.status === 'cancelled') {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className='order-code'>
                                                                                <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${item.id}`}>
                                                                                    <a>
                                                                                        {item.code}
                                                                                    </a>
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                {moment.unix(item.created_at).format('MM/DD/YYYY')}
                                                                            </td>
                                                                            <td>{Utilities.currencyPipe(item.total_price_before_discount)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_discount_value)}</td>
                                                                            <td>{Utilities.currencyPipe(item.total_price)}</td>
                                                                            <td>{item.status_name}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            }

                                                            default:
                                                                return null;
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                            : (
                                <div className='tab-panel bg-white' style={{ textAlign: 'center', padding: '20px' }}>
                                    Bạn cần đăng nhập để hiển thị chức năng này
                                </div>
                            )
                    }

                </div>
                {/* <ul>
                    {
                        listAll.map(element => (
                            <li key={element.id}>{element.id}</li>
                        ))
                    }
                </ul>

                <div>Chờ duyệt</div>
                <ul>
                    {
                        listPending.map(element => (
                            <li key={element.id}>{element.id}</li>
                        ))
                    }
                </ul> */}
            </LayoutAccount>
        </>
    );
};

export default OrderPage;
