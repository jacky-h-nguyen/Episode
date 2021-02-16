import React from 'react';
import './App.css';
import NewUserPage from "./components/NewUserPage"
import User from './components/User.js';
import { observer } from "mobx-react";
import { BrowserRouter as Router, Link, Route, Switch, } from 'react-router-dom';
import Login from "./components/Login"
import Register from "./components/Register"
import MemberPage from "./components/MemberPage"
import Profile from "./components/Profile"
import Search from "./components/Search"

class App extends React.Component {

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
            <Router>
              <Route path="/" User={User.username} exact component={MemberPage} />
              <Route path="/Profile" exact component={Profile} />
              <Route exact path="/Search" component={Search} />
            </Router>
          </div>
        );
      }
      return (
        <div className="app">
          <Router>
            <Route path="/" exact component={NewUserPage} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
            <Route exact path="/Search" component={Search} />
          </Router>
        </div>

      );
    }
  }
}

export default observer(App);