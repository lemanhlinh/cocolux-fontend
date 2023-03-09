/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

// Modules
import { Utilities, Toastr } from 'src/helpers/utilities';
import { getCart } from 'src/stores/checkout';

// Components
import OrderItem from './order-Item';


const CheckoutPage = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const [order, setOrderInfo] = useState<any>({});
    const [total, setTotalQuantity] = useState<number>(0);
    const { cartInfo, totalQuantity } = useSelector((state: any) => state.checkout);

    /**
     * Lifecycle
     * @hooks
     */
    useEffect(() => {
        dispatch(getCart());
    }, []);

    /**
     * Load data
     * @private
     */
    useEffect(() => {
        setTotalQuantity(totalQuantity);
        setOrderInfo({ ...cartInfo, products: transformItems(cartInfo.products) });
    }, [cartInfo]);


    /**
     * Transform
     */
    const transformItems = (items = []) => {
        return items
            .filter(
                (i: any) => !i.campaign
            ).map((item: any) => {
                const campaignItem = items.find(
                    (option: any) => option.campaign &&
                        option.campaign?.master_id === item.id &&
                        option.campaign?.master_option_id === item.option_id
                ) as any;
                if (campaignItem) {
                    item.campaignInfo = {
                        ...campaignItem?.campaign,
                        item_name: campaignItem.name,
                        thumbnail_url: campaignItem.thumbnail_url,
                        total_quantity: campaignItem.total_quantity
                    };
                }
                return item;
            });
    };

    /**
     * Go To Payment
     * @private
     */
    const onGoPayment = () => {
        if (order.products && order.products?.length) {
            Router.push('/checkout/payment');
        } else {
            Toastr.error('Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy tiếp tục mua sắm nhé!');
        }
    };

    return (
        <div className='coco-cart-wrap'>
            <Head>
                <title>Giỏ hàng</title>
                <meta property='og:url' content='https://cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>

            <div className='coco-cart-title'>Giỏ hàng({total} sản phẩm)</div>
            <div className='table-responsive'>
                <table className='ccs-table checkout-table'>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.products && order.products.length
                                ? (
                                    order.products.map((item: any = {}, index: number) => (
                                        <OrderItem
                                            item={item}
                                            key={index}
                                            i={index}
                                        />
                                    ))
                                )
                                : (
                                    <tr>
                                        <td colSpan={5}>
                                            <span style={{ textAlign: 'center' }}>Không có sản phẩm nào trong giỏ hàng của bạn.</span>
                                        </td>
                                    </tr>
                                )
                        }
                        <tr className='ccs-cart-table--footer'>
                            <td colSpan={5} className='free-shipping'>
                                <img src='/media/images/ic-transpoter.svg' alt='mien-phi-van-chuyen' />
                                <span style={{ marginLeft: '10px' }}>
                                    Miễn phí vận chuyển toàn quốc cho đơn hàng từ 3 sản phẩm ( 99k/SP)
                                    {/* <a href='/hoi-dap/phi-van-chuyen' target='_blank'> Tìm hiểu thêm.</a> */}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='coco-cart-confirm'>
                <div className='cart-confirm--label'>
                    <div className='confirm--label_item'>
                        Tổng tiền hàng (<b>{total}</b> Sản phẩm):
                        <p>{order.total_price ? Utilities.currencyPipe(order.total_price) : 0}</p>
                    </div>
                    <div className='confirm--label_item'>
                        Nhận thêm: <b className='text-danger'>{order.total_point || 0}</b> COCO COIN
                    </div>
                </div>
                <button
                    className='btn btn-danger btn-lg h-100'
                    onClick={() => onGoPayment()}
                >
                    Tiến hành đặt hàng
                </button>
            </div>
        </div >
    );
};

export default CheckoutPage;
