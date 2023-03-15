import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash';

// Modules
import { Utilities } from 'src/helpers/utilities';
import { FilterModel, ProductModel } from 'src/helpers/models';
import { BrandAPI, ItemAPI } from 'src/helpers/services';

// Components
import BrandSortBox from './BrandSortBox';
import BrandFilterBox from './BrandFilterBox';
import NotFoundPage from 'src/pages/not-found';
import { loadBrandDetail } from 'src/stores/brand';
import { ProductItemVariation } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { Breadcrumb, Pagination, BoxContent } from 'src/components/base-group';

const BrandDetailPage = () => {
    const router = useRouter();
    const { data: brand } = useSelector((state: any) => state.brand);

    // Declaration State
    const queryParams = router.query as any;
    const [totalItem, setTotalItem] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [items, setListItem] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [paramSelected, setParamSelected] = useState<any[]>([]);

    useEffect(() => {
        if (!isNil(brand)) {
            fetchListItem();
        }
    }, [queryParams]);

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
     * Fetch List Item
     */
    const fetchListItem = async () => {
        setLoading(true);
        const params = { ...queryParams } as any;
        const page = parseInt(params.page, 10);
        params.limit = parseInt(params.limit, 10) || 30;
        params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
        switch (typeof params.attributes) {
            case 'string':
                params.attributes = [params.attributes, `${brand.attribute_id}:${brand.id}`].toString();
                break;
            case 'object':
                params.attributes = [...params.attributes, `${brand.attribute_id}:${brand.id}`].toString();
                break;
            default:
                params.attributes = `${brand.attribute_id}:${brand.id}`;
                break;
        }

        // submit request
        await ItemAPI.listOption(
            params
        ).then((response: any) => {
            setCurrentPage(page || 1);
            const filterData = response.data.filter((item: any) => item.type === 'item' && item.slug != null);
            setListItem(filterData || []);
            response.data = filterData;
            setTotalItem(response.count || 0);
        }).catch((error: any) => {
            throw Error(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    /**
     * Remove param filter
     * @param option
     * @param filters
     */
    const onRemoveParam = (option: any) => {
        filters.map((filter: any) => {
            filter.options.map((o: any) => {
                if (o.id === option.id) {
                    o.checked = !o.checked;
                    if (filter.param === 'attributes') {
                        const attributes = queryParams[filter.param]?.toString().split(',');
                        queryParams[filter.param] = attributes.filter((a: any) => a !== option.id);
                    } else {
                        delete queryParams[filter.param];
                    }
                }
            });
        });
        const selected = paramSelected.filter(
            i => i.id !== option.id
        );

        // set new state
        setParamSelected(selected);
        setFilters([...filters]);

        // redirect with param
        return router.push({ pathname: `/thuong-hieu/${router.query.slug}`, query: { ...queryParams } });
    };

    if (isNil(brand)) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <div className='coco-search-wrap'>
            <Head>
                <title>{brand.meta_title}</title>
                {/* <meta property='og:title' content={brand.title} /> */}
                <meta property='og:type' content='website' data-rh='true'></meta>
                <meta name='al:ios:url' content={`Cocoluxvn://thuong-hieu/${brand.id}`} />
                <meta name='al:iphone:url' content={`Cocoluxvn://thuong-hieu/${brand.id}`} />
                <meta name='al:ipad:url' content={`Cocoluxvn://thuong-hieu/${brand.id}`} />
                <meta name='al:android:url' content={`Cocoluxvn://thuong-hieu/${brand.id}`} />
                <meta property='og:url' content={`https://Cocolux.com/thuong-hieu/${brand.slug}`} data-rh='true'></meta>
                <meta property='og:image' content={brand.icon} data-rh='true' />
                <meta property='og:description' content={brand.meta_description} />
            </Head>
            <Breadcrumb
                routes={[
                    { as: '/thuong-hieu', href: '/thuong-hieu', name: 'Thương hiệu' },
                    { as: `/thuong-hieu/${Utilities.replaceAllSpecial(brand.value)}-i.${brand.id}`, href: '/thuong-hieu/[slug]', name: brand.value }
                ]}
            />
            <div className='coco-search-wrap--body'>
                <div className='coco-search__left'>
                    {/* begin:: Filter Box */}
                    <BrandFilterBox filters={filters} setFilters={setFilters} />
                    {/* end:: Filter Box */}
                </div>
                <div className='coco-search__right'>
                    <div className='card-list-item'>
                        <h1 className='card-list-item--header'>
                            {brand.name}
                            <span> ({totalItem} kết quả) </span>
                        </h1>
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
                                <BrandSortBox />
                                {/* end:: Sort Box */}
                            </div>
                            <div className='row no-margin py-5'>
                                {
                                    loading
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
                            <BoxContent title={brand.name} content={brand.content} maxHeight={300} className='d-sm-block' />
                            <Pagination totalRecord={totalItem} currentPage={currentPage} />
                        </div>
                    </div >
                </div>
            </div>

            {/* brand content */}
            <BoxContent title={brand.name} content={brand.content} maxHeight={300} className='d-sm-none' />
            {/* brand content */}
        </div >
    );
};

BrandDetailPage.getInitialProps = async ({ store, query }: any = {}) => {
    try {
        const { slug } = query;
        const brandId = slug.split('-i.')[1];
        const respone = await BrandAPI.detail(brandId);

        // handle success
        store.dispatch(
            loadBrandDetail({
                query: query,
                data: respone.data
            })
        );

        return { query };
    } catch (error: any) {
        return {
            isFailure: true,
            messages: error.messages
        };
    }
};


export default BrandDetailPage;
