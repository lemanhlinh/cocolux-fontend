import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import * as Yup from 'yup';
import $ from 'jquery';

// Modules
import { Toastr } from 'src/helpers/utilities';
import { addLoginForm } from 'src/stores/layout';
import { ItemAPI, UploadAPI } from 'src/helpers/services';

interface Props {
    product: any;
    rating_average: number;
}

const RatingValidation = Yup.object().shape({
    rating: Yup.string()
        .required('Bạn chưa chọn đánh giá.'),
    content: Yup.string()
        .required('Vui lòng nhập nội dung đánh giá của bạn.')
});

const RatingState = {
    rating: 0,
    content: '',
    product: {}
};

const ItemListStartRating: React.FC<Props> = ({ product, rating_average }) => {
    const dispatch = useDispatch();
    const [isUserLoggedIn] = useState<boolean>(true);
    const [page, setPageNumber] = useState<number>(0);
    const [startRate, setStartRate] = useState<number>(0);
    const [rateMedia, setRateMedia] = useState<any[]>([]);
    const [rating, setListRating] = useState<any>({ count: 0, metric: {}, data: [] });

    /**
     * Init
     */
    useEffect(() => {
        setStartRate(0);
        setRateMedia([]);
        fetchListRating();
    }, [page]);

    /**
     * Show View
     */
    const onShowRatingView = () => {
        if (isUserLoggedIn) {
            $('html, body').animate({
                scrollTop: ($('#tab-danh-gia') as any).offset().top - 120
            }, 300);
        } else {
            dispatch(
                addLoginForm(true, 'login')
            );
        }
    };

    /**
     * Fetch Comment
     * @param {*} params
     */
    const fetchListRating = async () => {
        await ItemAPI.listRating({
            limit: 10,
            skip: page * 10,
            product_id: product.parent_id
        }).then((response) => {
            if (response.code) return;

            setListRating({
                count: response.count,
                metric: response.metric,
                data: [...rating.data, ...response.data]
            });
        }).catch((error) => {
            throw Error(error);
        });
    };

    /**
     * Sort List
     * @param {*} orderBy
     */
    const onSortRating = async (orderBy: string) => {
        await ItemAPI.listRating({
            skip: 0,
            limit: (page * 10) || 10,
            order_by: orderBy,
            sort_by: 'created_at',
            product_id: product.parent_id
        }).then((response) => {
            if (response.code) return;

            setListRating({
                count: response.count,
                metric: response.metric,
                data: [...response.data]
            });
        }).catch((error) => {
            throw Error(error);
        });
    };

    /**
     * Upload Image
     * @param {*} data
     */
    const onUploadImage = async ($event: any) => {
        if (rateMedia.length > 5) return;

        const input = $event.target;
        const formData = new FormData();
        formData.append('file', input.files[0]);
        await UploadAPI.single(
            UploadAPI.UPLOAD_PRODUCT, formData
        ).then((response) => {
            if (response.code) {
                Toastr.error(response.message);
                return false;
            }

            // handle success
            const { url } = response;
            const media = [...rateMedia];
            media.push({ type: 'image', url: url });
            setRateMedia(media);
        }).catch((error) => {
            throw Error(error);
        });
    };

    /**
     * Create
     * @param {*} values
     */
    const onCreateRating = async (values: any = {}) => {
        if (startRate === 0) {

        }

        // perpare params
        const formValue = {
            ...values,
            media: rateMedia,
            rating: startRate,
            product: {
                sku: product.sku,
                name: product.name,
                price: product.price,
                option_id: product.id,
                id: product.parent_id
            },
            product_id: product.parent_id
        };

        // submit reuquest
        await ItemAPI.addRating(
            formValue
        ).then((response: any) => {
            if (response.code) {
                return Toastr.error(response.message);
            }

            setStartRate(0);
            setRateMedia([]);
            return Toastr.success('Gửi đánh giá thành công');
        }).catch((error) => {
            throw Error(error);
        });
    };

    return (
        <>
            <div className='rating-feedback'>
                <div className='rating--box'>
                    {
                        rating_average
                            ? (
                                <div className='rating--box_point'>
                                    <span>Đánh giá trung bình</span>
                                    <span className='rating-total-point'>
                                        {rating_average}
                                    </span>
                                    <div>
                                        {
                                            [1, 2, 3, 4, 5].map((position) => {
                                                if (position <= rating_average) {
                                                    return (
                                                        <img key={position} src='/media/images/star.svg' alt='rating_average' />
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                        <span>{rating.count || 0} nhận xét</span>
                                    </div>
                                </div>
                            )
                            : null
                    }
                    <div className='rating--box_process'>
                        <div className='process-line'>
                            <span>5 sao</span>
                            <div className='countbar'>
                                <span className='count-value' style={{ width: `${Math.ceil((rating.metric.rating_5_count / rating.count) * 100)}%` }}></span>
                            </div>
                            <div className='point'>
                                <span>{rating.metric.rating_5_count || 0}</span>
                                <span>Rất hài lòng</span>
                            </div>
                        </div>
                        <div className='process-line'>
                            <span>4 sao</span>
                            <div className='countbar'>
                                <span className='count-value' style={{ width: `${Math.ceil((rating.metric.rating_4_count / rating.count) * 100)}%` }}></span>
                            </div>
                            <div className='point'>
                                <span>{rating.metric.rating_4_count || 0}</span>
                                <span>Hài lòng</span>
                            </div>
                        </div>
                        <div className='process-line'>
                            <span>3 sao</span>
                            <div className='countbar'>
                                <span className='count-value' style={{ width: `${Math.ceil((rating.metric.rating_3_count / rating.count) * 100)}%` }}></span>
                            </div>
                            <div className='point'>
                                <span>{rating.metric.rating_3_count || 0}</span>
                                <span>Bình thường</span>
                            </div>
                        </div>
                        <div className='process-line'>
                            <span>2 sao</span>
                            <div className='countbar'>
                                <span className='count-value' style={{ width: `${Math.ceil((rating.metric.rating_2_count / rating.count) * 100)}%` }}></span>
                            </div>
                            <div className='point'>
                                <span>{rating.metric.rating_2_count || 0}</span>
                                <span>Không hài lòng</span>
                            </div>
                        </div>
                        <div className='process-line'>
                            <span>1 sao</span>
                            <div className='countbar'>
                                <span className='count-value' style={{ width: `${Math.ceil((rating.metric.rating_1_count / rating.count) * 100)}%` }}></span>
                            </div>
                            <div className='point'>
                                <span>{rating.metric.rating_1_count || 0}</span>
                                <span>Rất tệ</span>
                            </div>
                        </div>
                    </div>
                    <div className='share-comment'>
                        <p>Chia sẻ cảm nghĩ của bạn về sản phẩm</p>
                        <button className='btn btn-secondary btn-lg' onClick={() => onShowRatingView()}>
                            Viết bình luận
                        </button>
                    </div>
                </div>
            </div>
            <div className='customer-review' >
                {
                    isUserLoggedIn
                        ? (
                            <Formik
                                enableReinitialize={true}
                                initialValues={RatingState}
                                validationSchema={RatingValidation}
                                onSubmit={values => onCreateRating(values)}
                            >
                                <Form>
                                    <div className='form-group'>
                                        <p className='form-label'>Đánh giá sản phẩm này *</p>
                                        <div className='rating' data-stars={startRate}>
                                            {
                                                [1, 2, 3, 4, 5].map((start, index) => (
                                                    <div className='star' data-rating={start} key={index}>
                                                        <Field
                                                            type='radio'
                                                            name='rating'
                                                            value={start}
                                                            onChange={() => setStartRate(start)}
                                                        />
                                                        <svg viewBox='0 0 14 13.315'>
                                                            <path d='M7,1.318,9.163,5.7,14,6.4,10.5,9.815l.826,4.817L7,12.359,2.674,14.633,3.5,9.815,0,6.4l4.837-.7Z' />
                                                        </svg>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='message'>
                                            <ErrorMessage name='rating' />
                                            { }
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <Field
                                            name='content'
                                            as='textarea'
                                            cols='30'
                                            rows='4'
                                            maxLength='200'
                                            placeholder='Nhập mô tả tại đây'
                                        >
                                        </Field>
                                        <div className='message'>
                                            <ErrorMessage name='content' />
                                        </div>
                                    </div>
                                    <div className='review__upload-image'>
                                        <span>Thêm ảnh sản phẩm (tối đa 5):</span>
                                        <div className='list-images'>
                                            <div style={{ margin: '0 5px' }}>
                                                {
                                                    rateMedia.map(media => (
                                                        <img
                                                            key={media.url}
                                                            src={media.url}
                                                            style={{ width: '50px', height: '50px', margin: '0 5px' }}
                                                        />
                                                    ))
                                                }
                                            </div>
                                            <label className='btn btn-danger'>
                                                <input
                                                    type='file'
                                                    name='image'
                                                    accept='image/*'
                                                    style={{ width: '0', opacity: '0' }}
                                                    onChange={e => onUploadImage(e)}
                                                />
                                                Chọn hình
                                            </label>
                                        </div>
                                    </div>
                                    <div className='review__group-buttons'>
                                        <button type='button' className='btn btn-md btn-light'>
                                            Bỏ qua
                                        </button>
                                        <button type='submit' className='btn btn-md btn-primary'>
                                            Gửi
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        )
                        : null
                }
            </div>
            <div className='content-feedback'>
                <div className='content-feedback__title'>
                    <span>{rating.count || 0} đánh giá cho sản phẩm này</span>
                    <select
                        name='country'
                        className='ccs-selectbox sort-selectbox'
                        onChange={(event: any) => onSortRating(event.target.value)}
                    >
                        <option value='desc'>Ngày tạo mới nhất</option>
                        <option value='asc'>Ngày tạo lâu nhất</option>
                    </select>

                </div>
                <div className='content-feedback__list'>
                    {
                        rating.count
                            ? (
                                rating.data.map((rating: any = {}, index: number) => (
                                    <div className='item-feedback' key={index}>
                                        <div className='feedback-info'>
                                            <div className='feedback-info--user'>
                                                {
                                                    [1, 2, 3, 4, 5].map((position) => {
                                                        if (position <= rating.rating) {
                                                            return (
                                                                <img key={position} src='/media/images/star.svg' alt='rating_average' />
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                }
                                                <span>{rating.created_by.name}</span>
                                            </div>
                                            <div className='feedback-info--timer'>
                                                {moment.unix(rating.created_at).format('DD/MM/YYYY HH:mm')}
                                            </div>
                                        </div>
                                        <div className='feedback-content'>
                                            <div className='feedback-content--title'>
                                                <span>{rating.product.name}</span>
                                                {
                                                    rating.is_buyer
                                                        ? (
                                                            <div>
                                                                <img src='/media/images/ic-shield.svg' alt='cocolux' />
                                                                Đã mua hàng online
                                                            </div>
                                                        )
                                                        : null
                                                }
                                            </div>
                                            <div className='feedback-content--comment'>
                                                {rating.content}
                                            </div>
                                        </div>
                                        <div className='feedback-image'>
                                            {
                                                rating.media.length
                                                    ? (
                                                        rating.media.map((media: any = {}, index: number) => (
                                                            <div className='item' key={index}>
                                                                <img src={media.url} alt={media.url} />
                                                            </div>
                                                        ))
                                                    )
                                                    : null
                                            }
                                        </div>
                                    </div>
                                ))
                            )
                            : (
                                <div className='item-feedback'>
                                    <div className='feedback-content'>
                                        <div className='feedback-content--title'>
                                            <span>Chưa có đánh giá nào cho sản phẩm này</span>
                                        </div>
                                        <div className='feedback-content--comment'>
                                            Hãy trở thành người đầu tiên đánh giá cho sản phẩm này...
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            {
                rating.count > 10 && rating.count > rating.data.length
                    ? (
                        <div className='external-button'>
                            <button type='button' className='btn' onClick={() => setPageNumber(page + 1)}>
                                Xem Thêm
                            </button>
                        </div>
                    ) : null
            }
        </>
    );
};

export default ItemListStartRating;
