import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

// Service & Redux
import { AccountAPI, CartAPI } from 'src/helpers/services';
import { getCart } from 'src/stores/checkout';

// Config & Helper
import { Toastr, Utilities, Regex } from 'src/helpers/utilities';

// Component
import { LayoutAccount } from 'src/components/layout-group';
import { isNil } from 'lodash';

const OrderDetailPage = () => {
    // Declaration Redux
    const router = useRouter();
    const dispatch = useDispatch();

    // Declaration State
    const [model, setModel] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { cartInfo } = useSelector((state: any) => state.checkout);

    const paymentMethods = (payments: any) => {
        const listPayments = payments?.length
            ? payments.map((i: any) => i.method_name)
            : [];
        return listPayments?.length
            ? listPayments.join(', ')
            : '';
    };

    const shippMethods = (value: number) => {
        switch (value) {
            case 1:
                return 'Giao hàng trong 48 giờ';
            case 2:
                return 'Tự đến lấy';
            case 3:
                return 'Giao hàng nhanh 2 giờ';
            default:
                break;
        }
        return null;
    };

    useEffect(() => {
        // Get order id by router
        const { slug } = router.query;

        // Handle fetch detail order
        const handleFecthDetail = async () => {
            await AccountAPI.detailOrder(
                slug.toString()
            ).then((res: any) => {
                if (res.code) {
                    Toastr.error('Mã đơn hàng không tồn tại !');
                    setIsLoading(false);
                }
                setModel(res.data || {});
            });
        };

        // Handle request
        handleFecthDetail();
    }, []);

    /**
     * Add Item Valid
     * @param item
     * @returns
     */
    const onAddItemValid = (item: any) => {
        if (
            !isNil(cartInfo) &&
            cartInfo?.products?.length
        ) {
            const oldItem = cartInfo?.products.find(
                (i: any) => i.campaign?.id && i.option_id === item.option_id
            );
            if (oldItem) {
                Toastr.error(
                    'Sản phẩm là quà tặng kèm trong giỏ hàng. Không thể thêm vào giỏ!'
                );
                return true;
            }
        }
        return false;
    };

    /**
  * Add To Cart
  * @param {*} payload
  */
    const onAddToCart = (payload: any) => {
        if (onAddItemValid(payload)) return;
        CartAPI.addItem(
            {
                id: payload.id,
                option_id: payload.option_id,
                total_quantity: 1,
            }
        ).then((reponse) => {
            if (reponse.code) {
                Toastr.error(reponse.message);
                return;
            }
            Toastr.success('Thêm Sản Phẩm Thành Công');
            dispatch(getCart());
        });
    };

    /**
     * Load Item Price
     * @param _product
     */
    const fetchPrice = (_product: any, type = 'price') => {
        const item = Utilities.getCurrentPriceItem(_product);
        return type === 'price'
            ? item.price
            : item.normal_price;
    };

    /**
     * Load Item Deal
     * @param _product
     */
    const fetchItemDeal = (_product: any) => {
        const currentDeal = Utilities.getCurrentItemDeal(_product);
        return currentDeal && currentDeal.id && currentDeal.value
            ? true
            : false;
    };

    return (
        <LayoutAccount>
            {
                isLoading && model.products
                    ? (
                        <section>
                            <div className='order-detail-title'>
                                Chi tiết đơn hàng:
                                <span> {model.code}</span>
                                <span> - {model.status_name}</span>
                            </div>
                            <div className='order-detail-time'>
                                Ngày đặt hàng: {moment.unix(model.created_at).format('MM/DD/YYYY HH:mm:ss')}
                            </div>
                            <div className='content-detail'>
                                <table className='ccs-table account-table order-detail-table'>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Giảm giá</th>
                                            <th>Tạm tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            model.products
                                                ? (
                                                    model.products.map((product: any = {}, index: number) => (
                                                        <tr key={index}>
                                                            <td className='item-product'>
                                                                <div className='ccs-cart-product'>
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/product',
                                                                            query: { slug: `${Regex.replaceAllSpecial(product.name)}-i.${product.id}` }
                                                                        }}
                                                                        as={`/${Regex.replaceAllSpecial(product.name)}-i.${product.id}`}
                                                                    >
                                                                        <a className='ccs-cart-product--thumb'>
                                                                            <img src={product.thumbnail_url} alt={product.thumbnail_url} />
                                                                        </a>
                                                                    </Link>
                                                                    <div className='ccs-cart-product--body'>
                                                                        <div className='ccs-cart-product--body__title'>{product.brand || 'Coco'}</div>
                                                                        <div
                                                                            className='ccs-cart-product--body__subtitle'
                                                                            title={product.name}>
                                                                            {product.name}
                                                                        </div>
                                                                        <div className='product-body-custom'>
                                                                            <div className='group-buttons'>
                                                                                <Link
                                                                                    href={{
                                                                                        pathname: '/product',
                                                                                        query: { slug: `${Regex.replaceAllSpecial(product.name)}-i.${product.id}` }
                                                                                    }}
                                                                                    as={`/${Regex.replaceAllSpecial(product.name)}-i.${product.id}`}
                                                                                >
                                                                                    <a style={{ textDecoration: 'none' }}>
                                                                                        <button className='btn btn-light btn-outline-danger'>Viết Đánh Giá</button>
                                                                                    </a>
                                                                                </Link>
                                                                                <button
                                                                                    className='btn btn-light btn-outline-danger'
                                                                                    onClick={() => onAddToCart({
                                                                                        id: product.id,
                                                                                        option_id: product.option_id,
                                                                                        total_quantity: 1
                                                                                    })
                                                                                    }
                                                                                >
                                                                                    Mua lại
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </td>
                                                            <td>
                                                                <div className='compare-price'>
                                                                    <span
                                                                        className='original-price'
                                                                        style={{ display: fetchItemDeal(product) ? '' : 'none' }}
                                                                    >
                                                                        {Utilities.currencyPipe(
                                                                            product?.total_discount_value > 0
                                                                                ? fetchPrice(product, 'normal_price')
                                                                                : product.normal_price
                                                                        )}
                                                                    </span>
                                                                    <span>
                                                                        {Utilities.currencyPipe(
                                                                            !product?.campaign && fetchItemDeal(product)
                                                                                ? fetchPrice(product)
                                                                                : product.price
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>{product.total_quantity}</span>
                                                            </td>
                                                            <td>
                                                                <span>0</span>
                                                            </td>
                                                            <td>
                                                                <span>{Utilities.currencyPipe(product.total_price)}</span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                                : null
                                        }
                                    </tbody>
                                </table>
                                <div className='order-summary'>
                                    <div className='order-detail'>
                                        <div className='item'>
                                            <span>Tạm tính:</span>
                                            <span>{Utilities.currencyPipe(model.total_price_before_discount)}</span>
                                        </div>
                                        <div className='item'>
                                            <span>Phí vận chuyển:</span>
                                            <span>{Utilities.currencyPipe(model.total_shipping_fee)}</span>
                                        </div>
                                        <div className='item' style={{ display: model.total_discount_value > 0 ? '' : 'none' }}>
                                            <span>Giảm giá:</span>
                                            <span>{Utilities.currencyPipe(model.total_discount_value)}</span>
                                        </div>
                                        <div className='item'>
                                            <span>Tổng cộng:</span>
                                            <span>{Utilities.currencyPipe(model.total_price)}</span>
                                        </div>
                                        {
                                            model?.payments &&
                                                model?.payments?.length
                                                ? (
                                                    model?.payments.map((payment: any) => {
                                                        let label = '';
                                                        switch (payment.method) {
                                                            case 8:
                                                                label = `Sử dụng voucher ${payment?.voucher?.code
                                                                    ? `(${payment?.voucher?.code})`
                                                                    : ''
                                                                    }`;
                                                                break;
                                                            case 9:
                                                                label = `Sử dụng ${Utilities.currencyPipe(payment.value)?.replace('đ', '')} điểm`;
                                                                break;
                                                            default:
                                                                label = `Đã thanh toán ${payment?.method_name?.toLowerCase()}`;
                                                                break;
                                                        }
                                                        if (payment.value && payment.value !== '0') {
                                                            return (
                                                                <div
                                                                    key={payment.id}
                                                                    className='item'
                                                                >
                                                                    <span>
                                                                        {label}
                                                                    </span>
                                                                    {
                                                                        payment?.value > 0
                                                                            ? (
                                                                                <span>
                                                                                    - {Utilities.currencyPipe(payment?.value)}
                                                                                </span>
                                                                            )
                                                                            : (
                                                                                <span>0 </span>
                                                                            )
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                ) : null
                                        }
                                        <div className='item'>
                                            <span>Cần thanh toán:</span>
                                            <span>{Utilities.currencyPipe(model.total_unpaid)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='order-detail-info'>
                                <div className='title'>
                                    Thông tin đơn hàng
                                </div>
                                {
                                    model.deliveries && model.deliveries.length > 0
                                        ? (
                                            <div className='order-information'>
                                                <div className='block-left'>
                                                    <div className='order-title'>Địa chỉ nhận hàng</div>
                                                    <div className='order-address'>
                                                        <span>{model.deliveries[0].receiver_address}</span>
                                                        <span>{`Địa chỉ: ${model.deliveries[0].receiver_address || ''} `}</span>
                                                        <span>Điện thoại: {model.deliveries[0].receiver_phone}</span>
                                                    </div>
                                                </div>
                                                <div className='block-right'>
                                                    <div>
                                                        <span className='highlight'>Phương thức vận chuyển</span>
                                                        <span>{shippMethods(+model.deliveries[0].service_id)}</span>
                                                    </div>
                                                    <div>
                                                        <span className='highlight'>HÌNH THỨC THANH TOÁN</span>
                                                        <span>{model.payments && paymentMethods(model.payments)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className='order-information'>
                                                <div className='block-left'>
                                                    <div className='order-title'>Địa chỉ nhận hàng</div>
                                                </div>
                                                <div className='block-right'>
                                                    <div>
                                                        <span className='highlight'>Phương thức vận chuyển</span>
                                                    </div>
                                                    <div>
                                                        <span className='highlight'>HÌNH THỨC THANH TOÁN</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </section>
                    )
                    : (
                        <div className='not-found-message'>
                            <span>Mã đơn hàng không tồn tại !</span>
                        </div>
                    )
            }
        </LayoutAccount >
    );
};

export default OrderDetailPage;
