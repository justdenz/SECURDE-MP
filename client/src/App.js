import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';

import LoginForm from "./modules/login/Page"
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <LoginForm/>
      </div>
    );
  }
}

export default App;

