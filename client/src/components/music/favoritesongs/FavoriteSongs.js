import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { SongTable } from "./SongTable";
import { YearlyComment } from "./YearlyComment";

export class FavoriteSongs extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { years: [], loading: true };
  }

  componentDidMount() {
    this.getYears();
  }

  static renderSongsTabs(years) {
    return (
      <>
        <Tabs defaultActiveKey={years[0]} id="years-tabs" className="mb-3">
          {years.map((year) => (
            <Tab eventKey={year} title={year}>
              <YearlyComment year={year} />
              <SongTable year={year} />
            </Tab>
          ))}
        </Tabs>
      </>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderSongsTabs(this.state.years)
    );

    return (
      <>
        <h1 id="favoriteSongs">13 Favorite Songs of the Year</h1>
        {contents}
      </>
    );
  }

  async getYears() {
    const response = await fetch("api/music/favorite-songs/years");
    const years = await response.json();
    this.setState({ years: years, loading: false });
  }
}
