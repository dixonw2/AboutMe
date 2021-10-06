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
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Time</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) =>
              <tr key={song.songName}>
                <td align='right'>{index + 1}</td>
                <td>{song.songName}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>{song.time}</td>
                <td><a href={song.appleMusicLink} target="_blank" rel="noreferrer noopener">aml</a> <a href={song.spotifyLink} target="_blank" rel="noreferrer noopener">sl</a></td>
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
