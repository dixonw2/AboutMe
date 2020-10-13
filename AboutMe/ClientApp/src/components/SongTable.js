import React, { Component } from 'react';

export class SongTable extends Component {
    static displayName = SongTable.name;

    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            comment: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateSongData(this.props.year);
        this.getYearComment(this.props.year);
    }

    static renderSongsTable(songs) {
        return (
            <>
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
            </>
        );
    }

    render() {
        let songs = this.state.loading
            ? <p><em>Loading...</em></p>
            : SongTable.renderSongsTable(this.state.songs);
        let comment = this.state.loading
            ? <p></p>
            : this.state.comment.map(p =>
                <p>{p}</p>
            );

        return (
        <div>
            <h2 id="tabelLabel" >Favorite Songs List of {this.props.year}</h2>
            {comment}
            {songs}
        </div>
        );
    }

    async populateSongData(year) {
        const response = await fetch('api/music/getyear/' + year);
        const data = await response.json();
        this.setState({ songs: data, loading: false });
    }

    async getYearComment(year) {
        const response = await fetch('api/music/getyearcomment/' + year);
        let data = await response.text();
        data = data.split('--+--');
        this.setState({ comment: data, loading: false });
    }
}