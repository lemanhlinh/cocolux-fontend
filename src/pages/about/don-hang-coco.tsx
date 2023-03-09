import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Order = () => (
    <LayoutAbout>
        <Head>
            <title>Đơn hàng tại cocolux</title>
            <meta property='og:title' content='Đơn hàng tại cocolux' />
            <meta property='og:url' content='https://cocolux.com/hoi-dap/don-hang-coco' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Khách hàng của Cocolux hoàn toàn có thể mua hàng qua điện thoại bằng các phương thức. Mua hàng qua website, truy cập website cocolux.com và tiến hành mua hàng. Hoặc mua hàng qua app CocoLux, đơn giản và nhanh chóng.' />
            <meta name='description' content='Khách hàng của Cocolux hoàn toàn có thể mua hàng qua điện thoại bằng các phương thức. Mua hàng qua website, truy cập website cocolux.com và tiến hành mua hàng. Hoặc mua hàng qua app CocoLux, đơn giản và nhanh chóng.' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/don_hang.jpg' alt='cocolux' />
            <div className='guide-content'>
                <div className='content-title'>Tôi có thể đặt hàng qua điện thoại được không?</div>
                <div>
                    Quý khách có thể liên hệ trực tiếp qua Hotline để được hướng dẫn đặt hàng, Cocolux luôn
                khuyến khích quý khách tạo tài khoản và đặt hàng online để được hưởng các chính sách ưu đãi thành viên tốt hơn.<br></br>
                Hoặc bạn có thể kiểm tra lại email Cocolux thông báo bạn đã đặt hàng thành công.
                </div>
                <div className='content-title'>Có giới hạn về số lượng sản phẩm khi đặt hàng không?</div>
                <div>
                    Quý khách có thể đặt hàng với số lượng sản phẩm tùy ý. Cocolux không giới hạn số lượng sản phẩm trong đơn hàng của quý khách.
                </div>
            </div>
        </div>
    </LayoutAbout>
);

export default Order;
