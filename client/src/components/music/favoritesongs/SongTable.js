import React, { Component } from "react";

export class SongTable extends Component {
  static displayName = SongTable.name;

  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.populateSongsTable();
  }

  static renderSongTable(songs) {
    return (
      <>
        <table className="table table-striped" aria-labelledby="favoriteSongs">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Length</th>
              <th>Apple Music</th>
              <th>Spotify</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr>
                <td>{song.song_name}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>
                  {song.song_length.replace(/^00:(0?)/, "").replace(/^0/, "")}
                </td>
                <td>Apples</td>
                <td>Spootify</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  render() {
    let content = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      SongTable.renderSongTable(this.state.songList)
    );

    return <>{content}</>;
  }

  async populateSongsTable() {
    const params = new URLSearchParams();
    if (this.props.year !== undefined && this.props.year !== null) {
      params.append("year", this.props.year);
    }
    const response = await fetch(
      `api/music/favorite-songs?${params.toString()}`
    );
    const songList = await response.json();
    this.setState({ songList: songList, loading: false });
  }
}
