import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { isEmpty, isNil } from 'lodash';

// Modules
import { AuthorAPI } from 'src/helpers/services';

// Components
import NotFoundPage from 'src/pages/not-found';

interface Props {
    model: any;
}

const AuthorPage: NextPage<Props> = ({ model }) => {
    // Not found
    if (isNil(model) || !isNil(model) && model?.is_visible === false) {
        return (
            <NotFoundPage />
        );
    }

    /**
     * Render String To Html
     * @param {*} content
     */
    const renderStringToHtml = (content: string) => {
        const newContent = content || 'Không có dữ liệu hiển thị';
        return { __html: newContent };
    };

    return (
        <div className='article-detail-wrapper row no-margin'>
            <Head>
                <title>{model.meta_title}</title>
                <meta property='og:image' content={model.meta_image} />
                <meta property='og:title' content={model.meta_title} />
                <meta name='al:ios:url' content={`Cocoluxvn://author/${model.slug}`} />
                <meta name='al:iphone:url' content={`Cocoluxvn://author/${model.slug}`} />
                <meta name='al:ipad:url' content={`Cocoluxvn://author/${model.slug}`} />
                <meta name='al:android:url' content={`Cocoluxvn://author/${model.slug}`} />
                <meta property='og:url' content={`https://Cocolux.com/author/${model.meta_url}`} />
                <meta property='og:description' content={model.meta_description} />
                <meta name='description' content={model.meta_description} />
            </Head>
            <div className='article-detail-wrapper--left col-12'>
                <section>
                    <div className='article-detail-title'>
                        <h1>
                            <span>{model.title}</span>
                        </h1>
                    </div>
                    <div
                        className='ck-content article-detail-content'
                        dangerouslySetInnerHTML={renderStringToHtml(model.content)}
                    ></div>
                </section>
            </div>
        </div>
    );
};

/**
 * Load Props
 * @param param
 */
AuthorPage.getInitialProps = async ({ query }: any = {}) => {
    if (isEmpty(query.slug)) {
        return { model: null };
    }
    const response = await AuthorAPI.detail(query.slug);
    return { model: response.data || null };
};

export default AuthorPage;
