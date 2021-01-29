import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Home} />



      </Switch>
    </div>
  );
}

export default App;
