import Head from 'next/head';
import React from 'react';
import { LayoutAbout } from 'src/components/layout-group';

const AboutPage = () => {
    console.log('about rendered');

    return (
        <LayoutAbout>
            <Head>
                <title>Giới thiệu COCOLUX</title>
                <meta property='og:title' content='Giới thiệu COCOLUX' />
                <meta property='og:url' content='https://cocolux.com/thong-tin/gioi-thieu' data-rh='true' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='Cocolux luôn cố gắng trở thành điểm đến tin cậy nhất của tất cả mọi người, mang đến tây người tiêu dùng những sản phẩm chất lượng cũng như sự uy tín hàng đầu.' />
                <meta property='description' content='Cocolux luôn cố gắng trở thành điểm đến tin cậy nhất của tất cả mọi người, mang đến tây người tiêu dùng những sản phẩm chất lượng cũng như sự uy tín hàng đầu.' />
            </Head>

            <img src='/media/images/about_coco.jpg' alt='cocolux' />
            <div className='content'>
                Mới đây các tín đồ làm đẹp lại được 1 phen xôn xao khi Cocolux chính thức khai chương cửa hàng
                tiếp theo tại khu đô thị mới Vincom Ocean Park. CocoLux đã “vượt mặt” nhiều đối thủ cạnh tranh
                và trở thành đối tác chiến lược của Vincom với không gian lên đến hàng trăm mét vuông đầy ắp mỹ
                phẩm đa dạng từ dưỡng da cho đến trang điểm phải lên đến vài nghìn mã hàng. Thiết kế của
                CocoLux luôn có 1 chất rất riêng theo hơi hướng hiện đại, sang trọng, không gian rộng rãi. Cách
                bày trí đẹp mắt chia thành từng gian hàng riêng như gian của NYX, Maybelline New York, Vichy,
                L’Oreal Paris... Các sản phẩm skincare và make up lần lượt được bày trí khoa học, có biển chỉ
                dẫn các khu sản phẩm riêng rất chuyên nghiệp giúp các bạn dễ tìm kiếm, một lần nữa “đốn tim” mọi
                cô gái khi bước chân đến đây.<br></br>
                <br></br>
                Tại Việt Nam hiện nay, Cocolux là một trong những store mỹ phẩm tiên phong trong lĩnh vực
                làm đẹp với nhiều sản phẩm mỹ phẩm nhập khẩu đa dạng. Các sản phẩm từ Âu đến Hàn, Pháp, Anh
                . Không những thế, Cocolux còn là đối tác của Christian Lenart, Bioderma, Maybelline New
                York , Vichy, Laroche Posay, Senka… và tất nhiên, giấy tờ đều được cấp từ cơ quan có thẩm
                quyền. Cocolux cũng cho biết tất cả hàng hóa đều được nhập trực tiếp từ các nhãn hàng, vận
                chuyển rõ ràng, minh bạch. Các bạn hoàn toàn có thể yên tâm đến showroom Cocolux tìm kiếm
                những sản phẩm chính hãng và chất lượng với đội tư vấn siêu nhiệt tình, chuyên nghiệp,“cute” ở shop.<br></br>
                <br></br>
                Kinh ngạc hơn, ở Cocolux còn hỗ trợ khách hàng soi da miễn phí bằng thiết bị soi da hiện
                đại nhất. Cùng với 1 quầy test son khá đa dạng và đẹp mắt khiến cho việc lựa chọn sản phẩm phù hợp với các bạn cũng trở nên dễ dàng hơn bao giờ hết.<br></br>
                <br></br>
                Không những thế, đồng hành cùng chương trình quà tặng khai trương là những deal giảm giá
                táo bạo đến từ các nhãn hàng nổi tiếng trên khắp thế giới khiến các “cô gái mê làm đẹp”
                không thể chối từ trước sức hút mãnh liệt ấy, cơn lốc Cocolux trở thành 1 hiện tượng dậy sóng ở xứ Hà thành.<br></br>
                <br></br>
                Đừng bỏ lỡ cơ hội sở hữu những sản phẩm “đình đám” và hưởng ưu đãi hấp dẫn trong tuần khai
                trương của cơ sở Vincom Ocean Park bạn nhé. Để không phải tiếc hùi hụi hãy nhấc máy lên và
                rủ cô bạn thân ghé cơ ở mới nhất của CocoLux và trải nghiệm những dịch vụ tuyệt vời ngay
                nào. Nhớ mặc đẹp nhé vì ở Cocolux còn có rất nhiều khu chụp ảnh check in “sống ảo” siêu đẹp
                cho nàng nữa cơ.
            </div>
        </LayoutAbout>

    );
};

export default AboutPage;
