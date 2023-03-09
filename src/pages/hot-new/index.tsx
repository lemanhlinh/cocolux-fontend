import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Service
import { ItemAPI } from 'src/helpers/services';

// Components
import { ProductItem } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { NotFound, Pagination } from 'src/components/base-group';

const ItemHotNew = () => {
    // Declarations Path
    const router = useRouter();
    const queryParams = router.query;

    // Declarations State
    const [itemNews, setItemNew] = useState<[]>([]);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);

    /**
     * Fetch items new
     */
    const handleFetchItemNew = async () => {
        // Prepare params
        const params = {
            ...queryParams
        } as any;
        params.is_new_arrival = true;
        const page = parseInt(params.page, 10);
        params.limit = parseInt(params.limit, 10) || 30;
        params.skip = page ? Math.ceil(page - 1) * params.limit : 0;

        // Submit request
        await ItemAPI.list(
            params
        ).then((res: any) => {
            setCurrentPage(page || 1);
            setItemNew(res.data || []);
            setTotalItem(res.count || 0);
        }).finally(() => {
            setFirstLoad(false);
        });
    };

    /**
     * Load default data
     * @private
     */
    useEffect(() => {
        handleFetchItemNew();
    }, [queryParams]);

    return (
        <div className='css-promotion-wrapper'>
            <Head>
                <title>Hàng mới về | Cocolux.com</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Hàng mới về | Cocolux.com' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' />
                <meta property='og:description' content='Săn Sale tại Cocolux: Giảm giá siêu sốc, miễn phí vận chuyển. Cuối tuần thả thơi mua sắm online cùng Cocolux!' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>
            <div className='css-promotion-wrapper--header'>
                <div className='promotion-nav'>
                    <Link href='/hang-moi-ve'>
                        <a className='nav-item active'>HÀNG MỚI VỀ</a>
                    </Link>
                </div>
            </div>
            <div className='section bg-white py-5'>
                <div className='row no-margin'>
                    {
                        isFirstLoad
                            ? (
                                <LazyLoadProduct />
                            )
                            : (
                                itemNews.length
                                    ? (
                                        itemNews.map((item: any = {}) => (
                                            <ProductItem
                                                key={item.id}
                                                item={item}
                                                column='col-6 col-md-4 col-1over5'
                                            />
                                        ))
                                    )
                                    : <NotFound content={'Không có sản phẩm mới về'} />
                            )
                    }
                </div>
                <div className='pagination-box'>
                    <Pagination totalRecord={totalItem} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

export default ItemHotNew;
