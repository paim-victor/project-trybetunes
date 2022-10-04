import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class InputButton extends Component {
  render() {
    const { click, desabilitado, entrada, procurar } = this.props;
    return (
      <>
        <label htmlFor="input-search">
          <input
            data-testid="search-artist-input"
            id="input-search"
            value={ procurar }
            name="procurar"
            onChange={ entrada }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ desabilitado }
          onClick={ click }
        >
          Pesquisar

        </button>
      </>
    );
  }
}

InputButton.propTypes = {
  procurar: PropTypes.string.isRequired,
  desabilitado: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
  entrada: PropTypes.func.isRequired,
};
