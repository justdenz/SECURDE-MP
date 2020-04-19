import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import './App.css';

import LoginForm from "./modules/login/Page"
import RegisterForm from "./modules/signup/Page"
import ForgotForm from "./modules/forgot/Page"
import Dashboard from "./modules/dashboard/Page"
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
            {this.props.userType === "" && <Redirect exact from="/dashboard" to="/" />}
            {this.props.userType === "" && <Redirect exact from="*" to="/" />}
            {this.props.userType !== "" && <Route path="/dashboard" exact component={Dashboard}></Route>}
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

