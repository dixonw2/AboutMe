import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>Wyatt Dixon</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="ms-auto">
              <Nav.Link href='/counter'>Counter</Nav.Link>
              <Nav.Link href='/fetch-data'>Weather</Nav.Link>
              <NavDropdown title='Music'>
                <NavDropdown.Item href='/music/favoritesongs'>Favorite Songs</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
} 