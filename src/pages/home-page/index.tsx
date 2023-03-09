import { useEffect, useState } from 'react';
import Head from 'next/head';
import $ from 'jquery';

// Components
import HomeBanner from './HomeBanner';
import HomeListBrand from './HomeListBrand';
import HomeListProduct from './HomeListProduct';
import HomeListSaleItem from './HomeListSaleItem';
import HomeListHotItem from './HomeListHotItem';
import HomeListArticle from './HomeListArticle';
import HomeListStore from './HomeListStore';

const HomePage = () => {
    const [productListVisible, setProductListVisible] = useState<boolean>(false);
    const [articleListVisible, setArticleListVisible] = useState<boolean>(false);
    const [storeListVisible, setStoreListVisible] = useState<boolean>(false);

    const handleScroll = () => {
        let documentHeight: number;
        const appNavigator = (navigator?.userAgent) as any;
        const footerHeight = ($('.footer') as any).height();
        const brandHeight = ($('.brand-famous') as any).height();
        const currentScrollOffset = ($(window) as any).scrollTop() + $(window).height();
        // Detect mobile or desktop device
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(appNavigator)) {
            documentHeight = ($(document) as any).height() - brandHeight;
        } else {
            documentHeight = ($(document) as any).height() - footerHeight;
        }

        // Handle scroll & load more data
        if (
            currentScrollOffset >= documentHeight &&
            !productListVisible &&
            !articleListVisible &&
            !storeListVisible
        ) {
            setProductListVisible(true);
            setArticleListVisible(true);
            setStoreListVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Cocolux - Chuỗi cửa hàng mỹ phẩm chính hãng chăm sóc da' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>

            <div className='coco-home-wrap'>
                {/* begin:: banner */}
                <HomeBanner />
                {/* end:: banner */}

                {/* begin:: sale item */}
                <HomeListSaleItem />
                {/* end:: sale item */}

                {/* begin:: top hot item */}
                <HomeListHotItem />
                {/* end:: top hot item */}

                {/* begin:: brand item */}
                <HomeListBrand />
                {/* end:: brand item */}

                {/* begin:: brand item */}
                {productListVisible && <HomeListProduct />}
                {/* end:: brand item */}

                {/* begin:: article item */}
                {articleListVisible && <HomeListArticle />}
                {/* end:: article item */}

                {/* begin:: store item */}
                {storeListVisible && <HomeListStore />}
                {/* end:: store item */}
            </div>
        </>
    );
};

export default HomePage;
