import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Header from '../Header';
import Carregando from '../Loading';

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      verifyButton: true,
      loading: false,
      albuns: [],
      nome: '',
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

  handleBtn = async () => {
    const { pesquisa } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const album = await searchAlbumsAPI(pesquisa);
      console.log(album);
      this.setState((prevState) => ({
        pesquisa: '',
        loading: false,
        albuns: album,
        nome: prevState.pesquisa,
      }));
    });
  }

  mapMensagem() {
    const { albuns, nome } = this.state;
    if (albuns.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div>
        <p>{ `Resultado de álbuns de: ${nome}` }</p>
        <ul>
          {albuns.map((elemento, index) => (
            <li key={ index }>
              {elemento.collectionName}
              <Link
                data-testid={ `link-to-album-${elemento.collectionId}` }
                to={ `/album/${elemento.collectionId}` }
              >
                albuns
              </Link>
            </li>))}
        </ul>
      </div>
    );
  }

  render() {
    const { pesquisa, verifyButton, loading } = this.state;
    return (
      <section
        data-testid="page-search"
      >
        <Header />
        {loading ? <Carregando />
          : (
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
          )}
        { this.mapMensagem() }
      </section>
    );
  }
}

export default Search;
