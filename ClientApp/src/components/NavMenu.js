import React, { Component } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Row>
              <Col>
                <Navbar.Brand href='/'>Wyatt Dixon</Navbar.Brand>
              </Col>
              <Col>
                <Nav>
                  <Nav.Link href='/counter'>Counter</Nav.Link>
                  <Nav.Link href='/fetch-data'>Weather</Nav.Link>
                  <NavDropdown title='Music'>
                    <NavDropdown.Item href='/music/favoritesongs'>Favorite Songs of the Year</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    );
  }
}