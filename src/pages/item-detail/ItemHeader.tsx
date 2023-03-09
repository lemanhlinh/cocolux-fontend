import { useDispatch } from 'react-redux';
// import $ from 'jquery';

// Modules
import { addItem } from 'src/stores/checkout';
import { ProductOption } from 'src/helpers/models';
import { Utilities } from 'src/helpers/utilities';

interface Props {
    option: ProductOption;
}

const ItemHeader: React.FC<Props> = ({ option }) => {
    const dispatch = useDispatch();

    /**
     * Change Tab
     * @param {*} tabIndex
     */
    // const onChangeTab = (tabIndex: string) => {
    //     $('html, body').animate({
    //         scrollTop: ($(`#${tabIndex}`) as any).offset().top - 120
    //     }, 300);
    // };

    /**
     * Add To Cart
     * @param {*} payload
     */
    const addToCart = async (payload: ProductOption) => {
        dispatch(
            addItem({
                id: payload.id,
                name: payload.name,
                price: payload.price,
                images: payload.images,
                // price_max: payload.price_max,
                option_id: payload.option_id,
                total_quantity: payload.total_quantity,
                campaign_option_id: payload.campaign_option_id
            })
        );
    };

    return (
        <>
            <div className='product-quick-navigation'>
                <div className='fixed-cart-bar'>
                    <div className='container'>
                        <div className='image'>
                            <img src={Utilities.resizeImage(200, option.images[0])} alt={option.name} title={option.name} />
                        </div>
                        <div className='product-details'>
                            <h3 className='product-name'>{option.name}</h3>
                            <p className='product-price'>{Utilities.currencyPipe(option.price)}</p>
                        </div>
                        {
                            option.total_final_quantity > 0
                                ? (
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => addToCart(option)}>
                                        Thêm vào giỏ
                                    </button>
                                )
                                : null
                        }
                    </div>
                </div>
            </div>
            <div className='product-header-mobile'>
                <button onClick={() => window.history.go(-1)} >
                    <img src='/media/images/ic-arrowback.svg' alt='/media/images/ic-arrowback.svg' />
                </button>
                <span className='header-product-name'>{option.name}</span>
            </div>
        </>
    );
};

export default ItemHeader;
