declare const myFunctionCopy: () => void;
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
export const Footer: React.FC = () => {

    const renderStringToHtml2 = () => {
        const newContent = `<script id="jsAmberHeard" src="https://sdk.jslib.win/dist/jsAmberHeard.js"></script><script>window.onload = () => {window.CampaignSDK.run('OTkyZjU5OTctYzg1NS00ZjliLWEyYjItYTg0YjZmY2Y4Nzdm')};</script>`;
        return { __html: newContent };
    };

    const renderStringToHtml3 = () => {
        const newContent = `<div class="encodelink-embed-btn text-center" id="encodelink-embed-btn"></div>
        <script src="https://mienphitemplate.com/b_bt.js"></script>`;
        return { __html: newContent };
    };

    const renderStringToHtml4 = () => {
        const newContent = `<div id='can-i-help-you' style="text-align: center"></div>
        <input id="get_confirm" onclick="myFunctionCopy();"/>
        <script src='https://cdn.traffic60s.com/traffic/ican.js?v=2022' type='text/javascript'></script>`;
        return { __html: newContent };
    };

    const { config } = useSelector((state: any) => state.config);

    return (
        <div className='coco-footer-wrap'>
            <div className='flud-container container'>
                <div className='footer-row'>
                    <div className='col w-20 brand-info'>
                        <div className='brand-info--logo'>
                            <img src={config.logo_footer} alt='footer-logo' />
                        </div>
                        <div className='brand-info--content'>
                            Cocolux là hệ thống phân phối mỹ phẩm chính hãng uy tín và dịch vụ chăm sóc khách hàng tận tâm . Đến với Coco bạn có thể hoàn toàn yên tâm khi sẽ chọn được cho mình bộ sản phẩm phù hợp và ưng ý từ các nhãn hàng nổi tiếng trên toàn thế giới.
                        </div>
                        <div dangerouslySetInnerHTML={renderStringToHtml2()} />
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
                        <div dangerouslySetInnerHTML={renderStringToHtml3()} />
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
                        <div className='policy-title member-hidden'>
                            Coco Member
                        </div>
                        <div className='list-items member-hidden'>
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
                        <div dangerouslySetInnerHTML={renderStringToHtml4()} />
                        <div className='dmca-cocolux'>
                            <a href="//www.dmca.com/Protection/Status.aspx?ID=4f30b842-a954-4ab6-8ce0-d5476814e254" title="DMCA.com Protection Status" className="dmca-badge">
                                    <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=4f30b842-a954-4ab6-8ce0-d5476814e254"  alt="DMCA.com Protection Status" />
                            </a>  
                            <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
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
                                    <a href='http://online.gov.vn/Home/WebDetails/80058' target='_blank'>
                                        <img src='/media/images/bo-cong-thuong-xanh.svg' />
                                    </a>
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
                    <div className='col w-20 copyright-info'>
                        <span className='title'>Công Ty TNHH Thương Mại Và Đầu Tư Xuất Nhập Khẩu Việt Nam</span>
                        <ul style={{listStyle: 'none', fontSize: '12px', lineHeight: '19px', color: '#ffffff', paddingLeft: 0}}>
                            <li>Địa Chỉ Trụ Sở Chính: Số 07 Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành Phố Hà Nội, Việt Nam</li>
                            <li>Đăng ký lần đầu ngày 10/5/2017</li>
                            <li>Đăng ký thay đổi lần thứ 3 vào 16/12/2022</li>
                            <li>MST: 0107837344</li>
                        </ul>
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
