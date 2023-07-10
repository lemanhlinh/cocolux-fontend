import { useEffect, useState } from 'react';
import { ProductOption } from 'src/helpers/models';
import { Utilities } from 'src/helpers/utilities';

// Components
import { Image } from 'src/components/base-group';
// import { parse } from 'querystring';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
    options: ProductOption[];
}

const ItemListOption: React.FC<Props> = ({ options }) => {
    const router = useRouter();
    const [optionId, setOptionId] = useState<string>();

    useEffect(() => {
        const { slug } = router.query as any;
        const paramId = slug ? slug.split('-i.')[1] as string : null;
        setOptionId(paramId ? paramId : options[0].sku);
    }, [router]);

    return (
        options.length > 0
            ? (
                <div className='product-type'>
                    {
                        options.map((option) => {
                            const imageUrl = option.images && option.images.length
                                ? Utilities.resizeImage(100, option.images[0])
                                : '/media/images/loading.svg';
                            const dataStocks: any[] = option.stocks;
                            const totalQuantity = dataStocks.reduce((sum, obj) => sum + obj.total_quantity, 0);
                            return (
                                <Link
                                    key={option.id}
                                    as={`/${option.slug}`}
                                    href={{ pathname: '/item-detail', query: { slug: option.slug } }}
                                >
                                    <a className={`product-type--item ${option.sku === optionId ? 'active' : ''} ${totalQuantity === 0 ? 'none_stock' : ''}`}>
                                        <Image
                                            src={imageUrl}
                                            alt={option.name}
                                        />
                                        <span className='tooltip'>
                                            <span className='tooltip-content'>{option.name}</span>
                                        </span>
                                    </a>
                                </Link>
                            );
                        })
                    }
                </div>
            )
            : null
    );
};

export default ItemListOption;
