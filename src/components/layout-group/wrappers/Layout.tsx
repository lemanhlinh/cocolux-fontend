import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Modules
import { ConfigAPI } from 'src/helpers/services';
import { Storage } from 'src/helpers/utilities';
import { Popup } from 'src/components/base-group';

// Components
import { HeaderBottom, HeaderCenter, HeaderTop, Footer } from 'src/components/layout-group';
import { LoginModal, UserAddressModal, ChangePhoneModal, ModalForgotPassword, ModalRegister, ModalUserActive } from 'src/components/modal-group';

const Layout: React.FC<any> = ({ children }) => {
    const [popup, setPopup] = useState<any>({});
    const [className, setClassName] = useState<string>('');
    const [popupSize, setPopupSize] = useState<any>({ w: 0, h: 0 });
    const mobileDevices = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i;
    const { loginModal, userAddressModal, changePhoneModal, forgotPasswordModal, userActiveModal } = useSelector((state: any) => state.layout);

    const onShowMenuHover = () => {
        const navItem = document.querySelectorAll('.header-bottom--left__content .header-bottom--left__item');
        const maskLayout = document.querySelector('.mask-layout') as any;
        navItem.forEach((e) => {
            e.addEventListener('mouseenter', () => {
                maskLayout.classList.add('show');
            });
            e.addEventListener('mouseleave', () => {
                maskLayout.classList.remove('show');
            });
        });
    };

    const onShowBackButton = () => {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            const toTopBtn = document.querySelector('.coco-floating-icons__wrapper--scrolltop') as any;
            if (scrollPos > 686) {
                toTopBtn.style.display = 'block';
            } else {
                toTopBtn.style.display = 'none';
            }
        });
    };

    const onFetchPopup = async () => {
        await ConfigAPI.listBanner({
            skip: 0,
            limit: 1,
            types: ConfigAPI.BANNER_HOME_V1_POPUP
        }).then((respone: any) => {
            if (!respone.code && respone.data[0]) {
                const data = respone.data[0];
                const indexOf = Storage.get(
                    Storage.POPUP_HISTORY
                );
                const selected = indexOf
                    ? JSON.parse(indexOf)
                    : {};
                if (!selected[data.updated_at]) {
                    const operation = {} as any;
                    operation[data.updated_at] = Date.now();
                    const isMobile = mobileDevices.test(navigator.userAgent);
                    const bannerUrl = isMobile
                        ? data.mobile_url
                        : data.image_url;
                    onLoadImageSize(bannerUrl);
                    Storage.add({ key: Storage.POPUP_HISTORY, value: JSON.stringify(operation) });
                    setPopup({ visible: true, url: data.url, image_url: bannerUrl });
                }
            }
        });
    };

    /**
     * Load Image Size
     * @param url
     */
    const onLoadImageSize = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            if (img) {
                setPopupSize({
                    w: img.width,
                    h: img.height
                });
            }
        };
    };

    /**
     * Scroll Event
     * @hooks
     */
    useEffect(() => {
        onFetchPopup();
        onShowMenuHover();
        onShowBackButton();
    }, []);

    return (
        <div className='coco-page-wrapper'>

            <div className='coco-page-wrapper--header'>
                <HeaderTop />
                <HeaderCenter />
                <HeaderBottom />
            </div>
            {/* begin:: container */}
            <div className='coco-main'>
                <div className='container'>
                    {children}
                </div>
                <div className='mask-layout'></div>
            </div>
            {/* end:: container */}

            {/* begin:: footer */}
            <div id='footer' className='footer'>
                <Footer></Footer>
            </div>
            {/* end:: footer */}

            {/* begin:: floating icons */}
            <div className='coco-floating-icons__wrapper'>
                <div className='coco-floating-icons__wrapper--icons'>
                    <a href='https://www.facebook.com/cocoluxofficial' target='blank'>
                        <img src='/media/images/ic-fb-color.svg' alt='cocolux' />
                    </a>
                    <a href='http://bit.ly/cocoshopchanel' target='blank'>
                        <img src='/media/images/ic-youtube-color.svg' alt='cocolux' />
                    </a>
                    <a href='https://www.instagram.com/cocolux.vn' target='blank'>
                        <img src='/media/images/ic-insta-color.svg' alt='cocolux' />
                    </a>
                    <a href='#' target='blank'>
                        <img src='/media/images/ic-social-color.svg' alt='cocolux' />
                    </a>
                </div>
                <div className='coco-floating-icons__wrapper--scrolltop' onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }}>
                    <img alt='scroll-to-top' src='/media/images/ic-btn-to-top.svg' />
                </div>
            </div>

            {/* begin:: chatBox */}
            <div className={`coco-chatbox__wrapper ${className}`}>
                <div className={`block-chart-title ${className === 'active' ? 'clicked' : ''}`}>
                    <div
                        className='left'
                        onClick={() => {
                            if (className === '') setClassName('active');
                            else setClassName('');
                        }}
                    >
                        <span> Chat với chúng tôi</span>
                        <img src='/media/images/ic-arrowtop.svg' alt='cocolux' />
                    </div>
                    <div className='right'>
                        <img
                            onClick={() => setClassName('hidden')}
                            src='/media/images/ic-close.svg'
                            alt='cocolux' />
                    </div>
                </div>
                <div
                    className='block-chat-mess'
                    style={{ display: className === 'active' ? 'inline' : 'none' }}
                >
                    <div className='fb-page'
                        data-href='https://www.facebook.com/cocoluxofficial/'
                        data-tabs='messages'
                        data-width='250px'
                        data-height='320'
                        data-small-header='true'
                        data-adapt-container-width='true'
                        data-hide-cover='false'
                        show-facepile='true'
                    >
                        <blockquote cite='https://www.facebook.com/cocoluxofficial/' className='fb-xfbml-parse-ignore'>
                            <a href='https://www.facebook.com/cocoluxofficial/'>Coco Shop</a>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* begin:: base component */}
            <div className='toast-wrap'></div>
            {userActiveModal.visible && <ModalUserActive />}
            {userAddressModal.visible && <UserAddressModal />}
            {changePhoneModal.visible && <ChangePhoneModal />}
            {forgotPasswordModal.visible && <ModalForgotPassword />}
            {loginModal.visible && loginModal.tab === 'login' && <LoginModal />}
            {loginModal.visible && loginModal.tab === 'register' && <ModalRegister />}
            {
                popup.visible && popupSize.w && popupSize.h &&
                < Popup
                    image={{ src: popup.image_url }}
                    url={{ href: popup.url }}
                    popupSize={popupSize}
                />
            }
        </div>
    );
};

export default Layout;
