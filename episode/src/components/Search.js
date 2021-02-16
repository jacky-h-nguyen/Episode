import React from 'react';
import User from "./User"
import { Nav, Button, Navbar } from 'react-bootstrap';
import { ButtonGroup, Card, CardHeader, CardBody, CardTitle, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Label, FormGroup, Input, Table, Row, Col, UncontrolledTooltip } from "reactstrap";

var showsArray = [];

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: User.username,
            password: "",
            buttonDisabled: false,
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showShowsLoggedIn = this.showShowsLoggedIn.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        var url = 'Search?term=' + this.state.value;
        window.location.href = url;
        event.preventDefault();
    }

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const term = query.get("term");
        document.getElementById("demo").append(term);
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
        try {
            let res = await fetch("/search", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    term: term
                })
            });
            let result = await res.json();
            showsArray = result.array1
            this.setState({ searchResults: result.array1 });
        }
        catch (e) {
            console.log(e)
        }
    }

    showshows(object, index) {
        return (
            <tr key={index}>
                <td><img src={object.imageURL} width="100" height="150" /></td>
                <td style={{ textAlign: "center" }}>{object.show}</td>
            </tr>
        )
    }

    addToList = async (showName, showImageURL) => {
        var inputVal1 = showName;
        var inputVal2 = showImageURL;
        try {
            let res = await fetch("/doInsertShow", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: User.username,
                    item1: inputVal1,
                    item2: inputVal2
                })
            });
            alert("Added " + showName + " to your show List")
        }
        catch (e) {
            console.log(e);
        }
    }

    showShowsLoggedIn(object, index) {
        return (
            <tr key={index}>
                <td><img src={object.imageURL} width="100" height="150" /></td>
                <td>{object.show}</td>
                <td><button onClick={this.addToList.bind(this, object.show, object.imageURL)}>Add to List</button></td>
            </tr>
        )
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
    }

    render() {
        if (User.loading) {
            return (
                <div className="app">
                    <div className="container">
                        Loading..
                  </div>
                </div>
            );
        }
        else {
            if (User.isLoggedIn) {
                return (
                    <div className="app">
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
                        <br />
                        <Row className="justify-content-md-center">
                            <Col lg="6" md="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4" style={{ textAlign: "center" }}><p id="demo" style={{ color: "black", textAlign: "center" }}>Search Term: </p></CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table className="tablesorter">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th></th>
                                                    <th>TV Show Name</th>
                                                    <th>Add to List</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.searchResults.map(this.showShowsLoggedIn)}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                );
            }
            return (
                <div className="app">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>Episode</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                            <text style={{color:"white"}}>Search:</text>&nbsp;
          <input type="text" value={this.state.value} onChange={this.handleChange} class="form-container" inline style={{ marginRight: 5 }} />
                            </label>
                            <input type="submit" value="Search" class="btn" style={{ backgroundColor: "white", color: "black", marginRight: 5 }} />
                        </form>
                        <Button variant="light" style={{ marginRight: 5 }} onClick={(e) => { e.preventDefault(); window.location.href = '/Login'; }}>Login</Button>{' '}
                        <Button variant="light" onClick={(e) => { e.preventDefault(); window.location.href = '/Register'; }}>Register</Button>{' '}
                    </Navbar>
                    <Row className="justify-content-md-center">
                        <Col lg="6" md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4" style={{ textAlign: "center" }}><p id="demo" style={{ color: "black", textAlign: "center" }}>Search Term: </p></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter">
                                        <thead className="text-primary">
                                            <tr>
                                                <th></th>
                                                <th style={{ textAlign: "center" }}>show Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.searchResults.map(this.showshows)}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default Search