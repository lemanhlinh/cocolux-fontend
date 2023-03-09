import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';

// Theme
import 'public/scss/style.core.scss';

// Modules
import { wrapper } from 'src/stores';
import { useConfig } from 'src/helpers/hooks';
import { addCategories, checkUserLoggedIn } from 'src/stores/layout';
import { AccountAPI, ConfigAPI } from 'src/helpers/services';

// Components
import App from 'next/app';
import Layout from 'src/components/layout-group/wrappers/Layout';
import { getCart } from 'src/stores/checkout';
import { orderBy } from 'lodash';

function RootApp({ Component, pageProps }: any) {
    const dispatch = useDispatch();
    const { setClientId } = useConfig();

    async function fetchMyAccount() {
        await AccountAPI.me()
            .then((response) => {
                dispatch(
                    checkUserLoggedIn(!response.code)
                );
            });
    }

    function loadLayoutConfig() {
        dispatch(getCart());
        setClientId(Date.now(), true);
    }

    useEffect(() => {
        fetchMyAccount();
        loadLayoutConfig();
    }, []);

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <link rel='icon' type='image/png' href='/media/icons/favicon.ico' sizes='32x32' />
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

RootApp.getInitialProps = async (appContext: any) => {
    const { ctx } = appContext;
    const { store } = ctx;

    const { layout } = store.getState();
    const { categories } = layout;

    if (!categories.length) {
        await ConfigAPI.listCategory({
            skip: 0,
            limit: 1000,
            nested: true
        }).then((response) => {
            let categories = !response.code
                ? response.data
                : [];
            categories = response.data.map((el: any) => {
                if (el.children && el.children?.length) {
                    el.children = orderBy(
                        el.children,
                        ['position'],
                        ['asc', 'desc']
                    );
                    el.children.map((c3: any) => {
                        if (c3.children && c3.children?.length) {
                            c3.children = orderBy(
                                c3.children,
                                ['position'],
                                ['asc', 'desc']
                            );
                        }
                        return c3;
                    });
                }
                return el;
            });
            if (categories?.length) {
                categories = orderBy(
                    categories,
                    ['position'],
                    ['asc', 'desc']
                );
            }

            // Set categories
            store.dispatch(
                addCategories(categories || [])
            );
        });
    }
    if (ctx && ctx.res && ctx.res?.statusCode === 404) {
        appContext.ctx.res.writeHead(302, { Location: '/not-found' });
        appContext.ctx.res.end();
    }
    return { ...await App.getInitialProps(appContext) };
};

RootApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired
};

export default wrapper.withRedux(RootApp);
