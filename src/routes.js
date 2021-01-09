import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import CreateProfilePage from './containers/CreateProfilePage';
import NavBar from './containers/NavBar';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/accountHome" component={HomeAccountPage} />
            <Route path="/createProfile" component={CreateProfilePage} />
            <Route path="/" render={() => <NavBar />} />
        </BrowserRouter>
    );
}

export default Routes;