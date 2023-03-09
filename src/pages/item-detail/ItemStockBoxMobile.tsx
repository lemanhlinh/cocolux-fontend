import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import $ from 'jquery';

import { LocationAPI } from 'src/helpers/services';

interface Props {
    item: any;
    stocks: any[];
    countStore: any;
    thumbnalUrl: string;
}

const ItemStockBoxMobile = ({ item, thumbnalUrl, stocks, countStore }: Props) => {
    const [stores, setStores] = useState<[]>([]);
    const [provinces, setProvince] = useState<[]>([]);
    const [isShowBox, setShowBox] = useState<boolean>(false);
    const [provinceSelect, setProvinceSelect] = useState<any>({});

    const onGetProvinces = async () => {
        await LocationAPI.listProvinces({
            skip: 0,
            limit: 100,
        }).then((res: any) => {
            setProvince(!res.code
                ? res.data || []
                : []
            );
        }).catch((ex) => {
            throw Error(ex);
        });
    };

    /**
     * Change Province
     * @param code
     */
    const onChangeProvince = (code: string) => {
        if (code) {
            const province = provinces.find(
                (i: any) => i.code === `${code}`
            );
            if (province) {
                setProvinceSelect(province);
            }
        }
    };

    /**
     * Find Location
     */
    const onFindLocation = () => {
        if (!isNil(provinceSelect)) {
            const { code } = provinceSelect;
            const stores = [...stocks];
            const newStores = stores.filter(
                (s: any) => s.code === code
            );
            setStores(newStores as []);
        }
    };

    /**
     * Clear Selection
     */
    const onClear = () => {
        setProvinceSelect(null);
        setStores(stocks as []);
    };

    useEffect(() => {
        if (!provinces.length) {
            const page = $('.coco-page-wrapper') as any;
            if (!isNil(page)) {
                const width = page.width();
                if (width && width <= 768) {
                    onGetProvinces();
                }
            } else {
                onGetProvinces();
            }
        }
        if (stocks?.length) {
            setStores(stocks as []);
        }
        if (
            !isNil(provinceSelect) &&
            provinceSelect?.code
        ) {
            onFindLocation();
        }
    }, [stocks]);

    /**
     * Show Selected Popup
     */
    const onShowPopup = () => {
        const popup = ($('#instock-modal')) as any;
        popup.toggleClass('popup-show');
    };

    return (
        <div id='instock-modal' className='popup-wrapper'>
            <div className='stock-box'>
                <div className='stock-container'>
                    <div className={`box-heading`}>
                        <span>
                            {
                                item.total_final_quantity > 0
                                    ? `${countStore?.count}/${countStore?.total} Chi nhánh còn sản phẩm`
                                    : `${countStore?.total} Chi nhánh tạm hết sản phẩm`
                            }
                        </span>
                        <div className='heading-close'>
                            <img
                                style={{ filter: 'brightness(0) invert(1)' }}
                                onClick={() => onShowPopup()}
                                src='/media/icons/ic-close.svg'
                                alt='cocolux'
                            />
                        </div>
                    </div>
                    <div className='box-detail'>
                        <div className='info-item'>
                            <div className='info--thumbnail'>
                                <img
                                    src={thumbnalUrl}
                                    alt={item.name}
                                    title={item.name}
                                />
                            </div>
                            <div className='info--detail flex flex-col items-start ml-2'>
                                <span className='item-brand'>{item.brand || `Cocolux`}</span>
                                <span className='item-name'>{item.name}</span>
                            </div>
                        </div>
                        <div className='location-box'>
                            <span className='font-medium text-xs'>Vui lòng nhập khu vực để biết chi nhánh gần bạn nhất.</span>
                            <img
                                onClick={() => {
                                    setProvinceSelect(null);
                                    setShowBox(!isShowBox);
                                }}
                                src='/media/icons/ic-marked.svg'
                                alt='cocolux'
                            />
                        </div>
                        <div
                            style={{ display: !isShowBox ? 'none' : '' }}
                            className={`search-box`}
                        >
                            <select
                                defaultValue=''
                                name='province_code'
                                className='form-select'
                                onChange={(e: any) => onChangeProvince(e.target.value)}
                                value={!isNil(provinceSelect) ? provinceSelect?.code : ''}
                            >
                                <option value='' disabled>Chọn Tỉnh/Thành Phố</option>
                                {
                                    provinces.map((province: any = {}) => (
                                        <option
                                            value={province.code}
                                            key={province.code}
                                        >
                                            {province.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className='group-button w-full flex items-center'>
                                <a
                                    onClick={() => onClear()}
                                    className={`btn-refresh`}
                                >
                                    <span>
                                        Làm mới
                                    </span>
                                </a>
                                <a
                                    onClick={() => onFindLocation()}
                                    className={`btn-confirm`}
                                >
                                    <span>
                                        Xác nhận
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className='list-store beautify-scroll'>
                            <div className='store-heading'>
                                CHI NHÁNH GẦN BẠN
                            </div>
                            {
                                stores.length
                                    ? (
                                        stores.map((store: any) => (
                                            <div className='store-item' key={store.id}>
                                                <span className='store-title'>
                                                    {store.name}
                                                </span>
                                                {
                                                    store?.districts?.length &&
                                                    (
                                                        store.districts.map((district: any) => (
                                                            <div className='store-district' key={district.id}>
                                                                <div
                                                                    className='district-name'
                                                                >
                                                                    <span>{district.name}</span>
                                                                </div>
                                                                {
                                                                    district?.stores?.length &&
                                                                    district.stores.map((s: any) => (
                                                                        <div className='local-store' key={s.id}>
                                                                            <span>{s.name}</span>
                                                                            <span className={s.total_quantity > 0 ? 'text-red' : 'text-grey'}>
                                                                                {s.total_quantity > 0 ? 'Còn sản phẩm' : 'Tạm hết sản phẩm'}
                                                                            </span>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        ))
                                    )
                                    : (
                                        <div className='w-full text-left text-xs mt-3 px-4'>
                                            Không có chi nhánh nào gần khu vực {provinceSelect?.name || ''}
                                        </div>
                                    )
                            }
                        </div>
                        <div className='box-empty'></div>
                    </div>
                    <div className='box-empty'></div>
                    <div className='contact-info'>
                        <div className='contact-item'>
                            <img
                                src='/media/icons/ic-clock.svg'
                                alt='cocolux'
                            />
                            <span>8:00 AM - 22:00 PM</span>
                        </div>
                        <div className='contact-item'>
                            <img
                                src='/media/icons/ic-phone-white.svg'
                                alt='cocolux'
                            />
                            <span>
                                <a href='tel:+84988888825'>0988888825</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemStockBoxMobile;

