import React from 'react';

/**
 * My Props
 */
interface Props { }

const Radiobox: React.FC<Props> = (props) => {
    return (
        <>
            <input type={'radio'} {...props} />
        </>
    );
};

export default Radiobox;
