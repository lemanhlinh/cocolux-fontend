import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Counpon = () => (
    <LayoutAbout>
        <Head>
            <title>Phiếu mua hàng cocolux</title>
            <meta property='og:title' content='Phiếu mua hàng cocolux' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/phieu-mua-hang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Mong muốn mang lại những trải nghiệm mua sắp tiện ích cùng quà tặng hấp dẫn, phiếu mua hàng cocolux với thời hạn kéo dài lên đến 1 năm cho khách hàng thoải mái sử dụng.' />
            <meta name='description' content='Mong muốn mang lại những trải nghiệm mua sắp tiện ích cùng quà tặng hấp dẫn, phiếu mua hàng cocolux với thời hạn kéo dài lên đến 1 năm cho khách hàng thoải mái sử dụng.' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/phieu_mua_hang.jpg' alt='cocolux' />
            <div className='guide-content'>
                Xuất phát từ mong muốn mang đến những trải nghiệm mua sắm tiện lợi và hữu ích nhất, Cocolux
                luôn nỗ lực phát triển và hoàn thiện dịch vụ của mình Cocolux chính thức phát hành: Phiếu mua
                hàng (voucher) cũng không nằm ngoài mục tiêu đó. Sự ra đời của 2 loại phiếu này hứa hẹn sẽ giúp
                khách hàng rút ngắn được quy trình mua hàng/dịch vụ, các giao dịch thanh toán cũng sẽ trở nên dễ dàng và nhanh chóng hơn bao giờ hết.
                <br></br>“Mua hàng không cần quẹt thẻ, cũng chẳng cần phải mang theo tiền.<br></br>
                Tại sao không nhỉ?”<br></br>
                <div className='content-title'>Giá trị của Phiếu mua hàng của Cocolux:</div>
                <div>
                    Giá trị của Phiếu mua hàng và Phiếu Mua Dịch vụ Cocolux: 100.000đ, 200.000đ và 500.000đ. Và 3 mệnh giá Phiếu Dịch Vụ với các giá trị 100.000đ, 500.000đ. và 1.000.000đ.
                </div>
                <div className='content-title'>Thời hạn sử dụng:</div>
                <div>
                    Thời hạn sử dụng của phiếu mua hàng Cocolux là 1 năm kể từ ngày phát hành. Với khung thời
                    gian này quý khách có thể thoải mái sử dụng mà không cần canh cánh nổi lo về thời hạn của phiếu.
                </div>
                <div className='content-title'>Hướng dẫn sử dụng:</div>
                <div>
                    *Chỉ áp dụng mua hàng Offline (mua hàng trực tiếp tại cửa hàng)<br></br>
                    Trước khi thanh toán, Quý khách vui lòng đưa phiếu mua hàng Cocolux cho nhân viên thu ngân để nhân viên thu ngân có thể phục vụ bạn tốt nhất.
                </div>
                <div className='content-title'>Quy định sử dụng:</div>
                <div>
                    - Không giới hạn số lượng phiếu mua hàng.<br></br>
                    - Không giới hạn số lượng phiếu mua hàng trên cùng hóa đơn thanh toán.<br></br>
                    - Quý khách sẽ được thanh toán đúng với giá trị tương ứng được ghi trên phiếu<br></br>
                    - Có thể kết hợp cùng các phương thức thanh toán khác cho mặt hàng có giá trị cao hơn giá trị của phiếu như: tiền mặt, thẻ tín dụng…<br></br>
                    - Không có giá trị quy đổi ra thành tiền mặt, không hoàn lại tiền thừa.<br></br>
                    - Không xuất hóa đơn tài chính cho giá trị của Phiếu mua hàng Cocolux khi mua hàng.<br></br>
                    - Không hoàn tiền cho các đơn hàng đổi trả sản phẩm. Phiếu mua hàng Cocolux hợp lệ.<br></br>
                    - Thẻ có phần mã vạch nguyên vẹn, không bị bôi xóa hay chắp vá trên bề mặt.<br></br>
                    - Thẻ còn hạn sử dụng.
                </div>
            </div>
        </div>
    </LayoutAbout>

);

export default Counpon;
