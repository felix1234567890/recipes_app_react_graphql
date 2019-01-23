import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <Navbar color="success" dark>
        <NavbarBrand href="/" className="mr-auto">
          Recipe's list
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink to="/add" className="nav-item text-white">
              Add a recipe
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
