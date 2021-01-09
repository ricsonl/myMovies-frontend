import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import styles from './styles.module.css';

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    error: '',
  }

  handleLogin = async (e) => {
    e.preventDefault();
    
    api.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      if (response.data.id) {
        const { id, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('acc', id);
        
        this.props.history.push(`/accountHome`);

      }
      else this.setState({ error: response.data.message });
    });
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <Form title={<Logo/>} onSubmit={this.handleLogin}>

            <Input type="text"
                  placeholder="Email" 
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
            />

            <Input type="password"
                  placeholder="Senha" 
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
            />

            <div className={styles.error}>{this.state.error}</div>
            <Button title="Login" type="submit"/>
            <p>Não tem uma conta? <Link to="/signup" className={styles.signupLink}> Cadastrar </Link></p>
        
        </Form>
      </div>
    );
  }
}

export default LoginPage;