export const env = process.env.NODE_ENV;
export const port = process.env.PORT || 3000;
export const apiUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.API_URL_TEST;
export const apiUrlNew = process.env.NODE_ENV === 'production' ? process.env.API_URL_FS : process.env.API_URL_TEST_FS;
export const imageUrl = process.env.NODE_ENV === 'production' ? process.env.IMAGE_URL : process.env.IMAGE_URL_TEST;

// thrid party service
export const google = {
    gaId: 'UA-89763523-14',
    gtagId: 'GTM-MNBGIOP',
    clientId: '880352599061-b6k9r1h8tg4godda1d6rrrcef1dp0s8e.apps.googleusercontent.com',
    clientSecret: 'PmozeDpuBuZGzZmsiEy9DQAg'
};

export const facebook = {
    appId: '335194247449366',
    appVersion: 'v8.0',
    accountKitVersion: 'v8.0',
    pixelId: '5678909432212'
};
