import React, { Component } from 'react';

export class FavoriteSongsTable extends Component {
  static displayName = FavoriteSongsTable.name;

  constructor(props) {
    super(props);
    this.state = { songs: [], loading: true };
  }

  componentDidMount() {
    this.populateSongTable();
  }

  static renderSongsTable(songs) {
    return (
	  <>
        <table className='table table-striped align-middle'>
          <thead>
            <tr>
              <th style={{textAlign: 'right'}}>#</th>
              <th style={{width: '30%'}}>Song</th>
              <th style={{width: '20%'}}>Artist</th>
              <th style={{width: '25%'}}>Album</th>
              <th style={{width: '10%'}}>Genre</th>
              <th style={{width: '5%'}}>Time</th>
              <th colSpan={2} style={{textAlign: 'center', width: '10%'}}>Links</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) =>
              <tr key={song.songName}>
                <td style={{textAlign: 'right'}}>{index + 1}</td>
                <td>{song.songName}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>{song.time}</td>
                <td><a href={song.appleMusicLink} target="_blank" rel="noreferrer noopener">
                  <img src='images/applemusic.png' alt='Apple Music' length={45} width={45} /></a></td>
                <td><a href={song.spotifyLink} target="_blank" rel="noreferrer noopener">
                  <img src='images/spotify.png' alt='Spotify' length={36} width={36} /></a></td>
              </tr>
            )}
    	  </tbody>
    	</table>
	  </>
    );
  }

  render() {
    let songs = this.state.loading
      ? <p><em>Loading...</em></p>
      : FavoriteSongsTable.renderSongsTable(this.state.songs);

    return (
      <div>
        {songs}
      </div>
    );
  }

  async populateSongTable() {
    const songs = await fetch(`api/music/songs/${this.props.year}`);
    const songData = await songs.json();
    this.setState({ songs: songData, loading: false });
  }
}
