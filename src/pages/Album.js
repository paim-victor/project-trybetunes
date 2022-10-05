import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import CardsMusicas from '../components/CardsMusicas';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      album: '',
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const search = await getMusics(params.id);
    const favs = await getFavoriteSongs();
    this.setState(
      { album: search, favorites: favs },
      () => this.setState({ loading: false }),
    );
  }

  render() {
    const { album, loading } = this.state;
    const checkado = (music) => {
      const { favorites } = this.state;
      return favorites.some((fav) => fav.trackId === music.trackId);
    };

    const favCheck = async (music) => {
      const { favorites } = this.state;
      if (checkado(music)) {
        this.setState({ loading: true });
        await removeSong(music);
        const favs = favorites.filter((e) => e.trackId !== music.trackId);
        this.setState({ loading: false, favorites: favs });
      } else {
        this.setState({ loading: true });
        await addSong(music);
        this.setState((prevState) => ({ loading: false,
          favorites: [...prevState.favorites, music] }));
      }
    };

    return (
      <>
        <Header />
        { loading && <Carregando /> }
        { !loading
        && (
          <div data-testid="page-album">
            { album && (
              <>
                {album.map((music, i) => (i === 0 ? (
                  <div key="foi">
                    <p
                      key={ album[0].artistName }
                      data-testid="artist-name"
                    >
                      {album[0].artistName}

                    </p>
                    <p
                      key={ album[0].collectionName }
                      data-testid="album-name"
                    >
                      {album[0].collectionName}

                    </p>
                  </div>
                ) : (

                  <CardsMusicas
                    { ...music }
                    checked={ checkado(music) }
                    favCheck={ favCheck }
                    key={ album[i].trackName }
                  />

                )))}
              </>
            )}
          </div>)}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
