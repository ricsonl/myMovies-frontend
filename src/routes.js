import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import AuthPages from './containers/AuthPages';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/" component={AuthPages} />
        </BrowserRouter>
    );
}

export default Routes;