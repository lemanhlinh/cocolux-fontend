import React from 'react';

function Modal({ children, callback, visible }: any) {
    return (
        <>
            <div
                id='coco-modal'
                className='modal'
                onClick={callback}
                style={{ display: visible ? 'block' : 'none' }}
            >
                {children}
            </div>
        </>
    );
}

export default Modal;
