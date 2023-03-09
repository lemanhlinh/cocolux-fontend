import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const RankMember = () => (
    <LayoutAbout>
        <Head>
            <title>Cấp độ khách hàng cocolux</title>
            <meta property='og:title' content='Cấp độ khách hàng cocolux' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/rank-khach-hang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            <meta name='description' content='Cocolux Hệ thống thương hiệu mỹ phẩm chính hãng, với 600 thương hiệu mỹ phẩm uy tín chất lượng Top 1 Việt Nam' />
        </Head>
        <div className='rank-member-container'>
            <div className='rank-member-top'>
                <div className='rank-member--policy'>
                    <img src='/media/images/ic-shopping-bag.svg' alt='cocolux' />
                    <b>THAM GIA MUA HÀNG</b>
                    <span>Nhận 1 cococoin cho mỗi 1000 VNĐ khi mua hàng</span>
                </div>
                <div className='rank-member--policy'>
                    <img src='/media/images/ic-reward.svg' alt='cocolux' />
                    <b>ĐÁNH GIÁ SẢN PHẨM</b>
                    <span>Nhận 1000 cococoin cho mỗi đánh giá sản phẩm đã mua</span>
                </div>
                <div className='rank-member--policy'>
                    <img src='/media/images/ic-value.svg' alt='cocolux' />
                    <b>GIỚI THIỆU BẠN BÈ</b>
                    <span>Nhận 20000 cococoin cho mỗi đơn hàng giới thiệu thành công</span>
                </div>
            </div>
            {/* <img src='/media/images/rank-banner1.png' alt='cocolux' />
            <img src='/media/images/rank-banner2.png' alt='cocolux' /> */}
            <div className='rank-member-bottom'>
                <table className='ccs-table rank-member-benefits'>
                    <thead>
                        <tr>
                            <th>Quyền lợi thành viên</th>
                            <th>SILVER</th>
                            <th>GOLD</th>
                            <th>DIAMOND</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Đổi quà miễn phí với cococoin</td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Nhận được nhiều hơn cococoin khi mua hàng</td>
                            <td>
                                1%
                            </td>
                            <td>
                                1%
                            </td>
                            <td>
                                2%
                            </td>
                        </tr>
                        <tr>
                            <td>Hỗ trợ 50% phí giao hàng</td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Quà tặng đặc biệt khi bạn mua trong tháng sinh nhật</td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Giảm giá đặc biệt trên một số mặt hàng</td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Quà tặng tri ân khi đạt tiêu chuẩn thành viên</td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Gói quà miễn phí mỗi năm</td>
                            <td></td>
                            <td>3 lần</td>
                            <td>3 lần</td>
                        </tr>
                        <tr>
                            <td>Giảm giá đặc biệt tất cả mặt hàng (2 lần / năm)</td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Được ưu tiên gói hàng đầu tiên sau khi đặt hàng</td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Được ưu tiên đổi tất cả các quà hot nhất</td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Miễn phí giao hàng cho tất cả đơn hàng trong năm</td>
                            <td></td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Quà tặng VIP cho mỗi đơn hàng trên 3,000,000 VND</td>
                            <td></td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Trải nghiệm miễn phí sản phẩm và dịch vụ mới nhất từ Cocolux</td>
                            <td></td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                        <tr>
                            <td>Tham gia buổi nói chuyện với các chuyên gia</td>
                            <td></td>
                            <td></td>
                            <td>
                                <img src='/media/images/ic-check-right.svg' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </LayoutAbout>

);

export default RankMember;
