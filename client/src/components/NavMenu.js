import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { NavDropdown } from "react-bootstrap";

export default function NavMenu() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand tag={Link} to="/">
          AboutMe
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/triple-triad">
                Triple Triad
              </NavLink>
            </NavItem>

            <NavDropdown
              title="Music"
              className="text-dark"
              id="music-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                className="text-dark"
                to="/music/favorites"
              >
                Favorites
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
