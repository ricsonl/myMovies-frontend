import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import CreateProfilePage from './containers/CreateProfilePage';
import NavBarPages from './containers/NavBarPages';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/accountHome" component={HomeAccountPage} />
            <Route path="/createProfile" component={CreateProfilePage} />
            <Route path="/" component={NavBarPages} />
        </BrowserRouter>
    );
}

export default Routes;