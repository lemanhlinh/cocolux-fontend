import React from 'react';
import Link from 'next/link';

interface BreadCrumbRoute {
    name: string;
    href: string;
    as: string;
}

interface Props {
    routes: BreadCrumbRoute[];
}

export const Breadcrumb: React.FC<Props> = ({ routes }) => {
    return (
        <div className='coco-breadcrumb-wrap'>
            <a href='/' className='coco-breadcrumb-wrap--home'>
                <img src='/media/images/ic-home20px.svg' alt='cocolux' />
                <span>Trang chủ</span>
            </a>
            {
                routes.map((url, index) => (
                    <Link key={index} href={url.href} as={url.as}>
                        <a className='coco-breadcrumb-wrap--first'>
                            <span>{url.name}</span>
                        </a>
                    </Link>
                ))
            }
        </div>
    );
};
