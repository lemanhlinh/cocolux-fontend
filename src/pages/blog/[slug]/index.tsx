import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { isNil } from 'lodash';

// Modules
import { ArticleAPI, ItemAPI } from 'src/helpers/services';
import { Utilities } from 'src/helpers/utilities';
import { HotItem } from 'src/components/item-group';

// Components
import NotFoundPage from 'src/pages/not-found';
import { Breadcrumb } from 'src/components/base-group';
import { LazyLoadArticleDetail } from 'src/components/loading-group';

interface Props {
    model: any;
}

const ArticleDetail: NextPage<Props> = ({ model }) => {
    // Declaration states
    const router = useRouter();
    const [hotItems, setHotItems] = useState<[]>([]);
    const [categories, setCategory] = useState<[]>([]);
    const [recommend, setRecommend] = useState<[]>([]);
    const [breadCums, setBreadCum] = useState<any>([]);
    const [categoryId, setCategoryId] = useState<any>(null);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);

    const fetchListItems = async () => {
        await ItemAPI.list({
            skip: 0,
            limit: 5,
            is_top_hot: true
        }).then((response: any) => {
            if (response.code) return;
            setHotItems(response.data);
        }).finally(() => {
            setFirstLoad(false);
        });
    };

    /**
     *  Load list categories
     */
    const fetchListCategories = async () => {
        await ArticleAPI.listCategories({
            skip: 0,
            limit: 50,
        }).then((res: any) => {
            if (!res.code) {
                setCategory(res.data || []);
            }
        });
    };

    /**
     *  Load list recommend articles
     */
    const fetchListRecommend = async (categoryId: number) => {
        await ArticleAPI.list({
            skip: 0,
            limit: 5,
            view_count: true,
            categories: categoryId
        }).then((res: any) => {
            if (res.code) {
                return false;
            }
            setRecommend(res.data || []);
            return true;
        });
    };

    const onChangeCategory = async (categoryId: number) => {
        router.push({
            pathname: '/blog',
            query: { categories: categoryId, page: '1' }
        });
    };

    /**
     * Render String To Html
     * @param {*} content
     */
    const renderStringToHtml = (content: string) => {
        const newContent = content || 'Kh??ng c?? d??? li???u hi???n th???';
        return { __html: newContent };
    };

    useEffect(() => {
        // Load breadcum
        const items = [] as any;
        if (model?.categories && model?.categories?.length) {
            model.categories.map((c: any) => {
                items.push({
                    as: '/blog',
                    href: `/blog?categories=${c.id}`,
                    name: c.name
                });
            });
            const lastCategory = model.categories[model.categories.length - 1];
            if (lastCategory) {
                setCategoryId(lastCategory?.id);
                fetchListRecommend(lastCategory?.id);
            }
        }
        if (model?.slug) {
            items.push({
                as: `/blog/${model.slug}`,
                href: '/blog/[slug]',
                name: model.title
            });
        }
        setBreadCum(items as any);
    }, [router.query]);

    /**
     * Load default data
     * @private
     */
    useEffect(() => {
        // Handle request
        fetchListCategories();
        fetchListItems();
    }, []);

    if (isNil(model)) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <div className='ccs-blog row'>
            <Head>
                <title>{model.meta_title}</title>
                <meta property='og:image' content={model.avatar} />
                <meta property='og:title' content={model.meta_title} />
                <meta name='al:ios:url' content={`Cocoluxvn://blog/${model.id}`} />
                <meta name='al:iphone:url' content={`Cocoluxvn://blog/${model.id}`} />
                <meta name='al:ipad:url' content={`Cocoluxvn://blog/${model.id}`} />
                <meta name='al:android:url' content={`Cocoluxvn://blog/${model.id}`} />
                <meta property='og:url' content={`https://Cocolux.com/${model.meta_url}`} />
                <meta property='og:description' content={model.meta_description} />
                <meta name='description' content={model.meta_description} />
            </Head>
            <div className='col-8 mx-auto'>
                <Breadcrumb
                    routes={breadCums}
                />
            </div>
            <div className='col-12 px-12'>
                <div className='list-cate-mobile'>
                    {/* <button
                        onClick={() => onChangeCategory(0)}
                        className='btn btn-light'
                    >
                        T???t c???
                    </button> */}
                    {
                        categories.map((category: any = {}, index: number) => (
                            <button
                                onClick={() => onChangeCategory(category.id)}
                                className='btn btn-light'
                                key={index}
                            >
                                {category.name}
                            </button>
                        ))
                    }
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
                                            Blog l??m ?????p
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
                                                        <div className='empty-data'>Kh??ng c?? d??? li???u hi???n th???.</div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className='item-collection'
                                    >
                                        <div className='common-title border-b text-center text-danger'>
                                            S???n ph???m hot
                                        </div>
                                        <div className='item-collection-list'>
                                            {
                                                hotItems && hotItems.length
                                                    ? (
                                                        hotItems.map((item, index) => (
                                                            <HotItem
                                                                key={index}
                                                                hotItem={item}
                                                            />
                                                        ))
                                                    )
                                                    : (
                                                        <div className='empty-data'>Kh??ng c?? d??? li???u hi???n th???.</div>
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
                <div className='ccs-blog-middle h-100 mb-60'>
                    {
                        isFirstLoad
                            ? <LazyLoadArticleDetail />
                            : (
                                <>
                                    <div className='middle__content'>
                                        <h1 className='title-content'>{model.title}</h1>
                                        <div
                                            className='ck-content'
                                            dangerouslySetInnerHTML={renderStringToHtml(model.content)}
                                        />
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>

            <div className='col-2 block-right'>
                <div className='ccs-blog-right'>
                    <div className='common-title text-dark'>
                        Tin t???c li??n quan
                    </div>
                    {
                        isFirstLoad
                            ? <LazyLoadArticleDetail />
                            : (
                                <div className='list-blog'>
                                    {
                                        recommend.length
                                            ? (
                                                recommend.map((el: any) => (
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
                                                <div className='empty-data'>Kh??ng c?? d??? li???u hi???n th???.</div>
                                            )
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

/**
 * Load Props
 * @param param
 */
ArticleDetail.getInitialProps = async ({ query }: any = {}) => {
    if (isNil(query.slug)) {
        return { model: null };
    }
    const articleId = query.slug.split('-i.')[1];
    const response = await ArticleAPI.detail(articleId);
    return { model: response.data || null };
};

export default ArticleDetail;
