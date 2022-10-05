import PropTypes from 'prop-types';
import React from 'react';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checkFavorite,
      checked,
    } = this.props;

    return (
      <>
        <p>{ trackName }</p>
        <label htmlFor="fav">
          Favorita
          <input
            name="fav"
            id="fav"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ () => checkFavorite(this.props) }
            checked={ checked }
          />
        </label>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  checkFavorite: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
