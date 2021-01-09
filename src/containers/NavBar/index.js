import React, { PureComponent } from 'react';
import { NavLink, BrowserRouter, Route } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import HomeProfilePage from '../../containers/HomeProfilePage';
import WatchlistPage from '../../containers/WatchlistPage';
import SearchResultsPage from '../../containers/SearchResultsPage';

import AppContext from '../../context/AppContext';
import api from '../../services/api';

import styles from './styles.module.css';

class NavBar extends PureComponent {

  state = {
    auth: undefined,
    searchText: '',
    profileName: '',
    suggestedMovies: [],
    watchlist: [],
    searchResults: [],
  }

  setAuth = (auth) => {
    this.setState({auth: auth});
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

  onSearch = (e) => {

    e.preventDefault();

    if (this.state.searchText !== '') {
      this.props.history.push(`/search/${this.state.searchText}`);
    }
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
    return (
      <>
        <div className={styles.navContainer}>

          <NavLink to={`/profileHome`} className={styles.logo}>
            <Logo />
          </NavLink>

          <form onSubmit={this.onSearch}>
            <Input
              type="text"
              placeholder="Buscar filmes"
              value={this.state.searchText}
              onChange={e => this.setState({ searchText: e.target.value })}
            />
            <button type="submit" className={styles.searchButton}>
              Buscar
            </button>
          </form>

          <NavLink to={`/watchlist`} className={styles.navItem}>
            Watchlist
          </NavLink>

          <NavLink to={`/accountHome`} className={styles.navItem}>
            {this.state.profileName}
            <p>trocar perfil</p>
          </NavLink>

        </div>
        {
          <AppContext.Provider value={{
            auth: this.state.auth,
            searchText: this.state.searchText,
            profileName: this.state.profileName,
            suggestedMovies: this.state.suggestedMovies,
            watchlist: this.state.watchlist,
            searchResults: this.state.searchResults,

            setAuth: this.setAuth,
            setProfileName: this.setProfileName,
            setSuggestedMovies: this.setSuggestedMovies,
            setWatchlist: this.setWatchlist,
            setSearchResults: this.setSearchResults,
          }}>
            <Route path="/profileHome" render={(props) => <HomeProfilePage 
                                                              movies={this.state.suggestedMovies}
                                                          />}
            />
            <Route path="/search/:text" render={(props) => <SearchResultsPage
                                                              movies={this.state.searchResults}
                                                           />}
            />
            <Route path="/watchlist" render={(props) => <WatchlistPage
                                                            setAuth={this.setAuth}
                                                            watchlist={this.state.watchlist}
                                                            setWatchlist={this.setWatchlist}
                                                            removeWatchlistItem={this.removeWatchlistItem}
                                                        />}
            />
          </AppContext.Provider>
        }
      </>

    );
  }
}

export default NavBar;