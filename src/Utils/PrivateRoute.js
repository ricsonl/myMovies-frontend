import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../services/api';

class PrivateRoute extends React.Component {

  state = {
    isAuthenticated: false,
  }

  async componentDidMount() {
    const token = localStorage.getItem('myMoviesToken');
    console.log(token)
    const response = await api.get('/auth', {
      headers: { 'x-access-token': token }
    });

    this.setState({ isAuthenticated: response.data.auth });
  }

  render() {
    console.log(this.state.isAuthenticated)
    const { component: Component, ...rest } = this.props;

    return (
      <Route 
          {...rest}
          render={props =>
            this.state.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            )
          }
      />
    )
  }

}

export default PrivateRoute;