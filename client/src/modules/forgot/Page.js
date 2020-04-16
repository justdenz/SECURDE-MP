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
    question: "How are you?",
    user: {}
  }

  onSubmit = values => {
    const { usernameValidated, questionValidated, user } = this.state

    if(!usernameValidated){
      // const reqOptions = {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({username: values.username})
      // }
      // fetch("http://localhost:8000/", reqOptions)
      //   .then(res => res.json())
      //   .then(res => {
      //     if(res.status === "ERROR")
      //       message.error(res.payload)
      //     else{
      //       message.success("Username successfully validated!")
      //       this.setState({usernameValidated: true, question: res.payload.question, user: res.payload.user})
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else if(usernameValidated && !questionValidated){
      // const reqOptions = {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({username: values.answer})
      // }
      // fetch("http://localhost:8000/", reqOptions)
      //   .then(res => res.json())
      //   .then(res => {
      //     if(res.status === "ERROR")
      //       message.error(res.payload)
      //     else{
      //       message.success("Security answer validated!")
      //       this.setState({questionValidated: true})
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      // const reqOptions = {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     user_id: user.user_id, 
      //     new_password: values.password,
      //   })
      // }
      // fetch("http://localhost:8000/user/change_password", reqOptions)
      //   .then(res => res.json())
      //   .then(res => {
      //     if(res.status === "ERROR")
      //       message.error(res.payload)
      //     else{
      //       message.success("Successfuly changed password")
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }

  render() {
    const {usernameValidated, questionValidated, question } = this.state
    return (
      <div style={{width: 500, marginBottom: "100px", marginTop: "50px"}}>
        <Card>
          <h1>Forgot Password Page</h1>
          <Form {...formItemLayout} name="register" onFinish={this.onSubmit} scrollToFirstError>
            
            {!usernameValidated && 
              <div>
                <p style={{marginBottom: 10}}>Enter your existing username</p>
                <Username/>
              </div>}

            {usernameValidated && !questionValidated ? 
              <div>
                <p style={{marginBottom: 10}}>Security Question: <br/> {question}</p>
                <Answer/> 
              </div>
            : null}

            {usernameValidated && questionValidated ? 
              <div>
                <p style={{marginBottom: 10}}>Enter your new password</p>
                <Password/>
              </div>
            : null}
            
            <div style={{marginTop: 20}}>
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
        </Card>
      </div>
    );
  }
}

export default Page;