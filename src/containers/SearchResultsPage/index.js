import React, { Component } from 'react';

import api from '../../services/api';
import { searchByText } from '../../services/tmdbHelpers';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class SearchResultsPage extends Component {

  state = {
    auth: undefined,
    searchText: '',
    watchlistIds: [],
    searchResults: [],
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

      if (response.data.authFailed) {
        this.setState({ auth: false });

      } else {

        const watchlistIds = response.data.map(movie => {
          return movie.TMDB_id;
        })

        this.setState({
          auth: true,
          searchText: this.props.match.params.text,
          watchlistIds: watchlistIds
        });
    
        searchByText(this.props.match.params.text).then(response => {

          const modifiedMovies = response.map( movie => {
            return {
              isOnWatchlist: this.state.watchlistIds.includes(movie.tmdbId),
              ...movie
            }
          });
    
          this.setState({searchResults: modifiedMovies});
    
        });
      }
    });
  }

  
  addToWatchlist = async (id) => {
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
          watchlistIds: [...this.state.watchlistIds, response.TMDB_id]
        })

    });
  }

  render() {
    return this.state.auth ? (
      <> 
        <NavBar history={this.props.history}/>
        <h2 className={styles.title}>Resultados da busca</h2>
        <MovieList movies={this.state.searchResults} add={this.addToWatchlist} />
      </>
    ) : null
  }
}

export default SearchResultsPage;