import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { customer } from './customer.reducer';
import { product } from './product.reducer';
import { order } from './order.reducer';


const rootReducer = combineReducers({
  authentication,
  customer,
  product,
  order
});

export default rootReducer;
