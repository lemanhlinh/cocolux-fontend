import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { isNaN } from 'lodash';

interface Props {
    perPage?: number;
    totalRecord: number;
    currentPage: number;
}

export const Pagination: React.FC<Props> = ({ totalRecord, currentPage, perPage = 30 }) => {
    const router = useRouter();
    const [pagePrev, setPagePrev] = useState(0);
    const [pageNext, setPageNext] = useState(0);
    const [pages, setListPage] = useState<any[]>([]);

    /**
     * Load Pages
     * @private
     */
    useEffect(() => {
        if (!isNaN(currentPage)) {
            let totalPage = Math.ceil(totalRecord / perPage);
            if (totalPage <= 1) totalPage = 1;

            const newPagePrev = currentPage === 1 ? 1 : currentPage - 1;
            setPagePrev(newPagePrev);

            const newPageNext = currentPage === totalPage ? totalPage : currentPage + 1;
            setPageNext(newPageNext);

            let startPage = currentPage - 2;
            if (startPage <= 1) startPage = 1;
            if (startPage >= (totalPage - 3)) startPage = totalPage - 4;

            let endPage = currentPage + 2;
            if (endPage <= 5) endPage = totalPage > 5 ? 5 : totalPage;
            if (endPage >= totalPage) endPage = totalPage;

            if (totalPage <= 5) {
                startPage = 1;
                endPage = totalPage;
            }

            const newPages = [];
            for (let i = startPage; i <= endPage; i += 1) newPages.push(i);
            setListPage([...newPages]);
        }
    }, [totalRecord, currentPage]);

    /**
     * Page Change
     * @param {*} page
     */
    const onPageChange = (page: number) => {
        const oldParams = { ...router.query };
        Router.push({ query: { ...oldParams, page } });
    };

    return (
        totalRecord >= 20
            ? (
                <div className='coco-paginate-wrap'>
                    <div className='coco-paginate-item'>
                        <a className='paginate-btn' onClick={() => onPageChange(1)}>
                            <img
                                src='/media/images/ic-paginate-skip.svg'
                                className='paginate-item--transform'
                                alt='last-prev'
                            />
                        </a>
                        <a className='paginate-btn' onClick={() => onPageChange(pagePrev)}>
                            <img
                                src='/media/images/ic-paginate-next.svg'
                                className='paginate-item--transform'
                                alt='prev'
                            />
                        </a>
                        <div className='paginate-item--child'>
                            {
                                pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={page === currentPage ? 'active' : ''}
                                    >
                                        <span>{page}</span>
                                    </button>
                                ))
                            }
                        </div>
                        <a className='paginate-btn' onClick={() => onPageChange(pageNext)}>
                            <img
                                src='/media/images/ic-paginate-next.svg'
                                alt='next'
                            />
                        </a>
                        <a className='paginate-btn' onClick={() => onPageChange(Math.ceil(totalRecord / perPage))}>
                            <img
                                src='/media/images/ic-paginate-skip.svg'
                                alt='last-next'
                            />
                        </a>
                    </div>
                </div>
            )
            : null
    );
};
