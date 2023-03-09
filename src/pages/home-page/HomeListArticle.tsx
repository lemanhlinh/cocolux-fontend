import { useEffect, useState } from 'react';
import Link from 'next/link';

// Components
import { LazyLoadProduct } from 'src/components/loading-group';

// Modules
import { ArticleAPI } from 'src/helpers/services';
import { Utilities } from 'src/helpers/utilities';

const HomeListArticle = () => {
    const [articles, setListArticle] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        async function fetchListArticle() {
            await ArticleAPI.list({
                skip: 0,
                limit: 4,
                is_home_visible: true
            }).then((response: any) => {
                if (response.code) return;
                setListArticle(response.data || []);
            }).finally(() => {
                setLoading(false);
            });
        }

        fetchListArticle();
    }, []);

    return (
        <section className='section article-section'>
            <div className='section--header'>
                <h2 className='section-title'>
                    <Link href='/blog'>
                        <a className='color-dark'>
                            TIN TỨC & SỰ KIỆN
                        </a>
                    </Link>
                </h2>
                <Link href='/blog'>
                    <a className='show-more'>
                        Xem Tất Cả
                    </a>
                </Link>
            </div>
            {
                loading
                    ? (
                        <div className='lazy-warpper'>
                            <LazyLoadProduct />
                        </div>
                    )
                    : (
                        articles.length
                            ? (
                                <div className='grid-row'>
                                    {
                                        articles.map((article: any = {}, index) => (
                                            <Link key={index} href={`/blog/${article.slug}`}>
                                                <a className='article'>
                                                    <div className='main-article'>
                                                        <img
                                                            alt={article.name}
                                                            src={Utilities.resizeImage(500, article.avatar)}
                                                        />
                                                        <div className='description'>
                                                            {/* <p className='title' title={article.title}>
                                                                {article.title}
                                                            </p> */}
                                                        </div>
                                                    </div>
                                                    <div className='sub-article' title={article.description}>
                                                        <span>{article.description}</span>
                                                    </div>
                                                </a>
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                            : null
                    )
            }
        </section>
    );
};

export default HomeListArticle;
