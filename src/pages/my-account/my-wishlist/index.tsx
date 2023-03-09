import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

// Servide & Redux
import { getCart } from 'src/stores/checkout';
import { fetchWishlist } from 'src/stores/account';
import { setItemToWishlist } from 'src/stores/account/account-action';

// Components
import { Toastr, Utilities } from 'src/helpers/utilities';
import { LayoutAccount } from 'src/components/layout-group';
import { CartAPI } from 'src/helpers/services';
import { isNil } from 'lodash';

const WishlistPage = () => {
    // Declaration Redux
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state: any) => state.account);
    const { cartInfo } = useSelector((state: any) => state.checkout);
    const { data, count } = wishlist;

    // Declaration state
    const [listData, setListData] = useState([]);
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, []);

    useEffect(() => {
        const dataTransformed = data.map((oldItem: any = {}) => {
            const newItem = { ...oldItem };
            newItem.total_quantity = 0;
            newItem.stocks.map((stock: any = {}) => {
                if (stock.total_quantity > 0) {
                    newItem.total_quantity += stock.total_quantity;
                }
                return stock;
            });
            return newItem;
        });

        setTotalItem(count);
        setListData(dataTransformed);
    }, [count]);

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
     * Remove item wishlist
     * @param {*} product
     */
    const removeItem = (product: any) => {
        dispatch(setItemToWishlist(product));
    };

    return (
        <LayoutAccount>
            <div className='content-title'>
                Danh sách yêu thích
                <span>({totalItem} sản phẩm)</span>
            </div>
            <div className='content-detail'>
                <table className='ccs-table account-table list-follow-table'>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Trạng thái</th>
                            <th>Đơn giá</th>
                            <th></th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listData.length > 0
                                ? (
                                    listData.map((item: any = {}, index: number) => (
                                        <tr key={index}>
                                            <td className='item-product'>
                                                <Link href={{ pathname: '/product', query: { slug: item.slug } }} as={`/${item.slug}`}>
                                                    <a className='ccs-cart-product'>
                                                        <div className='ccs-cart-product--thumb'>
                                                            <img src={item.images[0]} alt={item.name} title={item.name} />
                                                        </div>
                                                        <div className='ccs-cart-product--body'>
                                                            <h5 className='ccs-cart-product--body__title'>{item.brand || 'Coco'}</h5>
                                                            <p
                                                                className='ccs-cart-product--body__subtitle'
                                                                title='Son Kem Lì M.O.I S-Girls 03 Sexy'
                                                            >
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td>
                                                {item.total_quantity > 5 ? 'Còn hàng' : 'Hết hàng'}
                                            </td>
                                            <td className='item-price'>
                                                <p>{Utilities.currencyPipe(item.price)}</p>
                                                {
                                                    item.discount_rate
                                                        ? <p>{Utilities.currencyPipe(item.price_max)}</p>
                                                        : <p></p>
                                                }
                                            </td>
                                            <td style={{ width: '20%' }}>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => onAddToCart(item)}
                                                >
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </td>
                                            <td className='item-action'>
                                                <a onClick={() => removeItem(item)}>
                                                    <img src='/media/images/ic-delete.svg' alt='delete' />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )
                                : (
                                    <tr>
                                        <td colSpan={5}>
                                            <span style={{ textAlign: 'center' }}>Bạn chưa có sản phẩm nào trong danh sách yêu thích.</span>
                                        </td>
                                    </tr>
                                )
                        }
                        <tr className='tr-bottom'>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </LayoutAccount>
    );
};

export default WishlistPage;
