import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <>
        <Row>
          <h1>About Me!</h1>
        </Row>
        <Row>
          <p>I'm Wyatt, a Northern Kentucky University graduate with a Bachelor of 
             Computer Science degree and a minor of Mathematics.</p>
        </Row>
      </>
    );
  }
}
