import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert, Divider, Card, message, Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';

import { loginAsUser, loginAsGuest, loginAsAdmin, logout, startTimer, decrementAttempts, resetAttempts } from '../../redux/actions'

import { persistStore } from 'redux-persist'
import { store } from '../../redux/store';

import UserNameInput from "./components/username"
import PasswordInput from "./components/password"

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      isAuthenticated: false,
    }
  }

  componentDidMount(){
    this.props.logout()
    persistStore(store).purge()
    if(Date.now() < this.props.expireTime)
      this.displayCountdown()
  }

  countDown() {
    this.props.startTimer()
    this.displayCountdown()
  }

  displayCountdown(){
    setTimeout(() => {
      let millis = this.props.expireTime - Date.now()
      let secondsToGo = Math.floor(millis/1000);
      const modal = Modal.error({
        title: 'Temporarily locked out for too many failed login attempts',
        content: `Try again after ${secondsToGo + 1} seconds.`,
        okButtonProps: {disabled: true},
        keyboard: false,
        width: 520,
      });
      const timer = setInterval(() => {
        millis = this.props.expireTime - Date.now()
        secondsToGo = Math.floor(millis/1000);
        modal.update({
          content: `Try again after ${secondsToGo + 1} seconds.`,
        });
        if(secondsToGo === -1){
          clearInterval(timer);
          modal.destroy();
          this.setState({showAlert: false})
          this.props.resetAttempts()
        }
      }, 1000);
    }, 100)
  }

  onContinueAsGuest = () => {
    this.props.loginAsGuest()
  }

  onSubmit = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: values.username, password: values.password})
    }

    fetch("http://localhost:8000/admin/validate_login", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR"){
          fetch("http://localhost:8000/user/validate_login", reqOptions)
            .then(res => res.json())
            .then(res => {
              if(res.status === "ERROR"){
                this.setState({showAlert: true})
                this.props.decrementAttempts()
                this.props.attempts === 0 && this.countDown()
                message.error(res.payload)
              }
              else{
                message.success("Successfully logged in!")
                this.props.loginAsUser(res.payload)
                this.props.resetAttempts()
                this.setState({isAuthenticated: true})
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else{
          message.success("Successfully logged in!")
          this.props.loginAsAdmin(res.payload)
          this.props.resetAttempts()
          this.setState({isAuthenticated: true})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div style={{width: 400, marginBottom: "100px", marginTop: "50px"}}>
        {this.state.isAuthenticated ? 
        <Redirect to="/dashboard"/> :
          <Card>
          <h1 style={{marginBottom: 20}}>Login</h1>
          <Form name="normal_login" className="login-form" onFinish={this.onSubmit}>
            <UserNameInput/>
            <PasswordInput/>

            {this.state.showAlert ? <Alert message={"Attempts remaining: " + this.props.attempts} type="warning" showIcon /> : null}

            <Form.Item>
              <Link to="/forgot">Forgot password</Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> Log in</Button>
              <Divider/>
              <span>
                <Link to="/dashboard" onClick={() => this.onContinueAsGuest()}>Continue as guest <br/></Link>
                or <Link to="/register">Register here</Link>
              </span>
            </Form.Item>
          </Form>
        </Card>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginAsGuest: () => dispatch(loginAsGuest()),
  loginAsAdmin: (data) => dispatch(loginAsAdmin(data)),
  loginAsUser: (data) => dispatch(loginAsUser(data)),
  logout: () => dispatch(logout()),
  startTimer: () => dispatch(startTimer()),
  decrementAttempts: () => dispatch(decrementAttempts()),
  resetAttempts: () => dispatch(resetAttempts()),
})

const mapStateToProps = state => ({
  user: state.simpleReducer.user,
  userType: state.simpleReducer.userType,
  expireTime: state.simpleReducer.expireTime,
  attempts: state.simpleReducer.attempts,
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);