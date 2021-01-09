import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

import styles from './styles.module.css';

class NavBar extends PureComponent {

  state = {
    searchText: '',
    profileName: '',
  }

  componentDidMount(){
    const profileName = localStorage.getItem('profileName');
    this.setState({ profileName: profileName });
  }

  onSearch = (e) => {

    e.preventDefault();

    if(this.state.searchText !== ''){
      this.props.history.push(`/search/${this.state.searchText}`);
    }
  }

  render() {
    return (

      <div className={styles.navContainer}>

        <NavLink to={`/profileHome`} className={styles.logo}>
          <Logo/>
        </NavLink>

        <form onSubmit={this.onSearch}>
          <Input 
            type="text"
            placeholder="Buscar filmes" 
            value={this.state.searchText}
            onChange={e => this.setState({searchText: e.target.value})}
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
      
    );
  }
}

export default NavBar;