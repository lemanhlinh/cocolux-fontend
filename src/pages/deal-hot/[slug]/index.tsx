import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pick } from 'lodash';

// Service
import { PromotionAPI } from 'src/helpers/services';

// Components
import { SaleItem } from 'src/components/item-group';
import { NotFound, Pagination } from 'src/components/base-group';
import { LazyLoadProduct } from 'src/components/loading-group';

const DetailDealHot = () => {
    // Declarations State
    const router = useRouter();
    const queryParams = router.query;
    const [products, setProduct] = useState<[]>([]);
    const [dealHot, setDealHot] = useState<any>({});
    const [totalItem, setTotalItem] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);

    /**
     * Handle get list items
     */
    const handleFetchListItems = async () => {
        // Prepare params
        const params = { ...queryParams } as any;
        params.hot_deal_id = queryParams.slug;
        const page = parseInt(params.page, 10);
        params.limit = parseInt(params.limit, 10) || 30;
        params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
        params.sort_by = params.sort_by ? params.sort_by : 'hot_deal_position';

        // Pick current data
        const paramsTransformed = pick(params, [
            'skip',
            'page',
            'limit',
            'sort_by',
            'hot_deal_id'
        ]);

        // Handle fetch detail a hotdeal
        await PromotionAPI.listItemPromotion(
            paramsTransformed
        ).then((res: any) => {
            setCurrentPage(page || 1);
            setProduct(res.data || []);
            setTotalItem(res.count || 0);
        }).catch((ex) => {
            throw Error(ex);
        }).finally(() => {
            setFirstLoad(false);
        });

        // Handle get detail hotdeal
        await PromotionAPI.getPromotion(queryParams.slug.toString())
            .then((res: any) => {
                setDealHot(res.data || {});
            }).catch((ex) => {
                throw Error(ex);
            }).finally(() => {
                setFirstLoad(false);
            });
    };

    /**
     * Load default data
     * @private
     */
    useEffect(() => {
        handleFetchListItems();
    }, [queryParams]);

    return (
        <div className='css-promotion-wrapper'>
            <Head>
                <title>Deals đang diễn ra | Cocolux.com</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Deals đang diễn ra | Cocolux.com' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' />
                <meta property='og:description' content='Săn Sale tại Cocolux: Giảm giá siêu sốc, miễn phí vận chuyển. Cuối tuần thả thơi mua sắm online cùng Cocolux!' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>
            {
                dealHot?.thumbnail_url
                    ? (
                        <div className='banner-panel'>
                            <img src={dealHot?.thumbnail_url} alt={dealHot?.thumbnail_url} />
                        </div>
                    ) : null
            }
            <div className='section p-5 bg-white'>
                <div className='row'>
                    {
                        isFirstLoad
                            ? [1, 2, 3, 4, 5].map((index: number) => <LazyLoadProduct key={index} />)
                            : products.length
                                ? (
                                    products.map((deal, index) => (
                                        <SaleItem
                                            key={index}
                                            dealItem={deal}
                                            dealInfo={dealHot && dealHot}
                                            className='col-6 col-md-4 col-1over5'
                                        />
                                    ))
                                )
                                : <NotFound content={'Không có sản phẩm hot deal.'} />
                    }
                </div>
                <div className='pagination-box'>
                    <Pagination totalRecord={totalItem} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

export default DetailDealHot;
