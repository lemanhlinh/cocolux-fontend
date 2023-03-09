import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <div className='coco-footer-wrap'>
            <div className='flud-container'>
                <div className='footer-row'>
                    <div className='col w-20 brand-info'>
                        <div className='brand-info--logo'>
                            <img src='/media/images/logo_ccs.svg' alt='footer-logo' />
                            <img src='/media/images/logo_cocoshop.svg' alt='footer-logo' />
                        </div>
                        <div className='brand-info--content'>
                            Cocolux là hệ thống phân phối mỹ phẩm chính hãng và uy tín có quy mô hàng đầu Việt Nam.
                            Đến với Coco bạn có thể hoàn toàn yên tâm khi sẽ chọn được cho mình bộ sản phẩm phù hợp
                            và ưng ý từ các nhãn hàng nổi tiếng trên toàn thế giới.
                        </div>
                    </div>
                    <div className='col coco-policy'>
                        <div className='policy-title'>
                            VỀ COCOLUX
                        </div>
                        <div className='list-items'>
                            <Link href='/thong-tin/gioi-thieu'>
                                <a>Câu chuyện thương hiệu</a>
                            </Link>
                            <Link href='/thong-tin/gioi-thieu'>
                                <a>Về chúng tôi</a>
                            </Link>
                            <Link href='/thong-tin/gioi-thieu'>
                                <a>Liên hệ</a>
                            </Link>
                        </div>
                    </div>
                    <div className='col coco-policy'>
                        <div className='policy-title'>
                            Chính sách
                        </div>
                        <div className='list-items'>
                            <Link href='/thong-tin/dieu-khoan'>
                                <a>Điều khoản sử dụng</a>
                            </Link>
                            <Link href='/thong-tin/doi-tra'>
                                <a>Chính sách đổi trả sản phẩm</a>
                            </Link>
                            <Link href='/thong-tin/dieu-khoan'>
                                <a>Chính sách và quy định chung</a>
                            </Link>
                            <Link href='/thong-tin/giao-hang'>
                                <a>Chính sách và giao nhận thanh toán</a>
                            </Link>
                            <Link href='/thong-tin/bao-mat'>
                                <a>Chính sách bảo mật thông tin cá nhân</a>
                            </Link>
                        </div>
                    </div>
                    <div className='col coco-policy'>
                        <div className='policy-title'>
                            Coco Member
                        </div>
                        <div className='list-items'>
                            <Link href='/thong-tin/rank-khach-hang'>
                                <a>Quyền lợi thành viên</a>
                            </Link>
                            <Link href='/hoi-dap/tai-khoan'>
                                <a>Thông tin thành viên</a>
                            </Link>
                            <Link href='/my-account/my-order'>
                                <a>Theo dõi đơn hàng</a>
                            </Link>
                            <Link href='/thong-tin/dat-hang'>
                                <a>Hướng dẫn mua hàng online</a>
                            </Link>
                        </div>
                    </div>
                    <div className='col w-30 coco-lisence'>
                        <div className='fb-thumbnail'>
                            <div
                                className='fb-page'
                                data-tabs=''
                                data-width='380'
                                data-height='300'
                                data-hide-cover='false'
                                data-show-facepile='true'
                                data-small-header='false'
                                data-adapt-container-width='true'
                                data-href='https://www.facebook.com/cocoluxofficial'
                            >
                                <blockquote cite='https://www.facebook.com/cocoluxofficial' className='fb-xfbml-parse-ignore'>
                                    <a href='https://www.facebook.com/cocoluxofficial'>Cocolux</a>
                                </blockquote>
                            </div>
                        </div>
                        <div className='license-page'>
                            <div className='link-app'>
                                <img src='/media/images/QR-code-appstore.png' alt='cocolux' />
                                <div className='app-box'>
                                    <a href='https://apps.apple.com/us/app/cocolux/id1529709256' target='_blank'>
                                        <img src='/media/images/ic-appstore.svg' alt='cocolux' />
                                        <span> App Store</span>
                                    </a>
                                    <a href='https://play.google.com/store/apps/details?id=com.cocoshop.android' target='_blank'>
                                        <img src='/media/images/ic-googleplay.svg' alt='cocolux' />
                                        <span> Google Play</span>
                                    </a>
                                </div>
                            </div>
                            <div className='license-image'>
                                <div className='img'>
                                    <img src='/media/images/BCT-noi-khong-voi-hang-gia.png' />
                                </div>
                                <div className='img'>
                                    <img src='/media/images/bo-cong-thuong.svg' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-row'>
                    <div className='col w-20 copyright-info'>
                        <span className='title'>Cocolux.com thuộc bản quyền của Cocolux - Hệ thống phân phối mỹ phẩm chính hãng</span>
                        <Link href='/thong-tin/cua-hang'>
                            <a>Hệ thống cửa hàng của Cocolux</a>
                        </Link>
                        <a href='https://cocolux.com/'>Website: https://cocolux.com</a>
                        <a href='tel:+84988888825'>Hotline: +84-988888825</a>
                        <a href='mailto:cskh@Cocolux.vn'>Email: cskh@cocolux.com</a>
                    </div>
                    <div className='col social-box'>
                        <div className='box'>
                            <div className='box--title'>Kết nối</div>
                            <div className='box--icons'>
                                <a href='https://www.facebook.com/cocoluxofficial' target='blank'>
                                    <img src='/media/images/ic-facebook.svg' alt='cocolux' />
                                </a>
                                <a href='https://www.instagram.com/cocolux.vn' target='blank'>
                                    <img src='/media/images/ic-insta.svg' alt='cocolux' />
                                </a>
                                <a href='http://bit.ly/cocoshopchanel' target='blank'>
                                    <img src='/media/images/ic-youtube.svg' alt='cocolux' />
                                </a>
                                <a
                                    href='https://www.tiktok.com/@cocolux.com?lang=vi-VN'
                                    className='ic-invert'
                                    target='blank'
                                >
                                    <img src='/media/images/ic-tiktok.svg' alt='cocolux' />
                                </a>
                                <a className='ic-invert ic-zalo' target='blank'>
                                    <img src='/media/images/ic-zalo.svg' alt='cocolux' />
                                </a>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='box--title'>Phương thức thanh toán</div>
                            <div className='box--icons ic-payments'>
                                <a>
                                    <img src='/media/images/ic-cash.svg' alt='cocolux' />
                                </a>
                                <a>
                                    <img src='/media/images/ic-internet-banking.svg' alt='cocolux' />
                                </a>
                                <a>
                                    <img src='/media/images/ic-visa.svg' alt='cocolux' />
                                </a>
                                <a>
                                    <img src='/media/images/ic-mastercard.svg' alt='cocolux' />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='col w-30 register-box'>
                        <div className='box title'>
                            Đăng ký nhận bản tin
                        </div>
                        <div className='box subtitle'>
                            Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn
                        </div>
                        <div className='box registration'>
                            <input
                                type='email'
                                name='email'
                                autoComplete='off'
                                placeholder='Vui lòng nhập email của bạn'
                            />
                            <button type='button' className='btn btn-dark'>
                                ĐĂNG KÝ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
