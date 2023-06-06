import { useState, useEffect } from 'react';

// Modules
import { Utilities } from 'src/helpers/utilities';
import { ProductOption } from 'src/helpers/models';

// Components
import Modal from './../../components/modal-group/BaseModal';

interface Props {
    onCallback: any;
    backgroundUrl: string;
    option: ProductOption;
    targetDefault: string;
}

const ItemPreviewImage: React.FC<Props> = ({ targetDefault, onCallback, backgroundUrl, option }) => {
    const [listImages, setImages] = useState<[]>([]);
    const [currentIndex, setIndex] = useState<number>(0);
    const [thumbnail, setThumbmail] = useState<string>('');

    useEffect(() => {
        const images = option.images.length
            ? option.images
            : [];
        if (targetDefault) {
            setThumbmail(targetDefault);
            const indexImg = images.findIndex(
                (i: any) => i === targetDefault
            );
            if (indexImg > -1) {
                setIndex(indexImg);
            }
        }
        if (images.length) {
            setImages(images as any);
        }
    }, []);

    /**
     * Next Image
     * @param index
     */
    const onNextImage = (index: number) => {
        if (listImages.length) {
            let indexOf = index;
            const totalImg = listImages.length - 1;
            if (indexOf < 0) {
                indexOf = totalImg;
            }
            if (indexOf > +totalImg) {
                indexOf = 0;
            }
            if (listImages[indexOf]) {
                setIndex(indexOf);
                setThumbmail(listImages[indexOf]);
            }
        }
    };

    return (
        <Modal visible={onCallback}>
            <div className='background-pupop' onClick={() => onCallback(false)}></div>
            <div className='modal-content modal-lg modal-preview-image'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCallback(false)}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                </div>
                <div className='modal-body'>
                    <div className='preview__left'>
                        <span
                            className='btn-left__prev'
                            onClick={() => onNextImage(currentIndex - 1)}
                        ></span>
                        <img
                            src={thumbnail}
                            alt={option.name}
                        />
                        <span
                            className='btn-left__next'
                            onClick={() => onNextImage(currentIndex + 1)}
                        ></span>
                        {
                            backgroundUrl && currentIndex === 0
                                ? (
                                    <div className='preview__left__mask'>
                                        <img
                                            alt={option.name}
                                            title={option.name}
                                            src={backgroundUrl}
                                            onError={(e: any) => {
                                                if (e && e.target && e.target.style) {
                                                    e.target.style.display = 'none';
                                                }
                                            }}
                                        />
                                    </div>
                                ) : null
                        }
                    </div>
                    <div className='preview__right'>
                        <div className='right__title'>
                            {option.name}
                        </div>
                        <div className='right__collection beautify-scroll'>
                            {
                                listImages.length
                                    ? (
                                        listImages.map((image: string, i: number) => (
                                            <div
                                                className={`collection__item ${thumbnail === image ? 'active' : ''}`}
                                                onClick={() => setThumbmail(image)}
                                                key={i}
                                            >
                                                <img
                                                    src={Utilities.resizeImage(200, image)}
                                                    alt={option.name}
                                                />
                                            </div>
                                        ))
                                    )
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div >
        </Modal >
    );
};

export default ItemPreviewImage;
