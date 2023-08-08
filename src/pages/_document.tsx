import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='vi'>
                <Head>
                    {/* config */}
                    <meta property='og:locale' content='vi_VN' />
                    <meta httpEquiv='content-language' content='vi' />
                    <meta property='fb:app_id' content='1967226666684233' />
                    <meta property='og:type' content='website' data-rh='true'></meta>
                    <meta property='og:site_name' content='cocolux.com' data-rh='true'></meta>

                    {/* SEO */}


                    {/* about-us */}
                    <meta name='al:android:app_name' content='Cocolux' />
                    <meta name='al:android:package' content='vn.Cocolux.app.Cocoluxandroid' />
                    <meta name='al:ios:app_store_id' content='12312312312' />
                    <meta name='al:ios:app_name' content='cocolux.com - Niềm Vui Mua Sắm' />
                    <meta name='al:iphone:app_store_id' content='12312312312' />
                    <meta name='al:iphone:app_name' content='cocolux.com - Niềm Vui Mua Sắm' />
                    <meta name='al:ipad:app_store_id' content='12312312312' />
                    <meta name='al:ipad:app_name' content='cocolux.com - Niềm Vui Mua Sắm' />
                    {/* <meta property='og:keywords' content='mỹ phẩm,  my pham,  son môi,  son moi,  kem dưỡng da,  kem duong da,  nước hoa,  nuoc hoa,  sữa rửa mặt,  sua rua mat,  dầu gội đầu,  dau goi dau,  son 3ce,  son black rouge,  mỹ phẩm mỹ,  my pham my,  mỹ phẩm giá gốc,  my pham gia goc,  công ty mỹ phẩm,  website mỹ phẩm' />
                    <meta property='og:description' content='COCOLUX - Hệ thống mỹ phẩm hàng đầu Việt Nam' /> */}

                    {/* facebook && google verification */}
                    <meta name='google-site-verification' content='cUa9hcmaZu3uQwlFL-WGdNBeHBsqJvkKZo6fnlbuHtQ'></meta>
                    <meta name='facebook-domain-verification' content='u80ok2suj7ch16vm9zqi3gbrt6ztlu'></meta>

                    {/* Script */}
                    <script type='text/javascript' dangerouslySetInnerHTML={{ __html: 'history.scrollRestoration = "manual"' }} />

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-XL0CM3L0ZC'></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-XL0CM3L0ZC');
                        `
                    }} /> */}

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-SV2M1BWXC9'></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-SV2M1BWXC9');
                            `
                        }}
                    /> */}

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-2YHLW19WB2'></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-2YHLW19WB2');
                            `
                        }}
                    /> */}

                    {/* <!-- Google Tag Manager --> */}
                    {/* <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-KQ868H8');
                            `
                        }}
                    /> */}

                    {/* <!-- Google Tag Manager --> */}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-NGPB3KQ');
                        `
                    }} />
                    {/* <!-- End Google Tag Manager --> */}

                    {/* <!-- Facebook pixel --> */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '119758555309111');
                                fbq('track', 'PageView');
                            `
                        }}
                    />


                    
                </Head>
                <body>
                    {/* <noscript>
                        <iframe src='https://www.googletagmanager.com/ns.html?id=GTM-KR9FQH'></iframe>
                    </noscript> */}

                    <noscript>
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGPB3KQ"></iframe>
                    </noscript>

                    {/* app */}
                    <Main />

                    {/* next script */}
                    <NextScript />

                    {/* bundle script */}
                    <div id='fb-root'></div>
                    <script defer src='/scripts/google-auth.js'></script>
                    <script defer src='/scripts/facebook-auth.js'></script>
                    <script async defer crossOrigin='anonymous' src='https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0' nonce='g3FmeM9o'></script>
                    <script async defer crossOrigin='anonymous' src='https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0&appId=335194247449366&autoLogAppEvents=1' nonce='1UnxWRw8'></script>
                    {/* <!-- Google Json Schema --> */}
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html:
                                `{
                                  "@context": "https://schema.org",
                                  "@type": "Corporation",
                                  "name": "Cocolux - Chuỗi Cửa Hàng Mỹ Phẩm Chính Hãng",
                                  "alternateName": "Cocolux",
                                  "url": "https://cocolux.com/",
                                  "logo": "https://cocolux.com/media/images/logo_cocoshop.svg",
                                  "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "0988888825",
                                    "contactType": "technical support",
                                    "contactOption": "TollFree",
                                    "areaServed": "VN",
                                    "availableLanguage": "Vietnamese"
                                  },
                                  "sameAs": [
                                    "https://twitter.com/myphamcocolux",
                                    "https://www.youtube.com/channel/UCfQOj6Fvw8UR2qS78_9V_JQ/about",
                                    "https://www.pinterest.com/myphamcocolux/",
                                    "https://www.twitch.tv/myphamcocolux/about",
                                    "https://www.reddit.com/user/myphamcocolux",
                                    "https://www.behance.net/cocolux",
                                    "https://500px.com/p/cocolux",
                                    "https://dribbble.com/cocolux/about",
                                    "https://vimeo.com/cocolux"
                                  ]
                                }
                                </script>
                                <script type="application/ld+json">
                                {
                                  "@context": "https://schema.org",
                                  "@type": "HealthAndBeautyBusiness",
                                  "name": "Cocolux - Chuỗi Cửa Hàng Mỹ Phẩm Chính Hãng",
                                  "image": "https://cocolux.com/media/images/logo_cocoshop.svg",
                                  "@id": "https://cocolux.com/",
                                  "url": "https://cocolux.com/",
                                  "telephone": "0988888825",
                                  "priceRange": "200.000 - 1.000.000 VND",
                                  "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "80 P. Chùa Bộc, Trung Liệt, Đống Đa, Hà Nội",
                                    "addressLocality": "Hà Nội",
                                    "postalCode": "10000",
                                    "addressCountry": "VN"
                                  },
                                  "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": 21.0069155,
                                    "longitude": 105.8267464
                                  },
                                  "openingHoursSpecification": {
                                    "@type": "OpeningHoursSpecification",
                                    "dayOfWeek": [
                                      "Monday",
                                      "Tuesday",
                                      "Wednesday",
                                      "Thursday",
                                      "Friday",
                                      "Saturday",
                                      "Sunday"
                                    ],
                                    "opens": "08:00",
                                    "closes": "23:00"
                                  },
                                  "sameAs": [
                                    "https://twitter.com/myphamcocolux",
                                    "https://www.youtube.com/channel/UCfQOj6Fvw8UR2qS78_9V_JQ/about",
                                    "https://www.pinterest.com/myphamcocolux/",
                                    "https://www.twitch.tv/myphamcocolux/about",
                                    "https://www.reddit.com/user/myphamcocolux",
                                    "https://www.behance.net/cocolux",
                                    "https://500px.com/p/cocolux",
                                    "https://dribbble.com/cocolux/about",
                                    "https://vimeo.com/cocolux"
                                  ]
                                }`
                        }}
                    />


                    {/* <!-- Google Json Schema --> */}
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html:
                                `{
                                  "@context": "https://schema.org/",
                                  "@type": "Person",
                                  "name": "Dat Pham",
                                  "url": "https://cocolux.com/author/pham-dat",
                                  "image": "https://i.pinimg.com/280x280_RS/f6/60/5c/f6605c52ef41bfa7b7bf5cc84ea89930.jpg",
                                  "sameAs": [
                                    "https://twitter.com/phamdatcocolux",
                                    "https://www.youtube.com/channel/UCczTI5QTg8_fPhbbUVP4xwA/about",
                                    "https://www.pinterest.com/phamdatcocolux/",
                                    "https://phamdatcocolux.tumblr.com/",
                                    "https://www.flickr.com/people/phamdatcocolux/",
                                    "https://vi.gravatar.com/phamdatcocolux",
                                    "https://phamdatcocolux.blogspot.com/",
                                    "https://dribbble.com/phamdatcocolux/about",
                                    "https://www.deviantart.com/phamdatcocolux/about"
                                  ],
                                  "jobTitle": "CEO",
                                  "worksFor": {
                                    "@type": "Organization",
                                    "name": "Cocolux"
                                  }
                                }`
                        }}
                    />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
