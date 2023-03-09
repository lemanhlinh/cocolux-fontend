import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Invoice = () => (
    <LayoutAbout>
        <Head>
            <title>Đặt hàng tại cocolux</title>
            <meta property='og:title' content='Đặt hàng tại cocolux' />
            <meta property='og:url' content='https://cocolux.com/hoi-dap/dat-hang-tai-coco' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Việc mua hàng tại Cocolux không chỉ đơn giản mà bạn còn có thể kiểm tra trạng thái vận chuyển của đơn hàng. Nếu bạn muốn hủy đơn vui lòng liên hoặc thay đổi sản phẩm vui lòng thực hiện trươc khi hàng được giao cho đơn vị vận chuyển.' />
            <meta name='description' content='Việc mua hàng tại Cocolux không chỉ đơn giản mà bạn còn có thể kiểm tra trạng thái vận chuyển của đơn hàng. Nếu bạn muốn hủy đơn vui lòng liên hoặc thay đổi sản phẩm vui lòng thực hiện trươc khi hàng được giao cho đơn vị vận chuyển.' />
        </Head>

        <div className='guide-container'>
            <img src='/media/images/dat_hang_tai_coco.jpg' alt='cocolux' />
            <div className='guide-content'>
                <div className='content-title'>Tôi muốn kiểm tra lại đơn hàng đã mua?</div>
                <div>
                    Quý khách bấm vào nút “tài khoản” trên góc phải màn hình sau đó chọn vào mục “Tài khoản của bạn” vào chọn vào ô “Đơn hàng của tôi” để kiểm tra lại các sản phẩm đã đặt mua.<br></br>
                Hoặc bạn có thể kiểm tra lại email Cocolux thông báo bạn đã đặt hàng thành công.
                </div>
                <div className='content-title'>Tôi muốn thay đổi hoặc hủy bỏ đơn hàng đã mua thì sao?</div>
                <div>
                    Việc thay đổi sản phẩm trong đơn hàng quý khách vui lòng liên hệ Cocolux Care qua Hotline để được hướng dẫn chi tiết.<br></br>
                Đơn hàng chỉ được hủy khi đơn hàng của quý khách chưa chuyển trạng thái cho đơn vị vận chuyển.
                </div>
            </div>
        </div>
    </LayoutAbout>
);

export default Invoice;
