import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const GuideOrder = () => (
    <LayoutAbout>
        <Head>
            <title>Hướng dẫn đặt hàng</title>
            <meta property='og:title' content='Hướng dẫn đặt hàng' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/dat-hang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Các bước đặt hàng tại website Cocolux.com là vô cùng nhanh chóng đơn giản và cực kì an toàn cho khách hàng. Kết hợp cùng nhiều hình thức thanh toán thuận tiện nhất cho khách hàng.' />
            <meta name='description' content='Các bước đặt hàng tại website Cocolux.com là vô cùng nhanh chóng đơn giản và cực kì an toàn cho khách hàng. Kết hợp cùng nhiều hình thức thanh toán thuận tiện nhất cho khách hàng.' />
        </Head>

        <div className='guide-container'>
            <img src='/media/images/huong_dan_dat_hang.jpg' alt='cocolux' />
            <div className='guide-content'>
                <span>Quý khách có thể đặt hàng trực tuyến ở website Cocolux.com thông qua các bước đặt hàng cơ bản.</span>
                <div className='content-title'>1. Tìm kiếm sản phẩm:</div>
                <div>
                    Quý khách có thể tìm kiếm sản phẩm theo 2 cách:<br></br>
                    Gõ tên sản phẩm vào thanh tìm kiếm<br></br>
                    Tìm theo danh mục sản phẩm, thương hiệu sản phẩm hoặc có thể tham khảo những sản phẩm hot, những sản phẩm đang bán chạy nhất tại Cocolux.com
                </div>
                <div className='content-title'>2. Đặt hàng:</div>
                <div>
                    Khi đã tìm được sản phẩm mong muốn, quý khách vui lòng bấm vào hình hoặc tên sản phẩm để vào được trang thông tin chi tiết của sản phẩm. <br></br>
                Nếu quý khách chỉ muốn mua 1 sản phẩm vừa chọn thì click vào ô “mua ngay” sau đó làm theo hướng dẫn trên Website.<br></br>
                Để đặt nhiều sản phẩm khác nhau vào cùng 1 đơn hàng, quý khách vui lòng thực hiện theo các bước sau: <br></br>
                    <b>Bước 1:</b> Quý khách sẽ bấm vào ô “ thêm vào giỏ hàng” và tiếp tục tìm thêm các sản phẩm khác.<br></br>
                    <b>Bước 2:</b> Sau khi đã cho các sản phẩm cần mua vào giỏ hàng, quý khách vui lòng bấm vào nút “giỏ hàng” bên góc phải màn hình để xem lại sản phẩm đã chọn.<br></br>
                    <b>Bước 3:</b> Trong giỏ hàng của quý khách bên góc trái có nút tiếp tục mua hàng để quý khách chọn nếu như muốn mua thêm sản phẩm khác.<br></br>
                    <b>Bước 4:</b> Sau khi đã chọn được các sản phẩm cần mua vào giỏ hàng, quý khách vui lòng bấm nút “Tiến hành đặt hàng” bên góc phải màn hình.
                </div>
                <div className='content-title'>3. Đăng nhập hoặc đăng ký tài khoản:</div>
                <div>
                    Quý khách vui lòng đăng nhập bằng tài khoản đã có ở Cocolux.com hoặc đăng nhập thông qua Facebook hoặc tài khoản Google.<br></br>
                Trong trường hợp chưa đăng ký tài khoản, quý khách có thể chọn dòng "Đăng ký ngay" và bắt đầu nhập địa chỉ email, mật khẩu tùy ý để đăng ký tài khoản<br></br>
                Quý khách có thể đặt hàng mà không cần đăng nhập nhưng quý khách lưu ý phải điền đầy đủ và
                chính xác về thông tin nhận hàng, đặc biệt là địa chỉ mail và số điện thoại để Cocolux xác nhận đơn hàng.<br></br>
                Sau khi đã hoàn tất các bước trên, quý khách vui lòng bấm "Tiếp Tục" để đến bước tiếp theo:
                </div>
                <div className='content-title'>4. Điền địa chỉ nhận hàng:</div>
                <div>
                    Quý khách điền địa chỉ nhận hàng theo như trên trang hướng dẫn. Trường hợp quý khách có
                    nhiều địa chỉ để nhận hàng thì quý khách lưu ý địa chỉ nào nằm trong ô “mặc định” đầu tiên bên trái sẽ là địa chỉ Cocolux lên hệ để giao hàng.
                </div>
                <div className='content-title'>5. Chọn phương thức thanh toán:</div>
                <div>
                    Nếu các thông tin trên đã chính xác, quý khách vui lòng bấm "Đặt hàng", hệ thống sẽ bắt đầu tiến hành tạo đơn hàng dựa trên các thông tin quý khách đã đăng ký.<br></br>
                    Quý khách có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:<br></br>
                    <br></br>
                    <b>Cách 1:</b> Thanh toán sau khi nhận hàng (COD): Quý khách sẽ thanh toán lúc nhận
                    được sản phẩm từ nhân viên giao nhận hoặc nhân viên chuyển phát tại địa chỉ khách hàng đã đăng ký.<br></br>
                    <br></br>
                    <b>Cách 2:</b> Chọn hình thức chuyển khoản và thực hiện chuyển khoản theo mẫu: Thanh
                    toán đơn hàng số: mã đơn hàng, số điện thoại. Lưu ý các đơn hàng có giá trị trên 5.000.000đ chỉ được áp dụng hình thức chuyển khoản.<br></br>
                </div>
                <div className='content-title'>6. Kiểm tra và xác nhận đơn hàng </div>
                <div>
                    Sau khi hoàn thành tất cả bước đặt mua, hệ thống sẽ gửi đến quý khách mã số đơn hàng để kiểm tra theo dõi tình trạng đơn hàng.
                </div>
            </div>
        </div>
    </LayoutAbout>
);

export default GuideOrder;
