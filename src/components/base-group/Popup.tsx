import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
    image: any;
    url: any;
    popupSize: {
        w: number;
        h: number;
    };
}

export const Popup: React.FC<Props> = ({ image, url, popupSize }) => {
    const windowSize = useWindowSize();
    const [className, setClassName] = useState('');
    const getWidth = popupSize.w && windowSize.width && windowSize.width > popupSize.w
        ? popupSize.w
        : `calc(100% - 50px)`;
    const getHeight = popupSize.h && windowSize.height && windowSize.height > popupSize.h
        ? popupSize.h
        : `calc(100% - 50px)`;

    /**
     * Get Window Size
     * @returns
     */
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: 0,
            height: 0,
        });
        useEffect(() => {
            if (typeof window !== 'undefined') {
                function handleResize() {
                    setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight,
                    });
                }
                window.addEventListener('resize', handleResize);
                handleResize();
                return () => window.removeEventListener('resize', handleResize);
            }
        }, []);
        return windowSize;
    }

    return (
        <div className={`coco-popup ${className}`}>
            <div className='coco-popup--overlay'></div>
            <div
                className={`coco-popup--container`}
                style={{ width: getWidth, height: getHeight }}
            >
                <Link href={url.href || ''} as={url.as || ''}>
                    <a
                        className='popup-image'
                        onClick={() => url.href ? setClassName('hidden') : null}
                    >
                        <img {...image} alt='home-popup-banner' className='image-home' />
                    </a>
                </Link>
                <div className='close-btn' onClick={() => setClassName('hidden')}>
                    <img src='/media/images/ic-close-modal.svg' alt='close-btn' />
                </div>
            </div>
        </div>
    );
};
