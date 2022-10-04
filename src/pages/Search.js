import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import InputButton from './InputButton';

const objPadrao = {
  inputSearch: '',
  isDesabled: true,
  album: [],
};

export default class Search extends Component {
  state = {
    ...objPadrao,
    search: '',
    loading: false,
    btnSearch: false,
  };

  entrada = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState((prev) => ({
        isDesabled: (prev.inputSearch.length <= 1),
      }));
    });
  };

  click = () => {
    this.setState((prev) => ({
      search: prev.inputSearch,
      loading: true,
      btnSearch: false,
    }), () => {
      this.setState({
        ...objPadrao,
      }, async () => {
        const { search } = this.state;
        const resposta = await searchAlbumsAPI(search);
        this.setState({
          album: resposta,
          loading: false,
          btnSearch: true,
        }, () => {
          console.log(this.state);
        });
      });
    });
  };

  render() {
    const { inputSearch, isDesabled,
      loading, search, album, btnSearch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {loading ? <Carregando /> : (
            <InputButton
              click={ this.click }
              isDesabled={ isDesabled }
              entrada={ this.entrada }
              inputSearch={ inputSearch }
            />
          )}
          {
            btnSearch && (album.length === 0) ? <p>Nenhum álbum foi encontrado</p> : (
              btnSearch && (
                <>
                  <p>{`Resultado de álbuns de: ${search}`}</p>
                  {album.map((el, i) => (
                    <Link
                      data-testid={ `link-to-album-${el.collectionId}` }
                      to={ `/album/${el.collectionId}` }
                      key={ i + el.collectionId }
                    >
                      <p key={ i }>{JSON.stringify(el)}</p>
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
