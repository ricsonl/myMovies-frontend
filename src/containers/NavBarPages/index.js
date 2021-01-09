import React, { PureComponent } from 'react';
import { NavLink, Route } from 'react-router-dom';

import HomeProfilePage from '../HomeProfilePage';
import WatchlistPage from '../WatchlistPage';
import SearchResultsPage from '../SearchResultsPage';

import api from '../../services/api';

class NavBarPages extends PureComponent {

  state = {
    auth: undefined,
    profileName: '',
    suggestedMovies: [],
    watchlist: [],
    searchResults: [],
  }

  setProfileName = (name) => {
    this.setState({profileName: name});
  }
  setSuggestedMovies= (movies) => {
    this.setState({suggestedMovies: movies});
  }
  setWatchlist = (movies) => {
    this.setState({watchlist: movies});
  }
  setSearchResults = (movies) => {
    this.setState({searchResults: movies});
  }

  componentDidMount(){
    this.checkAuth();

    const profileName = localStorage.getItem('profileName');
    this.setState({ profileName: profileName });
  }

  componentDidUpdate(){
    this.checkAuth();

    const profileName = localStorage.getItem('profileName');
    this.setState({ profileName: profileName });
  }

  checkAuth(){
    const loggedAcc = localStorage.getItem('acc');
    const token = localStorage.getItem('token');

    api.get('/auth/profiles', {
      headers: {
        logged_acc: loggedAcc,
        'x-access-token': token
      }
    }).then(response => {

      if (response.data.authFailed) {
        this.setState({ auth: false });

      } else {
        this.setState({
          auth: true,
        });
      }
    });
  }

  addWatchlistItem = (id) => {
    const loggedProf = localStorage.getItem('prof');
    const token = localStorage.getItem('token');

    api.post(`/auth/watchlist/${id}`, null, {
      headers: {
        logged_prof: loggedProf,
        'x-access-token': token
      }
    }).then(response => {
      if (response.data.authFailed) 
        this.setState({ auth: false });
      else
        this.setState({
          auth: true,
          watchlist: [...this.state.watchlist, response]
        })

    });
  }

  removeWatchlistItem = (id) => {
    const loggedProf = localStorage.getItem('prof');
    const token = localStorage.getItem('token');

    api.delete(`/auth/watchlist/${id}`, {
      headers: {
        logged_prof: loggedProf,
        'x-access-token': token
      }
    }).then(response => {
      if (response.data.authFailed) 
        this.setState({ auth: false });
      else{
        const modifiedWatchlist = this.state.watchlist.filter((movie) => {
          return movie.id !== id;
        });
        this.setState({
          auth: true,
          watchlist: modifiedWatchlist,
        })
      }
    });
  }

  render() {
    console.log(this.state)
    return this.state.auth ? (
      <> 
        <NavBar profileName={this.state.profileName}/>

        <Route path="/profileHome" render={(props) => <HomeProfilePage 
                                                          movies={this.state.suggestedMovies}
                                                      />}
        />

        <Route path="/search/:text" render={(props) => <SearchResultsPage
                                                          movies={this.state.searchResults}
                                                          watchlist={this.state.watchlist}
                                                          setSearchResults={this.setSearchResults}
                                                          addWatchlistItem={this.addWatchlistItem}
                                                          match={props.match}
                                                      />}
        />

        <Route path="/watchlist" render={(props) => <WatchlistPage
                                                        watchlist={this.state.watchlist}
                                                        setWatchlist={this.setWatchlist}
                                                        removeWatchlistItem={this.removeWatchlistItem}
                                                    />}
        />
      </>

    ) : null
  }
}

export default NavBarPages;