import { useEffect, useState } from 'react';
import Link from 'next/link';

// Modules
import { ConfigAPI } from 'src/helpers/services';

// Components
import { LazyLoadProduct } from 'src/components/loading-group';
import { Carousel } from 'src/components/base-group';
import { Utilities } from 'src/helpers/utilities';

const HomeListStore = () => {
    const [stores, setListStore] = useState<[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        async function fetchListStore() {
            await ConfigAPI.listStore({
                skip: 0,
                limit: 10
            }).then((response: any) => {
                if (response.code) return;
                setListStore(response.data || []);
            }).finally(() => {
                setLoading(false);
            });
        }

        fetchListStore();
    }, []);

    return (
        <section className='section'>
            {
                loading
                    ? (
                        <div className='lazy-warpper'>
                            <LazyLoadProduct />
                        </div>
                    )
                    : (
                        stores.length
                            ? (
                                <div className='hpl__store'>
                                    <div className='hpls__title'>
                                        <Link href='/thong-tin/cua-hang'>
                                            <a className='color-dark'>
                                                DANH SÁCH CỬA HÀNG
                                            </a>
                                        </Link>
                                    </div>
                                    {
                                        stores.length > 5
                                            ? (
                                                <Carousel type={4}>
                                                    {
                                                        stores.map((store: any = {}, index: number) => (
                                                            <div key={index}>
                                                                <Link href='thong-tin/cua-hang'>
                                                                    <a className='ccs-item-store--img'>
                                                                        <img src={Utilities.resizeImage(300, store.logo)} alt='cocolux' />
                                                                    </a>
                                                                </Link>
                                                                <div className='ccs-item-store--text'>
                                                                    <span>{store.address || store.name}</span>
                                                                    <span>{store.phone}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </Carousel>
                                            )
                                            : (
                                                <div className='row'>
                                                    {
                                                        stores.map((store: any = {}, index: number) => (
                                                            <div key={index} className={'col-6 col-md-2 col-1over2'}>
                                                                <Link href='thong-tin/cua-hang'>
                                                                    <a className='ccs-item-store--img'>
                                                                        <img src={store.logo} alt='cocolux' />
                                                                    </a>
                                                                </Link>
                                                                <div className='ccs-item-store--text'>
                                                                    <span>{store.address || store.name}</span>
                                                                    <span>{store.phone}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                            )
                            : null
                    )
            }
        </section>
    );
};

export default HomeListStore;
