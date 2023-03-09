import React, { useEffect, useState } from 'react';


// Service
import { Utilities } from 'src/helpers/utilities';
import { CampaignAPI } from 'src/helpers/services';

// Components
import Modal from './BaseModal';

interface Props {
    options: [];
    onCallback: any;
    onSelected: any;
    campaignId?: string;
    defaultOptionId: number;
}

export const CampaignGiftModal: React.FC<Props> = ({ options, onCallback, onSelected, campaignId, defaultOptionId }) => {
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [listOptions, setListOption] = useState<[]>([]);

    /**
     * Get New Options
     * @private
     */
    const onGetNewOptions = () => {
        setListOption(options);
        if (campaignId) {
            setLoading(true);
            CampaignAPI.copy(
                campaignId
            ).then((res: any) => {
                if (res.code) return;
                if (res && res.data) {
                    const { applied_options } = res.data;
                    if (applied_options && applied_options?.length) {
                        const _options = applied_options.filter(
                            (o: any) => o.is_visible && o.campaign_status
                        ) as [];
                        setListOption(_options);
                    }
                }
            }).catch((ex: any) => {
                throw Error(ex);
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        onGetNewOptions();
    }, []);

    return (
        <Modal visible={onCallback}>
            <div className='modal-content modal-sm'>
                <div className='modal-header'>
                    <div className='close' onClick={() => onCallback(false)}>
                        <img src='/media/images/ic-close-modal.svg' alt='cocolux' />
                    </div>
                    <h3>Danh sách quà tặng</h3>
                </div>
                <div className='modal-body modal-campaign beautify-scroll'>
                    {
                        isLoading
                            ? (
                                <div className='no-data'>Đang tải dữ liệu ...</div>
                            )
                            : (
                                listOptions.length > 0
                                    ? (
                                        listOptions.map((item: any = {}) => (
                                            <div
                                                onClick={() => item.total_quantity > 0 && onSelected(item)}
                                                className='campaign-item'
                                                key={item.option_id}
                                            >
                                                <div className='campaign__radio'>
                                                    <div className='ccs-radio'>
                                                        <label>
                                                            <input
                                                                type='radio'
                                                                name='campaign-gift'
                                                                disabled={item.total_quantity <= 0}
                                                                defaultChecked={defaultOptionId === item.option_id}
                                                            />
                                                            <span></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='campaign__thumb'>
                                                    <img
                                                        src={
                                                            item.thumbnail_url
                                                                ? Utilities.resizeImage(200, item.thumbnail_url)
                                                                : '/media/images/ic-lazy-load.svg'
                                                        }
                                                        className={item.thumbnail_url ? 'logo-fill' : 'logo-fit'}
                                                        alt='cocolux'
                                                    />
                                                </div>
                                                <div className='campaign__info'>
                                                    <div className='info__title'>{item.name}</div>
                                                    <div className='info__detail'>
                                                        <div className='info__price'>
                                                            <span>
                                                                {Utilities.currencyPipe(item.normal_price)}
                                                            </span>
                                                            <span>
                                                                {Utilities.currencyPipe(item.price)}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className='info__stock'
                                                            style={{ display: item.total_quantity > 0 ? 'none' : '' }}
                                                        >
                                                            HẾT QUÀ
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                    : (
                                        <span className='no-data'>Không có dữ liệu quà tặng.</span>
                                    )
                            )
                    }
                </div>
            </div >
        </Modal >
    );
};
