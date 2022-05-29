import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <Nav activeKey={location.pathname} variant='pills' className='flex-column'>
      <Nav.Item>  
        <Nav.Link  as={Link} eventKey='/' to='/'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>  
        <Nav.Link as={Link} eventKey='/other' to='/other'>Other stuff</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}