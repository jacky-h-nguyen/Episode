import React from 'react';
import InputField from "./InputField"
import SubmitButton from "./SubmitButton";
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import Homepage from "./Homepage"

class NewUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      item1: "",
      item2: "",
      item3: "",
      searchTerm: "",
      value: "",
      buttonDisabled: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var url = 'Search?term=' + this.state.value;
    window.location.href = url;
    event.preventDefault();
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      if (result && result.success) {
        User.isLoggedIn = true;
        User.username = result.username;
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  async doRegister() {
    try {
      let res = await fetch("register", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      User.username = result.username
      User.password = result.password
      this.resetForm();
      alert(result.msg);
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="loginForm">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Episode</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <form onSubmit={this.handleSubmit}>
            <label >
              <text style= {{color:"white"}}>Search:</text>&nbsp;
          <input type="text" value={this.state.value} onChange={this.handleChange} class="form-container" inline style={{ marginRight: 5 }} />
            </label>
            <input type="submit" value="Search" class="btn" style={{ backgroundColor: "white", color: "black", marginRight: 5 }} />
          </form>
          <Button variant="light" style={{ marginRight: 5 }} onClick={(e) => { e.preventDefault(); window.location.href = '/Login'; }}>Login</Button>{' '}
          <Button variant="light" onClick={(e) => { e.preventDefault(); window.location.href = '/Register'; }}>Register</Button>{' '}
        </Navbar>
        <Homepage />

      </div>
    );
  }
}

export default NewUserPage;
