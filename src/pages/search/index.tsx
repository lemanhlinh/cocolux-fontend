import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProductItemVariation } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { FilterModel, ProductModel } from 'src/helpers/models';
import { ItemAPI } from 'src/helpers/services';

// Components
import SearchSortBox from './SearchSortBox';
import SearchFilterBox from './SearchFilterBox';
import { Breadcrumb, Pagination } from 'src/components/base-group';

const SearchPage = () => {
    const router = useRouter();
    const queryParams = router.query as any;
    const [totalItem, setTotalItem] = useState<number>(0);
    const [totalItemPage, setTotalItemPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [items, setListItem] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [paramSelected, setParamSelected] = useState<any[]>([]);

    /**
     * Redirect
     * @hooks
     */
    useEffect(() => {
        if (!Object.keys(queryParams).length) {
            router.push({ pathname: '/' });
        }
    }, []);

    /**
     * Transform param
     * @hooks
     */
    useEffect(() => {
        const selected = [] as any[];
        filters.map((filter: any) => {
            filter.options.map((option: any) => {
                if (option.checked) {
                    option.fullname = `${filter.name}: ${option.name}`;
                    selected.push(option);
                }
            });
        });
        setParamSelected(selected);
    }, [filters]);

    /**
     * Fetch item
     * @hooks
     */
    useEffect(() => {
        async function fetchListItem() {
            const params = { ...queryParams };
            const page = parseInt(params.page, 10);
            params.limit = parseInt(params.limit, 10) || 30;
            params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
            if (params.attributes) params.attributes = params.attributes.toString();

            // submit request
            await ItemAPI.list(
                params
            ).then((response: any) => {
                setCurrentPage(page || 1);
                setListItem(response.data || []);
                const count = response.data.reduce((acc: number, curr: any) => acc + curr.variations.length, 0);
                setTotalItem(count || 0);
                setTotalItemPage(response.count || 0);
            }).catch((error: any) => {
                throw Error(error);
            }).finally(() => {
                setLoading(false);
                setFirstLoad(false);
            });
        }

        // Request
        fetchListItem();
    }, [queryParams]);

    /**
     * Remove param filter
     * @param option
     * @param filters
     */
    const onRemoveParam = (option: any) => {
        filters.map((f: any) => {
            f.options.map((o: any) => {
                if (o.id === option.id) {
                    o.checked = !o.checked;
                    if (f.param === 'attributes') {
                        const attributes = queryParams[f.param].toString().split(',');
                        queryParams[f.param] = attributes.filter((a: any) => a !== option.id);
                    } else {
                        delete queryParams[f.param];
                    }
                }
            });
        });
        const selected = paramSelected.filter(
            i => i.id !== option.id
        );

        // set new state
        setFilters([...filters]);
        setParamSelected(selected);

        // redirect with param
        return router.push({ pathname: '/search', query: { ...queryParams } });
    };

    return (
        <div className='coco-search-wrap'>
            <Head>
                <title>Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>
            <Breadcrumb
                routes={[
                    { as: '/search', href: `/search?keyword=${queryParams.keyword}`, name: 'Tìm kiếm' },
                    { as: '/search', href: `/search?keyword=${queryParams.keyword}`, name: queryParams.keyword ? `Từ khoá: ${queryParams.keyword}` : '' },
                ]}
            />
            <div className='coco-search-wrap--body'>
                <div className='coco-search__left'>
                    {/* begin:: Filter Box */}
                    <SearchFilterBox filters={filters} setFilters={setFilters} />
                    {/* end:: Filter Box */}
                </div>
                <div className='coco-search__right'>
                    <div className='card-list-item'>
                        <div className='card-list-item--header'>
                            Kết quả tìm kiếm:
                            <span> ({totalItem} kết quả) </span>
                        </div>
                        <div className='card-list-item--content'>
                            {
                                paramSelected.length
                                    ? (
                                        <div className='card-list-item-filter border-bottom'>
                                            <span>Lọc theo</span>
                                            <div className='item-collection'>
                                                {
                                                    paramSelected.map((option: any) => (
                                                        <div className='item-sort btn btn-outlined' key={option.id}>
                                                            {option.fullname}
                                                            <div
                                                                className='del-item-sort'
                                                                onClick={() => onRemoveParam(option)}
                                                            >
                                                                <img src='/media/icons/ic-delete.svg' alt='cocolux' />
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    ) : null
                            }
                            <div className='card-list-item-filter'>
                                <span>Sắp xếp theo</span>
                                {/* begin:: Sort Box */}
                                <SearchSortBox />
                                {/* end:: Sort Box */}
                            </div>
                            <div className='row no-margin py-5'>
                                {
                                    loading || firstLoad
                                        ? (
                                            [1, 2, 3, 4].map(index => (
                                                <LazyLoadProduct key={index} />
                                            ))
                                        )
                                        : (
                                            <>
                                                {
                                                    items.map((item: any) => (
                                                        <>
                                                            {item.variations && item.variations.map((variation: any, index: number) => (
                                                                <ProductItemVariation
                                                                    key={item.id + index}
                                                                    parent={item}
                                                                    item={variation}
                                                                    column='col-1over5 col-6'
                                                                />
                                                            ))}
                                                        </>
                                                    ))
                                                }
                                                {!items.length && <div className='px-5'>Không tìm thấy kết quả phù hợp.</div>}
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        <div className='card-list-item--footer'>
                            <Pagination totalRecord={totalItemPage} currentPage={currentPage} />
                        </div>
                    </div >
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
