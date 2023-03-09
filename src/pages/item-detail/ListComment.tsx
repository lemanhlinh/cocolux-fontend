import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import moment from 'moment';
import * as Yup from 'yup';

// Modules
import { ItemAPI } from 'src/helpers/services';
import { Toastr } from 'src/helpers/utilities';

const CommentValidation = Yup.object().shape({
    content: Yup.string()
        .required('Vui lòng nhập nội dung câu hỏi')
});

const CommentState = {
    content: '',
    parent_id: null,
    product: null,
    is_reply: false
};

interface Props {
    product: any;
}

const ItemListComment: React.FC<Props> = ({ product }) => {
    const [isUserLoggedIn] = useState<boolean>(true);
    const [page, setPageNumber] = useState<number>(0);
    const [replyFormId, setReplyFormId] = useState<string>('');
    const [comment, setListComment] = useState<any>({ count: 0, data: [] });

    /**
     * Fetch Comment
     * @param {*} params
     */
    const fetchListComment = async () => {
        await ItemAPI.listComment({
            limit: 10,
            skip: page * 10,
            order_by: 'desc',
            sort_by: 'created_at',
            product_id: product.parent_id
        }).then((response) => {
            if (response.code) return;
            setListComment({
                count: response.count,
                data: [...comment.data, ...response.data]
            });
        }).catch((error) => {
            throw Error(error);
        });
    };

    /**
     * Create Comment
     * @param {*} values
     */
    const onCreateComment = async (values: any = {}) => {
        // perpare params
        const formValue = { ...values };
        formValue.product = {
            name: product.name,
            price: product.price,
            option_id: product.id,
            id: product.parent_id
        };
        await ItemAPI.addComment(
            formValue
        ).then((response: any) => {
            if (response.code) {
                return Toastr.error(response.message);
            }

            return Toastr.success('Gửi câu hỏi thành công');
        }).catch((error) => {
            throw Error(error);
        });
    };

    useEffect(() => {
        fetchListComment();
    }, [page]);

    return (
        <>
            {
                isUserLoggedIn
                    ? (
                        <Formik
                            enableReinitialize={true}
                            initialValues={CommentState}
                            validationSchema={CommentValidation}
                            onSubmit={(values: any = {}) => onCreateComment(values)}
                        >
                            <Form>
                                <div className='form-group'>
                                    <div className='send-question-box'>
                                        <Field
                                            type='text'
                                            name='content'
                                            placeholder='Bạn có câu hỏi với sản phẩm này? Đặt câu hỏi ngay...'
                                        />
                                        <button
                                            type='submit'
                                            className='btn btn-md btn-primary'
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                    <div className='message'>
                                        <ErrorMessage name='content' />
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    )
                    : null
            }
            {
                comment.count
                    ? (
                        comment.data.map((comment: any = {}, index: number) => (
                            <div className='list-questions' key={index}>
                                <div className='item-question'>
                                    <div className='item-parent'>
                                        <div className='title-question'>
                                            {comment.created_by.name} - {moment.unix(comment.created_at).format('DD/MM/YYYY HH:mm')}
                                        </div>
                                        <div className='content-question'>
                                            {comment.content}
                                        </div>
                                        <div className='list-actions'>
                                            <img src='/media/images/ic-btn-like.svg' alt='cocolux' />
                                            <a className='like-action'>
                                                Thích <span>0</span>
                                            </a>
                                            <a
                                                className='reply-action'
                                                onClick={() => setReplyFormId(comment.id)}
                                            >
                                                Trả lời
                                            </a>
                                        </div>
                                    </div>
                                    {
                                        comment.comments.map((comment: any = {}, index: number) => (
                                            <div className='item-parent item-child' key={index}>
                                                <div className='title-question'>
                                                    {
                                                        comment.created_by.name} - {moment.unix(comment.created_at).format('DD/MM/YYYY HH:mm')
                                                    }
                                                </div>
                                                <div className='content-question'>
                                                    {comment.content}
                                                </div>
                                                <div className='list-actions'>
                                                    <img src='/media/images/ic-btn-like.svg' alt='cocolux' />
                                                    <a className='like-action'>
                                                        Thích <span>0</span>
                                                    </a>
                                                    <a
                                                        className='reply-action'
                                                        onClick={() => setReplyFormId(comment.id)}
                                                    >
                                                        Trả lời
                                                    </a>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    replyFormId === comment.id
                                        ? (
                                            <Formik
                                                enableReinitialize={true}
                                                validationSchema={CommentValidation}
                                                initialValues={{ ...CommentState, is_reply: true, parent_id: comment.id }}
                                                onSubmit={(values: any = {}) => onCreateComment(values)}
                                            >
                                                <Form>
                                                    <div className='form-group'>
                                                        <div className='reply-question-box'>
                                                            <div>
                                                                <Field
                                                                    as='textarea'
                                                                    name='content'
                                                                    className='reply-textarea'
                                                                    placeholder='Nội dung trả lời của bạn...'
                                                                >
                                                                </Field>
                                                                <button type='submit' className='btn btn-md btn-primary'>
                                                                    Gửi
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='message'>
                                                            <ErrorMessage name='content' />
                                                        </div>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        )
                                        : null
                                }
                            </div>
                        ))
                    )
                    : (
                        <div className='item-question'>
                            <div className='item-parent'>Chưa có bình luận nào cho sản phẩm này</div>
                            <div className='content-question'>Hãy trở thành người đầu tiên bình luận cho sản phẩm này...</div>
                        </div>
                    )
            }
            {
                comment.count > 10 && comment.count > comment.data.length
                    ? (
                        <div className='external-button'>
                            <button type='button' className='btn btn-primary' onClick={() => setPageNumber(page + 1)}>
                                Xem thêm
                            </button>
                        </div>
                    ) : null
            }
        </>
    );
};

export default ItemListComment;
