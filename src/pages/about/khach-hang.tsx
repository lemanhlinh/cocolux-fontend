import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const VipMember = () => (
    <LayoutAbout>
        <Head>
            <title>Khách hàng thân thiết</title>
            <meta property='og:title' content='Khách hàng thân thiết' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/khach-hang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Chương trình tri ân khách hàng thân thiết của Cocolux nhằm cảm ơn các bạn luôn ủng hộ Cocolux trong thời gian vừa qua, đem đến người tiêu dùng những trải nghiệm dịch vụ tốt nhất.' />
            <meta name='description' content='Chương trình tri ân khách hàng thân thiết của Cocolux nhằm cảm ơn các bạn luôn ủng hộ Cocolux trong thời gian vừa qua, đem đến người tiêu dùng những trải nghiệm dịch vụ tốt nhất.' />
        </Head>
        <img src='/media/images/khach_hang_than_thiet.jpg' alt='cocolux' />
        <div className='vip-member-content'>
            Cảm ơn quý khách hàng đã luôn ủng hộ Cocolux trong suốt thời gian vừa qua. Chúng tôi luôn cố gắng
            hết mình và không ngừng nỗ lực để mang đến những sản phẩm có chất lượng với giá cả thân thiện nhất
            đến tay người tiêu dùng. Để thay lời cảm ơn chân thành nhất của mình, Cocolux có chương trình ưu đãi
            đặc biệt dánh cho các khách hàng thân thiết.
        </div>
        <div className='vip-member-content'>
            <b>Thể lệ chương trình</b>
            <span>Khi mua hàng tại Cocolux quý khách sẽ được tích điểm tính theo 1% của giá trị đơn hàng. (Điểm được cộng dồn trên tất cả các đơn hàng online và offline)</span>
        </div>
        <div className='vip-member-content'>
            <b>Cách quy đổi</b>
            <span>1 Điểm = 1000VNĐ Điểm tích lũy quý khách có thể sử dụng để trừ trực tiếp trên hóa đơn tiếp theo khi phát sinh đơn hàng tại Cocolux.</span>
        </div>
        <div className='vip-member-content'>
            <b>*Đối tượng áp dụng</b>
            <span>Tất cả các khách hàng đã mua sắm tại Cocolux online và offline.</span>
        </div>
        <div className='vip-member-content'>
            Xin chân thành cảm ơn!
        </div>
    </LayoutAbout>
);

export default VipMember;
