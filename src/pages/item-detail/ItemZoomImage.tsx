import { useEffect, useState } from 'react';

const ItemZoomImage = ({ name, image }: any) => {
    const appNavigator = (navigator?.userAgent) as any;
    const [isVisbile, setIsVisible] = useState(false);
    const isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(appNavigator);

    function imageZoom(imgID: any, parentID: any, resultID: any) {
        let img = null as any;
        let lens = null as any;
        let result = null as any;
        let targetParent = null as any;
        let cx = null as any;
        let cy = null as any;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);
        targetParent = document.getElementById(parentID);

        /*create lens:*/
        const oldLends = document.getElementById('zoom-lens');
        if (oldLends) oldLends?.remove();
        lens = document.createElement('DIV');
        lens.setAttribute('id', 'zoom-lens');
        lens.setAttribute('class', 'img-zoom-lens');

        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = `url('${image}')`;
        result.style.backgroundSize = `${(img.width * cx)}px`;
        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener('mousemove', moveLens);
        targetParent.addEventListener('mousemove', moveLens);

        /*and also for touch screens:*/
        lens.addEventListener('touchmove', moveLens);
        targetParent.addEventListener('touchmove', moveLens);

        function moveLens(e: any) {
            let pos = null as any;
            let x = null as any;
            let y = null as any;

            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            /*calculate the position of the lens:*/
            x = pos.x - (lens.offsetWidth / 2);
            y = pos.y - (lens.offsetHeight / 2);
            /*prevent the lens from being positioned outside the image:*/
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }

            /*set the position of the lens:*/
            lens.style.left = `${x}px`;
            lens.style.top = `${y}px`;

            /*display what the lens "sees":*/
            // tslint:disable-next-line: prefer-template
            result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
        }

        function getCursorPos(e: any) {
            let a = null;
            let x = 0;
            let y = 0;
            // tslint:disable-next-line: no-parameter-reassignment
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    }

    useEffect(() => {
        if (!isMobile) {
            imageZoom('zoom-image', 'product-img-thumbnail', 'zoom-preivew');
            // Detect mouse event
            const zoomLen = document.querySelector(
                '#zoom-lens'
            ) as any;
            zoomLen.addEventListener('mouseenter', () => {
                setIsVisible(true);
            });
            zoomLen.addEventListener('mouseout', () => {
                setIsVisible(false);
            });
        }
    }, [image]);

    return (
        isMobile
            ? (
                <img
                    src={image}
                    alt={name}
                    title={name}
                />
            )
            : (
                <>
                    <img
                        src={image}
                        alt={name}
                        title={name}
                        id='zoom-image'
                    />
                    <div
                        id='zoom-preivew'
                        className='img-zoom-result'
                        style={{ visibility: isVisbile ? 'visible' : 'hidden' }}
                    >
                        {/* SHOW IMAGE */}
                    </div>
                </>
            )
    );
};

export default ItemZoomImage;
