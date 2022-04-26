import React, { Component } from 'react';
import Header from '../Header';

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      verifyButton: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    const numeMenor = 2;
    this.setState({
      [name]: value,
    });
    if (value.length >= numeMenor) {
      this.setState({
        verifyButton: false,
      });
    }
  }

  render() {
    const { pesquisa, verifyButton } = this.state;
    return (
      <section
        data-testid="page-search"
      >
        <Header />
        <form>
          <label htmlFor="pesquisa">
            Nome da Banda ou Artista:
            <input
              type="text"
              id="pesquisa"
              name="pesquisa"
              value={ pesquisa }
              data-testid="search-artist-input"
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ verifyButton }
            onClick={ this.handleBtn }
          >
            Pesquisar
          </button>

        </form>
      </section>
    );
  }
}

export default Search;
