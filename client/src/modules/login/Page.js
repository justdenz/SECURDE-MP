import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert, Divider, Card, message, Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';

import { loginAsUser, loginAsGuest, logout } from '../../redux/actions'

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
      attempts: 4,
    }
  }

  componentDidMount(){
    this.props.logout()
    persistStore(store).purge()
  }

  countDown() {
    let secondsToGo = 60;
    const modal = Modal.error({
      title: 'Temporarily locked out for too many failed login attempts',
      content: `Try again after ${secondsToGo} seconds.`,
      okButtonProps: {disabled: true},
      keyboard: false,
      width: 520,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Try again after ${secondsToGo} seconds.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      this.setState({attempts: 4, showAlert: false})
    }, secondsToGo * 1000);
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
    fetch("http://localhost:8000/user/validate_login", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR"){
          this.setState({showAlert: true, attempts: this.state.attempts - 1})
          message.error(res.payload)
        }
        else{
          message.success("Successfully logged in!")
          this.props.loginAsUser(res.payload)
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

            {this.state.showAlert ? <Alert message={"Attempts remaining: " + this.state.attempts} type="warning" showIcon /> : null}

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
        {this.state.attempts === 0 && this.countDown()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginAsGuest: () => dispatch(loginAsGuest()),
  loginAsUser: (data) => dispatch(loginAsUser(data)),
  logout: () => dispatch(logout()),
})

const mapStateToProps = state => ({
  user: state.simpleReducer.user,
  userType: state.simpleReducer.userType
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);