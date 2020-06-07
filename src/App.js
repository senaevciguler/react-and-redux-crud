import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import { Customer } from './_pages/customers/customer.component';
import { AddCustomer } from './_pages/customers/addcustomer.component'
import { Product } from './_pages/products/product.component';
import { AddProduct } from './_pages/products/addproduct.component';
import { Order } from './_pages/orders/order.component';
import { AddOrder } from './_pages/orders/addorder.component';
import  { Login } from './_pages/login/';
import { Home } from './_pages/home/';
import { history } from './_helpers';
import { PrivateRoute } from './_components';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>            
              <Switch>
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path='/customer' component={Customer} />
                <PrivateRoute exact path='/add-customer' component={AddCustomer} />
                <PrivateRoute exact path='/edit-customer/:id' component={AddCustomer} />
                <PrivateRoute exact path='/product' component={Product} />
                <PrivateRoute exact path='/add-product' component={AddProduct} />
                <PrivateRoute exact path='/edit-product/:id' component={AddProduct} />
                <PrivateRoute exact path='/order' component={Order} />
                <PrivateRoute exact path='/add-order' component={AddOrder} />
                <PrivateRoute exact path='/edit-order/:id' component={AddOrder} />
                <Route exact path='/' component={Login} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
