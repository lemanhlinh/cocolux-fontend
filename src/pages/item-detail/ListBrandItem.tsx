import { useEffect, useState } from 'react';

// Modules
import { ItemAPI } from 'src/helpers/services';

// Components
import { ProductItem } from 'src/components/item-group';

interface Props {
    brandItem: any;
}

const ListBrandItem: React.FC<Props> = ({ brandItem }) => {
    const [listItem, setListItem] = useState<any>({ count: 0, data: [] });

    useEffect(() => {
        // Load list brand item
        async function fetchListBrandItem() {
            await ItemAPI.list({
                skip: 0,
                limit: 5,
                sort_by: 'price',
                order_by: 'desc',
                attributes: brandItem ? `${brandItem?.master_id}:${brandItem.id}` : null
            }).then((respone: any) => {
                if (respone.code) return;
                setListItem({
                    count: respone.count,
                    data: respone.data
                });
            }).catch((error) => {
                throw Error(error);
            });
        }
        if (brandItem) {
            fetchListBrandItem();
        }
    }, []);

    return (
        listItem.count
            ? (
                <div className='tab-delivery'>
                    <h4><span>Sản phẩm cùng thương hiệu</span></h4>
                    <div className='row no-margin'>
                        {
                            listItem.data.map((item: any = {}) => (
                                <ProductItem
                                    item={item}
                                    key={item.id}
                                    column='col-6 col-md-4 col-lg-12'
                                />
                            ))
                        }
                    </div>
                    <a href={brandItem ? `search?attributes=${brandItem?.master_id}:${brandItem.id}` : '#'} className='external-link'>
                        Xem thêm
                    </a>
                </div>
            )
            : (
                <div className='tab-delivery'>
                    <h4><span>Sản phẩm cùng thương hiệu</span></h4>
                    <div className='row no-margin tab-no-content'>
                        <span>Không có dữ liệu hiển thị.</span>
                    </div>
                </div>
            )
    );
};

export default ListBrandItem;
