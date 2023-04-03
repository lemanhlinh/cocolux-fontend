import express from 'express';
import next from 'next';
import { env, port } from '../config/vars';

const app = next({ dev: env !== 'production' });
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();

        // server.get('/danh-muc/trang-diem-makeup-i.1', (req, res) => {
        //     res.redirect(301, '/danh-muc/trang-diem-makeup-i.83');
        // });
        // server.get('/danh-muc/kem-lot-makeup-primer-i.9', (req, res) => {
        //     res.redirect(301, '/danh-muc/kem-lot-i.85');
        // });

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
