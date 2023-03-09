import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Account = () => (
    <LayoutAbout>
        <Head>
            <title>Tài khoản</title>
            <meta property='og:title' content='Tài khoản' />
            <meta property='og:url' content='https://cocolux.com/hoi-dap/tai-khoan' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Sau khi đăng kí thành viên tại CocoLux bạn nhận được nhiều ưu đãi cũng như trở thành khách hàng thân thiết sẽ nhận được các voucher vào ngày sinh nhật, các ngày lễ 8/3, 20/10, 30/4, 1/5,…' />
            <meta name='description' content='Sau khi đăng kí thành viên tại CocoLux bạn nhận được nhiều ưu đãi cũng như trở thành khách hàng thân thiết sẽ nhận được các voucher vào ngày sinh nhật, các ngày lễ 8/3, 20/10, 30/4, 1/5,…' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/tai_khoan_ca_nhan.jpg' alt='cocolux' />
            <div className='guide-content'>
                <div className='content-title'>Đăng ký thành viên Cocolux như thế nào?</div>
                <div>
                    Quý khách vui lòng nhấn vào nút “Đăng nhập/Đăng ký tài khoản” trên góc phải màn hình sau đó
                    chọn “Đăng kí/Đăng ký ngay” (Đối với Desktop) hoặc tại góc trái màn hình, chọn biểu tượng
                    Menu rồi chọn “Đăng nhập/Đăng ký” (Đối với Mobile). Vui lòng điền đầy đủ các thông tin được
                    yêu cầu và nhấn nút “Đăng ký”. Hệ thống sẽ tự động gửi email thông báo về viêc kích hoạt
                    tài khoản đến tài khoản email cá nhân của quý khách. Quý khách vui lòng click vào đường link để được xác nhận đã tạo tài khoản thành công.
                    <br></br>Trường hợp không nhận được email kích hoạt, quý khách vui lòng kiểm tra kỹ trong hộp thư rác hoặc Spam hoặc liên hệ trực tiếp qua Hotline để được hỗ trợ.
                </div>
                <div className='content-title'>Tại sao tôi không thể đăng nhập vào tài khoản của tôi?</div>
                <div>
                    Quý khách vui lòng kiểm tra kỹ về kiểu gõ hoặc phím Caps Look trong quá trình điền thông
                    tin đăng nhập thành viên, trường hợp không thể đăng nhập thành công quý khách vui lòng chọn
                    nút “quên mật khẩu” trên góc phải màn hình và nhập email đăng ký. Hệ thống sẽ tự động gửi
                    một đường dẫn vào email của quý khách, quý khách vui lòng nhấp vào đường dẫn để tạo lại
                    mật khẩu mới. Sau khi hoàn tất, quý khách có thể đăng nhập vào tài khoản bằng mật khẩu vừa tạo.
                </div>
                <div className='content-title'>Tôi muốn thay đổi thông tin tài khoản thành viên như thế nào?</div>
                <div>
                    Để thay đổi thông tin cá nhân quý khách vui lòng đăng nhập vào tài khoản của mình, chọn nút “Tài khoản của bạn ” rồi chọn vào nút “sửa” để thay đổi thông tin.
                </div>
                <div className='content-title'>Tôi có thể sử dụng chung tài khoản với người khác được không?</div>
                <div>
                    Quý khách nên sử dụng tài khoản cá nhân để đảm bảo độ tin cậy cũng như quyền lợi của bản
                    thân khi mua sắm. Việc sử dụng chung tài khoản có thể dẫn đến những sai sót mà người chịu ảnh hưởng trực tiếp chính là quý khách hàng.
                </div>
                <div className='content-title'>Đăng kí thành viên tại Cocolux.vn sẽ giúp ích gì cho tôi?</div>
                <div>
                    Việc đăng kí tài khoản là cơ hội giúp bạn trở thành một trong những khách hàng thân thiết
                    tại Cocolux.com, được tiếp cận nhanh nhất các chương trình khuyến mãi, thông tin ưu đãi khi mua sắm.
                </div>
            </div>
        </div>
    </LayoutAbout>
);

export default Account;
