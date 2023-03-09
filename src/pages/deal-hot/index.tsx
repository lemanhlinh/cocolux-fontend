import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Service
import { PromotionAPI } from 'src/helpers/services';

// Components
import { NotFound } from 'src/components/base-group';

const DealHotPage = () => {
    // Declarations Path
    const [hotDeals, setHotDeal] = useState([]);

    /**
     * Load list hotdeals
     */
    const handleFetchData = async () => {
        await PromotionAPI.listPromotion({
            skip: 0,
            limit: 100,
            type: 'hot_deal',
            statuses: 'starting'
        }).then((res: any) => {
            setHotDeal(res.data || []);
        });
    };

    /**
     * Load default data
     * @private
     */
    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <div className='css-promotion-wrapper'>
            <Head>
                <title>Deal HOT: Tất cả Deal tại Cocolux | Cocolux.com</title>
                <meta property='og:url' content='https://Cocolux.com' data-rh='true'></meta>
                <meta property='og:title' content='Deal HOT: Tất cả Deal tại Cocolux | Cocolux.com' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' />
                <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' />
            </Head>
            <div className='css-promotion-wrapper--header'>
                <div className='promotion-nav'>
                    <Link href='/deal-hot'>
                        <a className='nav-item active'>Hot deals</a>
                    </Link>
                    <Link href='/flash-sale'>
                        <a className='nav-item'>Flash Deal</a>
                    </Link>
                    <Link href='/deal-now'>
                        <a className='nav-item'>ĐANG DIỄN RA</a>
                    </Link>
                </div>
            </div>
            <div className='hot-deal-container'>
                {
                    hotDeals.length
                        ? (
                            hotDeals.map((item: any = {}, index: number) => (
                                <Link href='/deal-hot/[slug]' as={`/deal-hot/${item.id}`} key={index}>
                                    <a className='col-md-6'>
                                        <div className='banner'>
                                            <img src={item.thumbnail_url} alt='cocolux' />
                                        </div>
                                        <h3 className='hot-deal-title'>{item.name}</h3>
                                    </a>
                                </Link>
                            ))
                        )
                        : (
                            <NotFound content={'Không có deal khuyến mãi'} />
                        )
                }
            </div>
        </div>
    );
};

export default DealHotPage;
