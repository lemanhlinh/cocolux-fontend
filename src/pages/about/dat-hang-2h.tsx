import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const GuideFastOrder = () => (
    <LayoutAbout>
        <Head>
            <title>Hướng dẫn đặt hàng 2H</title>
            <meta property='og:title' content='Hướng dẫn đặt hàng 2H' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/dat-hang-2h' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Cùng trải nghiệm dịch vụ giao hàng “hỏa tốc” 2H tại Cocolux, mua hàng online chưa bao giờ là nhanh chóng và tiện ích đến thế' />
            <meta name='description' content='Cùng trải nghiệm dịch vụ giao hàng “hỏa tốc” 2H tại Cocolux, mua hàng online chưa bao giờ là nhanh chóng và tiện ích đến thế' />
        </Head>

        <div className='guide-container'>
            <img src='/media/images/dat_hang_2h.jpg' alt='cocolux' />
            <div className='guide-content'>
                Khách hàng khu vực nội thành Hà Nội sẽ có cơ hội trải nghiệm dịch vụ giao hàng 2H - dịch vụ giao hàng tốt nhất hiện nay tại Cocolux với mức phí ưu đãi
                <div className='content-title'>Coco Xpress</div>
                <div>Coco Xpress là dịch vụ Miễn phí GIAO HÀNG trong vòng 2h – đã có mặt tại COCOLUX<br></br></div>
                <div>Nhằm phục vụ nhu cầu mua sắm của phái đẹp, Cocolux ra mắt Coco Xpress để khách hàng được trải nghiệm mua sắm tại nhà một cách nhanh nhất.<br></br></div>
                <div className='content-title'>Điều kiện áp dụng</div>
                <div>- Khách hàng chỉ cần phát sinh đơn hàng từ  1.000đ<br></br></div>
                {/* <div>- Miễn phí ship tất cả các quận nội thành tại Hà Nội<br></br></div> */}
                <div className='content-title'>Đối tượng áp dụng</div>
                <div>- Áp dụng đối với tất cả khách hàng trải nghiệm mua sắm tại Cocolux.<br></br></div>
                <div className='content-title'>Thời gian Giao hàng dự kiến</div>
                <div className='table-grid' style={{ marginTop: '0.5rem' }}>
                    <div className='table-row'>
                        <div className='table-head'>Thời gian đặt hàng</div>
                        <div className='table-head'>Dự kiến nhận hàng</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>21:00 – 23:59</div>
                        <div className='table-cell'>Trước 10:00 ngày hôm sau</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>00:00 - 08:00</div>
                        <div className='table-cell'>Trước 11:00 cùng ngày</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>08:00 – 21:00</div>
                        <div className='table-cell'>Nhận hàng vòng 2h sau khi đặt hàng</div>
                    </div>
                </div>
                <div style={{ marginTop: '0.5rem' }}>Coco Xpress giao hàng tất cả các ngày trong tuần từ Thứ 2 – đến Chú Nhật, bao gồm các ngày lễ trong năm.<br></br></div>
                <div className='content-title'>Chương miễn phí ship đang được tạm dừng do ảnh hưởng của dịch bệnh cho đến khi có thông báo mới.</div>
                {/*
                    <div>
                        1. Quận Ba Đình<br></br>
                        2. Quận Hoàn Kiếm<br></br>
                        3. Quận Đống Đa<br></br>
                        4. Quận Thanh Xuân<br></br>
                        5. Quận Cầu Giấy<br></br>
                        6. Quận Hoàng Mai<br></br>
                        7. Quận Hai Bà Trưng<br></br>
                        8. Quận Tây Hồ<br></br>
                        9. Quận Từ Liêm<br></br>
                        10. Quận Hà Đông<br></br>
                    </div>
                */}
                {/* <div style={{ marginTop: '0.25rem' }}>Toàn bộ khu vực thuộc các quận trên đều được miễn phí giao hàng.</div> */}
                <div className='content-title'>Cước phí đối với khu vực Ngoại thành và các tỉnh trên toàn quốc</div>
                <div className='table-grid' style={{ marginTop: '0.5rem' }}>
                    <div className='table-row'>
                        <div className='table-head'>Giá trị đơn hàng</div>
                        <div className='table-head'>Cước phí Áp dụng</div>
                    </div>
                    <div className='table-row'>
                        <div className='table-cell'>Chỉ từ 1.000đ</div>
                        <div className='table-cell'>20.000đ</div>
                    </div>
                </div>
                <div className='content-title'>Các bước thực hiện để đặt thành công một đơn hàng</div>
                <div style={{ paddingBottom: '3px' }}><b>Bước 1: Tìm kiếm sản phẩm</b></div>
                <div>Quý khách có thể lựa chọn các cách sau để tìm kiếm sản phẩm mong muốn:</div>
                <div style={{ lineHeight: '22px' }}>
                    - Nhập từ khóa ở thanh tìm kiếm.<br></br>
                    - Tìm kiếm theo danh mục sản phẩm.<br></br>
                    - Tìm kiếm các sản phẩm ở các trang Cocolux deals, hàng bán chạy, hàng mới về, thương hiệu.
                </div>
                <div style={{ padding: '3px 0' }}><b>Bước 2: Thêm vào giỏ hàng</b></div>
                <div>Khi đã tìm được sản phẩm mong muốn, quý khách bấm vào hình hoặc tên sản phẩm để mở trang chi tiết sản phẩm. Sau đó:</div>
                <div style={{ lineHeight: '22px' }}>
                    - Đọc lại thông tin sản phẩm, hướng dẫn sử dụng, thông số sản phẩm.<br></br>
                    - Kiểm tra lại giá, sản phẩm quà tặng (nếu có), chọn số lượng.<br></br>
                    - Kiểm tra lại thời gian dự kiến nhận hàng, chọn “xem chi tiết” để hiểu rõ hơn về quy định của dịch vụ Cocolux.<br></br>
                    - Chọn “Thêm vào giỏ hàng” (hoặc chọn “Mua ngay” để đến với bước Đặt hàng)
                </div>
                <div style={{ padding: '3px 0' }}><b>Bước 3: Kiểm tra giỏ hàng</b></div>
                <div style={{ lineHeight: '22px' }}>
                    - Chọn biểu tượng giỏ hàng để kiểm tra lại các sản phẩm đã chọn, thêm giảm số lượng sản phẩm. (chọn “Cập nhật giỏ hàng” nếu có thay đổi)<br></br>
                    - Chọn “Đặt hàng” để bắt đầu đặt hàng.
                </div>
                <div style={{ padding: '3px 0' }}><b>Bước 4: Đặt hàng</b></div>
                <div style={{ lineHeight: '22px' }}>
                    - Quý khách có thể chọn đăng nhập hoặc nhập số điện thoại, email.<br></br>
                    - Nhập đầy đủ thông tin, ở mục địa chỉ giao hàng.<br></br>
                    - Quý khách phải chọn “Giao hàng dưới 120 phút” cho phương thức vận chuyển.<br></br>
                    - Lựa chọn phương thức thanh toán.<br></br>
                    - Chọn “Đặt hàng” để hoàn tất.
                </div>
                <div style={{ padding: '3px 0' }}><b>Bước 5: Kiểm tra và xác nhận đơn hàng</b></div>
                <div style={{ lineHeight: '22px' }}>
                    - Bấm chọn mã đơn hàng để kiểm tra lại đơn hàng.<br></br>
                    - Lưu mã số để kiểm tra lại cho lần sau.
                </div>
                <div style={{ padding: '3px 0' }}><b>Bước 6: Theo dõi tình trạng đơn hàng.</b></div>
            </div>
        </div>
    </LayoutAbout>
);

export default GuideFastOrder;
