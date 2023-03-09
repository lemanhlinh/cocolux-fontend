import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const Delivery = () => (
    <LayoutAbout>
        <Head>
            <title>Quy trình giao hàng</title>
            <meta property='og:title' content='Quy trình giao hàng' />
            <meta property='og:url' content='https://cocolux.com/thong-tin/giao-hang' data-rh='true' />
            <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
            <meta property='og:description' content='Giao nhận hàng tại Cocolux luôn tuân thủ theo một quy trình nghiêm ngặt và nhanh chóng nhất. Cocolux luôn cập nhật thông tin vận chuyển hàng hóa, nếu có sự chậm trễ sẽ báo ngay cho bạn.' />
            <meta name='description' content='Giao nhận hàng tại Cocolux luôn tuân thủ theo một quy trình nghiêm ngặt và nhanh chóng nhất. Cocolux luôn cập nhật thông tin vận chuyển hàng hóa, nếu có sự chậm trễ sẽ báo ngay cho bạn.' />
        </Head>
        <div className='guide-container'>
            <img src='/media/images/quy_trinh_giao_hang.jpg' alt='cocolux' />
            <div className='guide-content'>
                <div className='item-text'>
                    1. Cocolux liên lạc với bạn để thống nhất thời gian giao hàng sẽ giao sản phẩm đến địa điểm
                    mà bạn đã cung cấp trong đơn đặt hàng. Cocolux sẽ cố gắng giao hàng trong thời gian từ 24h
                    đến 48h giờ làm kể từ lúc quý khách đặt hàng. Tuy nhiên, vẫn có những sự chậm trễ do nguyên
                    nhân khách quan (lễ, tết, địa chỉ nhận hàng khó tìm, sự chậm trễ từ dịch vụ chuyển phát…), rất mong bạn có thể thông cảm vì những lý do ngoài sự chi phối của chúng tôi.
                </div>
                <div className='item-text'>
                    2. Nếu quý khách không thể có mặt trong đợt nhận hàng thứ nhất, Cocolux sẽ liên lạc lại với
                    quý khách để sắp xếp thời gian giao hàng hoặc hướng dẫn bạn đến công ty vận chuyển để nhận hàng.
                </div>
                <div className='item-text'>
                    3. Nếu việc giao và nhận hàng không thành công do không thể liên lạc được với quý khách
                    trong vòng 3 ngày, chúng tôi sẽ thông báo đến bạn về việc hủy đơn hàng và hoàn trả các chi phí mà bạn đã thanh toán trong vòng 30 ngày.
                </div>
                <div className='item-text'>
                    4. Cocolux sẽ báo ngay đến bạn nếu có sự chậm trễ khi giao hàng, nhưng trong phạm vi pháp
                    luật cho phép, chúng tôi sẽ không chịu trách nhiệm cho bất cứ tổn thất nào, các khoản nợ, thiệt hại hoặc chi phí phát sinh từ việc giao hàng trễ.
                </div>
                <div className='item-text'>
                    5. Cocolux lưu ý với bạn rằng có một số địa điểm mà dịch vụ chuyển phát không thể giao hàng
                    được. Khi đó, Cocolux sẽ thông báo đến bạn qua thông tin liên lạc mà bạn đã cung cấp khi
                    đặt hàng. Chúng tôi có thể sắp xếp giao hàng đến một địa chỉ khác thuận tiện hơn hoặc tiến hành hủy đơn hàng.
                </div>
                <div className='item-text'>
                    6. Khi nhận sản phẩm, quý khách vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận hàng hóa.
                    Bạn nên giữ lại biên lai mua hàng để làm bằng chứng trong trường hợp muốn liên hệ lại về sản phẩm đã mua.
                </div>
                <div className='item-text'>
                    7. Quý khách nên cẩn thận khi sử dụng vật sắc nhọn để mở sản phẩm vì bạn có thể làm hỏng
                    sản phẩm. Cocolux không chịu bất cứ rủi ro, tổn thất, hư hại về sản phẩm sau khi bạn đã kiểm tra kỹ lưỡng và ký nhận sản phẩm.
                </div>
                <div className='item-text'>
                    8. Sản phẩm được đóng gói theo tiêu chuẩn đóng gói của Cocolux. Nếu bạn có nhu cầu đóng gói đặc biệt khác, vui lòng cộng thêm phí phát sinh.
                </div>
                <div className='item-text'>
                    9. Trong trường hợp những đơn hàng đã xác nhận của quý khách được đặt ở những ngày gần nhau, Cocolux sẽ cố gắng bổ sung vào đơn hàng và giao chung một lần cho quý khách.
                </div>
                <div className='item-text'>
                    10. Mọi thông tin về việc thay đổi hay hủy bỏ đơn hàng đề nghị quý khách thông báo sớm để Cocolux có thể hủy hoặc chỉnhh sửa đơn hàng cho bạn.
                </div>
                <div className='item-text'>
                    11. Chỉ nhận đổi trả sản phẩm khi lỗi đến từ nhà sản xuất hoặc bị hư hỏng trong quá trình vận chuyển với điều kiện không quá 3 ngày sau khi giao hàng.
                </div>
                <div className='item-text'>
                    12. Cocolux nhận giao sản phẩm đến tận tay khách hàng và thanh toán khi nhận hàng hoặc quý
                    khách hàng có thể chọn hình thức chuyển khoản trước (nếu muốn). Lưu ý các đơn hàng có giá trị trên 5.000.000đ chỉ được áp dụng hình thức chuyển khoản.
                </div>
                <div className='item-text'>
                    13. Đối với những đơn hàng có sản phẩm Pre-Oder (đặt hàng trước), Cocolux sẽ tiến hành giao sau khi các sản phẩm Pre-Oder đã về hàng.
                </div>
            </div>
        </div>
    </LayoutAbout>

);

export default Delivery;
