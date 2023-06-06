import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Components
import { Breadcrumb } from 'src/components/base-group';

// Service
import { ContentAPI } from 'src/helpers/services';

interface Props {
    content?: any;
    children: any;
}

export const LayoutAbout: React.FC<Props> = ({ children, content }) => {
    const router = useRouter();
    const [listMenu, setListMenu] = useState<any>({ QUESTION: [], INFORMATION: [] });
    const [breadCums, setBreadCum] = useState<any>([]);
    const [listContent, setListContent] = useState<[]>([]);

    const handleFetchListContent = async () => {
        // Submit request
        await ContentAPI.listContent(

        ).then((res: any) => {
            setListContent(res.data || []);
        });
    };


    useEffect(() => {
        handleFetchListContent();
        // Load breadcum
        const items = [] as any;
    
        if (content?.alias) {
            items.push({
                as: `/thong-tin/${content.alias}`,
                href: '/about/[slug]',
                name: content.title
            });
        }
        setBreadCum(items as any);
    }, []);

    /**
     * Load Data
     * @private
     */
    useEffect(() => {
        const newListMenu = {
            INFORMATION: [
                {
                    name: 'Giới thiệu Cocolux',
                    link: '/thong-tin/gioi-thieu',
                    href: '/about/gioi-thieu'
                },
                {
                    name: 'Danh sách cửa hàng',
                    link: '/thong-tin/cua-hang',
                    href: '/about/cua-hang'
                },
                {
                    name: 'Khách hàng thân thiết',
                    link: '/thong-tin/khach-hang',
                    href: '/about/khach-hang'
                },
                {
                    name: 'Chính sách đổi Coco coin',
                    link: '/thong-tin/coco-coin',
                    href: '/about/coco-coin'
                },
                {
                    name: 'Cấp độ member',
                    link: '/thong-tin/rank-khach-hang',
                    href: '/about/rank-khach-hang'
                },
                {
                    name: 'Hướng dẫn đặt hàng',
                    link: '/thong-tin/dat-hang',
                    href: '/about/dat-hang'
                },
                // {
                //     name: 'Hướng dẫn đặt hàng 2H',
                //     link: '/thong-tin/dat-hang-2h',
                //     href: '/about/dat-hang-2h'
                // },
                // {
                //     name: 'Hướng dẫn thanh toán VNpay',
                //     link: '/thong-tin/thanh-toan',
                //     href: '/about/thanh-toan'
                // },
                {
                    name: 'Thẻ quà tặng Mobile gift',
                    link: '/thong-tin/qua-tang',
                    href: '/about/qua-tang'
                },
                // {
                //     name: 'Phiếu mua hàng Cocolux',
                //     link: '/thong-tin/phieu-mua-hang',
                //     href: '/about/phieu-mua-hang'
                // },
                {
                    name: 'Quy trình giao hàng',
                    link: '/thong-tin/giao-hang',
                    href: '/about/giao-hang'
                },
                {
                    name: 'Điều khoản sử dụng',
                    link: '/thong-tin/dieu-khoan',
                    href: '/about/dieu-khoan'
                },
                {
                    name: 'Chính sách đổi trả',
                    link: '/thong-tin/doi-tra',
                    href: '/about/doi-tra'
                },
                {
                    name: 'Chính sách bảo mật',
                    link: '/thong-tin/bao-mat',
                    href: '/about/bao-mat'
                }
            ],
            QUESTION: [
                {
                    name: 'Tài khoản',
                    link: '/hoi-dap/tai-khoan',
                    href: '/about/tai-khoan'
                },
                {
                    name: 'Đơn hàng tại Cocolux',
                    link: '/hoi-dap/don-hang-coco',
                    href: '/about/don-hang-coco'
                },
                {
                    name: 'Đặt hàng tại Cocolux',
                    link: '/hoi-dap/dat-hang-tai-coco',
                    href: '/about/dat-hang-tai-coco'
                },
                {
                    name: 'Phí vận chuyển',
                    link: '/hoi-dap/phi-van-chuyen',
                    href: '/about/phi-van-chuyen'
                },
                // {
                //     name: 'Vận chuyển 2H',
                //     link: '/hoi-dap/van-chuyen-2h',
                //     href: '/about/van-chuyen-2h'
                // }
            ]
        };
        setListMenu(newListMenu);
    }, []);

    return (
        <div className='layout-aboutus-wrapper'>
            <Breadcrumb
                routes={breadCums}
            />
            <div className='layout-aboutus-wrapper--top row no-margin'>
                <div className='layout-aboutus--left col-md-4 col-lg-3'>
                    <div className='title'>THÔNG TIN</div>
                    <div className='list-group-tabs'>
                        {
                            listContent.map((menu: any = {}) => (
                                <Link href={menu.alias} as={menu.alias} key={menu.alias}>
                                    <a
                                        className={`tab-item ${router.asPath === '/thong-tin/'+menu.alias ? 'active' : 'inactive'}`}
                                    >
                                        {menu.title}
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                    <div className='title mt-40'>CÂU HỎI THƯỜNG GẶP</div>
                    <div className='list-group-tabs'>
                        {
                            listMenu.QUESTION.map((menu: any = {}) => (
                                <Link href={menu.href} as={menu.link} key={menu.link}>
                                    <a
                                        className={`tab-item ${router.pathname === menu.href ? 'active' : 'inactive'}`}
                                    >
                                        {menu.name}
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className='layout-aboutus--right col-md-8 col-lg-9'>
                    {children}
                </div>
            </div>
        </div>
    );
};
