import { useRouter } from 'next/router';
import Link from 'next/link';

// Config
import { LAYOUT_404_CONFIG } from 'src/helpers/constants/layout';

const NotFoundPage = () => {
    const router = useRouter();
    return (
        <div className='page_404'>
            <div className='banner_404'>
                <div className='banner_box'>
                    <div className='text_404'>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </div>
                    <span className='sub_text_404_desktop'>
                        Rất tiếc, trang bạn tìm kiếm không tồn tại!
                    </span>
                    <span className='sub_text_404_mobile'>
                        Page Not Found
                    </span>
                    <Link href='/home-page' as='/'>
                        <a className='btn btn-danger btn-md'>
                            Quay lại trang chủ
                            <img src='/media/icons/ic-next.svg' alt='cocolux' />
                        </a>
                    </Link>
                </div>
            </div>
            <div className='content_404'>
                <span className='content__title'>
                    Có thể bạn quan tâm
                </span>
                <div className='category__list'>
                    {
                        LAYOUT_404_CONFIG.categories.map((item: any, index: number) => (
                            <Link href={item.href} as={item.as} key={index}>
                                <a className='category__item' title={item.name} key={index}>
                                    <img src={item.icon} alt='cocolux' />
                                    <span>{item.name}</span>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <div className='brand__list'>
                    {
                        LAYOUT_404_CONFIG.brands.map((item: any, index: number) => (
                            <Link href={item.href} as={item.as} key={index}>
                                <a className='brand__item' title={item.name} key={index}>
                                    <img src={item.icon} alt={item.name} />
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <span className='keyword__title'>
                    Hoặc bạn có thể thử các từ khóa sau
                </span>
                <div className='keyword__list'>
                    {
                        LAYOUT_404_CONFIG.keywords.map((keyword: any, index: number) => (
                            <button
                                onClick={() => {
                                    router.push({
                                        pathname: '/search',
                                        query: { keyword }
                                    });
                                }}
                                className='btn btn-keyword'
                                key={index}
                            >
                                {keyword}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='content_404_mobile'>
                <div className='mobile__note'>
                    <span className='text-danger'>Xin lỗi, trang bạn tìm kiếm không tồn tại!</span>
                    <span>Địa chỉ URL này có thể bị hỏng, hoặc đã được loại bỏ
                        khỏi hệ thống.
                    </span>
                    <span>
                        Nếu bạn cần giúp đỡ, vui lòng liên hệ hỗ trợ khách hàng<br />
                        <a className='text-danger' href='tel:+84988888825'>0988888825</a>
                        hoặc email
                        <a className='text-danger' href='mailto:cskh@Cocolux.vn'>Email: cskh@cocolux.com</a>
                    </span>
                </div>
                <Link href='/home-page' as='/'>
                    <a className='btn btn-outline-home'>
                        Quay lại trang chủ
                        <img src='/media/icons/ic-next.svg' alt='cocolux' />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
