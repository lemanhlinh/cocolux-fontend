import React from 'react';

interface Props {
    content: string;
}

export const NotFound: React.FC<Props> = ({ content }) => {
    return (
        <div className='bg-white' style={ { width: '100%', padding: '10px', textAlign: 'center' } }>{ content }</div>
    );
};
