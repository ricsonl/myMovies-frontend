import React, { Component } from 'react';

import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class HomeProfilePage extends Component {

  state = {
    searchText: '',
    suggestedMovies: [],
  }

  render() {
    return(
      <> 
        <h2 className={styles.title}>Aqui estão alguns filmes que você pode gostar</h2>
        <MovieList movies={this.state.suggestedMovies} />
      </>
    )
  }
}

export default HomeProfilePage;