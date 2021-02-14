import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import OneProduct from './pages/OneProduct/OneProduct';
import Cart from './pages/Cart/Cart';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar/NavBar';
import Signup from './pages/Signup';
import ShippingAddress from './pages/ShippingAddress';
import Payment from './pages/Payment/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order/Order';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import Footer from './components/Footer/Footer';
import SearchResults from './pages/SearchResults/SearchResults';
import AdminRoute from './components/Auth/AdminRoute';
import ProductEdit from './pages/ProductEdit/ProductEdit';
import SellerRoute from './components/Auth/SellerRoute';
import NotFound from './pages/NotFound';
import ProductListOfSeller from './pages/ProductListOfSeller/ProductListOfSeller';
import Seller from './pages/Seller/Seller';
import OrderListOfSeller from './pages/OrderListOfSeller/OrderListOfSeller';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>

        {/* Customer  */}
        <PrivateRoute exact path="/shipping" component={ShippingAddress} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/placeorder" component={PlaceOrder} />
        <PrivateRoute exact path="/order/:orderId" component={Order} />
        <PrivateRoute exact path="/orderhistory" component={OrderHistory} />
        <PrivateRoute exact path="/profile" component={Profile} />


        {/* Seller  */}
        <SellerRoute exact path="/productlist/seller" component={ProductListOfSeller} />
        <SellerRoute exact path="/orderlist/seller" component={OrderListOfSeller} />
        <SellerRoute exact path="/product/create" component={ProductEdit} />
        <SellerRoute exact path="/product/edit/:idProd" component={ProductEdit} />
        {/* Admin  */}
        {/* <AdminRoute exact path="manageproduct" component={ } />" */}


        {/* Public  */}
        {/* search  */}
        <Route exact path="/search/category/:category/name/:name/order/:order/min/:min/max/:max/rating/:rating"
          component={SearchResults} />
        <Route exact path="/search/name/:name?" component={SearchResults} />
        <Route exact path="/search" component={SearchResults} />

        <Route exact path="/product/:id" component={OneProduct} />
        <Route exact path="/cart/:id?" component={Cart} />
        <Route exact path="/seller/:idSeller" component={Seller} />

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
