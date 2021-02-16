import React from 'react';
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap'

class Profile extends React.Component {
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
    try {
      let res = await fetch("/displayData", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }, body: JSON.stringify({
          username: User.username
        })
      });
      let result = await res.json();
      result = result.array1;
      var lengthOf, i;
      lengthOf = result.length;
      var table = document.createElement('table');
      table.className = "table table-striped"

      var thead = document.createElement('thead');
      var tr = document.createElement("tr")
      var th = document.createElement('th');
      var textnode = document.createTextNode("");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)

      var th = document.createElement('th');
      var textnode = document.createTextNode("Show Name");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)


      var th = document.createElement('th');
      var textnode = document.createTextNode("Delete");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)

      document.getElementById("demo").appendChild(table);
      for (i = 0; i < lengthOf; i++) {
        table.className = "table table-striped"
        var thead = document.createElement('tbody');
        var tr = document.createElement("tr")

        var th = document.createElement('th');
        var imageNode = document.createElement("IMG");
        imageNode.setAttribute("src", result[i].imageURL)
        imageNode.setAttribute("width", "150");
        imageNode.setAttribute("height", "200");
        th.appendChild(imageNode)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        var th = document.createElement('th');
        var textnode = document.createTextNode(result[i].show);
        th.appendChild(textnode)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        var th = document.createElement('th');
        var button2 = document.createElement('button');
        button2.innerHTML = 'Remove from list';
        var y = result[i].show
        button2.addEventListener('click', this.doDelete.bind(this, y));
        th.appendChild(button2)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        document.getElementById("demo").appendChild(table);
      }
    }
    catch (e) {
      console.log(e)
    }
  }


  async doDelete(a) {
    try {
      let res = await fetch("/doDeleteshow", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }, body: JSON.stringify({
          username: User.username,
          show: a
        })
      });
      let result = await res.json();
    }
    catch (e) {
    }
    try {
      let res = await fetch("/displayData", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }, body: JSON.stringify({
          username: User.username
        })
      });
      let result = await res.json();
      result = result.array1;
      var lengthOf, i;
      lengthOf = result.length;
      document.getElementById("demo").innerHTML = "";
      var table = document.createElement('table');
      table.className = "table table-striped"

      var thead = document.createElement('thead');
      var tr = document.createElement("tr")

      var th = document.createElement('th');
      var textnode = document.createTextNode("");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)

      var th = document.createElement('th');
      var textnode = document.createTextNode("show Name");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)

      var th = document.createElement('th');
      var textnode = document.createTextNode("Delete");
      th.appendChild(textnode)
      tr.appendChild(th)
      thead.appendChild(tr)
      table.appendChild(thead)

      document.getElementById("demo").appendChild(table);
      for (i = 0; i < lengthOf; i++) {
        table.className = "table table-striped"
        var thead = document.createElement('tbody');
        var tr = document.createElement("tr")

        var th = document.createElement('th');
        var imageNode = document.createElement("IMG");
        imageNode.setAttribute("src", result[i].imageURL)
        imageNode.setAttribute("width", "150");
        imageNode.setAttribute("height", "200");
        th.appendChild(imageNode)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        var th = document.createElement('th');
        var textnode = document.createTextNode(result[i].show);
        th.appendChild(textnode)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        var th = document.createElement('th');
        var button2 = document.createElement('button');
        button2.innerHTML = 'Remove from list';
        var y = result[i].show
        button2.addEventListener('click', this.doDelete.bind(this, y));
        th.appendChild(button2)
        tr.appendChild(th)
        thead.appendChild(tr)
        table.appendChild(thead)

        document.getElementById("demo").appendChild(table);
      }
    }
    catch (e) {
      console.log(e)
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

  async doSearch() {
    var Search = document.getElementById("Search").Value;
    console.log(Search)
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
          <div className="Welcome" style={{ display: "block", fontStyle: "bold", color:"white" }}>
            &nbsp;&nbsp;&nbsp;Welcome, {User.username} &nbsp;&nbsp;&nbsp;
                    </div>
          <Button variant="light" onClick={() => this.doLogout()}>Logout</Button>{' '}
        </Navbar>
        <br />
        <h4 style={{ textAlign: "center" }}>{User.username}'s TV Show List</h4>
        <br />
        <p id="demo" style={{ color: "black", textAlign: "center" }} ></p>
      </div>
    );
  }
}

export default Profile;
