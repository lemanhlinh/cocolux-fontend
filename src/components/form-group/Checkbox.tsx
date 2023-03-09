import React from 'react';

/**
 * My Props
 */
interface Props { }

const Checkbox: React.FC<Props> = (props) => {
    return (
        <>
            <input type={'checkbox'} {...props} />
        </>
    );
};

export default Checkbox;
