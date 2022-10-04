import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import InputButton from './InputButton';

const obj = {
  entradaProcurar: '',
  desabilitado: true,
  album: [],
};

export default class Procurar extends Component {
  state = {
    ...obj,
    procurar: '',
    loading: false,
    botaoProcurar: false,
  };

  entrada = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState((prev) => ({
        desabilitado: (prev.entradaProcurar.length <= 1),
      }));
    });
  };

  click = () => {
    this.setState((prev) => ({
      procurar: prev.entradaProcurar,
      loading: true,
      botaoProcurar: false,
    }), () => {
      this.setState({
        ...obj,
      }, async () => {
        const { procurar } = this.state;
        const resposta = await searchAlbumsAPI(procurar);
        this.setState({
          album: resposta,
          loading: false,
          botaoProcurar: true,
        }, () => {
          console.log(this.state);
        });
      });
    });
  };

  render() {
    const { entradaProcurar, desabilitado, loading,
      procurar, album, botaoProcurar } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-procurar">
          {loading ? <Carregando /> : (
            <InputButton
              click={ this.click }
              desabilitado={ desabilitado }
              entrada={ this.entrada }
              entradaProcurar={ entradaProcurar }
            />
          )}
          {
            botaoProcurar && (album.length === 0) ? <p>Nenhum álbum foi encontrado</p> : (
              botaoProcurar && (
                <>
                  <p>{`Resultado de álbuns de: ${procurar}`}</p>
                  {album.map((elemento, indice) => (
                    <Link
                      data-testid={ `link-to-album-${elemento.collectionId}` }
                      to={ `/album/${elemento.collectionId}` }
                      key={ indice + elemento.collectionId }
                    >
                      <p key={ indice }>{JSON.stringify(elemento)}</p>
                    </Link>
                  ))}
                </>
              )
            )
          }
        </div>
      </>
    );
  }
}
