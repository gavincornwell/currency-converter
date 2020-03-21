import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCurrenciesComponent from "./component/ListCurrenciesComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <h1 className="text-center">Currency Rates</h1>
                  <Switch>
                      <Route path="/" exact component={ListCurrenciesComponent} />
                      <Route path="/currencies" component={ListCurrenciesComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
