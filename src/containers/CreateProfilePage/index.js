import React, { Component } from 'react';

import Logo from '../../components/Logo';
import Form from '../../components/Form';
import FormSection from '../../components/Form/FormSection';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import styles from './styles.module.css';

class LoginPage extends Component {

  state = {
    auth: undefined,
    name: '',
    error: ''
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

      this.setState({ auth: true });

      if (response.data.authFailed) {
        this.setState({ auth: false });

      } else {
        this.setState({
          auth: true
        });
      }
    });
  }

  handleCreate = async (e) => {
    e.preventDefault();

    const loggedAcc = localStorage.getItem('acc');
    const token = localStorage.getItem('token');

    api.post('/auth/profiles', { name: this.state.name }, {
      headers:  {
        logged_acc: loggedAcc,
        'x-access-token': token
      }
    }).then(response => {
      if (response.data.id) {

        const { id, name } = response.data;
        localStorage.setItem('prof', id);
        localStorage.setItem('profileName', name);

        this.props.history.push(`/profileHome`);

      }
      else this.setState({ error: response.data.message });
    });

  }

  render() {
    return this.state.auth ? (
      <div className={styles.createProfileContainer}>
        <Form title={<Logo />} onSubmit={this.handleCreate}>

          <FormSection title="Criar perfil na conta">
            <Input type="text"
              placeholder="Nome"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormSection>
          <div className={styles.error}>{this.state.error}</div>
          <Button title="Criar" type="submit" />

        </Form>
      </div>
    ) : null
  }
}

export default LoginPage;