import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Storage } from 'src/helpers/utilities';

interface Props {
    children: any;
}

export const LayoutAccount: React.FC<Props> = ({ children }) => {
    // Decalration state & variables
    const [user, setUser] = useState<any>({});
    const router = useRouter();
    const accountMenus = [
        {
            id: 1,
            name: 'THÔNG TIN TÀI KHOẢN',
            pathname: '/my-account'
        },
        {
            id: 2,
            name: 'ĐƠN HÀNG CỦA TÔI',
            pathname: '/my-account/my-order'
        },
        {
            id: 3,
            name: 'SẢN PHẨM YÊU THÍCH',
            pathname: '/my-account/my-wishlist'
        },
        {
            id: 4,
            name: 'ĐỊA CHỈ GIAO HÀNG',
            pathname: '/my-account/my-address'
        },
        {
            id: 5,
            name: 'QUẢN LÝ COCO COIN',
            pathname: '/my-account/my-coin'
        },
        {
            id: 6,
            name: 'VÍ VOUCHER',
            pathname: '/my-account/my-voucher'
        },
        {
            id: 7,
            name: 'THAY ĐỔI MẬT KHẨU',
            pathname: '/my-account/my-password'
        },
    ];
    // Declarations Reducer
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);

    /**
     * Load user from local
     */
    useEffect(() => {
        const _user = Storage.get(Storage.USER);
        setUser(JSON.parse(_user));
    }, []);

    return (
        <div className='account-layout-wrapper'>
            <div className={`account-layout-wrapper--top row no-margin ${!isUserLoggedIn ? 'not-login' : ''}`}>
                <div className='account-layout-left col-md-3'>
                    {
                        isUserLoggedIn
                            ? (
                                <div className='account-info'>
                                    <div className='avatar'>
                                        <img src={user.avatar || '/media/images/ic-lazy-load.svg'} alt='cocolux' />
                                    </div>
                                    <div className='information'>
                                        <span>Tài khoản</span>
                                        <span>{user.name || 'Account Name'}</span>
                                    </div>
                                </div>
                            )
                            : (
                                null
                            )
                    }

                    <div className='nav-container'>
                        {
                            accountMenus.map((item, index) => (
                                <Link href={item.pathname} key={index}>
                                    <a className={`item ${item.pathname === router.pathname ? 'active' : ''}`}>
                                        {item.name}
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className='account-layout-right col-md-9'>
                    {children}
                </div>
            </div>
        </div>
    );
};
