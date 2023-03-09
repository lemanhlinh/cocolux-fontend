import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Service
import { AccountAPI } from 'src/helpers/services';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const [model, setModel] = useState<any>({});

    /**
     * Load default data
     */
    useEffect(() => {
        // Get order id by router
        const { slug } = router.query;

        // Handle fetch detail order
        const handleFecthDetail = async () => {
            await AccountAPI.detailOrder(slug.toString())
                .then((res: any) => {
                    if (res.code) {
                        return null;
                    }
                    setModel(res.data || {});
                });
        };

        // Handle request
        handleFecthDetail();
    }, []);

    return (
        <>
            <Head>
                <title>Thanh toán thành công</title>
                <meta property='og:title' content='Thanh toán thành công' />
                <meta property='og:url' content='https://cocolux.com' data-rh='true' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
                <meta name='description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>
            <div className='checkout-success-page'>
                <div className='left-block'>
                    <img src='/media/images/checkout-success.svg' alt='checkout-success' title='checkout-success' />
                </div>
                <div className='right-block'>
                    <div className='title'>Cảm ơn bạn đã mua hàng tại Cocolux!</div>
                    <div className='order-info'>
                        <span>Mã đơn hàng của bạn là:</span>
                        <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${model?.id}`}>
                            <a>
                                {model?.code}
                            </a>
                        </Link>
                    </div>
                    <p>
                        Bạn có thể xem
                        <Link href='/my-account/my-order/[slug]' as={`/my-account/my-order/${model?.id}`}>
                            <a> chi tiết đơn hàng tại đây</a>
                        </Link>
                    </p>
                    {/* <p>
                        Thời gian dự kiến giao hàng vào <b>01/01/2021 - 02/01/2021</b><br />
                            <em>(Không tính chủ nhật và ngày lễ)</em>
                        </p>
                        <p>
                            Thông tin chi tiết đơn hàng đã được gửi về địa chỉ email <b>example@mail.com</b>. Nếu bạn chưa nhận được email vui lòng kiểm tra hộp thư <b>Spam</b> hoặc <b>Junk Folder</b>
                            <br />
                        </p>
                    */}
                    <p>
                        Để đơn hàng được xử lý nhanh chóng, Cocolux có thể không gọi điện xác nhận đơn hàng. Hệ thống tự động xử lý và nhân viên giao hàng sẽ liên hệ trực tiếp với bạn.
                        <br />
                        <br />
                        Mọi thắc mắc vui lòng liên hệ tại: <a href='tel:'><b>+84-988888825</b></a>
                    </p>
                    <div className='right-block-footer'>
                        <a href='/'>
                            <button className='btn btn-md btn-danger'>
                                <img src='/media/images/ic-white-cart.svg' alt='cocolux' />
                                Tiếp tục mua sắm
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccessPage;
