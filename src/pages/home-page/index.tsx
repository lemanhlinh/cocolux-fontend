import { useEffect, useState } from 'react';
import Head from 'next/head';
import $ from 'jquery';
import { NextPage } from 'next';

// Modules
import { ItemAPI } from 'src/helpers/services';

// Components
import HomeBanner from './HomeBanner';
import HomeListBrand from './HomeListBrand';
import HomeListProduct from './HomeListProduct';
import HomeListSaleItem from './HomeListSaleItem';
import HomeListHotItem from './HomeListHotItem';
import HomeListArticle from './HomeListArticle';
import HomeListStore from './HomeListStore';
import { useSelector } from 'react-redux';

interface Props {
    itemProducts: [];
}

const HomePage: NextPage<Props> = ({ itemProducts }) => {
    const [productListVisible, setProductListVisible] = useState<boolean>(false);
    const [articleListVisible, setArticleListVisible] = useState<boolean>(false);
    const [storeListVisible, setStoreListVisible] = useState<boolean>(false);
    const { config } = useSelector((state: any) => state.config);

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

    if(config){
        config.title = config.title?config.title:'COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam';
        config.meta_des = config.meta_des?config.meta_des:'COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam';
    }

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content={config.title} />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content={config.meta_des} />
                <meta name="description" content={config.meta_des} />
                <meta property='og:keywords' content={config.meta_key} />
            </Head>

            <div className='coco-home-wrap'>
                {/* begin:: banner */}
                <HomeBanner />
                {/* end:: banner */}

                {/* begin:: sale item */}
                <HomeListSaleItem />
                {/* end:: sale item */}

                {/* begin:: top hot item */}
                {itemProducts && <HomeListHotItem items={itemProducts} />}
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
                {/* {storeListVisible && <HomeListStore />} */}
                {/* end:: store item */}
            </div>
        </>
    );
};

/**
 * Load Props
 * @param {*} param
 */
HomePage.getInitialProps = async () => {
    const itemProducts = await ItemAPI.list({
        skip: 0,
        limit: 10,
        is_top_hot: true
    });

    return { itemProducts: itemProducts.data || null };
};

export default HomePage;
