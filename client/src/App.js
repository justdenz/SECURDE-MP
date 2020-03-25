import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import LoginForm from "./modules/login/Page"
import RegisterForm from "./modules/signup/Page"
import ForgotForm from "./modules/forgot/Page"
import Dashboard from "./modules/dashboard/Page"
import Admin from "./modules/admin/Page"
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/forgot" component={ForgotForm}></Route>
            {this.props.userType !== "" && <Route path="/dashboard" exact component={Dashboard}></Route>}
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  user: state.simpleReducer.user,
  userType: state.simpleReducer.userType
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

