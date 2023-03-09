import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const TradeCoin = () => (
    <LayoutAbout>
        <Head>
            <title>Chính sách đổi Coco coin</title>
            <meta property='og:title' content='Chính sách đổi Coco coin' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/coco-coin' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Sau mỗi đơn hàng đặt tại website Cocolux.vn hay mua hàng trược tiếp khách hàng đều
            được tích điểm Coco Coin và sử dụng Coco Coin để tiến hàng mua hàng.' />
            <meta name='description' content='Sau mỗi đơn hàng đặt tại website Cocolux.vn hay mua hàng trược tiếp khách hàng đều
             được tích điểm Coco Coin và sử dụng Coco Coin để tiến hàng mua hàng.' />
        </Head>
        <img src='/media/images/chinh_sach_coco_coin.jpg' alt='cocolux' />
        <div className='trade-coin-content'>
            <span>- Quý khách vui lòng truy cập vào website Cocolux.com hoặc tải app Cocolux.</span>
            <span>- Đăng nhập tài khoản - Vào mục quản lý tài khoản &gt; chọn Coco coin.</span>
            <span>- Chọn đổi quà trực tiếp từ danh sách hoặc từ mục đổi quà &gt; chọn đồng ý.</span>
            <span>- Sau khi chọn đồng ý, copy mã đổi quà.</span>
            <span>- Đặt đơn hàng và nhập/dán mã đổi quà ở mục “Mã giảm giá/đổi quà”, sản phẩm quà tặng sẽ được thêm vào giỏ hàng của quý khách.</span>
            <span>*Với các mã quà đã được cấp sẵn quý khách thực hiện nhập mã tại bước thanh toán.</span>
        </div>
    </LayoutAbout>
);

export default TradeCoin;
