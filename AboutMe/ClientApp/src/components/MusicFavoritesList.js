import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { SongTable } from './SongTable';

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
      <>
        <Tabs defaultActiveKey="2017" id="uncontrolled-tab-example">
          <Tab eventKey="2017" title="2017">
            <SongTable year='2017'/>
          </Tab>
          <Tab eventKey="2018" title="2018">
            <SongTable year='2018'/>
          </Tab>
          <Tab eventKey="2019" title="2019">
            <SongTable year='2019'/>
          </Tab>
        </Tabs>
      </>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : MusicFavoritesList.renderSongsTable(this.state.songs);

    return (
      <div>
        <h1 id="tabelLabel" style={{textAlign: "center"}}>Favorite Songs List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateSongData() {
    const response = await fetch('api/music');
    const data = await response.json();
    this.setState({ songs: data, loading: false });
  }
}
