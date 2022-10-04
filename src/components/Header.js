import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  state = {
    loading: true,
    usuario: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const resposta = await getUser();
    // console.log(resposta);
    this.setState({
      usuario: resposta,
    }, () => {
      this.setState({
        loading: false,
      });
    // console.log(this.state);
    });
  };

  render() {
    const { loading, usuario } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <Carregando />}
        {!loading && <h1 data-testid="header-user-name">{usuario.name}</h1>}
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}