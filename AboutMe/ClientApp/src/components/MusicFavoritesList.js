import React, { Component } from 'react';

export class MusicFavoritesList extends Component {
  static displayName = MusicFavoritesList.name;

  constructor(props) {
    super(props);
    this.state = { songs: [], loading: true };
  }

  componentDidMount() {
    this.populateSongData();
  }

  static renderSongsTable(songs) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Time</th>
            <th>Streaming Links</th>
          </tr>
        </thead>
        <tbody>
          {songs.map(song =>
            <tr key={song.id}>
              <td>{song.song}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <td>{song.time}</td>
              <td><a href={song.appleMusicLink} target="_blank">Apple</a> <a href={song.spotifyLink} target="_blank">Spoot</a></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : MusicFavoritesList.renderSongsTable(this.state.songs);

    return (
      <div>
        <h1 id="tabelLabel" >Favorite Songs List of{this.state.loading ? "..." : " " + this.state.songs[0].year}</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateSongData() {
    const response = await fetch('music');
    const data = await response.json();
    this.setState({ songs: data, loading: false });
  }
}
