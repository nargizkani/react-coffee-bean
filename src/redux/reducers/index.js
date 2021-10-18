import {combineReducers} from 'redux';

import filters from './filters';
import coffees from './coffees';
import cart from './cart';

const rootReducer = combineReducers({
    filters,
    coffees,
    cart,
});

export default rootReducer;
