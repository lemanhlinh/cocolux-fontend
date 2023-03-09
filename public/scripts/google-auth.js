(function () {
    const e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = 'https://apis.google.com/js/client:platform.js?onload=gPOnLoad';
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(e, t);
}());
