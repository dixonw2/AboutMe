import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
        <NavMenu />
        <Container fluid style={{paddingLeft: 100, paddingRight: 100}}>
          {this.props.children}
        </Container>
      </>
    );
  }
}
