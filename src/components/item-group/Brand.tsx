import React from 'react';
import Link from 'next/link';

// Components
import { Image } from 'src/components/base-group';

// Modules
import { Utilities } from 'src/helpers/utilities';

interface Props {
    item: {
        id: string,
        icon: string,
        slug: string,
        value: string
    };
    className?: string;
}

export const BrandItem: React.FC<Props> = ({ item, className }) => {
    return (
        <div className={className}>
            <div className='ccs-item-brand'>
                <Link href='/thuong-hieu/[slug]' as={`/thuong-hieu/${item.slug.toLocaleLowerCase()}`}>
                    <a>
                        <div className='item--thumbnail'>
                            <Image
                                alt={item.value}
                                title={item.value}
                                src={Utilities.resizeImage(300, item.icon) || '/media/images/brand1.jpg'}
                            />
                        </div>
                        <h5 className='item--label'>
                            <span>{item.value}</span>
                        </h5>
                    </a>
                </Link>
            </div >
        </div>
    );
};
