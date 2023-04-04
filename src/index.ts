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

        server.get('', (req: any, res: any) => app.render(req, res, '/home-page', req.query));
        server.get('/search', (req: any, res: any) => app.render(req, res, '/search', req.query));

        server.get('/thong-tin/bao-mat', (req: any, res: any) => app.render(req, res, '/about/bao-mat', req.query));
        server.get('/thong-tin/gioi-thieu', (req: any, res: any) => app.render(req, res, '/about/gioi-thieu', req.query));
        server.get('/thong-tin/cua-hang', (req: any, res: any) => app.render(req, res, '/about/cua-hang', req.query));
        server.get('/thong-tin/coco-coin', (req: any, res: any) => app.render(req, res, '/about/coco-coin', req.query));
        server.get('/thong-tin/khach-hang', (req: any, res: any) => app.render(req, res, '/about/khach-hang', req.query));
        server.get('/thong-tin/rank-khach-hang', (req: any, res: any) => app.render(req, res, '/about/rank-khach-hang', req.query));
        server.get('/thong-tin/dat-hang', (req: any, res: any) => app.render(req, res, '/about/dat-hang', req.query));
        // server.get('/thong-tin/dat-hang-2h', (req: any, res: any) => app.render(req, res, '/about/dat-hang-2h', req.query));
        server.get('/thong-tin/thanh-toan', (req: any, res: any) => app.render(req, res, '/about/thanh-toan', req.query));
        server.get('/thong-tin/qua-tang', (req: any, res: any) => app.render(req, res, '/about/qua-tang', req.query));
        server.get('/thong-tin/phieu-mua-hang', (req: any, res: any) => app.render(req, res, '/about/phieu-mua-hang', req.query));
        server.get('/thong-tin/giao-hang', (req: any, res: any) => app.render(req, res, '/about/giao-hang', req.query));
        server.get('/thong-tin/dieu-khoan', (req: any, res: any) => app.render(req, res, '/about/dieu-khoan', req.query));
        server.get('/thong-tin/doi-tra', (req: any, res: any) => app.render(req, res, '/about/doi-tra', req.query));
        server.get('/hoi-dap/tai-khoan', (req: any, res: any) => app.render(req, res, '/about/tai-khoan', req.query));
        server.get('/hoi-dap/don-hang-coco', (req: any, res: any) => app.render(req, res, '/about/don-hang-coco', req.query));
        server.get('/hoi-dap/phi-van-chuyen', (req: any, res: any) => app.render(req, res, '/about/phi-van-chuyen', req.query));
        // server.get('/hoi-dap/van-chuyen-2h', (req: any, res: any) => app.render(req, res, '/about/van-chuyen-2h', req.query));

        server.get('/my-account', (req: any, res: any) => app.render(req, res, '/my-account', req.query));
        server.get('/my-account/my-order', (req: any, res: any) => app.render(req, res, '/my-account/my-order', req.query));
        server.get('/my-account/my-order/:slug', (req: any, res: any) => app.render(req, res, '/my-account/my-order/[slug]', { slug: req.params.slug }));
        server.get('/my-account/my-address', (req: any, res: any) => app.render(req, res, '/my-account/my-address', req.query));
        server.get('/my-account/my-wishlist', (req: any, res: any) => app.render(req, res, '/my-account/my-wishlist', req.query));
        server.get('/my-account/my-coin', (req: any, res: any) => app.render(req, res, '/my-account/my-coin', req.query));
        server.get('/my-account/my-voucher', (req: any, res: any) => app.render(req, res, '/my-account/my-voucher', req.query));
        server.get('/my-account/my-password', (req: any, res: any) => app.render(req, res, '/my-account/my-password', req.query));

        server.get('/author/:slug', (req: any, res: any) => app.render(req, res, '/author/[slug]', { slug: req.params.slug }));

        server.get('/blog', (req: any, res: any) => app.render(req, res, '/blog', req.query));
        server.get('/blog/:slug', (req: any, res: any) => app.render(req, res, '/blog/[slug]', { slug: req.params.slug }));

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
