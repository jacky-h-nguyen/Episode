import React from 'react';
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import Homepage from "./Homepage"
import Search from "./Search"
import { BrowserRouter as Router, Link, Route, Switch, } from 'react-router-dom';

class MemberPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: User.username,
            password: "",
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

    async componentDidMount() {
        try {
            let res = await fetch("./isLoggedIn", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            let result = await res.json();
            if (result && result.success) {
                User.loading = false;
                User.isLoggedIn = true;
                User.username = result.username;
            }
            else {
                User.loading = false;
                User.isLoggedIn = false;
            }
        }
        catch (e) {
            User.loading = false;
            User.isLoggedIn = false;
        }
    }

    async doLogout() {
        try {
            let res = await fetch("./logout", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            let result = await res.json();
            if (result && result.success) {
                User.isLoggedIn = false;
                User.username = "";
            }
        }
        catch (e) {
            console.log(e)
        }
        window.location.href = "/";
    }



    render() {
        return (
            <div className="loginForm">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Episode</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Profile">Profile</Nav.Link>
                    </Nav>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <text style={{color:"white"}}>Search:</text>&nbsp;
          <input type="text" value={this.state.value} onChange={this.handleChange} class="form-container" inline style={{ marginRight: 5 }} />
                        </label>
                        <input type="submit" value="Search" class="btn" style={{ backgroundColor: "white", color: "black", marginRight: 5 }} />
                    </form>
                    <div className="Welcome" style={{ display: "block", fontStyle: "bold", color: "white" }}>
                        &nbsp;&nbsp;&nbsp;Welcome, {User.username} &nbsp;&nbsp;&nbsp;
                    </div>
                    <Button variant="light" onClick={() => this.doLogout()}>Logout</Button>{' '}
                </Navbar>
                <Homepage />
            </div>
        );
    }
}

export default MemberPage;
