import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Config & Helper
import { Storage, Cookie, Utilities } from 'src/helpers/utilities';

// Service & Redux
import { addLoginForm } from 'src/stores/layout';

export const HeaderCenter: React.FC = () => {
    // Declarations State
    const [keyword, setKeyword] = useState();
    const [user, setUserInfo] = useState<any>({});
    const [itemSelected, setItemSelected] = useState<any>({
        id: null,
        name: 'Tất cả'
    });

    // Declarations Reducer
    const router = useRouter();
    const dispatch = useDispatch();
    const pathName = router.pathname;
    const queryParams = router.query;
    const { isUserLoggedIn } = useSelector((state: any) => state.layout);
    const { totalQuantity } = useSelector((state: any) => state.checkout);
    /**
     * Load data
     * @private
     */
    useEffect(() => {
        // load user from cache
        const userString = Storage.get(Storage.USER);
        setUserInfo(userString ? JSON.parse(userString) : {});

        // event listenler
        window.addEventListener('scroll', handleScrollFixHeader);
        window.addEventListener('click', (event: any) => hiddenCategoryDropdown(event));
        return () => {
            window.removeEventListener('click', hiddenCategoryDropdown);
            window.removeEventListener('scroll', handleScrollFixHeader);
        };
    }, []);

    /**
     * Handle Scroll Fix Header
     */
    const handleScrollFixHeader = () => {
        if (window.pageYOffset > 249) {
            (document.querySelector('.header-center') as any).classList.add('fixed-header');
        } else {
            (document.querySelector('.header-center') as any).classList.remove('fixed-header');
        }
    };

    /**
     * Show Category Dropdown
     */
    const showCategoryDropdown = () => {
        const dropdown = document.querySelector('.dropdown .dropdown-focus') as any;
        dropdown.classList.toggle('show');
    };

    /**
     * Hidden Category Dropdown
     * @param event
     */
    const hiddenCategoryDropdown = (event: any) => {
        if (!event.target.matches(['.toggle', '.toggle-name', '.toggle-icon'])) {
            const dropdowns = document.getElementsByClassName('dropdown-focus');
            // tslint:disable-next-line: no-increment-decrement
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    const onSortData = (pathName: string, sortBy: string, orderBy: string) => {
        return router.push({
            query: {
                ...queryParams,
                sort_by: sortBy,
                order_by: orderBy
            },
            pathname: pathName
        });
    };

    /**
     * Search
     * @param {*} keyword
     */
    const onSearch = (event: any) => {
        event.preventDefault();
        router.push({
            pathname: '/search',
            query: {
                keyword,
                categories: itemSelected?.id || ''
            }
        });
    };

    /**
     * Show Login Form
     * @private
     */
    const onShowLoginForm = () => {
        dispatch(addLoginForm(true, 'login'));
    };

    /**
     * Show Register Form
     * @private
     */
    const onShowRegisterForm = () => {
        dispatch(addLoginForm(true, 'register'));
    };

    /**
     * Sign out
     * @param {*} clear
     */
    const onSignOut = () => {
        try {
            // clear local data
            Storage.remove(Storage.USER);
            Storage.remove(Storage.USER_STATUS);
            Storage.remove(Storage.USER_METRIC);
            Storage.remove(Storage.USER_LOCATION);
            Cookie.remove(Cookie.ACCESS_TOKEN);
            Cookie.remove(Cookie.REFRESH_TOKEN);
            Storage.remove(Storage.SOURCE_LOGIN);

            // navigate after succcess
            window.location.href = '/';
            return true;
        } catch (ex: any) {
            throw Error(ex);
        }
    };

    // Declarations Reducer
    const { categories } = useSelector((state: any) => state.layout);
    return (
        <div className='header-center'>
            <div className='header-center--wrapper'>
                <div className='header-center--wrapper__logo'>
                    <Link href='/home-page' as='/'>
                        <a className='logo'>
                            <img src='/media/images/logo_cocoshop.svg' alt='Cocolux' title='Cocolux' />
                        </a>
                    </Link>
                    <Link href='/home-page' as='/'>
                        <a className='fixed-logo'>
                            <img src='/media/images/logo_ccs.svg' alt='Cocolux' title='Cocolux' />
                        </a>
                    </Link>
                </div>

                {/* Menu danh mục */}
                <div className='fixed-category header-bottom--left'>
                    <div className='title'>
                        <div className='hamburger'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        DANH MỤC SẢN PHẨM
                    </div>
                    <div className='header-bottom--left__content' >
                        {
                            categories.map((category: any) => (
                                <div className='header-bottom--left__item' key={category.id}>
                                    <Link href='/danh-muc/[slug]' as={`/danh-muc/${category.slug}`}>
                                        <a>{category.name}</a>
                                    </Link>
                                    <img src='/media/images/ic-arrowback.svg' alt='cocolux' />
                                    {
                                        category.children.length
                                            ? (
                                                <div className='header-bottom--left__submenu'>
                                                    <div className='left-submenu-container'>
                                                        <div className='submenu-bar beautify-scroll'>
                                                            <div className='menu-group-buttons'>
                                                                <a
                                                                    className='btn btn-outlined btn-primary'
                                                                    onClick={() => onSortData(`/danh-muc/${category.slug}`, 'view_count', 'desc')}
                                                                >
                                                                    Nổi bật
                                                                </a>
                                                                <a
                                                                    className='btn btn-outlined btn-primary'
                                                                    onClick={() => onSortData(`/danh-muc/${category.slug}`, 'order_count', 'desc')}
                                                                >
                                                                    Bán chạy
                                                                </a>
                                                                <a
                                                                    className='btn btn-outlined btn-primary'
                                                                    onClick={() => onSortData(`/danh-muc/${category.slug}`, 'created_at', 'desc')}
                                                                >
                                                                    Hàng mới
                                                                </a>
                                                            </div>
                                                            <div className='menu-group-items'>
                                                                <div className='group-item-col'>
                                                                    {
                                                                        category.children.map((subCategory: any) => (
                                                                            subCategory.position <= 10
                                                                                ? (
                                                                                    <div className='menu-item--col' key={subCategory.id}>
                                                                                        <Link href='/danh-muc/[slug]' as={`/danh-muc/${subCategory.slug}`}>
                                                                                            <a className='menu-item--col__title'>
                                                                                                {subCategory.name}
                                                                                            </a>
                                                                                        </Link>
                                                                                        {
                                                                                            subCategory.children.length
                                                                                                ? (
                                                                                                    <div className='menu-item--col__subtitle'>
                                                                                                        {
                                                                                                            subCategory.children.map((subChildren: any) => (
                                                                                                                <Link
                                                                                                                    key={subChildren.id}
                                                                                                                    href='/danh-muc/[slug]'
                                                                                                                    as={`/danh-muc/${subChildren.slug}`}
                                                                                                                >
                                                                                                                    <a>{subChildren.name}</a>
                                                                                                                </Link>
                                                                                                            ))
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='group-item-col'>
                                                                    {
                                                                        category.children.map((subCategory: any) => (
                                                                            subCategory.position > 10
                                                                                ? (
                                                                                    <div className='menu-item--col' key={subCategory.id}>
                                                                                        <Link href='/danh-muc/[slug]' as={`/danh-muc/${subCategory.slug}`}>
                                                                                            <a className='menu-item--col__title'>
                                                                                                {subCategory.name}
                                                                                            </a>
                                                                                        </Link>
                                                                                        {
                                                                                            subCategory.children.length
                                                                                                ? (
                                                                                                    <div className='menu-item--col__subtitle'>
                                                                                                        {
                                                                                                            subCategory.children.map((subChildren: any) => (
                                                                                                                <Link
                                                                                                                    key={subChildren.id}
                                                                                                                    href='/danh-muc/[slug]'
                                                                                                                    as={`/danh-muc/${subChildren.slug}`}
                                                                                                                >
                                                                                                                    <a>{subChildren.name}</a>
                                                                                                                </Link>
                                                                                                            ))
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='menu-poster'>
                                                            <div className='iframe-poster'>
                                                                <img src={Utilities.resizeImage(300, category.image)} alt='cocolux' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* Menu danh mục */}

                {/* Tìm kiếm */}
                <form
                    className='header-center--wrapper__search'
                    onSubmit={(e: any) => onSearch(e)}
                >
                    {/* Dropdown Categories */}
                    <div className='categories-dropdown dropdown' >
                        <div
                            className='toggle'
                            onClick={() => showCategoryDropdown()}
                        >
                            <span
                                className='toggle-name'
                                title={itemSelected?.name}
                            >
                                {itemSelected?.name}
                            </span>
                            <span className='toggle-icon'></span>
                        </div>
                        <div className='dropdown-focus'>
                            <div
                                className='dropdown-item item-parent'
                                onClick={() => setItemSelected({
                                    id: null,
                                    name: 'Tất cả'
                                })}
                            >
                                Tất cả
                            </div>
                            {
                                categories.map((category: any, index: number) => (
                                    <section key={index}>
                                        <div
                                            className='dropdown-item item-parent'
                                            onClick={() => setItemSelected({
                                                id: category.id,
                                                name: category.name
                                            })}
                                        >
                                            {category.name}
                                        </div>
                                        {
                                            category?.children?.length && category?.children.map((subCategory: any) => (
                                                <div
                                                    className='dropdown-item item-child'
                                                    onClick={() => setItemSelected({
                                                        id: subCategory.id,
                                                        name: subCategory.name
                                                    })}
                                                    key={subCategory.id}
                                                >
                                                    {subCategory.name}
                                                </div>
                                            ))
                                        }
                                    </section>
                                ))
                            }
                        </div>
                    </div>
                    {/* Dropdown Categories */}
                    <input
                        type='text'
                        name='keyword'
                        autoComplete='off'
                        placeholder='Tìm sản phẩm bạn mong muốn...'
                        onChange={(e: any) => setKeyword(e.target.value)}
                    />
                    <a className='icon-search' onClick={(e: any) => onSearch(e)}>
                        <img src='/media/images/ic-search.svg' alt='tim-kiem' title='Tìm kiếm' />
                    </a>
                </form>
                {/* Tìm kiếm */}

                {/* Giỏ hàng */}
                <div className='header-center--wrapper__item'>
                    <div className='header-cart'>
                        <Link href='/checkout'>
                            <a>
                                <img src='/media/images/ic-cart.svg' alt='Cocolux' title='Cocolux' />
                                <span className='header-cart-quantity'>{totalQuantity}</span>
                            </a>
                        </Link>
                    </div>
                    <span>Gió hàng</span>
                </div>
                {/* Giỏ hàng */}

                {/* Tài khoản */}
                <div className='header-center--wrapper__account dropdown'>
                    <div className='user-avatar'>
                        {
                            isUserLoggedIn
                                ? (
                                    <img src={user.avatar || '/media/images/ic-account.svg'} alt={user.name} title={user.name} />
                                )
                                : (
                                    <img src='/media/images/ic-account.svg' alt='avatar' title='avatar' />
                                )
                        }
                    </div>
                    {
                        isUserLoggedIn
                            ? (
                                <div className='dropdown-container'>
                                    <Link href='/my-account'>
                                        <a title={user.name}>
                                            <span className='info'>{user.name}</span>
                                            {/* <img src='/media/images/ic-sort-down.svg' /> */}
                                        </a>
                                    </Link>
                                    <div className='dropdown-menu'>
                                        <Link href='/my-account'>
                                            <a className='dropdown-item'>
                                                <img src='/media/images/ic-user.svg' alt='cocolux' />
                                                <span>Tài khoản của bạn</span>
                                            </a>
                                        </Link>
                                        <Link href='/my-account/my-order'>
                                            <a className='dropdown-item'>
                                                <img src='/media/images/ic-folder-gray.svg' alt='cocolux' />
                                                <span>Quản lý đơn hàng</span>
                                            </a>
                                        </Link>
                                        <Link href='/my-account/my-address'>
                                            <a className='dropdown-item'>
                                                <img src='/media/images/ic-location-gray.svg' alt='cocolux' />
                                                <span>Địa chỉ giao hàng</span>
                                            </a>
                                        </Link>
                                        <Link href='/'>
                                            <a className='dropdown-item' onClick={() => onSignOut()}>
                                                <img src='/media/images/ic-logout-gray.svg' alt='cocolux' />
                                                <span>Đăng xuất</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                            : (
                                <div className='not-login'>
                                    <a onClick={() => onShowLoginForm()}>
                                        Đăng nhập /
                                    </a>
                                    <a onClick={() => onShowRegisterForm()}>
                                        Đăng ký
                                    </a>
                                </div>
                            )
                    }
                </div>
                {/* Tài khoản */}

                <div className='header-center--wrapper__item item-hotline'>
                    <img src='/media/images/img_hotline.svg' alt='cocolux' title='cocolux' />
                    <span>Hỗ trợ <br />khách hàng</span>
                </div>
            </div >
            <div className='toolbar'>
                <div className='btn-group'>
                    <Link href='/home-page' as='/'>
                        <a
                            className={`${pathName === '/home-page' ? 'active' : ''}`}
                        >
                            <img src='/media/icons/home_sp.svg' alt='cocolux' />
                            Trang chủ
                        </a>
                    </Link>
                    <Link href='/deal-hot'>
                        <a
                            className={`${pathName === '/deal-hot' ? 'active' : ''}`}
                        >
                            <img src='/media/icons/box_sp.svg' alt='cocolux' />
                            Ưu đãi
                        </a>
                    </Link>
                    <Link href='/blog'>
                        <a
                            className={`${pathName === '/blog' ? 'active' : ''}`}
                        >
                            <img src='/media/icons/newspaper_sp.svg' alt='cocolux' />
                            Xu hướng
                        </a>
                    </Link>
                    {
                        isUserLoggedIn
                            ? (
                                <Link href='/my-account'>
                                    <a
                                        className={`${pathName === '/my-account' ? 'active' : ''}`}
                                    >
                                        <img src='/media/icons/user_sp.svg' alt='cocolux' />
                                        Cá nhân
                                    </a>
                                </Link>
                            )
                            : (
                                <a onClick={() => { onShowLoginForm(); }}>
                                    <img src='/media/icons/user_sp.svg' alt='cocolux' />
                                    Cá nhân
                                </a>
                            )
                    }

                </div>
            </div>
        </div >
    );
};

export default HeaderCenter;
