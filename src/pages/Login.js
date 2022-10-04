import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    carregando: false,
    desativado: true,
    entrada: '',
  };

  botaoValid = () => {
    const { entrada } = this.state;
    const MIN_LENG = 3;
    if (entrada.length >= MIN_LENG) {
      this.setState({
        desativado: false,
      });
    }
  };

  entradaValida = ({ a }) => {
    const { nome, valor } = a;
    this.setState({
      [nome]: valor,
    }, this.botaoValid);
  };

  click = () => {
    const { history } = this.props;
    const { entrada } = this.state;
    this.setState({
      carregando: true,
    }, async () => {
      await createUser({ nome: entrada });
      history.push('/search');
    });
  };

  render() {
    const { desativado, carregando } = this.state;
    if (carregando) {
      return (<Carregando />);
    }

    return (
      <div data-testid="page-login">
        Login
        <label htmlFor="login-input">
          <input
            id="login-input"
            nome="entrada"
            type="text"
            data-testid="login-nome-input"
            onChange={ this.entradaValida }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ desativado }
          onClick={ this.click }
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