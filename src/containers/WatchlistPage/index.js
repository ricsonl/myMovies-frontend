import React, { PureComponent } from 'react';

import api from '../../services/api';

import Watchlist from '../../components/Watchlist';
import styles from './styles.module.css';

class WatchlistPage extends PureComponent {

  componentDidMount(){
    const loggedProf = localStorage.getItem('prof');
    const token = localStorage.getItem('token');

    api.get('/auth/watchlist', {
      headers: {
        logged_prof: loggedProf,
        'x-access-token': token
      }
    }).then(response => {
      if(response.data.authFailed){
        return;
      } else {
        this.props.setWatchlist(response.data);
      }
    });
  }

  render() {
    return(
      <> 
        <h2 className={styles.title}>Watchlist</h2>
        <Watchlist movies={this.props.watchlist} remove={this.props.removeWatchlistItem} />
      </>
    );
  }
}

export default WatchlistPage;