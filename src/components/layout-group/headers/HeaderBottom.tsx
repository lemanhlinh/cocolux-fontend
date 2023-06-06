import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';

// Form
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Modules
import { Utilities } from 'src/helpers/utilities';

export const HeaderBottom: React.FC = () => {
    // Declarations Router
    const router = useRouter();
    const pathName = router.pathname;
    const queryParams = router.query;
    const { categories } = useSelector((state: any) => state.layout);
    const { config } = useSelector((state: any) => state.config);

    useEffect(() => {
        showHideSubMenu();
    }, []);

    const showHideSubMenu = () => {
        const dropdown = document.querySelector(
            '.header-bottom--left__dropdown'
        );
        const dropdownLinks = document.querySelectorAll(
            '.header-bottom--left__dropdown a'
        );
        dropdownLinks.forEach((item) => {
            item.addEventListener('click', () => {
                dropdown?.classList.add('hide');
            });
        });
        (dropdown as any).addEventListener('mouseenter', () => {
            dropdown?.classList.remove('hide');
        });
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

    return (
        <div className={`header-bottom ${pathName === '/home-page' ? 'coco-active-dropdown' : null}`}>
            <div className='container'>
                {/* begin:: menu left */}
                <div className='header-bottom--left'>
                    <div className='header-bottom--left__dropdown'>
                        <div className='hamburger'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span>DANH MỤC SẢN PHẨM</span>
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
                </div>
                {/* end:: menu left */}

                {/* begin:: menu right */}
                <div className={'header-bottom--right'}>
                    <div className='header-bottom--right__dropdown'>
                        <Link href='/about-us/gioi-thieu' as='/thong-tin/gioi-thieu'>
                            <a>Giới thiệu</a>
                        </Link>
                    </div>
                </div>
                <div className={'header-bottom--right'}>
                    <div className='header-bottom--right__dropdown'>
                        <Link href='/thuong-hieu' as='/thuong-hieu'>
                            <a>Thương hiệu</a>
                        </Link>
                    </div>
                </div>
                <div className={'header-bottom--right'}>
                    <div className='header-bottom--right__dropdown'>
                        <a>Khuyến mại</a>
                        <div className='header-bottom--right__item header-bottom--right__menu'>
                            <Link href='/deal-hot'>
                                <a className='header-bottom-right__a'>Hot Deals</a>
                            </Link>
                            <Link href='/flash-sale'>
                                <a className='header-bottom-right__a'>Flash Deals</a>
                            </Link>
                            <Link href='/deal-now'>
                                <a className='header-bottom-right__a'>Đang diễn ra</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='header-bottom--right'>
                    <div className='header-bottom--right__dropdown'>
                        <Link href='/hot-new' as='/hang-moi-ve'>
                            <a>Hàng mới về</a>
                        </Link>
                    </div>
                </div>
                <div className='header-bottom--right'>
                    <div className='header-bottom--right__dropdown'>
                        <Link
                            href={`/blog`}
                            as={`/blog`}
                        >
                            <a>Xu hướng làm đẹp</a>
                        </Link>
                    </div>
                </div>
                <div className='header-bottom--right ml-auto'>
                    <div className='header-bottom--right__dropdown'>
                        <span className='cc-icon cc-smartphone'>
                            <img src='/media/images/smartphone-call.svg' alt='cocolux' />
                        </span>
                        <a>Tải ứng dụng</a>
                        <div className='header-bottom--right__item header-bottom--right__app'>
                            <div>
                                <img src='/media/images/QR-code-appstore.png' alt='cocolux' />
                                <div className='coco-mdxw-list-app_icon'>
                                    <a href='https://apps.apple.com/us/app/cocolux/id1529709256' target='_blank'>
                                        <img src='/media/images/ic-appstore-black.svg' alt='cocolux' />
                                        <span> App Store</span>
                                    </a>
                                    <a href='https://play.google.com/store/apps/details?id=com.cocoshop.android' target='_blank'>
                                        <img src='/media/images/ic-googleplay-black.svg' alt='cocolux' />
                                        <span> Google Play</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'header-bottom--right'}>
                    <Formik
                        initialValues={{
                            code: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                code: Yup.string()
                                    .required('Vui lòng nhập mã đơn hàng')
                            })
                        }
                        onSubmit={
                            value => window.location.replace(`/my-account/my-order/${value.code}`)
                        }
                    >
                        <Form>
                            <div className='header-bottom--right__dropdown'>
                                <a>Tra cứu đơn hàng</a>
                                <div className='header-bottom--right__item header-bottom--right__tracking'>
                                    <div>
                                        <div className='form-group'>
                                            <div className='form-input'>
                                                <Field
                                                    type='text'
                                                    name='code'
                                                    autoComplete='off'
                                                    className='ccs-input'
                                                    placeholder='Nhập mã đơn hàng'
                                                />
                                                <div className='message'>
                                                    <ErrorMessage name='code' />
                                                </div>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn btn-secondary w-100'>
                                            Kiểm tra đơn hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>

                </div>
                {/* end:: menu right */}
            </div>
        </div>
    );
};

export default HeaderBottom;
