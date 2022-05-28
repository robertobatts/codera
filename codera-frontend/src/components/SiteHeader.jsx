import React from 'react';
import { Navbar, Container, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <Navbar bg='light' fixed='top'>
      <Container  >
        <Navbar.Brand as={Link} to='/'>Codera</Navbar.Brand>
        <NavLink as={Link} to='/something'>Something</NavLink>
      </Container>
    </Navbar>
  )
}
