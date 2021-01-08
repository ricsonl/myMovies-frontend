import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomeAccountPage from './containers/HomeAccountPage';
import CreateProfilePage from './containers/CreateProfilePage';
import HomeProfilePage from './containers/HomeProfilePage';
import WatchlistPage from './containers/WatchlistPage';
import SearchResultsPage from './containers/SearchResultsPage';

function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>

            <PrivateRoute path="/accountHome" component={HomeAccountPage} />
            <PrivateRoute path="/createProfile" component={CreateProfilePage} />
            <PrivateRoute path="/profileHome" component={HomeProfilePage} />
            <PrivateRoute path="/watchlist" component={WatchlistPage} />
            <PrivateRoute path="/search/:text" component={SearchResultsPage} />
            
            {/*<Route render={() => <Redirect to={{pathname: "/"}} />} />*/}
        </BrowserRouter>
    );
}

export default Routes;