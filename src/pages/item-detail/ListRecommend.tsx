import { useEffect, useState } from 'react';

// Modules
import { ItemAPI } from 'src/helpers/services';

// Components
import { ProductItem } from 'src/components/item-group';
import Link from 'next/link';

interface Props {
    categories: any[];
}

const ItemListRecommend: React.FC<Props> = ({ categories }) => {
    const [recommend, setListRecommend] = useState<any>({ count: 0, data: [] });

    useEffect(() => {
        async function fetchListRecommend() {
            await ItemAPI.list({
                skip: 0,
                limit: 5,
                sort_by: 'price',
                order_by: 'desc',
                categories: categories[0].id
            }).then((respone: any) => {
                if (respone.code) return;
                setListRecommend({
                    count: respone.count,
                    data: respone.data
                });
            }).catch((error) => {
                throw Error(error);
            });
        }

        fetchListRecommend();
    }, []);

    return (
        recommend.count
            ? (
                <div className='tab-delivery'>
                    <h4><span>Sản phẩm cùng loại</span></h4>
                    <div className='row no-margin'>
                        {
                            recommend.data.map((item: any = {}) => (
                                <ProductItem
                                    item={item}
                                    key={item.id}
                                    column='col-6 col-md-4 col-lg-12'
                                />
                            ))
                        }
                    </div>
                    <Link href={`/danh-muc/${categories[0].slug}`} >
                        <a className='external-link'>
                            Xem thêm
                        </a>
                    </Link>
                </div>
            )
            : null
    );
};

export default ItemListRecommend;
