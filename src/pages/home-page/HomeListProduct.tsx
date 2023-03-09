import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductItem } from 'src/components/item-group';

// Components
import { LazyLoadProduct } from 'src/components/loading-group';

// Modules
import { ConfigAPI, ItemAPI } from 'src/helpers/services';
// import { Utilities } from 'src/helpers/utilities';

const HomeListProduct = () => {
    const [banners, setListBanner] = useState<any[]>([]);
    const [categories, setListCategories] = useState<any[]>([]);
    const { categoryPublics } = useSelector((state: any) => state.layout);
    const [loading, setLoading] = useState<Boolean>(true);

    const loadListItemByCateId = async (category: any = {}, index: number) => {
        try {
            const product = await ItemAPI.list({
                skip: 0,
                limit: 10,
                order_by: 'asc',
                sort_by: 'position',
                categories: category.id
            });
            const banner = await ConfigAPI.listBanner({
                skip: 0,
                limit: 1,
                types: `home_v1_category_home_banner_${index + 1}`
            });
            return {
                ...category,
                position: index,
                products: product.code ? [] : product.data,
                banners: banner.data?.length ? banner.data : [{ id: 1, image_url: 'https://cdn-thumb-image.cocolux.com/2021/04/customers/1618224295615-lazy-load-poster.jpeg' }]
            };
        } catch (error) {
            throw Error(error);
        }
    };

    const loadCategories = (data: []) => {
        const promies = data.map((cate: any, index: number) => loadListItemByCateId(cate, index));
        return Promise.all(promies);
    };

    const fetchListItems = async () => {
        const data = await loadCategories(categoryPublics);
        setListCategories(data);
        setLoading(false);
    };

    const fetchListBanners = () => {
        ConfigAPI.listBanner({
            skip: 0,
            limit: 5,
            types: ConfigAPI.BANNER_HOME_V1_PRIMARY_BANNER_2
        }).then((response: any = {}) => {
            setListBanner(response.code ? [] : response.data);
        }).finally(() => {
        });
    };

    useEffect(() => {
        fetchListItems();
        fetchListBanners();
    }, []);

    return (
        <>
            {
                loading
                    ? (
                        [1, 2, 3, 4, 5].map((index: number) => {
                            return (
                                <section className='section' key={index}>
                                    <div style={{ marginTop: '5px' }}>
                                        <LazyLoadProduct />
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <LazyLoadProduct />
                                    </div>
                                </section>
                            );
                        })
                    )
                    : (
                        categories.length
                            ? (
                                categories.map((cate: any = {}, index: number) => (
                                    <section className='section' key={cate.id}>
                                        <div
                                            className={
                                                index % 2 === 0
                                                    ? 'section--header bg-grey'
                                                    : 'section--header bg-grey row-reverse'
                                            }
                                        >
                                            <h2 className='section-title col-lg-2 sidebanner-title' title={cate.name}>
                                                <Link href={`/danh-muc/${cate.slug}`}>
                                                    <a className='color-light'>
                                                        {cate.name}
                                                    </a>
                                                </Link>
                                                <span></span>
                                            </h2>
                                            <ul className='sub-category'>
                                                {
                                                    cate.children.slice(0, 4).map((subCate: any = {}) => (
                                                        <li key={subCate.id}>
                                                            <Link href={`/danh-muc/${subCate.slug}`}>
                                                                <a>{subCate.name}</a>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <Link href={`/danh-muc/${cate.slug}`}>
                                                <a className='show-more'>Xem thêm</a>
                                            </Link>
                                        </div>
                                        <div
                                            className={
                                                index % 2 === 0
                                                    ? 'row no-margin'
                                                    : 'row no-margin row-reverse'
                                            }
                                        >
                                            <div className='col-lg-2 no-padding poster--image'>
                                                {
                                                    cate.banners[0]?.url
                                                        ? (
                                                            <Link href={`${cate.banners[0]?.url}`} key={cate.banners[0]?.id}>
                                                                <a>
                                                                    <img
                                                                        alt={cate.banners[0]?.image_url}
                                                                        src={cate.banners[0]?.image_url}
                                                                    />
                                                                </a>
                                                            </Link>
                                                        )
                                                        : (
                                                            <img
                                                                alt={cate.banners[0]?.image_url}
                                                                src={cate.banners[0]?.image_url}
                                                            />
                                                        )
                                                }

                                            </div>
                                            <div className='col-lg-10 bg-white'>
                                                <div className='row no-margin py-5'>
                                                    {
                                                        cate.products.map((item: any = {}, index: number) => (
                                                            <ProductItem
                                                                key={index}
                                                                item={item}
                                                                column='col-6 col-md-4 col-1over5'
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            cate.position === categoryPublics.length - 1
                                                ? (
                                                    <div className='row category-sub-banner' style={{ margin: '40px 0 0' }}>
                                                        {
                                                            banners.map((banner: any) => (
                                                                <Link href={`${banner.url}`} key={banner.id}>
                                                                    <a className='col-md-4'>
                                                                        <img
                                                                            alt={banner.title}
                                                                            style={{ width: '100%' }}
                                                                            src={banner.image_url}
                                                                        />
                                                                    </a>
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                                : null
                                        }
                                    </section>
                                ))
                            )
                            : null
                    )
            }
        </>
    );
};

export default HomeListProduct;
