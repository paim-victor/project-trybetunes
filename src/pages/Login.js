import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loading: false,
    desativado: true,
    entrada: '',
  };

  buttonOpen = () => {
    const { entrada } = this.state;
    const MIN_LENG = 3;
    if (entrada.length >= MIN_LENG) {
      this.setState({
        desativado: false,
      });
    }
  };

  validaInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonOpen);
  };

  lidaClick = () => {
    const { history } = this.props;
    const { entrada } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: entrada });
      history.push('/search');
    });
  };

  render() {
    const { desativado, loading } = this.state;
    if (loading) {
      return (<Carregando />);
    }

    return (
      <div data-testid="page-login">
        Login
        <label htmlFor="login-input">
          <input
            id="login-input"
            name="entrada"
            type="text"
            data-testid="login-name-input"
            onChange={ this.validaInput }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ desativado }
          onClick={ this.lidaClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
