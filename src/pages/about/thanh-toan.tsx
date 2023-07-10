import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';
import { NextPage } from 'next';
import { QuestionAPI,ContentAPI } from 'src/helpers/services';

interface Props {
    listContent: any;
    listQuestion: any
}

const GuidePayment: NextPage<Props> = ({ listContent, listQuestion }) => {
    return (
        <LayoutAbout listContent={listContent} listQuestion={listQuestion}>
            <Head>
                <title>Hướng dẫn thanh toán vnpay</title>
                <meta property='og:title' content='Hướng dẫn thanh toán vnpay' />
                <meta property='og:url' content='https://cocolux.com/thong-tin/thanh-toan' data-rh='true' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='Khi đặt hàng online tại CocoLux bạn có thể chọn các phương thức thanh toán tùy ý, thanh toán bằng tiền mặt, thanh toán bằng thẻ ATM chuyển khoản, các ứng dụng mobile, VNPay…' />
                <meta name='description' content='Khi đặt hàng online tại CocoLux bạn có thể chọn các phương thức thanh toán tùy ý, thanh toán bằng tiền mặt, thanh toán bằng thẻ ATM chuyển khoản, các ứng dụng mobile, VNPay…' />
            </Head>
            <div className='guide-container'>
                <img src='/media/images/thanh_toan_truc_tuyen.jpg' alt='cocolux' />
                <div className='guide-content'>
                    <div>
                        Ngoài các hình thức thanh toán bằng tiền mặt khi nhận hàng (COD) các loại voucher, Cocolux.com đã tích hợp hình thức thanh toán trực tuyến
                        (Internet banking, VNpay QR, ví VnMart) qua cổng thanh toán VNpay và hoàn toàn miễn phí giao dịch.<br></br>
                    </div>
                    <div className='content-title'>Các bước thực hiện đối với từng loại hình thanh toán</div>
                    <div className='content-title'>1.Thẻ ATM và tài khoản ngân hàng</div>
                    Ở màn hình xác nhận đặt hàng, Quý khách chọn phương thức thanh toán Thẻ ATM nội địa (Internet Banking, VNPAY-QR, Ví VnMart - Miễn phí thanh toán)<br></br>
                    <div className='content-title'>2. Ứng dụng mobile quét mã VNPAY QR</div>
                    <div>
                        * VNPAY QR là giải pháp thanh toán hiện đại do Công ty Cổ phần Giải pháp Thanh toán Việt
                        Nam (VNPAY) phát triển. Khách hàng sử dụng tính năng QR Pay được tích hợp sẵn trên ứng dụng
                        Mobile Banking của các ngân hàng liên kết (tìm trong mục menu của các ứng dụng này trên
                        điện thoại), tiến hành quét mã QR Pay, nhập mã giảm giá (nếu có) và thanh toán trực tiếp từ
                        tài khoản ngân hàng. Quý khách hàng lưu ý sử dụng đúng ứng dụng Mobile Banking của từng ngân hàng trên điện thoại.
                    </div>
                    <div className='content-title'>3. Sử dụng vnpay như thế nào?</div>
                    <div>
                        * Ở màn hình xác nhận đặt hàng, Quý khách chọn phương thức thanh toán Thẻ ATM nội địa (Internet Banking, VNPAY-QR, Ví VnMart - Miễn phí thanh toán).<br></br>
                    * VNPAY (Thanh toán bằng mobile banking) cho cả hệ thống online (đặt hàng tại website Cocolux.com và offline (mua hàng trực tiếp tại các chi nhánh Cocolux).<br></br>
                    </div>
                    <div className='content-title'>4. Ví điện tử VnMart</div>
                    <div>
                        Ví điện tử VnMart là một sản phẩm thanh toán/chấp nhận thanh toán do VNPAY phát hành, dùng
                        để thanh toán cho các giao dịch mua bán hàng hóa, dịch vụ trên các website Thương mại điện tử. Chức năng dành cho khách hàng có sử dụng ví VnMart.
                        <br></br>
                    </div>
                    <div className='content-title'>  Lưu ý:</div>
                    <div>
                        * Với các đơn hàng thanh toán bằng VNPay không thành công, Quý khách có thể thanh toán lại đơn hàng từ trang Quản lý đơn hàng của Quý khách.
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
GuidePayment.getInitialProps = async () => {
    const listContent = await ContentAPI.listContent();
    const listQuestion = await QuestionAPI.listQuestion();
    return ({listContent: listContent.data, listQuestion: listQuestion.data } || null );
};

export default GuidePayment;
