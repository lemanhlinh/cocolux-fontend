// import Link from 'next/link';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Modules
import { ItemAPI } from 'src/helpers/services';

// Components
import { HotItem } from 'src/components/item-group';
import { Carousel } from 'src/components/base-group';
import { LazyLoadProduct } from 'src/components/loading-group';

const HomeListHotItem = () => {
    const [items, setListItems] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    const fetchListItems = async () => {
        await ItemAPI.list({
            skip: 0,
            limit: 10,
            is_top_hot: true
        }).then((response: any) => {
            if (response.code) return;
            setListItems(response.data);
            if (response.data.length) setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchListItems();
    }, []);

    return (
        <section className='bg-white'>
            {
                loading
                    ? (
                        <div className='lazy-warpper'>
                            <LazyLoadProduct />
                        </div>
                    )
                    : (
                        items.length
                            ? (
                                <section className='section'>
                                    <div className='section--header'>
                                        <h2 className='section-title'>
                                            <Link href='/item-hot'>
                                                <a className='color-secondary'>
                                                    Sản phẩm hot
                                                </a>
                                            </Link>
                                        </h2>
                                        <Link href='/item-hot'>
                                            <a className='show-more'>
                                                Xem Tất Cả
                                            </a>
                                        </Link>
                                    </div>
                                    <div className='section--body p-5'>
                                        {
                                            items.length >= 5
                                                ? (
                                                    <Carousel type={1}>
                                                        {
                                                            items.map((item, index) => (
                                                                <HotItem
                                                                    key={index}
                                                                    hotItem={item}
                                                                />
                                                            ))
                                                        }
                                                    </Carousel>
                                                )
                                                : (
                                                    <div className='row'>
                                                        {
                                                            items && items.length
                                                                ? (
                                                                    items.map((item, index) => (
                                                                        <HotItem
                                                                            key={index}
                                                                            hotItem={item}
                                                                            className={'col-6 col-md-4 col-1over5'}
                                                                        />
                                                                    ))
                                                                )
                                                                : null
                                                        }
                                                    </div>
                                                )
                                        }
                                    </div>
                                </section>
                            )
                            : null
                    )
            }
        </section>
    );
};

export default HomeListHotItem;
