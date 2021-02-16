import React from 'react';
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap';
import LoginBox from "./LoginBox"

const Login = () => {

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
        <LoginBox/>
      </div>

  )
}

export default Login