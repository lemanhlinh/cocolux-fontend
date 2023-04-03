import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import Head from 'next/head';
import { head, isNil } from 'lodash';
import { NextPage } from 'next';

// Modules
import { ArticleAPI, ItemAPI } from 'src/helpers/services';
import { Utilities } from 'src/helpers/utilities';

// Components
import { Pagination } from 'src/components/base-group';
import { HotItem } from 'src/components/item-group';
import { LazyLoadArticleDetail } from 'src/components/loading-group';

interface Props{
    topArticles: [],
    articles: [],
    currentPage: number,
    totalRecord: number,
    recommendList: []
}

const Article: NextPage<Props> = ({ topArticles, articles, currentPage, totalRecord, recommendList }) => {
    // Declaration states
    const router = useRouter();
    const queryParams = router.query as any;
    const [items, setListItems] = useState<[]>([]);
    // const [articles, setArticle] = useState<[]>([]);
    const [categories, setCategory] = useState<[]>([]);
    // const [topArticles, setTopArticle] = useState<[]>([]);
    // const [recommendList, setRecommend] = useState<[]>([]);
    const [categoryId, setCategoryId] = useState<any>(null);
    // const [totalRecord, setTotalRecord] = useState<number>(0);
    // const [currentPage, setCurrentPage] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(false);

    const fetchListItems = async () => {
        await ItemAPI.list({
            skip: 0,
            limit: 5,
            is_top_hot: true
        }).then((response: any) => {
            if (response.code) return;
            setListItems(response.data);
        });
    };

    // const fetchTopArticles = async (categoryId: number) => {
        // await ArticleAPI.list({
        //     skip: 0,
        //     limit: 4,
        //     categories: categoryId,
        //     is_favorite_visible: true
        // }).then((response: any) => {
        //     if (response.code) return;
        //     setTopArticle(response.data);
        // });
    // };

    // const fetchArticleRecommend = async (categoryId: number) => {
    //     await ArticleAPI.list({
    //         skip: 0,
    //         limit: 5,
    //         view_count: true,
    //         categories: categoryId
    //     }).then((response: any) => {
    //         if (response.code) return;
    //         setRecommend(response.data);
    //     });
    // };

    const onChangeCategory = async (categoryId: number) => {
        setFirstLoad(false);
        // setTopArticle([]);
        // setRecommend([]);
        router.push({
            pathname: '/blog',
            query: { categories: categoryId ? categoryId : null, skip: 0, page: '1' }
        });
    };

    /**
     * Load list articles
     */
    // const fetchListArticles = async () => {
    //     // Prepare params
    //     const params = { ...queryParams };
    //     const page = parseInt(params.page, 8);
    //     params.limit = parseInt(params.limit, 10) || 8;
    //     params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
    //     params.order_by = 'desc';
    //     params.sort_by = 'created_at';
    //     if (params.categories) setCategoryId(+params.categories);

    //     // Submit request
    //     await ArticleAPI.list(
    //         params
    //     ).then((res: any) => {
    //         setCurrentPage(page || 1);
    //         setArticle(res.data || []);
    //         setTotalRecord(res.count || 0);
    //     }).finally(() => {
    //         setTimeout(() => {
    //             setFirstLoad(false);
    //         }, 300);
    //     });
    // };

    /**
     *  Load list categories
     */
    const fetchListCategories = async () => {
        await ArticleAPI.listCategories({
            skip: 0,
            limit: 50,
        }).then((res: any) => {
            if (!res.code) {
                const data = res.data || [];
                const firstCategory = head(data) as any;
                setCategory(data);
                if (firstCategory && !queryParams['categories']) {
                    setCategoryId(+firstCategory?.id);
                    router.push({
                        pathname: '/blog',
                        query: { categories: firstCategory?.id, page: '1' }
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchListItems();
        fetchListCategories();
    }, []);

    // useEffect(() => {
    //     if (!isNil(categoryId)) {
    //         fetchTopArticles(categoryId);
    //         fetchArticleRecommend(categoryId);
    //     }
    // }, [categoryId]);

    /**
     * Load default data
     * @private
     */
    // useEffect(() => {
    //     fetchListArticles();
    // }, [queryParams]);

    return (
        <div className='ccs-blog row'>
            <Head>
                <title>Tin tức mới nhất về mỹ phẩm xu hướng làm đẹp mỗi tuần</title>
                <meta property='og:url' content='https://cocolux.com/blog' data-rh='true'></meta>
                <meta property='og:title' content='Tin tức mới nhất về mỹ phẩm xu hướng làm đẹp mỗi tuần' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' />
                <meta property='og:description' content='CocoLux luôn cập nhật nhanh chóng đầy đủ những tin tức, xu hướng làm đẹp được giới trẻ yêu thích nhất. Cung cấp những mẹo nhỏ tiện lợi hơn trong chăm sóc da, trang điểm giúp các nàng tiết kiệm thời gian nhưng vẫn hữu ích.' />
            </Head>
            <div className='col-12 px-12'>
                <div className='list-cate-mobile'>
                    {/* <button
                        onClick={() => onChangeCategory(0)}
                        className={`btn btn-light ${categoryId ? 'inactive' : 'active'}`}
                    >
                        Tất cả
                    </button> */}
                    {categories.map((category: any = {}, index: number) => (
                        <button
                            onClick={() => onChangeCategory(category.id)}
                            className={`btn btn-light ${+categoryId === category.id ? 'active' : 'inactive'}`}
                            key={index}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className='col-2'>
                <div className='ccs-blog-left'>
                    {
                        isFirstLoad
                            ? <LazyLoadArticleDetail />
                            : (
                                <>
                                    <div
                                        className='category-box'
                                    >
                                        <div className='common-title border-b text-center text-danger'>
                                            Blog làm đẹp
                                        </div>
                                        <div className='category-list beautify-scroll s-grey'>
                                            {
                                                categories?.length
                                                    ? (
                                                        categories.map((c: any) => (
                                                            <div
                                                                className={`category-list-item ${c.parent_id ? 'child' : 'parent'} ${categoryId === c.id ? 'active' : null}`}
                                                                onClick={() => onChangeCategory(c.id)}
                                                                key={c.name}
                                                            >
                                                                <span> {c.name}</span>
                                                            </div>
                                                        ))
                                                    )
                                                    : (
                                                        <div className='empty-data'>Không có dữ liệu hiển thị.</div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className='item-collection'
                                    >
                                        <div className='common-title border-b text-center text-danger'>
                                            Sản phẩm hot
                                        </div>
                                        <div className='item-collection-list'>
                                            {
                                                items && items.length
                                                    ? (
                                                        items.map((item, index) => (
                                                            <HotItem
                                                                key={index}
                                                                hotItem={item}
                                                            />
                                                        ))
                                                    )
                                                    : (
                                                        <div className='empty-data'>Không có dữ liệu hiển thị.</div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>

            <div className='col-md-8'>
                <div className='ccs-blog-middle'>
                    {
                        isFirstLoad
                            ? <LazyLoadArticleDetail />
                            : (
                                <>
                                    <div className='middle__topbox'>
                                        {
                                            topArticles.length
                                                ? (
                                                    <div className='row'>
                                                        <div className='col-md-7 col-left'>
                                                            {
                                                                topArticles.slice(0, 1).map((el: any) => (
                                                                    <div className='topbox-item' key={el.id}>
                                                                        <Link
                                                                            href='/blog/[slug]'
                                                                            as={`/blog/${el.slug}`}
                                                                        >
                                                                            <a className='topbox-item-thumbnail'>
                                                                                <img className='img-absolute' src={Utilities.resizeImage(500, el.avatar)} alt='cocolux' />
                                                                            </a>
                                                                        </Link>
                                                                        <Link
                                                                            href='/blog/[slug]'
                                                                            as={`/blog/${el.slug}`}
                                                                        >
                                                                            <a>
                                                                                <h5 className='topbox-item-title' title={el.title}>
                                                                                    {el.title}
                                                                                </h5>
                                                                            </a>
                                                                        </Link>
                                                                        <div className='topbox-item-time'>
                                                                            <img
                                                                                src='/media/images/ic-datetime.svg'
                                                                                alt='cocolux'
                                                                            />
                                                                            <span>
                                                                                {moment
                                                                                    .unix(el.created_at)
                                                                                    .format('DD/MM/YYYY HH:mm:ss')}
                                                                            </span>
                                                                        </div>
                                                                        <div className='topbox-item-content text-overflow'>
                                                                            {el.description}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className='col-md-5 col-right'>
                                                            {
                                                                topArticles.length >= 2
                                                                    ? (
                                                                        topArticles.slice(1, 2).map((el: any) => (
                                                                            <div className='topbox-item item-sm' key={el.id}>
                                                                                <Link
                                                                                    href='/blog/[slug]'
                                                                                    as={`/blog/${el.slug}`}
                                                                                >
                                                                                    <a className='topbox-item-thumbnail'>
                                                                                        <img className='img-absolute' src={Utilities.resizeImage(500, el.avatar)} alt='cocolux' />
                                                                                    </a>
                                                                                </Link>
                                                                                <Link
                                                                                    href='/blog/[slug]'
                                                                                    as={`/blog/${el.slug}`}
                                                                                >
                                                                                    <a>
                                                                                        <h5 className='topbox-item-title' title={el.title}>
                                                                                            {el.title}
                                                                                        </h5>
                                                                                    </a>
                                                                                </Link>
                                                                                <div className='topbox-item-time'>
                                                                                    <img
                                                                                        src='/media/images/ic-datetime.svg'
                                                                                        alt='cocolux'
                                                                                    />
                                                                                    <span>
                                                                                        {moment
                                                                                            .unix(el.created_at)
                                                                                            .format('DD/MM/YYYY HH:mm:ss')}
                                                                                    </span>
                                                                                </div>
                                                                                <div className='topbox-item-content text-overflow'>
                                                                                    {el.description}
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : null
                                                            }
                                                            {
                                                                topArticles.length >= 2
                                                                    ? (
                                                                        topArticles.slice(2, 4).map((el: any) => (
                                                                            <div className='card-common-blog' key={el.id}>
                                                                                <Link
                                                                                    href='/blog/[slug]'
                                                                                    as={`/blog/${el.slug}`}
                                                                                >
                                                                                    <a
                                                                                        className='text-overflow'
                                                                                    >
                                                                                        {el.title}
                                                                                    </a>
                                                                                </Link>
                                                                            </div>
                                                                        ))
                                                                    ) : null
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                                : null
                                        }
                                    </div>
                                    <div className='middle__endbox'>
                                        {
                                            articles.length
                                                ? (
                                                    articles.map((el: any) => (
                                                        <div className='endbox-item' key={el.id}>
                                                            <Link
                                                                href='/blog/[slug]'
                                                                as={`/blog/${el.slug}`}
                                                            >
                                                                <a className='endbox-item-thumbnail'>
                                                                    <img className='img-absolute' src={Utilities.resizeImage(500, el.avatar)} alt='cocolux' />
                                                                </a>
                                                            </Link>
                                                            <div className='endbox-item-content'>
                                                                <Link
                                                                    href='/blog/[slug]'
                                                                    as={`/blog/${el.slug}`}
                                                                >
                                                                    <a>
                                                                        <h5 className='content__title text-overflow' title={el.title}>
                                                                            {el.title}
                                                                        </h5>
                                                                    </a>
                                                                </Link>
                                                                <div className='content__time'>
                                                                    <img
                                                                        src='/media/images/ic-datetime.svg'
                                                                        alt='cocolux'
                                                                    />
                                                                    <span>
                                                                        {moment
                                                                            .unix(el.created_at)
                                                                            .format('DD/MM/YYYY HH:mm:ss')}
                                                                    </span>
                                                                </div>
                                                                <div className='content__short text-overflow'>
                                                                    {el.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : null
                                        }
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>

            <div className='col-2 block-right'>
                <div className='ccs-blog-right'>
                    <div className='common-title text-dark'>
                        Tin tức liên quan
                    </div>
                    {
                        isFirstLoad
                            ? <LazyLoadArticleDetail />
                            : (
                                <div className='list-blog'>
                                    {
                                        recommendList.length
                                            ? (
                                                recommendList.map((el: any) => (
                                                    <div className='blog-item' key={el.id}>
                                                        <Link
                                                            href='/blog/[slug]'
                                                            as={`/blog/${el.slug}`}
                                                        >
                                                            <a className='blog-item-thumbnail'>
                                                                <img className='img-absolute' src={Utilities.resizeImage(500, el.avatar)} alt='cocolux' />
                                                            </a>
                                                        </Link>
                                                        <Link
                                                            href='/blog/[slug]'
                                                            as={`/blog/${el.slug}`}
                                                        >
                                                            <a className='blog-item-title' title={el.title}>
                                                                {el.title}
                                                            </a>
                                                        </Link>
                                                        <p className='blog-item-content text-overflow'>
                                                            {el.description}
                                                        </p>
                                                    </div>
                                                ))
                                            )
                                            : (
                                                <div className='empty-data'>Không có dữ liệu hiển thị.</div>
                                            )
                                    }
                                </div>
                            )
                    }
                </div>
            </div>

            <div className='col-12 mb-60' >
                <Pagination
                    perPage={8}
                    totalRecord={totalRecord}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

Article.getInitialProps = async ( query ) => {

    const params: any = query.query;
    const response = await ArticleAPI.list({
        skip: 0,
        limit: 4,
        categories: params.categories,
        is_favorite_visible: true
    });

    const page = parseInt(params.page, 8);
    params.limit = parseInt(params.limit, 10) || 8;
    params.skip = page ? Math.ceil(page - 1) * params.limit : 0;
    params.order_by = 'desc';
    params.sort_by = 'created_at';

    // Submit request
    const res = await ArticleAPI.list(params);

    const responseRe = await ArticleAPI.list({
        skip: 0,
        limit: 5,
        view_count: true,
        categories: params.categories
    })

    return ({ topArticles: response.data, articles: res.data, currentPage: page, totalRecord: res.count, recommendList: responseRe.data } || null);
}

export default Article;
