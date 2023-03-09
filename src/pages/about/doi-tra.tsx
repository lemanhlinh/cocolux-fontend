import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const ReturnPolicy = () => (
    <LayoutAbout>
        <Head>
            <title>Chính sách đổi trả</title>
            <meta property='og:title' content='Chính sách đổi trả' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/doi-tra' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Cocolux có các chính sách đổi trả nhằm phục vụ khách hàng tốt nhất, nhưng để được đổi trả hàng hóa thì hàng hóa thải đảm bảo đầy đủ điều khoản của Cocolux.' />
            <meta name='description' content='Cocolux có các chính sách đổi trả nhằm phục vụ khách hàng tốt nhất, nhưng để được đổi trả hàng hóa thì hàng hóa thải đảm bảo đầy đủ điều khoản của Cocolux.' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/chinh_sach_doi_tra.jpg' alt='cocolux' />
            <div className='guide-content'>
                <div className='content-title'>1. Các trường hợp nhận đổi trả:</div>
                <div>
                    - Sản phẩm mắc lỗi từ phía nhà sản xuất (hỏng hóc, đổ vỡ sản phẩm, bị lỗi kĩ thuật…).<br></br>
                    - Sản phẩm bị hư hỏng, trầy xước do quá trình vận chuyển của nhân viên giao hàng.<br></br>
                    - Sản phẩm đã hết hoặc gần hết thời hạn sử dụng.<br></br>
                    - Sản phẩm không đúng như yêu cầu của khách hàng do Cocolux soạn sai sản phẩm hoặc lấy nhầm tông màu , loại sản phẩm.<br></br>
                    - Sản phẩm còn nguyên vỏ hộp, tem nhãn và chưa qua sử dụng.<br></br>
                </div>
                <div className='content-title'>2. Các trường hợp không áp dụng đổi trả.</div>
                <div>
                    - Sản phẩm quà tặng, các sảm phẩm trong chương trình giảm giá đặc biệt.<br></br>
                    - Sản phẩm đã quá hạn đổi trả (14 ngày).<br></br>
                    - Sản phẩm đã bị bóc tem nhãn, seal nếu có. - Sản phẩm khách đã thử hoặc qua sử dụng từ 1 lần trở lên.<br></br>
                    - Bao bì, vỏ hộp sản phẩm bị hư hỏng, trầy xước do lỗi từ phía khách hàng.<br></br>
                    - Sản phẩm không phải mua từ bên Cocolux.
                </div>
                <div className='content-title'>3. Cách thức đổi trả:</div>
                <div style={{ marginTop: '2px' }}>
                    - Cocolux.com nhận đổi trả sản phẩm cho khách hàng trong vòng 14 ngày , tính kể từ ngày khách hàng mua hoặc nhận được sản phẩm từ bên giao hàng.
                </div>
                <div style={{ marginTop: '2px' }}>
                    - Khách hàng cần phải thông báo cho nhân viên Cocolux.com lí do đổi trả và địa chỉ, số điện thoại liên lạc chính xác để Cocolux.com có thể
                    thực hiện quy trình đổi trả sản phẩm một cách nhanh chóng nhất theo yêu cầu của quý khách.
                </div>
                <div style={{ marginTop: '2px' }}>
                    - Cocolux.com quan tâm đến sự hài lòng của khách hàng và mong muốn nâng cao chất lượng dịch vụ, Cocolux.com nhận đổi trả sản phẩm miễn phí cho khách
                    hàng theo đúng quy định nêu trên . Khách ở khu vực Hồ Chí Minh , Cocolux khuyến khích khách đến Showroom để nhân viên có thể check lại sản phẩm và khách
                    có thể xem & lựa chọn đổi sản phẩm đúng theo ý của quý khách. Với các khách tỉnh, Quý khách có thể chuyển hàng qua bưu điện & Liên hệ với Cocolux về sản
                    phẩm đổi, mã bưu điện,… để Cocolux có thể xử lý và gửi hàng lại sớm nhất khi nhận được sản phẩm.
                </div>
                <div className='content-title'>4. Phương thức hoàn tiền và phí xử lý</div>
                <div className='content-title' style={{ marginTop: '3px' }}>a. Trả hàng tại chi nhánh Cocolux</div>
                <div>
                    - Đơn hàng đã thanh toán bằng tiền mặt: Hoàn tiền mặt hoặc tạo số dư tài khoản cho khách hàng.<br></br>
                    - Đơn hàng đã thanh toán bằng thẻ ngân hàng: Chuyển khoản sau 3-5 từ ngày khách trả hàng hoặc tạo số dư tài khoản khách hàng.<br></br>
                    - Đơn hàng đã thanh toán bằng VNpay: Hoàn tiền bằng hệ thống VNpay sau 3-8 ngày làm việc hoặc tạo số dư khách hàng.
                </div>
                <div className='content-title' style={{ marginTop: '6px' }}>b. Trả hàng tại nhà</div>
                <div>
                    - Với các đơn hàng đã nhận hàng và thanh toán, Cocolux sẽ chuyển khoản hoặc tạo balance cho khách hàng sau khi đã nhận được hàng khách trả.<br></br>
                    - Các đơn hàng khách hàng đã thanh toán online, Cocolux chuyển lại tiền vào tài khoản mà khách đã sử dụng khi thanh toán hoặc tạo số dư khách hàng.<br></br>
                    <div style={{ marginTop: '6px' }}><b>Lưu ý:</b> Tất cả các đơn hàng đã thanh toán có sử dụng gift card, Cocolux sẽ tạo số dư khách hàng.</div>
                </div>
                <div className='content-title'>5. Thông tin liên hệ và Trung tâm dịch vụ khách hàng:</div>
                <div>
                    Mọi thắc mắc và ý kiến đóng góp vui lòng liên hệ:<br></br>
                    ☎️ HOTLINE: 098 88888 25 - CSKH: Nhánh 106<br></br>
                    📍 Ad1: 80 Chùa Bộc, Hà Nội ☎️ Nhánh 801<br></br>
                    📍 Ad2: 136 Cầu Giấy, Hà Nội ☎️ Nhánh 802<br></br>
                    📍 Ad3: 208 Nguyễn Trãi, Phùng Khoang, HN ☎️ Nhánh 803<br></br>
                    📍 Ad4: 258 Bà Triệu, HBT, Hà Nội ☎️ Nhánh 804<br></br>
                    📍 Ad5: 128 Xuân Thủy, Hà Nội ☎️ Nhánh 805<br></br>
                    📍 Ad6: L1-10 Vincom Ocean Park, HN ☎️ Nhánh 806<br></br>
                    📍 Ad7: 65 Hồ Tùng Mậu, Bắc Từ Liêm, HN ☎️ Nhánh 807<br></br>
                    📍 Ad8: 37 ngõ 189 Giảng Võ, Hà Nội<br></br>
                    📍 Ad9: 490 Nguyễn Văn Cừ, Hạ Long, Quảng Ninh<br></br>
                    📍 Ad10: 211 TT Yên Mỹ, Hưng Yên<br></br>
                    📍 Ad11: 525 Quang Trung, P10, Q Gò Vấp, Tp HCM ☎️ Hotline: 0988888100<br></br>
                    📍 Ad12: L1-02 Vincom Mega Mall Smart City, Nam Từ Liêm, HN ☎️ Hotline: 0988888809<br></br>
                </div>
            </div>
        </div>
    </LayoutAbout>

);

export default ReturnPolicy;
