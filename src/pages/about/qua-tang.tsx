import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Giftcode = () => (
    <LayoutAbout>
        <Head>
            <title>Thẻ quà tặng cocolux</title>
            <meta property='og:title' content='Thẻ quà tặng cocolux' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/qua-tang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            <meta name='description' content='Cocolux Hệ thống thương hiệu mỹ phẩm chính hãng, với 600 thương hiệu mỹ phẩm uy tín chất lượng Top 1 Việt Nam' />
        </Head>
        <div className='guide-container'>
            <div className='guide-content'>
                {/* <div className="content-title">Quà tặng</div> */}
            </div>
        </div>
    </LayoutAbout>
);

export default Giftcode;
