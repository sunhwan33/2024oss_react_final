import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/">
        {/* Replace with your logo if available */}
        <img
          src="/logo192.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Site Logo"
        />{' '}
        도서관 관리 시스템
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/list">대출현황·갱신</Nav.Link>
          {/* <Nav.Link as={Link} to="/myreserve/list">예약현황</Nav.Link> */}
          {/* Add more navigation links as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
