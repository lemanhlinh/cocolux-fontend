import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProductItemVariation } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { FilterModel, ProductModel } from 'src/helpers/models';
import { ItemAPI } from 'src/helpers/services';
import { NextPage } from 'next';

// Components
import SearchSortBox from './SearchSortBox';
import SearchFilterBox from './SearchFilterBox';
import { Breadcrumb, Pagination } from 'src/components/base-group';

interface Props {
    items: ProductModel[],
    totalItem: number,
    currentPage: number,
    all: any[]
}

const SearchPage: NextPage<Props> = ({ items = [], totalItem = 0, currentPage = 1, all = [] }) => {
    const router = useRouter();
    const queryParams = router.query as any;
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
        setFirstLoad(true);
        setFirstLoad(false);
        setLoading(false);
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
                    <SearchFilterBox filters={filters} setFilters={setFilters} all={all} />
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
                                                        <ProductItemVariation
                                                            key={item.id}
                                                            item={item}
                                                            column='col-1over5 col-6'
                                                        />
                                                    ))
                                                }
                                                {!items.length && <div className='px-5'>Không tìm thấy kết quả phù hợp.</div>}
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        <div className='card-list-item--footer'>
                            <Pagination totalRecord={totalItem} currentPage={currentPage} />
                        </div>
                    </div >
                </div>
            </div>
        </div>
    );
};

/**
 * Load Props
 * @param {*} param
 */
SearchPage.getInitialProps = async ({ query }: any = {}) => {
    const page = parseInt(query.page, 10) || 1;
    query.limit = parseInt(query.limit, 10) || 30;
    query.skip = page ? Math.ceil(page - 1) * query.limit : 0;
    query.types = 'item';
    if (query.attributes) query.attributes = query.attributes.toString();

    const response = await ItemAPI.listOption(query);

    return { items: response.data, totalItem: response.count, currentPage: page, all: response.all || null };
};

export default SearchPage;
