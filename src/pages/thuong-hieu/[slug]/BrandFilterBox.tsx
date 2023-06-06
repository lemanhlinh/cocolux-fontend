import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Modules
import { FilterModel } from 'src/helpers/models';
import { AttributeAPI } from 'src/helpers/services';
import { parse } from 'querystring';
import { includes, omit } from 'lodash';

interface Props {
    setFilters: any;
    filters: FilterModel[];
    all: any;
}

const BrandFilterBox: React.FC<Props> = ({ filters, setFilters, all }) => {
    const router = useRouter();
    const { categories } = useSelector((state: any) => state.layout);

    /**
     * Fetch data
     * @returns
     */
    async function fetchData() {
        const data = [...filters] as any[];
        const queryParams = parse(location.search.replace('?', ''));

        if (categories.length) {
            const values = [] as any[];
            categories.map((cate: any = {}) => {
                const checked = queryParams.categories
                    ? queryParams.categories === cate.id
                    : false;
                values.push({
                    id: cate.id,
                    name: cate.name,
                    slug: cate.slug,
                    checked: checked,
                    options: []
                });
            });
            const indexOf = data.findIndex(
                c => c.id === 0
            );
            if (indexOf === -1) {
                const option = {
                    id: 0,
                    name: 'Danh Mục',
                    checked: false,
                    multiple: false,
                    param: 'categories',
                    group: 'categories_',
                    options: values as [any]
                };
                data.push(option);
            } else {
                data[indexOf].options = [...values] as [any];
            }
        }

        if (data.length < 2) {
            const response = await AttributeAPI.listAttribute({
                skip: 0,
                limit: 50,
                group: 'product_attribute'
            });
            if (!response.code) {
                response.data.map((item: any) => {
                    if (item.type === 'select') {
                        data.push({
                            id: item.id,
                            code: item.code,
                            name: item.name,
                            options: [],
                            checked: false,
                            multiple: false,
                            param: 'attributes',
                            group: `attributes_${item.code}`,
                        });
                    }
                });
            }
        }

        if (data.length) {
            for (const el of data) {
                if (el.param === 'attributes') {
                    const response = await AttributeAPI.listAttributeValue({
                        skip: 0,
                        limit: 600,
                        order_by: 'asc',
                        sort_by: 'position',
                        attribute_code: el.code,
                        ...omit(queryParams, ['keyword', 'attributes'])
                    });
                    if (response.data) {
                        const options = response.data as [];
                        const values = options.filter(
                            (o: any) => o.attribute_code === el.code
                        );
                        el.options = values.map((value: any) => {
                            const checked = queryParams.attributes && typeof queryParams.attributes === 'string'
                                ? includes(queryParams.attributes.split(','), `${el.id}:${value.id}`)
                                : false;
                            const id = `${el.id}:${value.id}`;
                            const count = all.filter((item: { normalize_attribute?: string[] }) => item.normalize_attribute && item.normalize_attribute.includes(id)).length;
                            return {
                                id: `${el.id}:${value.id}`,
                                name: value.name,
                                count: count,
                                checked: checked,
                                options: []
                            };
                        });
                    }
                }
            }
        }

        setFilters([...data]);
    }

    useEffect(() => {
        fetchData();
    }, [router.query]);

    /**
     * Change Param
     * @param filterId
     * @param optionId
     * @returns
     */
    const onChangeParam = (filterId: number, optionId: string) => {
        const newFilters = [...filters];
        const filterChecked = newFilters.find(
            (f: any) => f.id === filterId
        );
        if (filterChecked) {
            filterChecked.options.map((option: any = {}) => {
                option.checked = option.id !== optionId
                    ? option.checked && filterChecked.multiple
                    : true;
                return option;
            });
        }

        // pick param checked
        const queryParams = {} as any;
        newFilters.map((filter: FilterModel) => {
            const checked = filter.options.filter(o => o.checked);
            if (checked.length) {
                if (queryParams[filter.param]) {
                    if (filter.param === 'attributes') {
                        queryParams[filter.param] += `,${checked.map(x => x.id)}`;
                    } else {
                        queryParams[filter.param] = checked.map(x => x.id).concat(queryParams[filter.param]);
                    }
                } else {
                    queryParams[filter.param] = checked.map(x => x.id);
                }
            }
        });

        return router.push({
            pathname: '/search',
            query: { ...router.query, ...queryParams, page: '1' }
        });
    };

    /**
     * Change Page
     * @param slug
     * @returns
     */
    const onChangePage = (slug: string) => {
        router.push(`/danh-muc/${slug}`);
    };

    return (
        <div className='coco-filter-wrapper'>
            <div className='coco-filter-wrapper--toggle'>
                <img src='/media/images/ic-filter-black.svg' alt='cocolux' />
                <span>Bộ lọc tìm kiếm</span>
            </div>
            <div className='coco-filter-wrapper--collapse'>
                {
                    filters.map((filter: any, index: number) => (
                        filter.options && filter.options.length
                            ? (
                                <div className='list-group' key={index}>
                                    <div className='list-group-title'>
                                        {filter.name}
                                    </div>
                                    {
                                        filter.param === 'attributes'
                                            ? (
                                                <div className='list-group-items'>
                                                    {
                                                        filter.options.map((option: any) => (
                                                            option.count !== '0'
                                                                ? (
                                                                    <span
                                                                        id={option.id}
                                                                        key={option.id}
                                                                        className={`item-group-title ${option.checked ? 'active' : null}`}
                                                                        onClick={() => onChangeParam(filter.id, option.id)}
                                                                    >
                                                                        {option.name} <span style={{ marginLeft: '2px' }}>({option.count})</span>
                                                                    </span>
                                                                )
                                                                : null
                                                        ))
                                                    }
                                                </div>
                                            )
                                            : (
                                                <div className='list-group-items' key={filter.id}>
                                                    {
                                                        filter.options.map((option: any) => (
                                                            option.count !== '0'
                                                                ? (
                                                                    <span
                                                                        id={option.id}
                                                                        key={option.id}
                                                                        className={`item-group-title ${option.checked ? 'active' : null}`}
                                                                        onClick={() => onChangePage(option.slug)}
                                                                    >
                                                                        {option.name}
                                                                    </span>
                                                                )
                                                                : null
                                                        ))
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                            : null
                    ))
                }
            </div>
        </div >
    );
};

export default BrandFilterBox;
