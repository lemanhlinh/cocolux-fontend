import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
// Modules & Component
import { ConfigAPI } from 'src/helpers/services';
import { LayoutAbout } from 'src/components/layout-group';
import { QuestionAPI,ContentAPI } from 'src/helpers/services';

interface Props {
    stores: any;
    listContent: any;
    listQuestion: any
}

const Showroom: NextPage<Props> = ({ stores, listContent, listQuestion }) => {
    return (
        <LayoutAbout listContent={listContent} listQuestion={listQuestion}>
            <Head>
                <title>Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da</title>
                <meta property='og:url' content='https://cocolux.com/thong-tin/cua-hang' data-rh='true' />
                <meta property='og:title' content='Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
                <meta name='description' content='Cocolux Hệ thống thương hiệu mỹ phẩm chính hãng, với 600 thương hiệu mỹ phẩm uy tín chất lượng Top 1 Việt Nam' />
            </Head>

            <div className='list-stores-frame'>
                <div className='list-stores-frame--left'>
                    <a
                        href='https://www.google.com/maps/search/Coco+shop/@21.0179891,105.8046029,12.82z?hl=vi-VN'
                    >
                        <img src='/media/images/map-preview.png' alt='cocolux' />
                    </a>
                </div>
                <div className='list-stores-frame--right'>
                    <div className='stores-collection'>
                        {
                            stores.map((item: any = {}, index: number) => (
                                <div className='item-store' key={index}>
                                    <div className='item-store--logo'>
                                        <img src={item.logo} alt='cocolux' />
                                    </div>
                                    <div className='item-store--text'>
                                        <div className='title'>{item.name}</div>
                                        <span>{item.address}</span>
                                        <span>{item.phone}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </LayoutAbout>
    );
};

/**
 * Load Props
 * @param param
 */
Showroom.getInitialProps = async () => {
    const stores = await ConfigAPI.listStore({
        skip: 0,
        limit: 20
    });
    const listContent = await ContentAPI.listContent();
    const listQuestion = await QuestionAPI.listQuestion();
    return ({ stores: stores.data, listContent: listContent.data, listQuestion: listQuestion.data } || null );
};

export default Showroom;
