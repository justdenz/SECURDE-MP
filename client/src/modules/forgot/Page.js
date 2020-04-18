import React, { Component } from 'react';
import { Form, Button, Card, message } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';

import { Answer, Username, Password } from "./components/index"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

class Page extends Component {
  state = {
    usernameValidated: false,
    questionValidated: false,
    changeValidated: false,
    user: {}
  }

  onSubmit = values => {
    const { usernameValidated, questionValidated, user } = this.state

    if(!usernameValidated){
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: values.username})
      }
      fetch("http://localhost:8000/user/validate_username", reqOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status === "ERROR")
            message.error(res.payload)
          else{
            message.success("Username successfully validated!")
            this.setState({usernameValidated: true, user: res.payload})
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if(usernameValidated && !questionValidated){
      if(values.answer !== user.answer)
        message.error("Incorrect answer!")
      else{
        message.success("Security answer validated!")
        this.setState({questionValidated: true})
      }
    } else {
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: user.user_id, 
          new_password: values.password,
        })
      }
      fetch("http://localhost:8000/user/change_password", reqOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status === "ERROR")
            message.error(res.payload)
          else{
            message.success("Successfuly changed password")
            this.setState({changeValidated: true})
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  onCancel = () => {
    this.setState({user: {}, changeValidated: true})
  }

  render() {
    const {usernameValidated, questionValidated, changeValidated, user } = this.state
    return (
      <div style={{width: 500, marginBottom: "100px", marginTop: "50px"}}>
        {changeValidated ? <Redirect to="/login" /> :
        <Card>
          <h1 style={{marginBottom: 30}}>Forgot Password Page</h1>
          <Form {...formItemLayout} name="register" onFinish={this.onSubmit} scrollToFirstError>
            
            {!usernameValidated && 
              <div>
                <p style={{marginBottom: 10}}>Enter your existing username</p>
                <Username/>
              </div>}

            {usernameValidated && !questionValidated ? 
              <div>
                <p style={{marginBottom: 10}}>Security Question: <br/> {user.question}</p>
                <Answer/> 
              </div>
            : null}

            {usernameValidated && questionValidated ? 
              <div>
                <p style={{marginBottom: 10}}>Enter your new password</p>
                <Password/>
              </div>
            : null}
            
            <div style={{marginTop: 60}}>
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
              <Link to="/login">
                <Button style={{marginLeft: 20}}>
                  Cancel
                </Button>
              </Link>
            </div>

          </Form>
        </Card>}
      </div>
    );
  }
}

export default Page;