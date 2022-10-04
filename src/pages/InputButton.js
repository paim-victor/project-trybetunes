import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class InputButton extends Component {
  render() {
    const { click, isDesabled, entrada, inputSearch } = this.props;
    return (
      <>
        <label htmlFor="input-search">
          <input
            data-testid="search-artist-input"
            id="input-search"
            value={ inputSearch }
            name="inputSearch"
            onChange={ entrada }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDesabled }
          onClick={ click }
        >
          Pesquisar

        </button>
      </>
    );
  }
}

InputButton.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  isDesabled: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
  entrada: PropTypes.func.isRequired,
};
