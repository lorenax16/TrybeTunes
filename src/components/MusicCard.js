import propTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Loading';

export class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  favoritas = async () => {
    const { trackId } = this.props;
    const { checked } = this.state;
    if (checked === false) {
      this.setState({
        loading: true,
      });
      await addSong(trackId);
      this.setState({
        checked: true,
        loading: false,
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
};

export default MusicCard;
