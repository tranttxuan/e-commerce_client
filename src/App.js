import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import OneProduct from './pages/OneProduct';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar/NavBar';
import Signup from './pages/Signup';
import ShippingAddress from './pages/ShippingAddress';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import Footer from './components/Footer/Footer';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {/* Public  */}
        <Route exact path="/search/name/:name?" component={SearchResults} />
        <Route exact path="/product/:id" component={OneProduct} />
        <Route exact path="/cart/:id?" component={Cart} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/" component={Home} />
        {/* Customer  */}
        <PrivateRoute exact path="/shipping" component={ShippingAddress} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/placeorder" component={PlaceOrder} />
        <PrivateRoute exact path="/order/:orderId" component={Order} />
        <PrivateRoute exact path="/orderhistory" component={OrderHistory} />

        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
