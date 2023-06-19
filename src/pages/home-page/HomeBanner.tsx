import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

// Components
import { Carousel } from 'src/components/base-group';

// Modules
import { ConfigAPI } from 'src/helpers/services';
import { Utilities } from 'src/helpers/utilities';

const HomeBanner = () => {
    const { categories } = useSelector((state: any) => state.layout);
    const [subBanners, setSubBannerState] = useState<[]>([]);
    const [banners, setBannerState] = useState<[]>([]);

    function showMobileCate() {
        (document.querySelector('.mobile-cate') as any).classList.toggle('open');
    }

    function hideMobileCate() {
        (document.querySelector('.mobile-cate') as any).classList.remove('open');
    }

    function toggleSubElement(e: any) {
        const parent = e.target;
        parent.classList.toggle('open');
    }

    const fetchBanners = async () => {
        const params = {
            skip: 0,
            limit: 5,
            is_visible: true,
            types: ConfigAPI.BANNER_HOME_V1_SLIDER
        };
        await ConfigAPI.listBanner(
            params
        ).then((response: any) => {
            if (response.code) return;
            setBannerState(response.data);
        });
    };

    const fetchSubBanners = async () => {
        const params = {
            skip: 0,
            limit: 2,
            is_visible: true,
            types: ConfigAPI.BANNER_HOME_V1_SUB_BANNER
        };
        await ConfigAPI.listBanner(
            params
        ).then((response: any) => {
            if (response.code) return;
            setSubBannerState(response.data);
        });
    };

    useEffect(() => {
        fetchBanners();
        fetchSubBanners();
    }, []);

    return (
        <>
            <div className='coco-home-content'>
                <div className='home-content--right'>
                    <div className='ccs-banner-wrap'>
                        <div className={`ccs-banner-wrap--left ${!banners.length ? 'loading' : ''}`}>
                            <Carousel type={3} className='ccs-banner--slideshow'>
                                {
                                    !banners.length &&
                                    <a>
                                        <div className='lazy-banner'>
                                            <img src='/media/images/ic-lazy-load.svg' alt='empty' />
                                        </div>
                                    </a>
                                }
                                {
                                    banners.map((banner: any, index: number) => (
                                        <Link href={`${banner.url}`} key={index}>
                                            <a key={banner.id}>
                                                <img src={banner.image_url} alt={banner.name} />
                                            </a>
                                        </Link>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div className='ccs-banner-wrap--right'>
                            <div className='side-banner'>
                                {
                                    subBanners.length > 0
                                        ? (
                                            subBanners.map((banner: any, index: number) => (
                                                <Link href={`${banner.url}`} key={index}>
                                                    <a key={index + 3}>
                                                        <img src={banner.image_url} alt={banner.name} />
                                                    </a>
                                                </Link>
                                            ))
                                        )
                                        : (
                                            <>
                                                <div className='lazy-banner'><img src='/media/images/ic-lazy-load.svg' alt='empty' /></div>
                                                <div className='lazy-banner'><img src='/media/images/ic-lazy-load.svg' alt='empty' /></div>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mobile-cate'>
                <div style={{ textAlign: 'right', padding: '10px 5px' }}>
                    <button
                        style={{ background: 'transparent', border: 0 }}
                        onClick={() => hideMobileCate()}
                    >
                        <img src='/media/images/ic-close-modal.svg' />
                    </button>
                </div>
                {
                    categories.map((category: any, index: number) => (
                        <div
                            key={index}
                            className='cate-item'
                            onClick={e => toggleSubElement(e)}
                        >
                            <Link href='/danh-muc/[slug]' as={`/danh-muc/${category.slug}`} key={index}>
                                <a className='cate' onClick={() => hideMobileCate()}>
                                    {category.name}
                                </a>
                            </Link>
                            <span></span>
                            <div className='sub-cate'>
                                {
                                    category.children.length
                                        ? (
                                            category.children.map((subCategory: any, index: number) => (
                                                <div key={index}>
                                                    <Link href='/danh-muc/[slug]' as={`/danh-muc/${subCategory.slug}`}>
                                                        <a>{subCategory.name}</a>
                                                    </Link>
                                                </div>
                                            ))
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    ))
                }
            </div >
            <div className='categories-mobile-wrapper'>
                <div className='categories-mobile-nav'>
                    <span className='nav-item'>
                        <span className='cate-icon' onClick={() => showMobileCate()}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <span className='item-title'>Danh mục</span>
                    </span>
                    {
                        categories.map((category: any = {}, index: number) => (
                            <Link href={`/danh-muc/${category.slug}`} key={index}>
                                <a className='nav-item' key={index}>
                                    <img
                                        src={category.logo ? Utilities.resizeImage(100, category.logo) : 'media/images/ic-lazy-load-3.png'}
                                        alt={category.name}
                                    />
                                    <span className='item-title'>{category.name}</span>
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default HomeBanner;
