export const LAYOUT_CONFIG = 'layout_config';
export const LAYOUT_LANGUAGE = 'layout_language';
export const ACCESS_TOKEN = 'access_token';
export const EXPIRED_TOKEN = 'expired_token';
export const REFRESH_TOKEN = 'refresh_token';
export const CSRF_TOKEN = 'csrftoken';
export const CLIENT_ID = 'client_id';


export const LAYOUT_MENU_CONFIG = [
    {
        as: '/',
        href: '/home',
        active: '/home',
        name: 'Trang chủ',
        icon: null,
        type: 'menu',
        sub_menus: []
    },
    {
        as: '/new-arrival',
        href: '/new-arrival',
        active: '/new-arrival',
        name: 'New Arrival',
        icon: null,
        type: 'menu',
        sub_menus: []
    },
    {
        as: '/best-seller',
        href: '/best-seller',
        active: '/best-seller',
        name: 'Best Seller',
        icon: null,
        type: 'menu',
        sub_menus: []
    },
    {
        as: '/best-seller',
        href: '/best-seller',
        active: '/category',
        name: 'Sản phẩm',
        icon: null,
        type: 'menu',
        sub_menus: [
            {
                as: '/danh-muc/co-nang-cong-so-i.2',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-cong-so-i.2' } },
                name: 'Cô nàng công sở',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/vay-lien-i.9',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-lien-i.9' } },
                        name: 'Váy liền',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/so-mi-i.10',
                        href: { pathname: '/category/[slug]', query: { slug: 'so-mi-i.10' } },
                        name: 'Sơ mi',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/chan-vay-i.11',
                        href: { pathname: '/category/[slug]', query: { slug: 'chan-vay-i.11' } },
                        name: 'Chân váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/blazer-i.12',
                        href: { pathname: '/category/[slug]', query: { slug: 'blazer-i.12' } },
                        name: 'Blazer',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/quan-i.13',
                        href: { pathname: '/category/[slug]', query: { slug: 'quan-i.13' } },
                        name: 'Quần',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/jumpsuit-i.14',
                        href: { pathname: '/category/[slug]', query: { slug: 'jumpsuit-i.14' } },
                        name: 'Jumpsuit',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-dao-pho-i.5',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-dao-pho-i.5' } },
                name: 'Cô nàng dạo phố',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/vay-co-tay-i.15',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-co-tay-i.15' } },
                        name: 'Váy có tay',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-hai-day-i.16',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-hai-day-i.16' } },
                        name: 'Váy hai dây',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-ho-vai-i.17',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-ho-vai-i.17' } },
                        name: 'Váy hở vai',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-i.18',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-i.18' } },
                        name: 'Áo',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/chan-vay-i.19',
                        href: { pathname: '/category/[slug]', query: { slug: 'chan-vay-i.19' } },
                        name: 'Chân váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/quan-i.20',
                        href: { pathname: '/category/[slug]', query: { slug: 'quan-i.20' } },
                        name: 'Quần',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/jumpsuit-i.21',
                        href: { pathname: '/category/[slug]', query: { slug: 'jumpsuit-i.21' } },
                        name: 'Jumpsuit',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-phong-i.22',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-phong-i.22' } },
                        name: 'Áo phông',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-mua-dong-i.6',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-mua-dong-i.6' } },
                name: 'Cô nàng mùa đông',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/ao-khoac-i.23',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-khoac-i.23' } },
                        name: 'Áo khoác',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-len-i.24',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-len-i.24' } },
                        name: 'Áo len',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-am-i.25',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-am-i.25' } },
                        name: 'Váy ấm',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/quan-i.26',
                        href: { pathname: '/category/[slug]', query: { slug: 'quan-i.26' } },
                        name: 'Quần',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/chan-vay-i.27',
                        href: { pathname: '/category/[slug]', query: { slug: 'chan-vay-i.27' } },
                        name: 'Chân váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/phu-kien-i.28',
                        href: { pathname: '/category/[slug]', query: { slug: 'phu-kien-i.28' } },
                        name: 'Phụ kiện',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-tiec-tung-i.4',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-tiec-tung-i.4' } },
                name: 'Cô nàng tiệc tùng',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/vay-co-tay-i.29',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-co-tay-i.29' } },
                        name: 'Váy có tay',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-hai-day-i.30',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-hai-day-i.30' } },
                        name: 'Váy hai dây',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-ho-vai-i.31',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-ho-vai-i.31' } },
                        name: 'Váy hở vai',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-i.32',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-i.32' } },
                        name: 'Áo',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/chan-vay-i.33',
                        href: { pathname: '/category/[slug]', query: { slug: 'chan-vay-i.33' } },
                        name: 'Chân váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-khoac-long-i.34',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-khoac-long-i.34' } },
                        name: 'Áo khoác lông',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-du-lich-i.7',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-du-lich-i.7' } },
                name: 'Cô nàng du lịch',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/vay-maxi-i.36',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-maxi-i.36' } },
                        name: 'Váy maxi',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-midi-i.37',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-midi-i.37' } },
                        name: 'Váy midi',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-mini-i.38',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-mini-i.38' } },
                        name: 'Váy mini',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-i.39',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-i.39' } },
                        name: 'Áo',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/chan-vay-i.40',
                        href: { pathname: '/category/[slug]', query: { slug: 'chan-vay-i.40' } },
                        name: 'Chân váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/quan-i.41',
                        href: { pathname: '/category/[slug]', query: { slug: 'quan-i.41' } },
                        name: 'Quần',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-truyen-thong-i.3',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-truyen-thong-i.3' } },
                name: 'Cô nàng truyền thống',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/ao-dai-cach-tan-i.43',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-dai-cach-tan-i.43' } },
                        name: 'Áo dài cách tân',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-dai-truyen-thong-i.44',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-dai-truyen-thong-i.44' } },
                        name: 'Áo dài truyền thống',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-i.45',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-i.45' } },
                        name: 'Váy',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/khac-i.46',
                        href: { pathname: '/category/[slug]', query: { slug: 'khac-i.46' } },
                        name: 'Khác',
                        icon: null,
                    }
                ]
            },
            {
                as: '/danh-muc/co-nang-o-nha-i.8',
                href: { pathname: '/category/[slug]', query: { slug: 'co-nang-o-nha-i.8' } },
                name: 'Cô nàng ở nhà',
                icon: null,
                sub_menus: [
                    {
                        as: '/danh-muc/pijama-i.47',
                        href: { pathname: '/category/[slug]', query: { slug: 'pijama-i.47' } },
                        name: 'Pijama',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/ao-phong-i.48',
                        href: { pathname: '/category/[slug]', query: { slug: 'ao-phong-i.48' } },
                        name: 'Áo phông',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/vay-mac-nha-i.49',
                        href: { pathname: '/category/[slug]', query: { slug: 'vay-mac-nha-i.49' } },
                        name: 'Váy mặc nhà',
                        icon: null,
                    },
                    {
                        as: '/danh-muc/quan-i.50',
                        href: { pathname: '/category/[slug]', query: { slug: 'quan-i.50' } },
                        name: 'Quần',
                        icon: null,
                    }
                ]
            }
        ]
    },
    {
        as: '/bo-suu-tap',
        href: '/collection',
        active: '/collection',
        name: 'Collection',
        icon: null,
        type: 'menu',
        sub_menus: []
    },
    {
        as: '/gioi-thieu',
        href: '/about/introduction',
        active: '/about',
        name: 'Giới thiệu',
        icon: null,
        type: 'menu',
        sub_menus: []
    },
];

export const LAYOUT_STORE_CONFIG = [
    {
        name: 'LÉP HÀ NỘI',
        image: './images/bg-store-hn.jpg',
        menus: [
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '244 Bà Triệu | 0398 841 816',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '128 Cầu Giấy | 0373 649 691',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '102C1 Phạm Ngọc Thạch | 0376 568 516',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '280 Nguyễn Trãi | 0963 494 280',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: 'Tầng 2, Ô 27, TTTM Ocean Park | 0986 455 476',
            },
        ]
    },
    {
        name: 'LÉP TỈNH',
        image: './images/bg-store-dn.jpg',
        menus: [
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: 'B13 Đường 2/9, Q.Hải Châu, Đà Nẵng | 0965 997 785',
            }
        ]
    },
    {
        name: 'LÉP HCM',
        image: './images/bg-store-hcm.jpg',
        menus: [
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '200A CMT8, Q.3 | 0975 288 458',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '285 Nguyễn Trãi, Q.1 | 0986 163 086',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '191 Quang Trung, Q.Gò Vấp | 0963 498 562',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '108 Nguyễn Gia Trí, Q.Bình Thạnh | 0962 992 416',
            },
            {
                as: '/gioi-thieu/danh-sach-chi-nhanh',
                href: '/about/store',
                name: '555 Nguyễn Thị Thập, Q.7 | 0986 350 310',
            }
        ]
    }
];

export const LAYOUT_FOOTER_CONFIG = [
    {
        name: 'CHI NHÁNH',
        menus: [
            {
                as: '/gioi-thieu/ve-chung-toi',
                href: '/about/introduction',
                name: 'Giới thiệu',
            },
            {
                as: '/gioi-thieu/lien-he',
                href: '/about/contact',
                name: 'Liên hệ',
            },
            {
                as: '/gioi-thieu/chi-nhanh',
                href: '/about/store',
                name: 'Chi nhánh',
            },
            {
                as: '/blog',
                href: '/article',
                name: 'Tin tức',
            },
        ]
    },
    {
        name: 'ĐIỀU KHOẢN',
        menus: [
            {
                as: '/gioi-thieu/dieu-khoan-su-dung',
                href: '/about/policy',
                name: 'Điều khoản sử dụng',
            },
            {
                as: '/gioi-thieu/doi-tra-hang',
                href: '/about/return',
                name: 'Chính sách đổi trả',
            },
            {
                as: '/gioi-thieu/chinh-sach-giao-hang',
                href: '/about/delivery',
                name: 'Chính sách giao hàng',
            },
            {
                as: '/gioi-thieu/chinh-sach-bao-mat',
                href: '/about/privacy',
                name: 'Chính sách bảo mật thông tin',
            }
        ]
    },
    {
        name: 'LEP MEMBER',
        menus: [
            {
                as: '/gioi-thieu/quyen-loi-thanh-vien',
                href: '/about/member',
                name: 'Quyền lợi thành viên',
            },
            {
                as: '/gioi-thieu/thong-tin-thanh-vien',
                href: '/about/account',
                name: 'Thông tin thành viên',
            },
            {
                as: '/order/tracking',
                href: '/order/tracking',
                name: 'Theo dõi đơn hàng',
            },
            {
                as: '/gioi-thieu/huong-dan-dat-hang',
                href: '/about/order',
                name: 'Hướng dẫn mua hàng',
            }
        ]
    }
];

export const LAYOUT_404_CONFIG = {
    categories: [
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/kem-chong-nang-i.121',
            icon: '/media/icons/ic-kem-chong-nang.svg',
            name: 'Kem Chống Nắng'
        },
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/sua-rua-mat-i.108',
            icon: '/media/icons/ic-sua-rua-mat.svg',
            name: 'Sữa Rửa Mặt'
        },
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/mat-na-i.116',
            icon: '/media/icons/ic-mat-na.svg',
            name: 'Mặt Nạ'
        },
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/tay-trang-i.107',
            icon: '/media/icons/ic-tay-trang.svg',
            name: 'Tẩy Trang'
        },
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/son-moi-lips-i.98',
            icon: '/media/icons/ic-sua-rua-mat.svg',
            name: 'Son Môi'
        },
        {
            href: '/danh-muc/[slug]',
            as: '/danh-muc/duong-da-i.110',
            icon: '/media/icons/ic-duong-da.svg',
            name: 'Dưỡng Da'
        }
    ],
    brands: [
        {
            href: '/thuong-hieu/[slug]',
            as: '/thuong-hieu/la-roche-posay-i.100',
            icon: '/media/images/brand-la-roche-posay.jpg',
            name: 'LA ROCHE POSAY'
        },
        {
            href: '/thuong-hieu/[slug]',
            as: `/thuong-hieu/l'oreal-i.276`,
            icon: '/media/images/brand-loreal.png',
            name: `L'OREAL`
        },
        {
            href: '/thuong-hieu/[slug]',
            as: '/thuong-hieu/bioderma-i.349',
            icon: '/media/images/brand-bioderma.jpeg',
            name: 'BIODERMA'
        },
        {
            href: '/thuong-hieu/[slug]',
            as: '/thuong-hieu/3ce-i.347',
            icon: '/media/images/brand-3ce.jpg',
            name: '3CE'
        },
        {
            href: '/thuong-hieu/[slug]',
            as: '/thuong-hieu/black-rouge-i.290',
            icon: '/media/images/brand-black-rouge.jpeg',
            name: 'Black Rouge'
        },
        {
            href: '/thuong-hieu/[slug]',
            as: '/thuong-hieu/vichy-i.257',
            icon: '/media/images/brand-vichy.png',
            name: 'Vichy'
        }
    ],
    keywords: [
        'Kem Chồng Nắng SJM',
        'Sửa Rửa Mặt Cerave',
        `Nước Tẩy Trang L'Oreal`,
        'Sữa Rửa Mặt Cosrx',
        'The Ordinary',
        'Son Black Rouge',
        'Sữa Tắm Cá Ngựa'
    ]
};

export const ITEM_LIST_TAB = [
    {
        id: 1,
        name: 'Mô tả sản phẩm',
        scrollTo: 'tab_mo_ta',
        content: null
    },
    {
        id: 2,
        name: 'Thành phần',
        scrollTo: 'tab_content_2',
        content: null
    },
    {
        id: 3,
        name: 'Công dụng',
        scrollTo: 'tab_content_3',
        content: null
    },
    {
        id: 4,
        name: 'Cách dùng',
        scrollTo: 'tab_content_4',
        content: null
    },
    {
        id: 5,
        name: 'Review',
        scrollTo: 'tab_content_5',
        content: null
    },
    {
        id: 6,
        name: 'Cách phân biệt thật giả',
        scrollTo: 'tab_content',
        content: null
    },
];
