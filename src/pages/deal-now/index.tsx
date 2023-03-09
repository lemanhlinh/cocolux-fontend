import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isNil, omitBy } from 'lodash';

// Service
import { ItemAPI } from 'src/helpers/services';

// Components
import { ProductItem } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { NotFound, Pagination } from 'src/components/base-group';

const DealNowPage = () => {
    // Declarations Path
    const router = useRouter();
    const queryParams = router.query;

    // Declarations Redux
    const { categoryPublics } = useSelector((state: any = {}) => state.layout);

    // Declarations State
    const [saleNows, setSaleNow] = useState<[]>([]);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);

    /**
     * Fetch items sale now
     */
    const handleFetchSaleNow = async () => {
        // Prepare params
        const params = {
            ...queryParams
        } as any;
        params.is_has_discount = true;
        const page = parseInt(params.page, 10);
        params.limit = parseInt(params.limit, 10) || 30;
        params.skip = page ? Math.ceil(page - 1) * params.limit : 0;

        // Submit request
        await ItemAPI.list(
            params
        ).then((res: any) => {
            setCurrentPage(page || 1);
            setSaleNow(res.data || []);
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
        handleFetchSaleNow();
    }, [queryParams]);

    /**
     * Change Category
     * @param {*} categoryId
     */
    const onChangeCategoryId = (categoryId: string) => {
        if (categoryId) {
            const currentParams = omitBy(queryParams, isNil);
            router.push({
                query: {
                    ...currentParams,
                    categories: categoryId,
                },
            });
        } else {
            delete queryParams.categories;
            router.push({
                query: { ...queryParams }
            });
        }
    };

    /**
     * Change Sort Value
     * @param {*} value
     */
    const onChangeSortValue = (value: string) => {
        if (value) {
            const valueSplits = value.split('-');
            const currentParams = omitBy(queryParams, isNil);
            router.push({
                query: {
                    ...currentParams,
                    sort_by: valueSplits[0],
                    order_by: valueSplits[1],
                },
            });
        } else {
            delete queryParams.sort_by;
            delete queryParams.order_by;
            router.push({
                query: { ...queryParams }
            });
        }
    };

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

            <div className='css-promotion-wrapper--header'>
                <div className='promotion-nav'>
                    <Link href='/deal-hot'>
                        <a className='nav-item'>Hot deals</a>
                    </Link>
                    <Link href='/flash-sale'>
                        <a className='nav-item'>Flash Deal</a>
                    </Link>
                    <Link href='/deal-now'>
                        <a className='nav-item active'>ĐANG DIỄN RA</a>
                    </Link>
                </div>
                <select onChange={(e: any) => onChangeCategoryId(e.target.value)}>
                    <option value=''>Danh mục</option>
                    {
                        categoryPublics.slice(0, 4).map((c: any = {}) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))
                    }
                </select>
                <select onChange={(e: any) => onChangeSortValue(e.target.value)}>
                    <option value=''>Sắp xếp</option>
                    <option value='view_count-desc'>Nổi bật</option>
                    <option value='order_count-desc'>Bán Chạy</option>
                    <option value='price-asc'>Giá thấp đến cao</option>
                    <option value='price-desc'>Giá cao đến thấp</option>
                </select>
            </div>
            <div className='btn-group'>
                <Link href='deal-now'>
                    <a className={`btn btn-outlined ${!queryParams?.categories ? 'active' : ''}`}>
                        Tất cả
                    </a>
                </Link>
                {
                    categoryPublics.slice(0, 4).map((c: any = {}) => (
                        <Link href={`deal-now?categories=${c.id}`} key={c.id}>
                            <a className={`btn btn-outlined ${queryParams?.categories === `${c.id}` ? 'active' : ''}`}>{c.name}</a>
                        </Link>
                    ))
                }
            </div>
            <div className='section bg-white py-5'>
                <div className='row no-margin'>
                    {isFirstLoad ? (
                        <LazyLoadProduct />
                    ) : (
                        saleNows.length
                            ? (
                                saleNows.map((item: any = {}) => (
                                    <ProductItem
                                        key={item.id}
                                        item={item}
                                        column='col-6 col-md-4 col-1over5'
                                    />
                                ))
                            )
                            : (
                                <NotFound content={'Không có deal khuyến mãi'} />
                            )
                    )}
                </div>
                <div className='pagination-box'>
                    <Pagination totalRecord={totalItem} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

export default DealNowPage;
