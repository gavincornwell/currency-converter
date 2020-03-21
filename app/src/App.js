import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListCurrenciesComponent from "./component/ListCurrenciesComponent";

function App() {
    return (
        <div className="container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={style}>Currency Rates</Typography>
                </Toolbar>
            </AppBar>
            <Router>
                <div className="col-md-6">
                    <Switch>
                        <Route path="/" exact component={ListCurrenciesComponent} />
                        <Route path="/currencies" component={ListCurrenciesComponent} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

const style = {
    flexGrow: 1
}

export default App;
