import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import OneProduct from './pages/OneProduct';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Home} />
        <Route exact path="/product/:id" component={OneProduct} />
        <Route exact path="/cart/:id?" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
