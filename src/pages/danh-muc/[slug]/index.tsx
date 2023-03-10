import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash';

// Modules
import { FilterModel, ProductModel } from 'src/helpers/models';
import { ConfigAPI, ItemAPI } from 'src/helpers/services';

// Components
import { Breadcrumb, Pagination, BoxContent } from 'src/components/base-group';
import { LazyLoadProduct } from 'src/components/loading-group';
import { ProductItem } from 'src/components/item-group';
import CategoryFilterBox from './CategoryFilterBox';
import CategorySortBox from './CategorySortBox';
import NotFoundPage from 'src/pages/not-found';

interface Props {
    category: any;
}

const CategoryDetailPage: NextPage<Props> = ({ category }) => {
    const router = useRouter();
    const queryParams = router.query as any;
    const { categories } = useSelector((state: any) => state.layout);
    const [breadCums, setBreadCum] = useState<any>([]);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [items, setListItem] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [paramSelected, setParamSelected] = useState<any[]>([]);

    useEffect(() => {
        const selected = [] as any[];
        filters.map((filter: any) => {
            filter.options.map((option: any) => {
                if (option.checked) {
                    option.fullname = `${filter.name}: ${option.name}`;
                    selected.push(option);
                }
                if (option.options && option.options?.length) {
                    const childOption = option.options.find(
                        (o: any) => o.checked
                    );
                    if (childOption) {
                        childOption.fullname = `${filter.name}: ${childOption.name}`;
                        selected.push(childOption);
                    }
                }
            });
        });
        setParamSelected(selected);
    }, [filters]);

    useEffect(() => {
        if (!isNil(category)) {
            fetchListItem();

            // Load breadcums
            const routers = [];
            if (category.path && category.path?.length) {
                const newBreadcums = [];
                const parentId = category.path[0];
                const parent = categories.find(
                    (c: any) => c.id === parentId
                );
                if (parent) {
                    newBreadcums.push(parent);
                    category.path.map((cateId: number) => {
                        if (parent.children?.length) {
                            parent.children.map((cate: any) => {
                                if (cate.id === cateId) {
                                    newBreadcums.push(cate);
                                    cate.children.map((child: any) => {
                                        if (child.id === cateId) {
                                            newBreadcums.push(child);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                newBreadcums.push(category);
                for (const el of newBreadcums) {
                    routers.push({
                        as: `/danh-muc/${el.slug}`, href: '/danh-muc/[slug]', name: el.name
                    });
                }
                routers.unshift({
                    as: `/danh-muc/${category.slug}`, href: '/danh-muc/[slug]', name: 'Danh M???c'
                });
            } else {
                routers.push(
                    { as: `/danh-muc/${category.slug}`, href: '/danh-muc/[slug]', name: 'Danh M???c' },
                    { as: `/danh-muc/${category.slug}`, href: '/danh-muc/[slug]', name: category.name }
                );
            }
            setBreadCum(routers);
        }
    }, [queryParams]);

    const fetchListItem = async () => {
        setLoading(true);
        const params = { ...queryParams } as any;
        const page = parseInt(params.page, 10);
        params.limit = parseInt(params.limit, 10) || 30;
        params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
        if (params.attributes) params.attributes = params.attributes.toString();
        switch (typeof params.categories) {
            case 'string':
                params.categories = `${params.categories}`;
                break;
            default:
                params.categories = `${category.id}`;
                break;
        }

        // Submit request
        await ItemAPI.list(
            params
        ).then((response: any) => {
            setCurrentPage(page || 1);
            setListItem(response.data || []);
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
        filters.map((f: any) => {
            f.options.map((o: any) => {
                if (o.id === option.id) {
                    o.checked = !o.checked;
                    if (f.param === 'attributes') {
                        const attributes = queryParams[f.param]?.toString().split(',');
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
        return router.push({ pathname: `/danh-muc/${router.query.slug}`, query: { ...queryParams } });
    };

    if (isNil(category)) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <div className='coco-search-wrap'>
            <Head>
                <title>{category.meta_title}</title>
                <meta property='og:title' content={category.meta_title} />
                <meta property='og:type' content='website' data-rh='true'></meta>
                <meta name='al:ios:url' content={`Cocoluxvn://danh-muc/${category.id}`} />
                <meta name='al:iphone:url' content={`Cocoluxvn://danh-muc/${category.id}`} />
                <meta name='al:ipad:url' content={`Cocoluxvn://danh-muc/${category.id}`} />
                <meta name='al:android:url' content={`Cocoluxvn://danh-muc/${category.id}`} />
                <meta property='og:url' content={`https://Cocolux.com/danh-muc/${category.slug}`} data-rh='true'></meta>
                <meta property='og:image' content={category.logo} data-rh='true' />
                <meta property='og:description' content={category.meta_content} />
            </Head>
            <Breadcrumb
                routes={[...breadCums]}
            />
            <div className='coco-search-wrap--body'>
                <div className='coco-search__left'>
                    {/* begin:: Filter Box */}
                    <CategoryFilterBox category={category} filters={filters} setFilters={setFilters} />
                    {/* end:: Filter Box */}
                </div>
                <div className='coco-search__right'>
                    <div className='card-list-item'>
                        <h1 className='card-list-item--header'>
                            {category.name}
                            <span> ({totalItem} k???t qu???) </span>
                        </h1>
                        <div className='card-list-item--content'>
                            {
                                paramSelected.length
                                    ? (
                                        <div className='card-list-item-filter border-bottom'>
                                            <span>L???c theo</span>
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
                                <span>S???p x???p theo</span>
                                {/* begin:: Sort Box */}
                                <CategorySortBox />
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
                                                    items.map(item => (
                                                        <ProductItem
                                                            key={item.id}
                                                            item={item}
                                                            column='col-1over5 col-6'
                                                        />
                                                    ))
                                                }
                                                {!items.length && <div className='px-5'>Kh??ng t??m th???y k???t qu??? ph?? h???p.</div>}
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        <div className='card-list-item--footer'>
                            <BoxContent title={category.name} content={category.content} maxHeight={300} className='d-sm-block' />
                            <Pagination totalRecord={totalItem} currentPage={currentPage} />
                        </div>
                    </div >
                </div>
            </div>

            {/* category content */}
            <BoxContent title={category.name} content={category.content} maxHeight={300} className='d-sm-none' />
            {/* category content */}
        </div>
    );
};

/**
 * Load Props
 * @param {*} param
 */
CategoryDetailPage.getInitialProps = async ({ query }: any = {}) => {
    if (isNil(query.slug)) {
        return { category: null };
    }
    const categoryId = query.slug.split('-i.')[1];
    const response = await ConfigAPI.detailCategory(categoryId);
    return { category: response.data || null };
};

export default CategoryDetailPage;
