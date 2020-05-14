import React from 'react';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Main from './pages/main/main';
import Header from './components/Header';

const Routes = () => (
    <BrowserRouter>
       <Header/>
        <Switch>
            <Route exact path="/" component={Main} /> 
        </Switch>
    </BrowserRouter>
);

export default Routes;