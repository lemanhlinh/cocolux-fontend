import { useEffect, useState } from 'react';
import Link from 'next/link';

// Modules
import { Utilities } from 'src/helpers/utilities';
import { BrandAPI, ConfigAPI } from 'src/helpers/services';

// Components
import { Carousel } from 'src/components/base-group';
import { BrandItem } from 'src/components/item-group';
import { LazyLoadProduct } from 'src/components/loading-group';


const HomeListBrand = () => {
    const [brands, setBrand] = useState<[]>([]);
    const [banners, setBanner] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    const fetchBrands = async () => {
        await BrandAPI.list({
            skip: 0,
            limit: 10,
            order_by: 'asc',
            sort_by: 'position'
        }).then((respone: any) => {
            setBrand(respone.data || []);
        }).finally(() => {
            setLoading(false);
        });
    };

    const fetchBanners = async () => {
        await ConfigAPI.listBanner({
            skip: 0,
            limit: 10,
            types: ConfigAPI.BANNER_HOME_V1_PRIMARY_BANNER_1
        }).then((respone: any) => {
            setBanner(respone.data || []);
        });
    };

    useEffect(() => {
        fetchBrands();
        fetchBanners();
    }, []);

    return (
        <section className='section brand-famous'>
            {
                loading
                    ? (
                        <div className='lazy-warpper'>
                            <LazyLoadProduct />
                        </div>
                    )
                    : (
                        brands && brands.length
                            ? (
                                <>
                                    <div className='section--header bg-white'>
                                        <h3 className='section-title'>
                                            <Link href='/thuong-hieu'>
                                                <a className='color-dark'>
                                                    THƯƠNG HIỆU NỔI BẬT
                                                </a>
                                            </Link>
                                        </h3>
                                        <Link href='/thuong-hieu' as='/thuong-hieu'>
                                            <a className='show-more'>
                                                Xem Tất Cả
                                            </a>
                                        </Link>
                                    </div>
                                    <div className='card-brand'>
                                        <Carousel type={4} className='list-brand-slider'>
                                            {
                                                brands.map((item, index) => (
                                                    <BrandItem
                                                        key={index}
                                                        item={item}
                                                    />
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </>
                            )
                            : null
                    )
            }
            <div className='hpl__poster'>
                {
                    banners.map((banner: any = {}) => (
                        <Link href={`${banner.url}`} key={banner.id}>
                            <a className='image'>
                                <img src={Utilities.resizeImage(600, banner.image_url)} alt={banner.title} />
                            </a>
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};

export default HomeListBrand;

