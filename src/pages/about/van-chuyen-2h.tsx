import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Delivery2h = () => (
    <LayoutAbout>
        <Head>
            <title>Vận chuyển 2H</title>
            <meta property='og:title' content='Vận chuyển 2H' />
            <meta property='og:url' content='https://cocolux.com/hoi-dap/van-chuyen-2h' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Ngoài giao hàng thông thường Cocolux còn áp dụng Nowship. Ship hàng nhanh chóng trong vòng 2 giờ đồng hồ tại nội thành Hà Nội' />
            <meta name='description' content='Ngoài giao hàng thông thường Cocolux còn áp dụng Nowship. Ship hàng nhanh chóng trong vòng 2 giờ đồng hồ tại nội thành Hà Nội' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/van_chuyen_2h.jpg' alt='cocolux' />
            <div className='guide-content'>
                Cocolux đã ra mắt Dịch vụ giao nhanh trong 2h trong một thời gian. Nay để khách hàng trải
                nghiệm tốt hơn về dịch vụ, Cocolux miễn phí vận chuyển nhanh 2h tại nội thành thành phố Hà Nội cho các đơn hàng trên 250,000đ.
                <div className='content-title'>
                    ĐIỀU KIỆN để được áp dụng NowFree - MIỄN PHÍ GIAO NHANH 2H?
                </div>
                <div className='item-list'>
                    - Đơn hàng từ 90.000đ trở lên<br></br>- Đặt Hàng trong Khung giờ NowFree: 9h-16h
                    từ Thứ hai đến Chủ nhật<br></br>- Địa chỉ đặt hàng ở Hà Nội nằm trong Khu vực có
                    áp dụng NowFree (xem chi tiết tại đây)<br></br>- Giỏ hàng của quý khách không có
                    sản phẩm nằm ở nhiều kho hàng khác nhau<br></br>
                </div>
                <div className='content-title'>Khung giờ nào áp dụng dịch vụ giao hàng 2H?</div>
                <div className='table-grid'>
                    <div className='table-row'>
                        <div className='table-head'>Thời gian đặt hàng</div>
                        <div className='table-head'>Dự kiến nhận hàng</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 00:01 - 08:00</div>
                        <div className='table-cell'>Trước 10:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 08:01 - 09:00</div>
                        <div className='table-cell'>Trước 11:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 09:01 - 10:00</div>
                        <div className='table-cell'>Trước 12:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 10:01 - 11:00</div>
                        <div className='table-cell'>Trước 13:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 11:01 - 12:00</div>
                        <div className='table-cell'>Trước 14:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 12:01 - 13:00</div>
                        <div className='table-cell'>Trước 15:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 13:01 - 14:00</div>
                        <div className='table-cell'>Trước 16:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 14:01 - 15:00</div>
                        <div className='table-cell'>Trước 17:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 15:01 - 16:00</div>
                        <div className='table-cell'>Trước 18:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 16:01 - 18:00</div>
                        <div className='table-cell'>Trước 20:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Từ 18:01 - 08:00</div>
                        <div className='table-cell'>Trước 10:00 ngày kế tiếp</div>
                    </div>
                </div>
                <div className='content-title'>Khu vực áp dụng giao hàng 2H</div>
                <div className='item-list'>
                    Quận Ba Đình.<br></br>
                    Quận Hoàn Kiếm.<br></br>
                    Quận Đống Đa.<br></br>
                    Quận Thanh Xuân.<br></br>
                    Quận Cầu Giấy.<br></br>
                    Quận Hoàng Mai.<br></br>
                    Quận Hai Bà Trưng.<br></br>
                    Quận Tây Hồ.<br></br>
                    Quận Hà Đông.<br></br>
                    Quận Long Biên.<br></br>
                    Nam Từ Liêm.<br></br>
                    Bắc Từ Liêm.
                </div>
            </div>
        </div>
    </LayoutAbout>
);

export default Delivery2h;
