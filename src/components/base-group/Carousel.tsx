import React from 'react';
import Slider from 'react-slick';

function ButtonNext({ className, onClick }: any) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <img src='/media/images/ic-next.svg' />
        </div>
    );
}

function ButtonPreview({ className, onClick }: any) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <img
                src='/media/images/ic-next.svg'
                alt='next-icon'
            />
        </div>
    );
}

interface Props {
    type: number;
    children: any;
    display?: number;
    className?: string;
}

export const Carousel: React.FC<Props> = ({ type, display, className, children }: any) => {
    if (type === 1) {
        const horizontalSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: display || 5,
            slidesToScroll: display || 5,
            nextArrow: <ButtonNext />,
            prevArrow: <ButtonPreview />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    }
                }
            ]
        };

        return (
            <Slider {...horizontalSettings} className={className}>
                {children}
            </Slider>
        );
    }
    if (type === 2) {
        const verticalSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesPerRow: 2,
            slidesToShow: 3,
            verticalWidth: true,
            nextArrow: <ButtonNext />,
            prevArrow: <ButtonPreview />
        };

        return (
            <Slider {...verticalSettings} className={className}>
                {children}
            </Slider>
        );
    }
    if (type === 3) {
        const slideShowSettings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            nextArrow: <ButtonNext />,
            prevArrow: <ButtonPreview />
        };

        return (
            <Slider {...slideShowSettings} className={className}>
                {children}
            </Slider>
        );
    }
    if (type === 4) {
        const horizontalSettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: display || 6,
            slidesToScroll: display || 6,
            nextArrow: <ButtonNext />,
            prevArrow: <ButtonPreview />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        };

        return (
            <Slider {...horizontalSettings} className={className}>
                {children}
            </Slider>
        );
    }
    if (type === 5) {
        const horizontalSettings = {
            dots: false,
            margin: 15,
            infinite: true,
            speed: 500,
            nextArrow: <ButtonNext />,
            prevArrow: <ButtonPreview />,
            slidesToShow: display || 5,
            slidesToScroll: display || 5,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    }
                }
            ]
        };

        return (
            <Slider {...horizontalSettings} className={className}>
                {children}
            </Slider>
        );
    }
    return (
        <div>Service not supported</div>
    );
};
