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
            Toastr.error('B???n ch??a c?? s???n ph???m n??o trong gi??? h??ng. H??y ti???p t???c mua s???m nh??!');
        }
    };

    return (
        <div className='coco-cart-wrap'>
            <Head>
                <title>Gi??? h??ng</title>
                <meta property='og:url' content='https://cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Cocolux - Chu???i c???a h??ng m??? ph???m ch??nh h??ng ch??m s??c da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - H??? th???ng m??? ph???m h??ng ?????u Vi???t Nam' />
            </Head>

            <div className='coco-cart-title'>Gi??? h??ng({total} s???n ph???m)</div>
            <div className='table-responsive'>
                <table className='ccs-table checkout-table'>
                    <thead>
                        <tr>
                            <th>S???n ph???m</th>
                            <th>Gi?? s???n ph???m</th>
                            <th>S??? l?????ng</th>
                            <th>Th??nh ti???n</th>
                            <th>Thao t??c</th>
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
                                            <span style={{ textAlign: 'center' }}>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng c???a b???n.</span>
                                        </td>
                                    </tr>
                                )
                        }
                        <tr className='ccs-cart-table--footer'>
                            <td colSpan={5} className='free-shipping'>
                                <img src='/media/images/ic-transpoter.svg' alt='mien-phi-van-chuyen' />
                                <span style={{ marginLeft: '10px' }}>
                                    Mi???n ph?? v???n chuy???n to??n qu???c cho ????n h??ng t??? 3 s???n ph???m ( 99k/SP)
                                    {/* <a href='/hoi-dap/phi-van-chuyen' target='_blank'> T??m hi???u th??m.</a> */}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='coco-cart-confirm'>
                <div className='cart-confirm--label'>
                    <div className='confirm--label_item'>
                        T???ng ti???n h??ng (<b>{total}</b> S???n ph???m):
                        <p>{order.total_price ? Utilities.currencyPipe(order.total_price) : 0}</p>
                    </div>
                    <div className='confirm--label_item'>
                        Nh???n th??m: <b className='text-danger'>{order.total_point || 0}</b> COCO COIN
                    </div>
                </div>
                <button
                    className='btn btn-danger btn-lg h-100'
                    onClick={() => onGoPayment()}
                >
                    Ti???n h??nh ?????t h??ng
                </button>
            </div>
        </div >
    );
};

export default CheckoutPage;
