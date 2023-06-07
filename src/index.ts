import express from 'express';
import next from 'next';
import { env, port } from '../config/vars';

const app = next({ dev: env !== 'production' });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();

        server.get('/danh-muc/trang-diem-makeup-i.1', (_req, res) => {
            res.redirect(301, '/danh-muc/trang-diem-makeup-i.83');
        });
        server.get('/danh-muc/kem-lot-makeup-primer-i.9', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-lot-i.85');
        });
        server.get('/danh-muc/kem-nen-bb-cc-i.10', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-nen-bb-cream-i.86');
        });
        server.get('/danh-muc/phan-nuoc-cushion-i.11', (_req, res) => {
            res.redirect(301, '/danh-muc/phan-nuoc-cushion-i.91');
        });
        server.get('/danh-muc/che-khuyet-diem-concealer-i.12', (_req, res) => {
            res.redirect(301, '/danh-muc/che-khuyet-diem-i.88');
        });
        server.get('/danh-muc/phan-phu-powder-i.13', (_req, res) => {
            res.redirect(301, '/danh-muc/phan-phu-i.89');
        });
        server.get('/danh-muc/phan-mat-phan-ma-i.14', (_req, res) => {
            res.redirect(301, '/danh-muc/phan-mat-nhu-mat-i.94');
        });
        server.get('/danh-muc/ke-mat-eyeliner-i.15', (_req, res) => {
            res.redirect(301, '/danh-muc/ke-mat-i.95');
        });
        server.get('/danh-muc/ke-may-eyebrown-i.16', (_req, res) => {
            res.redirect(301, '/danh-muc/ke-chan-may-i.96');
        });
        server.get('/danh-muc/mascara-i.17', (_req, res) => {
            res.redirect(301, '/danh-muc/mascara-i.97');
        });
        server.get('/danh-muc/cac-sp-khac-others-i.18', (_req, res) => {
            res.redirect(301, '/danh-muc/san-pham-khac-i.179');
        });
        server.get('/danh-muc/son-moi-lips-i.2', (_req, res) => {
            res.redirect(301, '/danh-muc/son-moi-lips-i.98');
        });
        server.get('/danh-muc/son-duong-lipbalm-i.19', (_req, res) => {
            res.redirect(301, '/danh-muc/son-duong-i.101');
        });
        server.get('/danh-muc/son-thoi-lipstick-i.20', (_req, res) => {
            res.redirect(301, '/danh-muc/son-thoi-i.99');
        });
        server.get('/danh-muc/son-kem-liptint-i.21', (_req, res) => {
            res.redirect(301, '/danh-muc/son-kem-i.100');
        });
        server.get('/danh-muc/cham-soc-moi-lipcare-i.22', (_req, res) => {
            res.redirect(301, '/danh-muc/tay-da-chet-moi-i.104');
        });
        server.get('/danh-muc/cham-soc-da-skincare-i.3', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-da-skincare-i.105');
        });
        server.get('/danh-muc/tay-trang-micellar-water-i.23', (_req, res) => {
            res.redirect(301, '/danh-muc/tay-trang-i.107');
        });
        server.get('/danh-muc/sua-rua-mat-cleansing-foam-i.24', (_req, res) => {
            res.redirect(301, '/danh-muc/sua-rua-mat-i.108');
        });
        server.get('/danh-muc/tay-da-chet-scrub-i.25', (_req, res) => {
            res.redirect(301, '/danh-muc/tay-te-bao-chet-da-mat-i.109');
        });
        server.get('/danh-muc/nuoc-hoa-hong-toner-i.26', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-hong-toner-i.111');
        });
        server.get('/danh-muc/sua-duong-lotion-i.27', (_req, res) => {
            res.redirect(301, '/danh-muc/lotion-sua-duong-i.113');
        });
        server.get('/danh-muc/serum-i.28', (_req, res) => {
            res.redirect(301, '/danh-muc/serum-tinh-chat-i.112');
        });
        server.get('/danh-muc/kem-duong-facial-cream-i.29', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-duong-i.114');
        });
        server.get('/danh-muc/kem-tri-mun-acne-treatment-i.30', (_req, res) => {
            res.redirect(301, '/danh-muc/tri-mun-i.127');
        });
        server.get('/danh-muc/kem-mat-eye-cream-i.31', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-mat-i.124');
        });
        server.get('/danh-muc/duong-mi-eyelash-care-i.32', (_req, res) => {
            res.redirect(301, '/danh-muc/duong-mi-i.123');
        });
        server.get('/danh-muc/mat-na-mask-i.33', (_req, res) => {
            res.redirect(301, '/danh-muc/mat-na-i.116');
        });
        server.get('/danh-muc/xit-khoang-facial-mist-i.34', (_req, res) => {
            res.redirect(301, '/danh-muc/xit-khoang-i.115');
        });
        server.get('/danh-muc/kem-chong-nang-sunscreen-i.35', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-chong-nang-i.121');
        });
        server.get('/danh-muc/kem-tri-seo-tri-nam-i.36', (_req, res) => {
            res.redirect(301, '/danh-muc/tri-seo-i.128');
        });
        server.get('/danh-muc/cham-soc-co-the-bodycare-i.4', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-co-the-bodycare-i.130');
        });
        server.get('/danh-muc/sua-tam-shower-gel-i.37', (_req, res) => {
            res.redirect(301, '/danh-muc/sua-tam-i.134');
        });
        server.get('/danh-muc/tay-da-chet-body-body-scrub-i.39', (_req, res) => {
            res.redirect(301, '/danh-muc/xa-phong-i.135');
        });
        server.get('/danh-muc/tay-da-chet-body-body-scrub-i.39', (_req, res) => {
            res.redirect(301, '/danh-muc/tay-da-chet-body-i.133');
        });
        server.get('/danh-muc/duong-the-body-lotion-i.40', (_req, res) => {
            res.redirect(301, '/danh-muc/duong-the-i.138');
        });
        server.get('/danh-muc/body-mist-i.41', (_req, res) => {
            res.redirect(301, '/danh-muc/body-mist-xit-thom-i.140');
        });
        server.get('/danh-muc/tay-long-waxing-cream-i.42', (_req, res) => {
            res.redirect(301, '/danh-muc/tay-long-i.136');
        });
        server.get('/danh-muc/lan-xit-khu-mui-deodorant-roller-i.43', (_req, res) => {
            res.redirect(301, '/danh-muc/lan-xit-khu-mui-i.141');
        });
        server.get('/danh-muc/kem-tan-mo-tri-ran-viem-nang-long-i.44', (_req, res) => {
            res.redirect(301, '/danh-muc/kem-tri-ran-tan-mo-i.142');
        });
        server.get('/danh-muc/dung-dich-ve-sinh-i.45', (_req, res) => {
            res.redirect(301, '/danh-muc/dung-dich-ve-sinh-i.144');
        });
        server.get('/danh-muc/cham-soc-toc-haircare-i.5', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-toc-haircare-i.146');
        });
        server.get('/danh-muc/dau-goi-xa-shampoo-conditioner-i.46', (_req, res) => {
            res.redirect(301, '/danh-muc/dau-goi-dau-xa-i.156');
        });
        server.get('/danh-muc/duong-toc-i.47', (_req, res) => {
            res.redirect(301, '/danh-muc/duong-u-toc-i.158');
        });
        server.get('/danh-muc/thuoc-nhuom-toc-hairdye-i.48', (_req, res) => {
            res.redirect(301, '/danh-muc/nhuom-toc-i.159');
        });
        server.get('/danh-muc/u-toc-i.49', (_req, res) => {
            res.redirect(301, '/danh-muc/duong-u-toc-i.158');
        });
        server.get('/danh-muc/dung-cu-tools-brushes-i.6', (_req, res) => {
            res.redirect(301, '/danh-muc/dung-cu-tools-brushes-i.147');
        });
        server.get('/danh-muc/bong-trang-diem-i.50', (_req, res) => {
            res.redirect(301, '/danh-muc/mut-trang-diem-i.162');
        });
        server.get('/danh-muc/dung-cu-cham-soc-da-i.51', (_req, res) => {
            res.redirect(301, '/danh-muc/dung-cu-cham-soc-da-i.171');
        });
        server.get('/danh-muc/kep-mi-dao-cao-i.52', (_req, res) => {
            res.redirect(301, '/danh-muc/kep-mi-i.164');
        });
        server.get('/danh-muc/co-trang-diem-i.53', (_req, res) => {
            res.redirect(301, '/danh-muc/co-trang-diem-i.163');
        });
        server.get('/danh-muc/bong-tay-trang-i.54', (_req, res) => {
            res.redirect(301, '/danh-muc/bong-tay-trang-i.168');
        });
        server.get('/danh-muc/giay-tham-dau-i.56', (_req, res) => {
            res.redirect(301, '/danh-muc/giay-tham-dau-i.170');
        });
        server.get('/danh-muc/mi-gia-kich-mi-i.57', (_req, res) => {
            res.redirect(301, '/danh-muc/mi-gia-i.165');
        });
        server.get('/danh-muc/bo-chiet-my-pham-i.76', (_req, res) => {
            res.redirect(301, '/danh-muc/bo-chiet-my-pham-i.169');
        });
        server.get('/danh-muc/bo-chiet-my-pham-i.76', (_req, res) => {
            res.redirect(301, '/danh-muc/bo-chiet-my-pham-i.169');
        });
        server.get('/danh-muc/nuoc-hoa-perfume-i.7', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-perfume-i.148');
        });
        server.get('/danh-muc/nuoc-hoa-body-i.58', (_req, res) => {
            res.redirect(301, '/danh-muc/body-mist-xit-thom-i.140');
        });
        server.get('/danh-muc/nuoc-hoa-vung-kin-i.59', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-vung-kin-i.145');
        });
        server.get('/danh-muc/nuoc-hoa-nam-i.72', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-nam-i.175');
        });
        server.get('/danh-muc/nuoc-hoa-nu-i.75', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-nu-i.176');
        });
        server.get('/danh-muc/nuoc-hoa-chiet', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-perfume-i.148');
        });
        server.get('/danh-muc/my-pham-high-end-i.66', (_req, res) => {
            res.redirect(301, '/danh-muc/my-pham-high-end-i.150');
        });
        server.get('/danh-muc/trang-diem-i.67', (_req, res) => {
            res.redirect(301, '/danh-muc/trang-diem-cao-cap-i.152');
        });
        server.get('/danh-muc/cham-soc-da-i.68', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-da-mat-cao-cap-i.151');
        });
        server.get('/danh-muc/cham-soc-toc-i.69', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-toc-cao-cap-i.153');
        });
        server.get('/danh-muc/cham-soc-co-the-i.70', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-co-the-cao-cap-i.154');
        });
        server.get('/danh-muc/vitamin-vien-cap-nuoc-trang-da-i.60', (_req, res) => {
            res.redirect(301, '/danh-muc/thuc-pham-chuc-nang-i.177');
        });
        server.get('/danh-muc/tra-giam-can-i.61', (_req, res) => {
            res.redirect(301, '/danh-muc/thuc-pham-chuc-nang-i.177');
        });
        server.get('/danh-muc/kem-danh-rang-toothpaste-i.62', (_req, res) => {
            res.redirect(301, '/danh-muc/cham-soc-rang-mieng-i.131');
        });
        server.get('/danh-muc/xit-thom-quan-ao-fabric-mist-i.63', (_req, res) => {
            res.redirect(301, '/danh-muc/body-mist-xit-thom-i.140');
        });
        server.get('/danh-muc/cac-san-pham-khac-i.64', (_req, res) => {
            res.redirect(301, '/danh-muc/san-pham-khac-i.179');
        });
        server.get('/danh-muc/vien-uong-dhc-i.65', (_req, res) => {
            res.redirect(301, '/danh-muc/thuc-pham-chuc-nang-i.177');
        });
        server.get('/danh-muc/thuc-pham-chuc-nang-i.73', (_req, res) => {
            res.redirect(301, '/danh-muc/thuc-pham-chuc-nang-i.177');
        });
        server.get('/danh-muc/nuoc-hoa-nu-i.74', (_req, res) => {
            res.redirect(301, '/danh-muc/nuoc-hoa-nu-i.176');
        });
        server.get('/danh-muc/gift-set-i.77', (_req, res) => {
            res.redirect(301, '/danh-muc/gift-set-i.178');
        });

        server.get('', (req: any, res: any) => app.render(req, res, '/home-page', req.query));
        server.get('/search', (req: any, res: any) => app.render(req, res, '/search', req.query));

        // server.get('/thong-tin/bao-mat', (req: any, res: any) => app.render(req, res, '/about/bao-mat', req.query));
        // server.get('/thong-tin/gioi-thieu', (req: any, res: any) => app.render(req, res, '/about/gioi-thieu', req.query));
        server.get('/thong-tin/cua-hang', (req: any, res: any) => app.render(req, res, '/about/cua-hang', req.query));
        // server.get('/thong-tin/coco-coin', (req: any, res: any) => app.render(req, res, '/about/coco-coin', req.query));
        // server.get('/thong-tin/khach-hang', (req: any, res: any) => app.render(req, res, '/about/khach-hang', req.query));
        // server.get('/thong-tin/rank-khach-hang', (req: any, res: any) => app.render(req, res, '/about/rank-khach-hang', req.query));
        // server.get('/thong-tin/dat-hang', (req: any, res: any) => app.render(req, res, '/about/dat-hang', req.query));
        // server.get('/thong-tin/dat-hang-2h', (req: any, res: any) => app.render(req, res, '/about/dat-hang-2h', req.query));
        server.get('/thong-tin/thanh-toan', (req: any, res: any) => app.render(req, res, '/about/thanh-toan', req.query));
        // server.get('/thong-tin/qua-tang', (req: any, res: any) => app.render(req, res, '/about/qua-tang', req.query));
        server.get('/thong-tin/phieu-mua-hang', (req: any, res: any) => app.render(req, res, '/about/phieu-mua-hang', req.query));
        // server.get('/thong-tin/giao-hang', (req: any, res: any) => app.render(req, res, '/about/giao-hang', req.query));
        // server.get('/thong-tin/dieu-khoan', (req: any, res: any) => app.render(req, res, '/about/dieu-khoan', req.query));
        // server.get('/thong-tin/doi-tra', (req: any, res: any) => app.render(req, res, '/about/doi-tra', req.query));
        // server.get('/hoi-dap/tai-khoan', (req: any, res: any) => app.render(req, res, '/about/tai-khoan', req.query));
        // server.get('/hoi-dap/don-hang-coco', (req: any, res: any) => app.render(req, res, '/about/don-hang-coco', req.query));
        // server.get('/hoi-dap/phi-van-chuyen', (req: any, res: any) => app.render(req, res, '/about/phi-van-chuyen', req.query));
        // server.get('/hoi-dap/van-chuyen-2h', (req: any, res: any) => app.render(req, res, '/about/van-chuyen-2h', req.query));
        server.get('/thong-tin/:slug', (req: any, res: any) => app.render(req, res, '/about/[slug]', { slug: req.params.slug }));
        server.get('/hoi-dap/:slug', (req: any, res: any) => app.render(req, res, '/question/[slug]', { slug: req.params.slug }));

        server.get('/my-account', (req: any, res: any) => app.render(req, res, '/my-account', req.query));
        server.get('/my-account/my-order', (req: any, res: any) => app.render(req, res, '/my-account/my-order', req.query));
        server.get('/my-account/my-order/:slug', (req: any, res: any) => app.render(req, res, '/my-account/my-order/[slug]', { slug: req.params.slug }));
        server.get('/my-account/my-address', (req: any, res: any) => app.render(req, res, '/my-account/my-address', req.query));
        server.get('/my-account/my-wishlist', (req: any, res: any) => app.render(req, res, '/my-account/my-wishlist', req.query));
        server.get('/my-account/my-coin', (req: any, res: any) => app.render(req, res, '/my-account/my-coin', req.query));
        server.get('/my-account/my-voucher', (req: any, res: any) => app.render(req, res, '/my-account/my-voucher', req.query));
        server.get('/my-account/my-password', (req: any, res: any) => app.render(req, res, '/my-account/my-password', req.query));

        server.get('/author/:slug', (req: any, res: any) => app.render(req, res, '/author/[slug]', { slug: req.params.slug }));

        //server.get('/xu-huong-lam-dep', (req: any, res: any) => app.render(req, res, '/blog', { categories: '13', page: '1' }));
        server.get('/blog', (req: any, res: any) => app.render(req, res, '/blog', req.query));
        server.get('/chuyen-muc/:slug', (req: any, res: any) => app.render(req, res, '/blog/chuyen-muc', { ...req.query, slug: req.params.slug }));
        server.get('/blog/:slug', (req: any, res: any) => app.render(req, res, '/blog/[slug]', { ...req.query, slug: req.params.slug }));

        server.get('/thuong-hieu', (req: any, res: any) => app.render(req, res, '/thuong-hieu', req.query));
        server.get('/thuong-hieu/:slug', (req: any, res: any) => app.render(req, res, '/thuong-hieu/[slug]', { slug: req.params.slug }));

        server.get('/danh-muc/:slug', (req: any, res: any) => app.render(req, res, '/danh-muc/[slug]', { ...req.query, slug: req.params.slug }));

        server.get('/deal-hot', (req: any, res: any) => app.render(req, res, '/deal-hot', req.query));
        server.get('/deal-hot/:slug', (req: any, res: any) => app.render(req, res, '/deal-hot/[slug]', { slug: req.params.slug }));

        server.get('/flash-sale', (req: any, res: any) => app.render(req, res, '/flash-sale', req.query));
        server.get('/deal-now', (req: any, res: any) => app.render(req, res, '/deal-now', req.query));
        server.get('/item-hot', (req: any, res: any) => app.render(req, res, '/item-hot', req.query));
        server.get('/hang-moi-ve', (req: any, res: any) => app.render(req, res, '/hot-new', req.query));

        server.get('/checkout', (req: any, res: any) => app.render(req, res, '/checkout', req.query));
        server.get('/checkout/payment', (req: any, res: any) => app.render(req, res, '/checkout/payment', req.query));
        server.get('/checkout/payment/:slug', (req: any, res: any) => app.render(req, res, '/checkout/payment/[slug]', { slug: req.params.slug }));

        server.get('/:slug', (req: any, res: any) => app.render(req, res, '/item-detail', { slug: req.params.slug }));

        server.all('*', (req: any, res: any) => handle(req, res));

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
