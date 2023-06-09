import propTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const apiFavorita = await getFavoriteSongs();
    this.setState({ loading: true });
    const algunsFavorito = apiFavorita.some((el) => el.trackId === trackId);
    console.log(algunsFavorito);
    this.setState({
      checked: algunsFavorito,
      loading: false,
    });
  }

  favoritas = async () => {
    const { musica } = this.props;
    const { checked } = this.state;
    if (checked === false) {
      this.setState({
        loading: true,
      });
      await addSong(musica);
      this.setState({
        checked: true,
        loading: false,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? <Carregando /> : (
          <div>
            <p>{trackName}</p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="input">
              <input
                onChange={ this.favoritas }
                checked={ checked }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  musica: propTypes.shape.isRequired,
};

export default MusicCard;
