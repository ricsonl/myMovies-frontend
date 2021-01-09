import React, { Component } from 'react';

import UserMoviesContext from '../../context/UserMoviesContext';
import api from '../../services/api';

import ProfileItem from '../../components/ProfileItem';

import styles from './styles.module.css';

class HomeAccountPage extends Component {

  static contextType = UserMoviesContext;

  state = {
    profiles: [],
  }

  componentDidMount() {
    const loggedAcc = localStorage.getItem('acc');
    const token = localStorage.getItem('token');

    api.get('/auth/profiles', {
      headers: {
        logged_acc: loggedAcc,
        'x-access-token': token
      }
    }).then(response => {

      if (response.data.authFailed) {
        return;

      } else {
        this.setState({
          profiles: response.data
        });
      }
    });
  }

  onProfileClick = (id, name) => {
    localStorage.setItem('prof', id);
    localStorage.setItem('profileName', name);

    const token = localStorage.getItem('token');

    api.get('/auth/watchlist', {
      headers: {
        logged_prof: id,
        'x-access-token': token
      }
    }).then(response => {
      if(response.data.authFailed){
        return;
      } else {
        this.context.setWatchlist(response.data);
        this.props.history.push(`/profileHome`);
      }
    });
  }

  onAddProfileClick = () => {
    this.props.history.push(`/createProfile`);
  }

  render() {
    return (
      <>
        <h1 className={styles.title}>Selecione um perfil</h1>
        <ul className={styles.profileList}>
          {
            this.state.profiles.map(profile => {
              return <ProfileItem
                key={profile.id}
                name={profile.name}
                clicked={this.onProfileClick.bind(this, profile.id, profile.name)}
              />
            })
          }{
            this.state.profiles.length < 4 ? (
              <ProfileItem plusPlaceHolder
                clicked={this.onAddProfileClick.bind(this)}
              />
            ) : (
                null
            )
          }
        </ul>
      </>
    )
  }
}

export default HomeAccountPage;