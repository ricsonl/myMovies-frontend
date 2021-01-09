import React, { PureComponent } from 'react';

import { searchByText } from '../../services/tmdbHelpers';

import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class SearchResultsPage extends PureComponent {

  componentDidMount(){

    const watchlistIds = this.props.watchlist.map(movie => {
      return movie.TMDB_id;
    });

    searchByText(this.props.match.params.text).then(response => {

      const modifiedMovies = response.map( movie => {
        return {
          isOnWatchlist: watchlistIds.includes(movie.tmdbId),
          ...movie
        }
      });

      this.props.setSearchResults(modifiedMovies);

    });
  }

  componentWillReceiveProps(newProps){
    if(newProps.match.params.text != this.props.match.params.text){
      const watchlistIds = newProps.watchlist.map(movie => {
        return movie.TMDB_id;
      });
  
      searchByText(newProps.match.params.text).then(response => {
  
        const modifiedMovies = response.map( movie => {
          return {
            isOnWatchlist: watchlistIds.includes(movie.tmdbId),
            ...movie
          }
        });
  
        newProps.setSearchResults(modifiedMovies);
  
      });
    }
  }

  render() {
    console.log('a')
    return (
      <> 
        <h2 className={styles.title}>Resultados da busca</h2>
        <MovieList movies={this.props.movies} add={this.props.addWatchlistItem} />
      </>
    )
  }
}

export default SearchResultsPage;