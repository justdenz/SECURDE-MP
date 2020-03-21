import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import LoginForm from "./modules/login/Page"
import RegisterForm from "./modules/forgot/Page"
import ForgotForm from "./modules/forgot/Page"
import Dashboard from "./modules/dashboard/Page"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {} //determines if there is a user logged in
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/forgot" component={ForgotForm}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

