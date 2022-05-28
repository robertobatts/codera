import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <Nav defaultActiveKey='/' variant='pills' className='flex-column'>
      <Nav.Item>  
        <Nav.Link  as={Link} to='/'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>  
        <Nav.Link as={Link} to='/details/1'>Other stuff</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
