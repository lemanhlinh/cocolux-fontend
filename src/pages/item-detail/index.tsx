import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, includes, isNil, minBy } from 'lodash';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import $ from 'jquery';

//  Modules
import { CartAPI, ConfigAPI, ItemAPI, CampaignAPI } from 'src/helpers/services';
import { fetchWishlist, setItemToWishlist } from 'src/stores/account';
import { ITEM_LIST_TAB } from 'src/helpers/constants/layout';
import { Toastr, Utilities } from 'src/helpers/utilities';
import { addProductFollowForm } from 'src/stores/layout';
import { ProductOption } from 'src/helpers/models';
import { getCart } from 'src/stores/checkout';

// Components
import { LazyLoadProductDetail } from 'src/components/loading-group';
import { Breadcrumb } from 'src/components/base-group';
import ItemFlashSaleEvent from './ItemFlashSaleEvent';
import ItemStockBoxMobile from './ItemStockBoxMobile';
import ItemProgressEvent from './ItemProgressEvent';
import ItemListStartRating from './ListStarRating';
import ItemPreviewImage from './ItemPreviewImage';
import ItemListCampaign from './ListCampaign';
import ItemZoomImage from './ItemZoomImage';
import ListBrandItem from './ListBrandItem';
import ItemListCoupon from './ListCoupon';
import ItemListOption from './ListOption';
import NotFoundPage from '../not-found';
import ItemHeader from './ItemHeader';

interface Props {
    data: any;
}

const ItemDetailPage: NextPage<Props> = ({ data }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mobileDevices = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/;
    const { cartInfo } = useSelector((state: any) => state.checkout);
    const { wishlist } = useSelector((state: any) => state.account);
    // const { data, isEmpty } = useSelector((state: any) => state.product);
    const [countStore, setCountStore] = useState<any>({ count: 0, total: 0 });
    const [isWishlisted, setWishListState] = useState<boolean>(false);
    const [isVideoVisible, setVideoVisible] = useState<boolean>(true);
    const [isShowPreview, setModalPreview] = useState<boolean>(false);
    const [isLoadHeight, setLoadHeight] = useState<boolean>(true);
    const [contentClass, setContentClass] = useState<string>('');
    const [option, setOption] = useState<ProductOption>({} as any);
    const [thumbnail, setThunbmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [breadCums, setBreadCum] = useState<any>([]);
    const [listTabs, setListTab] = useState<any>([]);
    const [campaign, setCampaign] = useState<any>({});
    const [stores, setStores] = useState<[]>([] as []);
    const [stocks, setStocks] = useState<[]>([] as []);
    const [currentTab, setCurrentTab] = useState(999);
    const [reactPixel, setReactPixel] = useState<any>();

    const isEmpty = false;
    if(!data){
        const isEmpty = true;
    }
    /**
     * Scroll
     * @hooks
     */
    useEffect(() => {
        const ReactPixel = require('react-facebook-pixel');
        ReactPixel.default.init('119758555309111');
        setReactPixel(ReactPixel);

        window.addEventListener(
            'scroll', handleScroll
        );
        return () => {
            // console.log('unmounted item component');
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /**
     * Transform
     * @hooks
     */
    useEffect(() => {
        // Load breadcums
        if (data.categories) {
            const items = [] as any;
            data.categories.map((cate: any) => {
                // Add categories breadcum
                items.push({
                    as: `/danh-muc/${cate.slug}`,
                    href: '/danh-muc/[slug]',
                    name: cate.name
                });
            });

            // Add product breadcum
            items.push({
                as: `/${data.meta_url}`,
                href: '/item-detail',
                name: data.name
            });
            setBreadCum(items as any);
        }

        const listTabs = cloneDeep(ITEM_LIST_TAB);
        if (data.attributes && data.attributes?.length) {
            // Load detail brand
            const brand = data.attributes.find(
                (i: any) => i.value && i.name.toLowerCase() === 'thương hiệu'
            );
            if (brand && brand?.value) {
                data.brand = {
                    ...brand.value,
                    master_id: brand?.id
                };
            }

            // Load tab attribute
            data.attributes.forEach((attr: any) => {
                if (attr?.value?.type === 'ckeditor') {
                    const findAttr = listTabs.find(
                        (i: any) => i.name.toLowerCase() === String(attr.name).toLowerCase()
                    );
                    if (findAttr) {
                        findAttr.content = attr?.value?.name || '';
                    }
                }
            });
        }
        setListTab(listTabs);

        // Load video url
        if (data.video_url) {
            if (data.video_url && data.video_url.search('youtube') !== -1) {
                data.video_url = data.video_url.replace('watch?v=', 'embed/');
                setVideoVisible(true);
            }
        }

        // Load campaign
        if (!isNil(data.campaign)) {
            onGetDetailCampaign(
                data.campaign?.id
            );
        } else {
            setCampaign(null);
        }
    }, [data]);

    /**
     * Set default campaign item
     * @hooks
     */
    useEffect(() => {
        if (!isNil(campaign)) {
            const { applied_options } = campaign;
            if (applied_options?.length) {
                const options = campaign.applied_options.filter(
                    (o: any) => o.is_visible && o.campaign_status
                ) as [];
                if (options.length) {
                    const bestItem = minBy(options, 'normal_price') as any;
                    const optionId = !isNil(bestItem) && bestItem?.option_id;
                    setOption({ ...option, campaign_option_id: optionId });
                }
            }
        }
    }, [campaign]);

    /**
     * Fetch wishlist
     * @hooks
     */
    useEffect(() => {
        if (wishlist.data && !wishlist.data.length) {
            dispatch(fetchWishlist());
        }

        if (wishlist.data && wishlist.data.length) {
            const findOption = wishlist.data.find((o: any) => o.id === option.id);
            if (!findOption) setWishListState(false);
            else setWishListState(true);
        }

        if (!loading) {
            fetchStockQuantity(option);
        }
    }, [loading]);

    /**
     * Fetch option
     * @hooks
     */
    useEffect(() => {
        fetchOptionByIndex();
    }, [router]);

    /**
     * Add To Wishlist
     * @param {*} option - option
     */
    const addToWishList = (option: ProductOption) => {
        const newOption = option;
        newOption.option_id = option.id;
        newOption.id = option.parent_id;
        setWishListState(!isWishlisted);
        dispatch(setItemToWishlist(newOption));
        // reactPixel.init('119758555309111');
        reactPixel.default.track('AddToWishlist', newOption);
    };

    /**
     * Handle Scroll View
     * @private
     */
    const handleScroll = () => {
        const element = $('.product-quick-navigation');
        const tabMota = (document.getElementById('tab-mo-ta') as any);
        const detailPos = tabMota?.offsetTop;
        if (element) {
            if (window.pageYOffset > 150) {
                $(element).show();
            } else {
                $(element).hide();
            }
            if (window.pageYOffset > 685) {
                $(element).show();
            } else {
                $(element).hide();
            }
            if (window.pageYOffset > (detailPos + 90)) {
                $('.quick-tabs').show();
            } else {
                $('.quick-tabs').hide();
            }
        }
    };

    /**
     * Show Stock Popup
     */
    const onShowStockPopup = () => {
        const popup = ($('#instock-modal')) as any;
        popup.toggleClass('popup-show');
    };

    /**
     * Get Stores
     */
    const onGetStores = async () => {
        const response = await ConfigAPI.listStore(
            {
                skip: 0,
                limit: 100,
                statuses: 'active'
            }
        ) as any;
        if (!response.code) {
            const stores = response.data || [];
            setStores(stores);
            return stores;
        }
    };

    /**
     * Load Option
     * @param {*} index
     */
    const fetchOptionByIndex = () => {
        try {
            if (data.products) {
                const { slug } = router.query as any;
                const paramId = slug ? slug.split('-i.')[1] as string : null;
                const product = data.products.find(
                    (i: any) => i.sku === (paramId ? paramId : data.products[0].sku)
                );
                if (product && product.id) {
                    fetchCurrentDeal(product);
                    product.total_quantity = 1;
                    product.total_final_quantity = product.type === 'item'
                        ? onGetQuantity(product.stocks)
                        : 10;
                    onChangeThumbnail(product.images[0]);
                    setOption({ ...product });
                    fetchStockQuantity({
                        ...product
                    });
                    setLoading(false);
                }
            }
        } catch (error: any) {
            throw Error(error);
        }
    };

    /**
     * Load Current Deal
     * @param _product
     */
    const fetchCurrentDeal = (_product: ProductOption) => {
        // Get item price
        const item = Utilities.getCurrentPriceItem(_product as any);
        if (!isNil(item.price) && !isNil(item.normal_price)) {
            _product.price = item.price;
            _product.normal_price = item.normal_price;
        }

        // Get item deal
        const currentDeal = Utilities.getCurrentItemDeal(_product as any);
        if (!isNil(currentDeal) && currentDeal.id) {
            _product.current_deal = { ...currentDeal };
            data.deal_layer = currentDeal.image_layer;
        }
    };

    /**
     * Load Store
     * @returns
     */
    const fetchStockQuantity = async (item: any) => {
        try {
            let count = 0;
            let listStores = [];
            if (!stores?.length) {
                listStores = await onGetStores();
            } else {
                listStores = [...stores];
            }
            if (listStores?.length) {
                const _stores = listStores.map((store: any) => {
                    store.total_quantity = 0;
                    if (item.stocks && item.stocks?.length) {
                        const indexOf = item.stocks.findIndex(
                            (s: any) => s.id === store.id
                        );
                        if (indexOf !== -1) {
                            const stock = item.stocks[indexOf] as any;
                            store.total_quantity += stock.total_quantity;
                            if (store.total_quantity > 0) count += 1;
                        }
                    }
                    return store;
                });
                setCountStore({
                    count: count,
                    total: listStores?.length
                });
                const parseStores = onParseStores(
                    _stores as []
                );
                setStocks([...parseStores] as []);
            }
        } catch (ex) {
            throw ex;
        }
    };

    /**
     * Parse Stores
     * @param stores
     */
    const onParseStores = (stores: []) => {
        const districts: any = [];
        const provinces: any = [];
        if (stores.length) {
            stores.map((store: any) => {
                const provinceId = store?.province?.id;
                const districtId = store?.district?.id;
                const provinceCode = store?.province?.code;
                if (!provinces.find(
                    (i: any) => i.id === provinceId
                )) {
                    provinces.push(store.province);
                }
                if (!districts.find(
                    (i: any) => i.id === districtId
                )) {
                    districts.push({
                        ...store.district,
                        province_code: provinceCode,
                        stores: []
                    });
                }
            });
        }
        districts.map((i: any) => {
            const _stores: any = [];
            stores.map((s: any) => {
                if (i.code === s?.district?.code) {
                    _stores.push(s);
                }
            });
            i.stores = [..._stores];
            return i;
        });
        provinces.map((el: any) => {
            el.districts = [];
            for (const district of districts) {
                if (el.code === district.province_code) {
                    el.districts.push(district);
                }
            }
            return el;
        });
        return provinces;
    };

    /**
     * Render String To Html
     * @param {*} content
     */
    const renderStringToHtml = (content: string) => {
        const newContent = content || `<span class='no-content'>Không có nội dung hiển thị.</span>`;
        return { __html: newContent };
    };

    /**
     * Load Quantity From Stock
     * @param {*} index
     */
    const onGetQuantity = (stocks: any[]) => {
        let total = 0;
        stocks.map((stock: any) => total += stock.total_quantity);
        return total < 0 ? 0 : total;
    };

    /**
     * Change Tab
     * @param {*} tabIndex
     */
    const onChangeTab = (tabIndex: string) => {
        try {
            const tab = $(`#${tabIndex}`) as any;
            if (tab && tab?.length) {
                $('html, body').animate({
                    scrollTop: tab.offset().top - 120
                }, 300);
            }
        } catch (ex: any) {
            throw Error(ex);
        }
    };

    /**
     * Follow Item
     * @param {*} viq   sible
     */
    const onFollowItem = () => {
        dispatch(addProductFollowForm(true));
    };

    /**
     * Change Image
     * @param {*} image
     */
    const onChangeThumbnail = (image: string) => {
        setThunbmail(image);
        setVideoVisible(false);
    };

    /**
     * Get Content Height
     * @private
     */
    const onGetContentHeight = () => {
        const content = $('#content-description-panel') as any;
        if (content) {
            const height = content.height() as number;
            if (height && height > 500) {
                setContentClass('collapse');
            } else {
                setContentClass('');
            }
        }
    };

    /**
     * Show Video
     * @param url
     */
    const onShowVideo = () => {
        const url = data.video_url;
        if (url && url.search('youtube') !== -1) {
            data.video_url = url.replace('watch?v=', 'embed/');
            setVideoVisible(true);
        }
    };

    /**
     * Get Detail Campaign
     * @param campaignId
     */
    const onGetDetailCampaign = (campaignId: any) => {
        CampaignAPI.detail(
            campaignId
        ).then((response: any) => {
            if (response.code) {
                Toastr.error(
                    response.message
                );
                return;
            }
            // Handler success
            setCampaign(response.data);
        }).catch((error: any) => {
            throw Error(error);
        });
    };

    /**
     * Change Quantity
     * @param {*} event
     */
    const onChangeQuantity = (event: any) => {
        // tslint:disable-next-line: variable-name
        let totalQuantity = parseInt(event.target.value, 10);
        if (!isNaN(totalQuantity)) {
            totalQuantity = totalQuantity <= 0 ? 1 : totalQuantity;
            setOption({ ...option, total_quantity: totalQuantity });
            $('input[name="quantity"]').val(totalQuantity);
        }
    };

    /**
     * Check Event Gift
     * @returns
     */
    const checkEventGift = async () => {
        try {
            if (
                !isNil(campaign) &&
                !isNil(cartInfo) &&
                campaign.applied_items &&
                campaign.applied_items?.length &&
                cartInfo?.products?.length
            ) {
                const itemInDeals = campaign.applied_items.filter(
                    (i: any) => includes(
                        cartInfo?.products.map((p: any) => p.id), i.id
                    )
                ) as [];
                if (itemInDeals.length) {
                    const giftItem = cartInfo?.products.find(
                        (i: any) => i.campaign && i.campaign?.id === campaign.id
                    );
                    if (giftItem) {
                        // Clear old gift
                        await CartAPI.removeItem(
                            giftItem.option_id
                        ).then((response) => {
                            if (response.code) {
                                Toastr.error(response.message);
                                return;
                            }
                            dispatch(getCart());
                        }).catch((error) => {
                            throw error;
                        });
                    }
                }
            }
        } catch (ex: any) {
            throw Error(ex);
        }
    };

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
                (i: any) => i.campaign?.id && i.option_id === item.id
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
    const addToCart = async (payload: ProductOption) => {
        if (onAddItemValid(payload)) return;
        await checkEventGift();
        await CartAPI.addItem(
            {
                id: payload.parent_id,
                option_id: payload.id,
                name: payload.name,
                total_quantity: payload.total_quantity,
                campaign_option_id: payload.campaign_option_id
            }
        ).then((respone) => {
            if (respone.code) {
                Toastr.error(
                    respone.message
                );
                return;
            }
            dispatch(
                getCart()
            );
            Toastr.success(
                'Thêm Sản Phẩm Thành Công'
            );
            return;
        });
        // reactPixel.init('119758555309111');
        reactPixel.default.track('AddToCart', payload);
    };

    /**
     * Shop Now
     * @param payload
     */
    const shopNow = async (payload: ProductOption) => {
        if (onAddItemValid(payload)) return;
        await checkEventGift();
        await CartAPI.addItem({
            id: payload.parent_id,
            option_id: payload.id,
            name: payload.name,
            total_quantity: payload.total_quantity,
            campaign_option_id: payload.campaign_option_id
        }).then((respone) => {
            if (respone.code) {
                Toastr.error(
                    respone.message
                );
                return;
            }

            // success
            Toastr.success(
                'Thêm Sản Phẩm Thành Công'
            );

            // Redirect to checkout payment
            // reactPixel.init('119758555309111');
            reactPixel.default.track('Subscribe', payload);
            window.location.href = '/checkout/payment';
        }).catch((error) => {
            throw Error(error);
        });
    };

    const date = new Date(data.created_at * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const formattedDate = date.toLocaleDateString();

    if (isEmpty) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <div className='product-detail-wrap'>
            <Head>
                <title>{data.meta_title}</title>
                <meta property='og:title' content={data.meta_title} />
                <meta name='og:keyword' content={data.meta_keyword} />
                <meta property='og:image' content={data.thumbnail_url} />
                <meta name='description' content={data.meta_description} />
                <meta property='og:description' content={data.meta_description} />
                <meta name='al:ios:url' content={`Cocoluxvn://product/${data.id}`} />
                <meta name='al:iphone:url' content={`Cocoluxvn://product/${data.id}`} />
                <meta name='al:ipad:url' content={`Cocoluxvn://product/${data.id}`} />
                <meta name='al:android:url' content={`Cocoluxvn://product/${data.id}`} />
                <meta property='og:url' content={`https://cocolux.com/${router.query.slug}`} />
                <link rel="canonical" href={`https://cocolux.com/${router.query.slug}`}></link>
                <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html:
                                `{
                                    "@context": "https://schema.org/",
                                    "@type": "Product",
                                    "name":  "${data.meta_title}",
                                    "image": [
                                        "${data.thumbnail_url}"
                                    ],
                                    "description": "${data.meta_description}",
                                    "sku": "${data.sku}",
                                    "mpn": "${data.barcode}",
                                    "brand": {
                                        "@type": "Brand",
                                        "name": "${data?.brand}"
                                    },
                                    "review": {
                                        "@type": "Review",
                                        "reviewRating": {
                                            "@type": "Rating",
                                            "ratingValue": 5,
                                            "bestRating": 5
                                        },
                                        "author": {
                                            "@type": "Person",
                                            "name": "Dat Pham"
                                        }
                                    },
                                    "offers": {
                                        "@type": "Offer",
                                        "url": "${`https://cocolux.com/${router.query.slug}`}",
                                        "priceCurrency": "VND",
                                        "price": ${data.price},
                                        "priceValidUntil": "${formattedDate}",
                                        "itemCondition": "https://schema.org/UsedCondition",
                                        "availability": "https://schema.org/InStock",
                                        "seller": {
                                            "@type": "Organization",
                                            "name": "cocolux.com"
                                        }
                                    }
                                }`
                        }}
                    />
            </Head>
            {
                loading
                    ? (
                        <LazyLoadProductDetail />
                    )
                    : (
                        <>
                            <Breadcrumb
                                routes={breadCums}
                            />

                            {/* begin:: header */}
                            {option.id && <ItemHeader option={option} />}
                            {/* end:: header */}

                            {/* begin:: body */}
                            <div className='product-detail-body row'>
                                {/* begin:: detail */}
                                <div className='product-detail-body--left col-lg-10'>
                                    <div className='tab-product-detail'>
                                        {/* begin:: thumbnail */}
                                        <div className='tab-product--left'>
                                            <div className='product-images-group'>
                                                <div className='product-images'>
                                                    <a
                                                        className='thumb-video'
                                                        style={{ display: data.video_url ? 'block' : 'none' }}
                                                        onClick={() => onShowVideo()}
                                                    >
                                                        <img
                                                            src={data.thumbnail_url}
                                                            alt={option.name}
                                                            data-was-processed='true'
                                                        />
                                                        <img
                                                            className='ic-video'
                                                            src='/media/images/ic-play-youtube.png'
                                                            alt='cocolux'
                                                        />
                                                    </a>
                                                    {
                                                        option.images.map((image, index) => (
                                                            <a
                                                                key={index}
                                                                onClick={() => {
                                                                    onChangeThumbnail(image);
                                                                    setModalPreview(true);
                                                                }}
                                                            >
                                                                <img
                                                                    id='thumb-image'
                                                                    alt={option.name}
                                                                    src={Utilities.resizeImage(200, image)}
                                                                />
                                                            </a>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    isVideoVisible && data.video_url
                                                        ? (
                                                            <div className='product-thumbnail'>
                                                                <iframe
                                                                    frameBorder='0'
                                                                    title={option.name}
                                                                    allow='
                                                                        loop;
                                                                        autoplay;
                                                                        gyroscope;
                                                                        accelerometer;
                                                                        clipboard-write;
                                                                        encrypted-media;
                                                                        picture-in-picture
                                                                    '
                                                                    src={data.video_url}
                                                                    allowFullScreen
                                                                ></iframe>
                                                            </div>
                                                        )
                                                        : (
                                                            <div
                                                                id='product-img-thumbnail'
                                                                className='product-thumbnail'
                                                                onClick={() => setModalPreview(true)}
                                                            >
                                                                <ItemZoomImage
                                                                    image={Utilities.resizeImage(600, thumbnail)}
                                                                    name={option.name}
                                                                />
                                                                {
                                                                    data.deal_layer
                                                                        ? (
                                                                            <div className='product-thumbnail__mask'>
                                                                                <img
                                                                                    alt={data.name}
                                                                                    title={data.name}
                                                                                    src={Utilities.resizeImage(600, data.deal_layer)}
                                                                                    onError={(e: any) => {
                                                                                        if (e && e.target && e.target.style) {
                                                                                            e.target.style.display = 'none';
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        ) : null
                                                                }
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div className='list-button-group'>
                                                <div className='share-buttons'>
                                                    <div
                                                        data-width='200'
                                                        data-share='true'
                                                        data-size='small'
                                                        data-action='like'
                                                        className='fb-like'
                                                        data-layout='button_count'
                                                        data-href={`https://Cocolux.com/${data.meta_url}`}
                                                    ></div>
                                                </div>
                                                <div className='like-button'>
                                                    {
                                                        isWishlisted
                                                            ? (
                                                                <div>
                                                                    <a onClick={() => addToWishList(option)}>
                                                                        <img src='/media/images/ic-liked.svg' alt='liked' />
                                                                    </a>
                                                                    <span>Đã yêu thích</span>
                                                                </div>
                                                            )
                                                            : (
                                                                <div>
                                                                    <a onClick={() => addToWishList(option)}>
                                                                        <img src='/media/images/ic-heart.svg' alt='unliked' />
                                                                    </a>
                                                                    <span>Thêm vào danh sách yêu thích</span>
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* end:: thumbnail */}

                                        {/* begin: info */}
                                        <div className='tab-product--right'>
                                            {
                                                data?.brand?.name
                                                    ? (
                                                        <Link href='/thuong-hieu/[slug]' as={`/thuong-hieu/${data?.brand?.name?.toLowerCase()}-i.${data?.brand?.id}`}>
                                                            <a className='product-brand'>
                                                                {data?.brand?.name}
                                                            </a>
                                                        </Link>
                                                    )
                                                    : (
                                                        <a className='product-brand'>
                                                            Cocolux
                                                        </a>
                                                    )
                                            }
                                            <div className='product-name'>
                                                <h1>{option.name}</h1>
                                            </div>
                                            <div className='product-sub-info'>
                                                <div className='product-sub-info--item'>Mã sản phẩm: {option.sku}</div>
                                                <div className='product-sub-info--item'>
                                                    <div className='list-stars'>
                                                        {
                                                            [1, 2, 3, 4, 5].map((v: any) => {
                                                                const firstNumber = Math.floor(data.rating_average);
                                                                const ratingAverage = Number(data.rating_average);
                                                                return (
                                                                    firstNumber !== ratingAverage &&
                                                                        data.rating_average % v !== 0 &&
                                                                        v > firstNumber && firstNumber === (v - 1)
                                                                        ? (
                                                                            <img key={v} src='/media/icons/ic-star-half.svg' alt='ic-star' />
                                                                        )
                                                                        : (
                                                                            v > firstNumber
                                                                                ? (
                                                                                    <img key={v} src='/media/icons/ic-star-emty.svg' alt='ic-star' />
                                                                                )
                                                                                : (
                                                                                    <img key={v} src='/media/icons/ic-star-full.svg' alt='ic-star' />
                                                                                )
                                                                        )
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    <span
                                                        className='quicklink review-count'
                                                        onClick={() => onChangeTab('tab-product-feedback')}
                                                    >
                                                        {data.rating_count || 0} đánh giá
                                                    </span>
                                                </div>
                                                {/* <div
                                                    className='product-sub-info--item'
                                                    onClick={() => onChangeTab('tab-product-question')}
                                                >
                                                    <span className='quicklink'>{data.comment_count || 0} Hỏi đáp</span>
                                                </div> */}
                                            </div>

                                            {/* Flash sale */}
                                            {
                                                !isNil(option.current_deal) &&
                                                option.current_deal.id &&
                                                option.current_deal.value &&
                                                <ItemFlashSaleEvent eventId={option.current_deal.id} />
                                            }
                                            {/* Flash sale */}

                                            {/* Item price */}
                                            <p className='product-price'>
                                                {Utilities.currencyPipe(option.price)}
                                                <span> (Đã bao gồm VAT)</span>
                                            </p>
                                            {
                                                !isNil(option.current_deal) &&
                                                    option.current_deal.id &&
                                                    option.current_deal.value
                                                    ? (
                                                        <div className='product-discount'>
                                                            <span>Giá hãng: </span>
                                                            <span>{Utilities.currencyPipe(option.normal_price)}</span>
                                                            <span> - Tiết kiệm được {Utilities.currencyPipe(option.current_deal.value)}</span>
                                                            <span className='save'>({option.current_deal.rate}%)</span>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                            {/* Item price */}

                                            {/* begin:: list coupons */}
                                            {
                                                !isNil(option) &&
                                                <ItemListCoupon optionId={option.id} />
                                            }
                                            {/* end:: list coupons */}

                                            {/* begin:: campaign item */}
                                            {
                                                !isNil(campaign)
                                                && option?.campaign_option_id
                                                && <ItemListCampaign
                                                    campaign={campaign}
                                                    defaultOptionId={option?.campaign_option_id}
                                                    callback={(id: number) => {
                                                        setOption({ ...option, campaign_option_id: id });
                                                    }}
                                                />
                                            }
                                            {/* end:: campaign item */}

                                            {/* begin:: variations */}
                                            <ItemListOption
                                                options={data.products}
                                            />
                                            {/* begin:: variations */}

                                            {/* begin:: select quantity */}
                                            <div className='product-quantity'>
                                                <span>Số lượng:</span>
                                                <input
                                                    type='number'
                                                    name='quantity'
                                                    min='1'
                                                    defaultValue={option.total_quantity}
                                                    onChange={(event: any) => onChangeQuantity(event)}
                                                />
                                            </div>
                                            {/* end:: select quantiy */}

                                            {/* begin:: delivery time */}
                                            {/* {deliveryTime && <ItemDeliveryTime deliveryTime={deliveryTime} />} */}
                                            {/* begin:: delivery time */}

                                            {/* begin:: progress deal sale */}
                                            {
                                                !isNil(option.current_deal) &&
                                                option.current_deal.id &&
                                                option.current_deal.value &&
                                                <ItemProgressEvent event={option.current_deal} />
                                            }
                                            {/* begin:: progress deal sale */}

                                            {/* begin:: cart action */}

                                            {
                                                option.total_final_quantity > 0
                                                    ? (
                                                        <div className='product-buttons-group'>
                                                            <button
                                                                type='button'
                                                                onClick={() => onShowStockPopup()}
                                                                className='btn btn-md btn-light btn-instock'
                                                            >
                                                                <img src='/media/icons/ic-checked.svg' alt='cocolux' />
                                                                {
                                                                    !isNil(option) &&
                                                                        stocks?.length &&
                                                                        countStore?.count > 0
                                                                        ? (
                                                                            <span>{`${countStore?.count}/${countStore?.total}`} Chi nhánh còn sản phẩm</span>
                                                                        )
                                                                        : (<span>Còn hàng</span>)
                                                                }
                                                            </button>
                                                            <button
                                                                className='btn btn-md btn-primary'
                                                                onClick={() => addToCart(option)}
                                                            >
                                                                <img src='/media/images/Group 5178.svg' alt='cocolux' />
                                                                <span>Giỏ hàng</span>
                                                            </button>
                                                            <button
                                                                className='btn btn-md btn-secondary'
                                                                onClick={() => shopNow(option)}
                                                            >
                                                                <img src='/media/images/ic-white-cart.svg' alt='cocolux' />
                                                                <span className='label-button'>
                                                                    Mua ngay
                                                                    {/* <span>Nội thành Hà Nội giao hàng trong 2H</span> */}
                                                                </span>
                                                            </button>

                                                            {/* Stock Box Mobile */}
                                                            {
                                                                !isNil(option) &&
                                                                    stores?.length &&
                                                                    stocks?.length &&
                                                                    countStore?.count > 0 &&
                                                                    mobileDevices.test(navigator.userAgent)
                                                                    ? < ItemStockBoxMobile
                                                                        item={option}
                                                                        stocks={stocks}
                                                                        countStore={countStore}
                                                                        thumbnalUrl={Utilities.resizeImage(200, thumbnail)}
                                                                    />
                                                                    : null

                                                            }
                                                            {/* Stock Box Mobile */}

                                                            {/* Stock Box */}
                                                            {
                                                                !isNil(option) &&
                                                                    stores?.length &&
                                                                    stocks?.length &&
                                                                    countStore?.count > 0
                                                                    ? (
                                                                        <div className='instock-box'>
                                                                            <div className='list-store beautify-scroll'>
                                                                                {
                                                                                    stocks.map((store: any) => (
                                                                                        <div className='store-item' key={store.id}>
                                                                                            <span className='store-title'>
                                                                                                {store.name}
                                                                                            </span>
                                                                                            {
                                                                                                store?.districts?.length &&
                                                                                                (
                                                                                                    store.districts.map((district: any) => (
                                                                                                        <div className='store-district flex flex-col items-start' key={district.id}>
                                                                                                            <div className='district-title flex text-black items-center mb-1.5'>
                                                                                                                <img
                                                                                                                    src='/media/icons/ic-checked.svg'
                                                                                                                    alt='cocolux'
                                                                                                                />
                                                                                                                <span>{district.name}</span>
                                                                                                            </div>
                                                                                                            {
                                                                                                                district?.stores?.length &&
                                                                                                                district.stores.map((s: any) => (
                                                                                                                    <div className='local-store text-left text-xs text-dark-1 pl-5 mb-2' key={s.id}>
                                                                                                                        <span className={s.total_quantity > 0 ? 'text-red' : ''}>
                                                                                                                            {s.total_quantity > 0 ? 'Còn hàng' : 'Tạm hết hàng'}
                                                                                                                        </span>
                                                                                                                        <span>tại {s.name}</span>
                                                                                                                    </div>
                                                                                                                ))
                                                                                                            }
                                                                                                        </div>
                                                                                                    ))
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                                <div className='store-contact'>
                                                                                    <div className='contact-item'>
                                                                                        <img
                                                                                            src='/media/icons/ic-clock.svg'
                                                                                            alt='cocolux'
                                                                                        />
                                                                                        <span>8:00 AM - 22:00 PM</span>
                                                                                    </div>
                                                                                    <div className='contact-item'>
                                                                                        <img
                                                                                            src='/media/icons/ic-phone-white.svg'
                                                                                            alt='cocolux'
                                                                                        />
                                                                                        <span>
                                                                                            <a href='tel:+84988888825'>0988888825</a>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                            }
                                                            {/* Stock Box */}
                                                        </div>
                                                    )
                                                    : (
                                                        <div className='product-buttons-group out-of-stock'>
                                                            <button
                                                                style={{ height: '50px' }}
                                                                className='btn btn-md btn-light'
                                                                type='button'
                                                            >
                                                                <span>Tạm hết hàng</span>
                                                            </button>
                                                            <button
                                                                style={{ height: '50px' }}
                                                                className='btn btn-md btn-secondary'
                                                                onClick={() => onFollowItem()}
                                                            >
                                                                <img src='/media/images/ic-white-cart.svg' alt='cocolux' />
                                                                <span className='label-button'>
                                                                    Thông báo khi có hàng
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )
                                            }

                                            {
                                                data.type === 'combo'
                                                    ? (
                                                        <>
                                                            <h5 style={{ marginBottom: '10px' }}>Bạn có thể mua sản phẩm tách combo</h5>
                                                            <div className='list-combo'>
                                                                <div className='row'>
                                                                    {
                                                                        data.parts.map((item: any, index: any) => (
                                                                            <div key={index}>
                                                                                <div className='image'>
                                                                                    <Link href={`hang-tach-combo-${item.sku}-i.${item.id}`}>
                                                                                        <a>
                                                                                            <img src={item.thumbnail_url} alt={item.name} />
                                                                                        </a>
                                                                                    </Link>
                                                                                </div>
                                                                                <span>{Utilities.currencyPipe(item.price)}</span>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                    : (
                                                        null
                                                    )
                                            }
                                            {/* begin:: cart action */}
                                        </div>
                                        {/* end:: info */}
                                    </div>

                                    {/* Thông tin sản phẩm */}
                                    <div className='product-info-panel panel-container'>
                                        <h2 className='info-panel__title'>Thông tin sản phẩm</h2>
                                        {
                                            data.attributes &&
                                                data.attributes?.length
                                                ? (
                                                    <div className='info-panel__attribute'>
                                                        {
                                                            data.attributes.map((a: any) => {
                                                                if (a?.value?.type === 'select') {
                                                                    return (
                                                                        <div className='attribute__item' key={a.id}>
                                                                            <div className='attribute__title'>
                                                                                <span>{a.name}</span>
                                                                            </div>
                                                                            <div className='attribute__info'>
                                                                                <span>{a?.value?.name || '---'}</span>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                )
                                                : (
                                                    <span className='no-content'>
                                                        Không có dữ liệu thông tin sản phẩm.
                                                    </span>
                                                )
                                        }
                                    </div>
                                    {/* Thông tin sản phẩm */}

                                    <div className='main-group-panel'>
                                        {/* Bảng mô tả sản phẩm */}
                                        <div className='description-panel__tabs'>
                                            <ul className='group-tabs beautify-scroll-horizontal'>
                                                {
                                                    ITEM_LIST_TAB.map((item: any, index: number) => (
                                                        <li
                                                            key={index}
                                                            className={`tab-item ${currentTab === item.id ? 'tab-active' : ''}`}
                                                            onClick={() => { onChangeTab(item.scrollTo); setCurrentTab(item.id); }}
                                                        >
                                                            <span>{item.name}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div id='tab_mo_ta' className='product-description-panel panel-container'>
                                            <div className={`description-panel__content`}>
                                                <div
                                                    className={`content-desciption ${contentClass} ${contentClass === 'collapse' ? 'mask-content' : ''}`}
                                                >
                                                    <div
                                                        className='ck-content'
                                                        id='content-description-panel'
                                                        dangerouslySetInnerHTML={renderStringToHtml(data.description)}
                                                        ref={(element: any) => {
                                                            if (!isNil(element) && element?.clientHeight > 0 && isLoadHeight) {
                                                                onGetContentHeight();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {
                                                    contentClass
                                                        ? (
                                                            <div className='footer-end-content'>
                                                                <button
                                                                    className='btn btn-expand-content'
                                                                    onClick={() => {
                                                                        setLoadHeight(!isLoadHeight);
                                                                        if (contentClass === 'expand') {
                                                                            setContentClass('collapse');
                                                                        } else {
                                                                            setContentClass('expand');
                                                                        }
                                                                    }}
                                                                >
                                                                    {
                                                                        contentClass === 'collapse'
                                                                            ? 'Xem thêm nội dung'
                                                                            : 'Thu gọn nội dung'
                                                                    }
                                                                </button>
                                                            </div>
                                                        ) : null
                                                }
                                            </div>
                                        </div>
                                        {/* Bảng mô tả sản phẩm */}

                                        {/* Danh sách thuộc tính text */}
                                        {

                                            listTabs &&
                                                listTabs?.length
                                                ? (
                                                    listTabs.map((tab: any) => {
                                                        if (tab.id !== 1 && tab.content) {
                                                            return (
                                                                <div id={tab.scrollTo} className='panel-container common-panel' key={tab.id}>
                                                                    <h2 className='panel__title'>{tab.name}</h2>
                                                                    <div className='panel__content'>
                                                                        {
                                                                            tab.content
                                                                                ? (
                                                                                    <div
                                                                                        className='ck-content'
                                                                                        dangerouslySetInnerHTML={renderStringToHtml(tab.content)}
                                                                                    />
                                                                                )
                                                                                : (
                                                                                    <span className='no-content'>
                                                                                        Không có nội dung hiển thị
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                ) : null
                                        }
                                        {/* Danh sách thuộc tính text */}

                                        {/* Hỏi đáp */}
                                        {/* <div id='tab-hoi-dap' className='product-question-panel panel-container' >
                                        <div className='title-content'>Hỏi đáp</div>
                                        <ItemListComment product={option} />
                                        </div>
                                        */}
                                        {/* Hỏi đáp */}

                                        {/* Đánh giá */}
                                        <div id='tab-danh-gia' className='product-feedback-panel panel-container' >
                                            <div className='title-content'>Đánh giá</div>
                                            <div className='subtitle-feedback'>Khách hàng nhận xét</div>
                                            <ItemListStartRating product={option} rating_average={data.rating_average} />
                                        </div>
                                        {/* Đánh giá */}
                                    </div>
                                </div>
                                {/* end:: detail */}

                                {/* begin:: recommend */}
                                <div className='product-detail-body--right col-lg-2'>
                                    {/* <div className='tab-delivery'>
                                        <div className='free-delivery'>
                                            <img src='/media/images/mien-phi-van-chuyen.jpg' alt='cocolux' />
                                        </div>
                                        <h4><span>MIỄN PHÍ VẬN CHUYỂN</span></h4>
                                        <div className='row no-margin'>
                                            <div className='item-delivery'>
                                                <img src='/media/images/real-product.svg' alt='cocolux' />
                                                <span>Phát hiện hàng giả, bạn trả hàng và nhận thêm<strong> 110% </strong>giá trị.</span>
                                            </div>
                                            <div className='item-delivery'>
                                                <img src='/media/images/ship-cod.svg' alt='cocolux' />
                                                <span>Thanh toán kiểm tra sản phẩm khi nhận hàng</span>
                                            </div>
                                            <div className='item-delivery'>
                                                <img src='/media/images/free-return.svg' alt='cocolux' />
                                                <span>14 ngày đổi trả sản phẩm miễn phí</span>
                                            </div>
                                            <div className='item-delivery'>
                                                <img src='/media/images/now-free.svg' alt='cocolux' />
                                                <span>Giao hàng<strong> 2H miễn phí </strong>nội thành Hà Nội.</span>
                                            </div>
                                        </div>
                                    </div> */}

                                    {<ListBrandItem brandItem={data.brand} />}

                                    {/* <div className='tab-delivery'>
                                        <ItemListRecommend categories={data.categories} />
                                    </div> */}
                                </div>
                                {/* begin:: recommend */}
                            </div>
                            {/* end:: body */}
                        </>
                    )
            }
            {/* {productFollowModal && <ProductFollowModal product={option} />} */}
            {
                isShowPreview &&
                <ItemPreviewImage
                    option={option}
                    targetDefault={thumbnail}
                    backgroundUrl={data.deal_layer}
                    onCallback={() => setModalPreview(false)}
                />
            }
        </div>
    );
};

ItemDetailPage.getInitialProps = async ({ store, query, asPath }: any) => {
    try {
        const { slug } = query;
        const optionId = slug.split('-i.')[1];
        let response = await ItemAPI.detailOption(optionId);
        // if (!response.code) {
        //     const { parent_id } = response.data;
        //     const param = `${parent_id}?sid=${optionId}`;
        //     if (parent_id) {
        //         response = await ItemAPI.detail(param);
        //     }
        // }
        const { parent_id } = response.data;
        const param = `${parent_id}?sid=${optionId}`;
        let main_product = await ItemAPI.detail(param);

        // if (response.code) {
        //     store.dispatch(
        //         loadProductDetail({
        //             query: query,
        //             isEmpty: true
        //         })
        //     );
        // }

        // // handle success
        // store.dispatch(
        //     loadProductDetail({
        //         data: response.data,
        //         query: { ...query, path: asPath }
        //     })
        // );
        return { data: main_product.data };
    } catch (error: any) {
        return {
            data: []
        };
    }
};

export default ItemDetailPage;
