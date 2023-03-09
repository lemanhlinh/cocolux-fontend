import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';

// Modules
import { BrandAPI } from 'src/helpers/services';

// Components
import { BrandItem } from 'src/components/item-group';
import { Breadcrumb } from 'src/components/base-group';
import { LazyLoadBrand } from 'src/components/loading-group';

const LIST_ALPHABETS = [
    { key: '0-9', href: 'brand_0-9' },
    { key: 'A', href: 'brand_A' },
    { key: 'B', href: 'brand_B' },
    { key: 'C', href: 'brand_C' },
    { key: 'D', href: 'brand_D' },
    { key: 'E', href: 'brand_E' },
    { key: 'F', href: 'brand_F' },
    { key: 'G', href: 'brand_G' },
    { key: 'H', href: 'brand_H' },
    { key: 'I', href: 'brand_I' },
    { key: 'J', href: 'brand_J' },
    { key: 'K', href: 'brand_K' },
    { key: 'L', href: 'brand_L' },
    { key: 'M', href: 'brand_M' },
    { key: 'N', href: 'brand_N' },
    { key: 'O', href: 'brand_O' },
    { key: 'P', href: 'brand_P' },
    { key: 'Q', href: 'brand_Q' },
    { key: 'R', href: 'brand_R' },
    { key: 'S', href: 'brand_S' },
    { key: 'T', href: 'brand_T' },
    { key: 'U', href: 'brand_U' },
    { key: 'V', href: 'brand_V' },
    { key: 'W', href: 'brand_W' },
    { key: 'Y', href: 'brand_Y' },
    { key: 'Z', href: 'brand_Z' }
];

const BrandPage = () => {
    const [brands, setListBrand] = useState<[]>([]);
    const [keyActive, setKeyActive] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [classActive] = useState<string>('');

    /**
     * Handle Scroll View
     * @private
     */
    // const handleScroll = () => {
    //     // Handle keep list-alphabet fixed in top when scroll
    //     const element = document.getElementById('list-brands-alphabet');
    //     if (element) {
    //         if (window.pageYOffset > element.offsetTop) {
    //             setClassActive('fixed-top');
    //         } else {
    //             setClassActive('');
    //         }
    //     }
    // };

    /**
     * Change Tab
     * @param {*} tabIndex
     */
    const onChangeTab = (tabIndex: string) => {
        $('html, body').animate({
            scrollTop: ($(`#${tabIndex}`) as any).offset().top - 120
        }, 300);
    };

    // useEffect(() => {
    //     // event loop
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // });

    /**
     * Get List Brand
     * @private
     */
    const fetchListBrand = async () => {
        try {
            await BrandAPI.list({
                skip: 0,
                limit: 500
            }).then((respone: any) => {
                setListBrand(respone.data || []);
            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {
            throw Error(error);
        }
    };

    useEffect(() => {
        fetchListBrand();
    }, []);

    return (
        <div className='ccs-brand-page-wrapper'>
            <Head>
                <title>CocoLux với hơn 200 thương hiệu mỹ phẩm đình đám trên toàn Thế Giới</title>
                <meta property='og:url' content='https://cocolux.com/thuong-hieu' data-rh='true'></meta>
                <meta property='og:title' content='CocoLux với hơn 200 thương hiệu mỹ phẩm đình đám trên toàn Thế Giới' />
                <meta property='og:image' content='https://cdn.cocolux.com/2021/09/images/banners/1630770071588-share-link.jpeg' data-rh='true' />
                <meta property='og:description' content='Những sản phẩm tốt nhất của hơn 200 thương hiệu mỹ phẩm từ bình dân đến cao cấp đang được CocoLux giới thiệu đến tận tay người tiêu dùng, cung cấp những sản phẩm uy tín và chất lượng cao và phù hợp.' />
            </Head>

            <Breadcrumb
                routes={[
                    { as: '/thuong-hieu', href: '/thuong-hieu', name: 'Thương hiệu' }
                ]}
            />
            <div className='brand-page-container'>
                <div className='total-brands'>Xem {brands.length} thương hiệu</div>
                <div id='list-brands-alphabet' className={`list-brands-alphabet ${classActive}`}>
                    {
                        LIST_ALPHABETS.map((item, index) => (
                            <a
                                key={index}
                                href={`#${item.href}`}
                                className={`item ${keyActive === item.key ? 'active' : ''}`}
                                onClick={() => { setKeyActive(item.key); onChangeTab(item.href); }}
                            >
                                {item.key}
                            </a>
                        ))
                    }
                </div>
                {
                    LIST_ALPHABETS.map((item, index) => (
                        <div id={item.href} className='brand-item' key={index}>
                            <div className='brand-item--row'>
                                <div className='brand-title'>
                                    {item.key}
                                </div>
                            </div>
                            <div className='brand-collection'>
                                {
                                    loading
                                        ? (
                                            [1, 2, 3, 4, 5, 6].map(_index => (
                                                <LazyLoadBrand key={_index} />
                                            ))
                                        )
                                        : (
                                            item.key === '0-9'
                                                ? (
                                                    // Handle filter and render brand by alphabet
                                                    brands.filter(
                                                        (brand: any = {}) => brand.value.match(/^\d/g)
                                                    ).map((brand, index) => (
                                                        <BrandItem
                                                            key={index}
                                                            item={brand}
                                                            className='col-6 col-lg-2'
                                                        />
                                                    ))
                                                )
                                                : (
                                                    // Handle filter and render brand by alphabet
                                                    brands.filter(
                                                        (brand: any = {}) => brand.value.startsWith(item.key)
                                                    ).map((brand, index) => (
                                                        <BrandItem
                                                            key={index}
                                                            item={brand}
                                                            className='col-6 col-lg-2'
                                                        />
                                                    ))
                                                )
                                        )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BrandPage;
