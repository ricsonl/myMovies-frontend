import React, { PureComponent } from 'react';

import { searchByText } from '../../services/tmdbHelpers';
import UserMoviesContext from '../../context/UserMoviesContext';

import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class SearchResultsPage extends PureComponent {

  static contextType = UserMoviesContext;

  componentDidMount() {
    const watchlistIds = this.context.watchlist.map(movie => {
      return parseInt(movie.TMDB_id, 10);
    });

    searchByText(this.props.match.params.text).then(response => {

      const modifiedSearchResults = response.map(movie => {
        movie.isOnWatchlist = watchlistIds.includes(movie.tmdbId);
        return movie;
      });

      this.context.setSearchResults(modifiedSearchResults);

    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.text !== this.props.match.params.text) {
      const watchlistIds = this.context.watchlist.map(movie => {
        return parseInt(movie.TMDB_id, 10);
      });

      searchByText(newProps.match.params.text).then(response => {

        const modifiedMovies = response.map(movie => {
          return {
            isOnWatchlist: watchlistIds.includes(movie.tmdbId),
            ...movie
          }
        });

        this.context.setSearchResults(modifiedMovies);

      });
    }
  }

  render() {
    return (
      <>
        <h2 className={styles.title}>Resultados da busca</h2>
        <MovieList movies={this.context.searchResults} add={this.props.addWatchlistItem} />
      </>
    )
  }
}

export default SearchResultsPage;