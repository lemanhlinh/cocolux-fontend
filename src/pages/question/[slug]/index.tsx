import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { isNil } from 'lodash';
// Modules
import { QuestionAPI } from 'src/helpers/services';

// Components
import NotFoundPage from 'src/pages/not-found';
import { LayoutAbout } from 'src/components/layout-group';

interface Props {
    model: any;
}

const ContentDetail: NextPage<Props> = ({ model }) => {

        /**
     * Render String To Html
     * @param {*} content
     */
        const renderStringToHtml = (content: string) => {
            const newContent = content || 'Không có dữ liệu hiển thị';
            return { __html: newContent };
        };

    if (isNil(model)) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <LayoutAbout content={model} >
            <Head>
                <title>{model.seo_title}</title>
                <meta property='og:image' content={model.image} />
                <meta property='og:title' content={model.seo_title} />
                <meta name='al:ios:url' content={`https://cocolux.com/hoi-dap/${model.alias}`} />
                <meta name='al:iphone:url' content={`https://cocolux.com/hoi-dap/${model.alias}`} />
                <meta name='al:ipad:url' content={`https://cocolux.com/hoi-dap/${model.alias}`} />
                <meta name='al:android:url' content={`https://cocolux.com/hoi-dap/${model.alias}`} />
                <meta property='og:url' content={`https://cocolux.com/hoi-dap/${model.alias}`} />
                <meta property='og:description' content={model.seo_description} />
                <meta name='description' content={model.seo_description} />
            </Head>
            
            <div className='content'>
                <div
                    className='ck-content'
                    dangerouslySetInnerHTML={renderStringToHtml(model.content)}
                />
            </div>
        </LayoutAbout>
    );
};

/**
 * Load Props
 * @param param
 */
ContentDetail.getInitialProps = async ({ query }: any = {}) => {
    if (isNil(query.slug)) {
        return { model: null };
    }
    const alias = query.slug;
    const response = await QuestionAPI.detail(alias);
    return { model: response.data || null };
};

export default ContentDetail;
