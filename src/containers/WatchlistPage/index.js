import React, { Component } from 'react';

import api from '../../services/api';

import NavBar from '../NavBar';
import Watchlist from '../../components/Watchlist';
import styles from './styles.module.css';

class WatchlistPage extends Component {

  state = {
    auth: undefined,
    watchlist: [],
  }

  componentDidMount(){
    const loggedProf = localStorage.getItem('prof');
    const token = localStorage.getItem('token');

    api.get('/auth/watchlist', {
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
          watchlist: response.data
        });
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
    return this.state.auth ? (
      <> 
        <NavBar history={this.props.history}/>
        <h2 className={styles.title}>Watchlist</h2>
        <Watchlist movies={this.state.watchlist} remove={this.removeWatchlistItem} />
      </>
    ) : null
  }
}

export default WatchlistPage;