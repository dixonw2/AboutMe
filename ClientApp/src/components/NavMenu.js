import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Navbar style={{width: "100%", paddingLeft: 10, paddingRight: 10}} 
          collapseOnSelect expand="lg" bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Wyatt Dixon</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='/counter'>Counter</Nav.Link>
            <Nav.Link href='/fetch-data'>Weather</Nav.Link>
            <NavDropdown align='end' title='Music'>
              <NavDropdown.Item href='/music/myhistory'>My History</NavDropdown.Item>
              <NavDropdown.Item href='/music/instrumentsplayed'>Instruments Played</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/music/favoritesongs'>Favorite Songs of the Year</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
} 