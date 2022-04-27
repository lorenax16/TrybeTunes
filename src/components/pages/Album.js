import propTypes from 'prop-types';
import React, { Component } from 'react';
import getMusics from '../../services/musicsAPI';
import Header from '../Header';
import MusicCard from '../MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      filterMusic: [],
    };
  }

  componentDidMount() {
    this.apiMusic();
  }

  apiMusic = () => {
    // preciso acssar o match que uma prop do react-router-dom parecido ao link
    // depois de macth tenho que acessar o params que contem o id que preciso como parametro
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    this.setState({}, async () => {
      const musica = await getMusics(id);
      // console.log(musica);
      const musicaFiltrada = musica.filter((el, index) => index !== 0);
      // console.log(musicaFiltrada);
      // // console.log(musica);
      this.setState({
        artistName: musica[0].artistName,
        collectionName: musica[0].collectionName,
        filterMusic: musicaFiltrada,
      });
    });
  }

  render() {
    const { artistName, collectionName, filterMusic } = this.state;
    return (
      <section>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            Nome do Artista ou Banda:
            {artistName}
          </p>
          <h3 data-testid="album-name">
            Nome do Album
            {collectionName}
          </h3>
        </div>
        {filterMusic.map((musica) => (<MusicCard
          key={ musica.trackId }
          trackId={ musica.trackId }
          trackName={ musica.trackName }
          previewUrl={ musica.previewUrl }
        />))}
      </section>
    );
  }
}
Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
