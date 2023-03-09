import { useRouter } from 'next/router';

const BrandSortBox = () => {
    const router = useRouter();
    const queryParams = router.query;

    const onSortData = (sortBy: string, orderBy: string) => {
        return router.push({
            query: {
                ...queryParams,
                sort_by: sortBy,
                order_by: orderBy
            },
            pathname: `/thuong-hieu/${router.query.slug}`
        });
    };

    return (
        <div className='btn-group'>
            <button
                className={
                    queryParams.sort_by === 'view_count' && queryParams.order_by === 'desc'
                        ? 'btn btn-outlined active'
                        : 'btn btn-outlined'
                }
                onClick={() => onSortData('view_count', 'desc')}
            >
                <span>Nổi bật</span>
            </button>
            <button
                className={
                    queryParams.sort_by === 'order_count' && queryParams.order_by === 'desc'
                        ? 'btn btn-outlined active'
                        : 'btn btn-outlined'
                }
                onClick={() => onSortData('order_count', 'desc')}
            >
                <span>Bán chạy</span>
            </button>
            <button
                className={
                    queryParams.sort_by === 'created_at' && queryParams.order_by === 'desc'
                        ? 'btn btn-outlined active'
                        : 'btn btn-outlined'
                }
                onClick={() => onSortData('created_at', 'desc')}
            >
                <span>Hàng mới</span>
            </button>
            <button
                className={
                    queryParams.sort_by === 'price' && queryParams.order_by === 'desc'
                        ? 'btn btn-outlined active'
                        : 'btn btn-outlined'
                }
                onClick={() => onSortData('price', 'desc')}
            >
                <span>Giá cao tới thấp</span>
            </button>
            <button
                className={
                    queryParams.sort_by === 'price' && queryParams.order_by === 'asc'
                        ? 'btn btn-outlined active'
                        : 'btn btn-outlined'
                }
                onClick={() => onSortData('price', 'asc')}
            >
                <span>Giá thấp tới cao</span>
            </button>
        </div>

    );
};

export default BrandSortBox;
