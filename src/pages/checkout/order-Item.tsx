import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useDispatch } from 'react-redux';

// Modules
import { getCart } from 'src/stores/checkout';
import { CartAPI } from 'src/helpers/services';
import { useDebounce } from 'src/helpers/hooks';
import { Utilities, Toastr } from 'src/helpers/utilities';

interface Props {
    item: any;
    i: number;
    // onChangeGift: any;
}

const OrderItem: React.FC<Props> = ({ item, i }) => {
    const dispatch = useDispatch();
    // const [isChangeQuantity, setisChangeQuantity] = useState(false);
    const [quantity, setQuantity] = useState(item.total_quantity);
    const debouncedSetQuantity = useDebounce(quantity, 300);

    /**
    * Change Quantity
    * @param {*} option_id
    * @param {*} event
    */
    const onChangeQuantity = ({ event }: any) => {
        let totalQuantity = parseInt(event.target.value, 0);
        if (totalQuantity === 0 || isNaN(totalQuantity)) {
            totalQuantity = 1;
            $(`input[name="quantity${i}"]`).val(totalQuantity);
        }
        if (!isNaN(totalQuantity)) {
            totalQuantity = totalQuantity < 0 ? 1 : totalQuantity;
            $(`input[name="quantity${i}"]`).val(totalQuantity);
            setQuantity(totalQuantity);
        }
    };

    /**
       * Remove Item
       * @param {*} item
       */
    const onRemoveItem = async (item: any) => {
        try {
            const ids = [];
            if (item?.campaignInfo) {
                const { option_id } = item.campaignInfo;
                ids.push(option_id, item.option_id);
            } else {
                ids.push(item.option_id);
            }
            if (ids.length) {
                for (const optionId of ids) {
                    await CartAPI.removeItem(
                        optionId
                    ).then((response) => {
                        if (response.code) {
                            Toastr.error(response.message);
                            return;
                        }
                    });
                }
                dispatch(getCart());
            }
        } catch (ex: any) {
            throw Error(ex);
        }
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

    useEffect(
        () => {
            if (debouncedSetQuantity && item?.is_changed) {
                CartAPI.updateItem({
                    option_id: item.option_id,
                    total_quantity: debouncedSetQuantity
                }).then((response) => {
                    if (response.code) {
                        Toastr.error(response.message);
                        setQuantity(item.total_quantity);
                        $(`input[name="quantity${i}"]`).val(item.total_quantity);
                        return;
                    }

                    // Success
                    item.is_changed = false;
                    dispatch(getCart());
                });
            }
        },
        [debouncedSetQuantity] // Only call effect if debounced chang quantity term changes
    );

    return (
        <>
            <tr key={item.option_id}>
                <td className='td-item-product'>
                    {
                        item?.campaignInfo?.id
                            ? (
                                <div className='campaign-title'>
                                    <img src='/media/images/ic-gift.svg' alt='cocolux' />
                                    <span>{item.campaignInfo?.name} - Mua {Utilities.currencyPipe(item.campaignInfo?.min_value)} để nhận {item.campaignInfo?.min_quantity} quà tặng</span>
                                </div>
                            ) : null
                    }
                    <div className='ccs-cart-product'>
                        <div className='ccs-cart-product--thumb'>
                            <img
                                alt={item.name}
                                title={item.name}
                                src={Utilities.resizeImage(200, item.thumbnail_url)}
                            />
                        </div>
                        <div className='ccs-cart-product--body'>
                            <h5 className='ccs-cart-product--body__subtitle'>{item.name}</h5>
                        </div>
                    </div>
                    {
                        item.campaignInfo?.id
                            ? (
                                <div className='ccs-cart-gift'>
                                    <div className='gift__thumb'>
                                        <img
                                            alt={item.campaignInfo?.name}
                                            title={item.campaignInfo?.name}
                                            src={Utilities.resizeImage(100, item.campaignInfo?.thumbnail_url)}
                                        />
                                    </div>
                                    <div className='gift__info'>
                                        <div className='gift-info__name'>
                                            <span>QUÀ TẶNG</span>
                                            <span>SỐ LƯỢNG: {item.campaignInfo?.total_quantity}</span>
                                            {/* <span onClick={() => {
                                                const params = {
                                                    id: item.id,
                                                    name: item.name,
                                                    option_id: item.option_id
                                                };
                                                onChangeGift({
                                                    ...item.campaignInfo,
                                                    params: params
                                                });
                                            }}>
                                                ĐỔI QUÀ KHÁC
                                            </span> */}
                                        </div>
                                        <span className='gift-info__name'>
                                            {item.campaignInfo?.item_name}
                                        </span>
                                    </div>
                                </div>
                            ) : null
                    }
                </td>
                <td className='td-item-price'>
                    {
                        fetchItemDeal(item)
                            ? (
                                <p className='price-max'>
                                    {Utilities.currencyPipe(
                                        fetchPrice(item, 'normal_price')
                                    )}
                                </p>
                            )
                            : null
                    }
                    <p>{Utilities.currencyPipe(
                        !item?.campaign && fetchItemDeal(item)
                            ? fetchPrice(item)
                            : item.price
                    )}
                    </p>
                </td>
                <td>
                    <input
                        type='number'
                        min='1'
                        name={`quantity${i}`}
                        className='cart-input-qty'
                        defaultValue={item.total_quantity}
                        onChange={(event: any) => {
                            item.is_changed = true;
                            onChangeQuantity({ event });
                        }}
                    />
                </td>
                <td>{Utilities.currencyPipe(item.total_price)}</td>
                <td className='item-action'>
                    <a onClick={() => onRemoveItem(item)}>
                        Xoá
                    </a>
                </td>
            </tr>
        </>
    );
};

export default OrderItem;
