
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isNil } from 'lodash';

// Components
import { Toastr, Utilities } from 'src/helpers/utilities';
import { CampaignGiftModal } from 'src/components/modal-group';

interface Props {
    campaign: {
        id: number;
        name: string;
        content: string;
        thumbnail_url: string;
        applied_options: [];
        applied_min_value: number;
        applied_start_time: number;
        applied_stop_time: number;
        applied_min_quantity: number;
    };
    callback: any;
    defaultOptionId: number;
}

const ItemListCampaign: React.FC<Props> = ({ campaign, callback, defaultOptionId }) => {
    // Declaration State
    const [options, setOption] = useState<[]>([]);
    const [defaultOption, setDefaultOption] = useState<any>({});
    const [moreThumbnail, setMoreThumbnail] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (campaign.id && campaign.applied_options.length) {
            // Set default option
            const defaultGift = campaign.applied_options.find(
                (i: any) => i.option_id === defaultOptionId
            );
            if (defaultGift) setDefaultOption(defaultGift);
            const listOptions = campaign.applied_options.filter(
                (o: any) => o.is_visible && o.campaign_status
            ) as [];
            if (listOptions.length) {
                setOption(listOptions);
            }
            if (listOptions.length > 1) {
                const anotherOption = listOptions.find(
                    (i: any) => i.option_id !== defaultOptionId
                ) as any;
                if (anotherOption) {
                    setMoreThumbnail(anotherOption.thumbnail_url);
                }
            }
        }
    }, []);

    return (
        options.length
            ? (
                <div className='product-gift-box'>
                    <div className='product-gift__campaign'>
                        <div className='product-gift__title'>
                            <img src='/media/images/ic-gift.svg' alt='cocolux' />
                            <span>{campaign.name} - Mua {Utilities.currencyPipe(campaign.applied_min_value)} để nhận {campaign.applied_min_quantity} quà tặng</span>
                        </div>
                        <div className='product-gift__item'>
                            {
                                !isNil(defaultOption)
                                    ? (
                                        <div className='campaign__item' key={defaultOption.option_id}>
                                            <div className='ccs-radio'>
                                                <label>
                                                    <input
                                                        type='radio'
                                                        name='choose-gift'
                                                        defaultChecked={defaultOption.option_id}
                                                        onChange={() => callback(defaultOption.option_id)}
                                                    />
                                                    <div className='radio-img'>
                                                        <img
                                                            src={
                                                                defaultOption.thumbnail_url
                                                                    ? Utilities.resizeImage(100, defaultOption.thumbnail_url)
                                                                    : '/media/images/loading.svg'
                                                            }
                                                            alt='cocolux'
                                                        />
                                                    </div>
                                                    <span></span>
                                                </label>
                                            </div>
                                            <div className='item-info'>
                                                <Link
                                                    href={{
                                                        pathname: '/item-detail',
                                                        query: { slug: defaultOption?.slug?.toLocaleLowerCase() }
                                                    }}
                                                    as={`/${defaultOption?.slug?.toLocaleLowerCase()}`}
                                                >
                                                    <a className='item-info-title'>{defaultOption.name}</a>
                                                </Link>
                                                <span className='item-info-price'>
                                                    {/* Trị giá: */}
                                                    <p>{Utilities.currencyPipe(defaultOption.normal_price)}</p>
                                                    <p>0 đ</p>
                                                </span>
                                            </div>
                                        </div>
                                    ) : null
                            }
                        </div>
                    </div>
                    <div
                        className='product-gift__more'
                        style={{ display: options.length > 1 ? '' : 'none' }}
                    >
                        <span
                            className='text__more'
                            onClick={() => setModalVisible(true)}
                            title={`Còn hơn ${options.length - 1} quà tặng nữa. Nhấn để đổi quà.`}
                        >
                            Đổi quà khác
                            <img src='/media/images/ic-breadcrumb.svg' alt='icon' />
                        </span>
                        <div
                            className='gift-more__item'
                            onClick={() => setModalVisible(true)}
                            title={`Còn hơn ${options.length - 1} quà tặng nữa. Nhấn để đổi quà.`}
                        >
                            <div className='thumbnail__more'>
                                <img
                                    src={
                                        moreThumbnail
                                            ? Utilities.resizeImage(100, moreThumbnail)
                                            : '/media/images/loading.svg'
                                    }
                                    alt='cocolux'
                                />
                            </div>
                            <span>+ {options.length - 1}</span>
                        </div>
                    </div>

                    {/* CampaignGiftModal */}
                    {
                        modalVisible &&
                        <CampaignGiftModal
                            options={options}
                            campaignId={`${campaign.id}`}
                            onSelected={(data: any) => {
                                if (data) {
                                    callback(data.option_id);
                                    setDefaultOption(data);
                                    setModalVisible(false);
                                }
                            }}
                            defaultOptionId={defaultOption?.option_id}
                            onCallback={() => setModalVisible(false)}
                        />
                    }
                    {/* CampaignGiftModal */}
                </div>
            ) : null
    );
};

export default ItemListCampaign;
