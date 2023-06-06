import { combineReducers } from 'redux';

// Reducers
import layoutReducer from './layout/layout.reducer';
import brandReducer from './brand/brand.reducer';
import productReducer from './product/product.reducer';
import checkoutReducer from './checkout/checkout.reducer';
import accountReducer from './account/account-reducer';
import configReducer from './config/config.reducer';

// COMBINED REDUCERS
const reducers = {
    layout: layoutReducer,
    brand: brandReducer,
    product: productReducer,
    checkout: checkoutReducer,
    account: accountReducer,
    config: configReducer
};

export default combineReducers(reducers);
