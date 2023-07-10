import React from 'react';
import { useSelector } from 'react-redux';

export const HeaderTop: React.FC = () => {
    const { config } = useSelector((state: any) => state.config);
    return (
        <div className='header-top'>
            <div className='header-top--phone'>
                <img src='/media/images/ic-phone.svg' alt='Cocolux' title='Cocolux' />
                <span>{config.hotline}</span>
            </div>

            <div className='header-top--title'>
                {/*
                <span>
                    COCOLUX MEGA SALE MÙA LỄ HỘI - DEAL SIÊU SỐC - TRÚNG XE SANG với sự đồng hành của các nhãn hàng lớn: Vichy,
                    La Roche-Posay, L’oréal, Maybelline, Paula’s Choice, Caryophy, Bio Essence, Biore, The Organic Shop, Biore,
                    Curel, NNO VITE, Eucerin, Altruist, Cocoon, Cotoneve
                </span>
                */}
            </div>

        </div>
    );
};
