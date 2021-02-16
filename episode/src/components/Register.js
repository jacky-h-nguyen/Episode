import React from 'react';
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap';
import RegisterBox from "./RegisterBox"

const Register = () => {

  return (
     <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Episode</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Button variant="light" style={{ marginRight: 5 }} onClick={(e) => {e.preventDefault();window.location.href = '/Login';}}>Login</Button>{' '}
          <Button variant="light" onClick={(e) => {e.preventDefault();window.location.href = '/Register';}}>Register</Button>{' '}
        </Navbar>
        <RegisterBox/>
      </div>

  )
}

export default Register