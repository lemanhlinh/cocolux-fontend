import React, { useState } from 'react';
import { isNil } from 'lodash';
import $ from 'jquery';

interface Props {
    title: string;
    content: string;
    maxHeight: number;
    className?: string;
}

export const BoxContent: React.FC<Props> = ({ title, content, maxHeight, className }) => {
    const [isLoadHeight, setLoadHeight] = useState<boolean>(true);
    const [contentClass, setContentClass] = useState<string>('');

    /**
     * Get Content Height
     * @private
     */
    const onGetContentHeight = () => {
        const content = $(`#inner-content-${className}`) as any;
        if (content) {
            const height = content.height() as number;
            if (height && height > maxHeight) {
                setContentClass('collapse');
            } else {
                setContentClass('');
            }
        }
    };

    /**
     * Render String To Html
     * @param {*} content
     */
    const renderStringToHtml = (content: string) => {
        const newContent = content || `<span class='no-content'>Không có nội dung hiển thị.</span>`;
        return { __html: newContent };
    };

    return (
        <div className={`coco-box-content ${className}`}>
            <div className='separator-left'></div>
            <div className='main__content'>
                {/*
                    <div className='title__content'>
                        {title || 'COCOLUX'}
                    </div>
                */}
                <div
                    className={`content-desciption ${contentClass === 'collapse' ? 'mask-content' : ''}`}
                    style={{ maxHeight: contentClass === 'collapse' ? `${maxHeight}px` : '100%' }}
                >
                    <div
                        id={`inner-content-${className}`}
                        className='ck-content'
                        dangerouslySetInnerHTML={renderStringToHtml(content)}
                        ref={(element: any) => {
                            if (!isNil(element) && element?.clientHeight > 0 && isLoadHeight) {
                                onGetContentHeight();
                            }
                        }}
                    />
                </div>
                {
                    contentClass
                        ? (
                            <div className='footer-end-content'>
                                <button
                                    className={`btn btn-expand-content ${contentClass === 'collapse' ? 'ic-flip' : ''}`}
                                    onClick={() => {
                                        setLoadHeight(!isLoadHeight);
                                        if (contentClass === 'expand') {
                                            setContentClass('collapse');
                                        } else {
                                            setContentClass('expand');
                                        }
                                    }}
                                >
                                    <span>
                                        {
                                            contentClass === 'collapse'
                                                ? 'Xem thêm'
                                                : 'Thu gọn'
                                        }
                                    </span>
                                    <img src='/media/icons/chevron-double-up.svg' alt='cocolux' />
                                </button>
                            </div>
                        ) : null
                }
            </div>
        </div>
    );
};
