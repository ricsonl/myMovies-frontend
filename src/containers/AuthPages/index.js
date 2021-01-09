import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import HomeAccountPage from '../HomeAccountPage';
import CreateProfilePage from '../CreateProfilePage';
import HomeProfilePage from '../HomeProfilePage';
import WatchlistPage from '../WatchlistPage';
import SearchResultsPage from '../SearchResultsPage';

import UserMoviesContext from '../../context/UserMoviesContext';
import api from '../../services/api';

class AuthPages extends PureComponent {

  state = {
    auth: undefined,
    profileName: '',
    suggestedMovies: [],
    watchlist: [],
    searchResults: [],
  }

  setProfileName = (name) => {
    this.setState({ profileName: name });
  }
  setSuggestedMovies = (movies) => {
    this.setState({ suggestedMovies: movies });
  }
  setWatchlist = (movies) => {
    this.setState({ watchlist: movies });
  }
  setSearchResults = (movies) => {
    this.setState({ searchResults: movies });
  }

  componentDidMount() {
    this.checkAuth();

    const profileName = localStorage.getItem('profileName');
    this.setState({ profileName: profileName });
  }

  componentDidUpdate() {
    this.checkAuth();

    const profileName = localStorage.getItem('profileName');
    this.setState({ profileName: profileName });
  }

  checkAuth() {
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
        return;

      else if (response.data.id) {
        this.setState({
          watchlist: [...this.state.watchlist, response.data]
        });

        const watchlistIds = this.state.watchlist.map(movie => {
          return parseInt(movie.TMDB_id, 10);
        });

        const modifiedSearchResults = this.state.searchResults.map(movie => {
          movie.isOnWatchlist = watchlistIds.includes(movie.tmdbId);
          return movie;
        });

        this.setState({
          searchResults: modifiedSearchResults
        });
      }
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
        return;
      else {
        const modifiedWatchlist = this.state.watchlist.filter(movie => {
          return movie.id !== id;
        });
        this.setState({
          watchlist: modifiedWatchlist,
        })
      }
    });
  }

  render() {
    return this.state.auth ? (
      <UserMoviesContext.Provider value={{
        suggestedMovies: this.state.suggestedMovies,
        watchlist: this.state.watchlist,
        searchResults: this.state.searchResults,
        setSuggestedMovies: this.setSuggestedMovies,
        setWatchlist: this.setWatchlist,
        setSearchResults: this.setSearchResults,
      }}>
        
        <Route path="/accountHome" render={(props) => <HomeAccountPage history={props.history}/>}/>
        <Route path="/createProfile" render={(props) => <CreateProfilePage />}/>

        <NavBar history={this.props.history} profileName={this.state.profileName}>
          <Route path="/profileHome" render={(props) => <HomeProfilePage />}/>
          <Route path="/search/:text" render={(props) => <SearchResultsPage
            addWatchlistItem={this.addWatchlistItem}
            match={props.match}
          />}/>

          <Route path="/watchlist" render={(props) => <WatchlistPage
            removeWatchlistItem={this.removeWatchlistItem}
          />}/>
        </NavBar>

      </UserMoviesContext.Provider>

    ) : null
  }
}

export default AuthPages;