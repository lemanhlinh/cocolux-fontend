import React from 'react';

interface Props {
    src: string;
    alt?: string;
    title?: string;
    style?: any;
}

export const Image: React.FC<Props> = (props) => {
    let img: any;

    if (props.src) {
        img = <img {...props} onError={
            (event: any) => {
                event.target.src = 'https://via.placeholder.com/130x175?text=no+image';
            }
        } />;
    } else {
        img = <img src='https://via.placeholder.com/130x175?text=no+image' alt='no image' />;
    }

    return <>{img}</>;
};
