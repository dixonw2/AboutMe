import React, { Component } from 'react';
import { Tabs, Tab, Container, Row } from 'react-bootstrap';
import { FavoriteSongsTable } from './FavoriteSongsTable';
import { FavoriteSongsComment } from './FavoriteSongsComment';

export class FavoriteSongs extends Component {
  static displayName = FavoriteSongs.name;

  constructor(props) {
    super(props);
    this.state = { years: [], loading: true };
  }

  componentDidMount() {
    document.title = 'Favorite Songs';
    this.populateYears();
  }

  // Dynamically add tabs and tables from the database
  render() {
    let songTables = this.state.loading ?
      <p><em>Loading...</em></p>
      : 
      <Container>
        <Tabs defaultActiveKey={this.state.years[0].id} className='mb-3'>
          {this.state.years.map(year =>
            <Tab key={year.id} eventKey={year.id} title={year.year}>
              <FavoriteSongsComment year={year.year} />
              <FavoriteSongsTable year={year.year} />
            </Tab>
          )}
        </Tabs>
      </Container>
    return (
      <>
        <h1>Favorite Songs</h1>
          <Container>
            <Row>
              {songTables}
            </Row>
          </Container>
      </>
    )
  }

  async populateYears() {
	  const years = await fetch('api/music/years/all');
    const yearData = await years.json();

    this.setState({years: yearData, loading: false });
  }
}
