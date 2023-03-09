import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const ShippingCost = () => (
    <LayoutAbout>
        <Head>
            <title>Phí vận chuyển</title>
            <meta property='og:title' content='Phí vận chuyển' />
            <meta property='og:url' content='https://cocolux.com/hoi-dap/phi-van-chuyen' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Phí vận chuyển tại Cocolux được tính theo theo vị trí của bạn với cước phí phù hợp nhất. Áp dụng miễn phí vận chuyển cho những đơn hàng nội thành Hà Nội giá trị đơn trên 250.000đ' />
            <meta name='description' content='Phí vận chuyển tại Cocolux được tính theo theo vị trí của bạn với cước phí phù hợp nhất. Áp dụng miễn phí vận chuyển cho những đơn hàng nội thành Hà Nội giá trị đơn trên 250.000đ' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/phi_van_chuyen.jpg' alt='cocolux' />
            <div className='guide-content'>
                COCOLUX đồng giá phí vận chuyển giao hàng Toàn Quốc 20.000VNĐ cho mọi đơn hàng đặt tại Website
                và App Cocolux. Đối với một trong hai hình thức thanh toán: chuyển khoản hoặc thanh toán trực
                tiếp khi nhận hàng. Lưu ý các đơn hàng có giá trị trên 5.000.000VNĐ chỉ được áp dụng hình thức chuyển khoản.
                {/* <div className='item-text'>
                    - Khu vực Miền Nam: <b>40.000đ</b><br></br>
                    - Khu vực Miền Bắc – Miền Trung: <b>30.000đ</b><br></br>
                    - Hà Nội: <b>25.000đ</b>
                </div> */}
            </div>
        </div>
    </LayoutAbout>
);

export default ShippingCost;
