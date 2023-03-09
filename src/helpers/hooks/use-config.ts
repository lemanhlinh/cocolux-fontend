import { isEmpty, isNil } from 'lodash';
import { createContext, useContext } from 'react';

// Plugins
import Cookie from 'universal-cookie';
import { v4 } from 'uuid';

// Configs
import { ACCESS_TOKEN, CLIENT_ID, EXPIRED_TOKEN, LAYOUT_LANGUAGE, REFRESH_TOKEN } from '../constants/layout';

// Cookie
const cookie = new Cookie();

interface IConfigContext {
    user: {};
    clientId: string;
    accessToken: string;
    expiredToken: string;
    refreshToken: string;
    setLanguage: () => void;
    setClientId: (uid: any, isNew: boolean) => void;
    setAccessToken: (token: string, isNew: boolean) => void;
    setExpiredToken: (token: string, isNew: boolean) => void;
    setRefreshToken: (token: string, isNew: boolean) => void;
}

const ConfigContext = createContext<IConfigContext>(
    {
        user: {},
        clientId: '',
        accessToken: '',
        expiredToken: '',
        refreshToken: '',
        setLanguage: () => {
            const lang = cookie.get(
                LAYOUT_LANGUAGE
            );
            if (!isEmpty(lang)) {
                document.documentElement.setAttribute('lang', lang);
            }
        },
        setClientId: (uid: any, isNew: boolean) => {
            if (isNew) {
                const currentId = cookie.get(CLIENT_ID);
                if (isNil(currentId)) cookie.set(CLIENT_ID, v4(uid));
            } else {
                cookie.remove(CLIENT_ID);
            }
        },
        setAccessToken: (token: any, isNew: boolean) => {
            if (isNew) {
                const currentToken = cookie.get(ACCESS_TOKEN);
                if (isNil(currentToken)) cookie.set(ACCESS_TOKEN, token);
            } else {
                cookie.remove(ACCESS_TOKEN);
            }
        },
        setExpiredToken: (token: any, isNew: boolean) => {
            if (isNew) {
                const currentToken = cookie.get(EXPIRED_TOKEN);
                if (isNil(currentToken)) cookie.set(EXPIRED_TOKEN, token);
            } else {
                cookie.remove(EXPIRED_TOKEN);
            }
        },
        setRefreshToken: (token: any, isNew: boolean) => {
            if (isNew) {
                const currentToken = cookie.get(REFRESH_TOKEN);
                if (isNil(currentToken)) cookie.set(REFRESH_TOKEN, token);
            } else {
                cookie.remove(REFRESH_TOKEN);
            }
        }
    }
);

export function useConfig() {
    return useContext(ConfigContext);
}
