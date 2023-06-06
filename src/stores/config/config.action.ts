export const CONFIG_LOAD_LIST = 'CONFIG/LOAD/LIST';

export const addConfig = (payload: any) => ({
    type: CONFIG_LOAD_LIST,
    payload: payload
});