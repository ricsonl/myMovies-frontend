import React, { Component } from 'react';

import api from '../../services/api';

import NavBar from '../NavBar';
import MovieList from '../../components/MovieList';
import styles from './styles.module.css';

class HomeProfilePage extends Component {

  state = {
    auth: undefined,
    searchText: '',
    suggestedMovies: [],
  }

  componentDidMount(){
    this.checkAuth();

    /*const genres = [];
    const response = await searchByGenre(genres);
    this.setState({ 
      suggestedMovies: response.data
    });*/

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

  render() {
    return this.state.auth ? (
      <> 
        <NavBar match={this.props.match} history={this.props.history}/>
        <h2 className={styles.title}>Aqui estão alguns filmes que você pode gostar</h2>
        <MovieList movies={this.state.suggestedMovies} />
      </>
    ) : null
  }
}

export default HomeProfilePage;