import React from 'react';

export const LazyLoadProductDetail = () => (
    <div className='lazy-loading-product-detail row no-margin'>
        <div className='tab-left col-lg-10'>
            <div className='tab-product--left'>
                <div className='product-images-group lazyyy'>
                    <div className='product-images'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='product-thumbnail lazyyy'></div>
                </div>
            </div>
            <div className='tab-product--right lazyyy'>
                <div className='product-name'></div>
                <div className='product-sub-info'></div>
                <div className='product-price'></div>
                <div className='lazy-load-form'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div className='tab-right col-lg-2 ml-auto'>
            <div className='card lazyyy'>
                <div className='header'></div>
                <div className='body'></div>
                <div className='footer'></div>
            </div>
            <div className='card lazyyy'>
                <div className='header'></div>
                <div className='body'></div>
                <div className='footer'></div>
            </div>
        </div>
    </div>
);
