import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isNil } from 'lodash';

// Modules
import { ProductModel } from 'src/helpers/models';
import { Storage, Utilities } from 'src/helpers/utilities';

// Components
import { Image } from 'src/components/base-group';

export const ViewedItem = () => {
    const [products, setProduct] = useState([]);

    /**
     * Load Product Viewed
     * @private
     */
    useEffect(() => {
        const listViews = Storage.get(Storage.PRODUCT_VIEWED);
        if (listViews) setProduct(JSON.parse(listViews));

        if (products.length) {
            // Get item deal
            const transformed = products.map((i: any) => {
                const currentDeal = Utilities.getCurrentItemDeal(i);
                if (!isNil(currentDeal) && currentDeal.id) {
                    i.deal_layer = currentDeal.image_layer;
                }
                return i;
            }) as [];
            setProduct(transformed);
        }

        return () => {
            console.log('unmounted viewed item component');
        };
    }, []);

    return (
        products.length
            ? (
                <>
                    <div className='section--header'>
                        <h6 className='section-title'>Sản phẩm đã xem</h6>
                    </div>
                    <div className='row no-margin py-5'>
                        {
                            products.map((product: ProductModel, index: number) => (
                                index < 10
                                    ? (
                                        <div
                                            key={product.id}
                                            className='col-6 col-md-3 col-1over10 viewed-product'
                                        >
                                            <Link href={{ pathname: '/item-detail', query: { slug: product.slug } }} as={`/${product.slug}`}>
                                                <a className='thumbnail'>
                                                    <Image
                                                        alt={product.name}
                                                        title={product.name}
                                                        src={Utilities.resizeImage(300, product.thumbnail_url)}
                                                    />
                                                    {
                                                        product.deal_layer
                                                            ? (
                                                                <div className='thumbnail__mask'>
                                                                    <img
                                                                        alt={product.name}
                                                                        title={product.name}
                                                                        src={Utilities.resizeImage(300, product.deal_layer)}
                                                                        onError={(e: any) => {
                                                                            if (e && e.target && e.target.style) {
                                                                                e.target.style.display = 'none';
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : null
                                                    }
                                                </a>
                                            </Link>
                                            <h3 className='title'>
                                                <Link href={{ pathname: '/item-detail', query: { slug: product.slug } }} as={`/${product.slug}`}>
                                                    <a>{product.name}</a>
                                                </Link>
                                            </h3>
                                        </div>
                                    )
                                    : null
                            ))
                        }
                    </div>
                </>
            )
            : null
    );
};
