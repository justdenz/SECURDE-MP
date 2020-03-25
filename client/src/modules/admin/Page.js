import React, { Component } from 'react';

import AdminLogin from "./components/admin-login/Page"
import AdminDashboard from "./components/admin-dashboard/Page"

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
    }
  }

  toggleIsAuthorized = isAuthorized => {
    this.setState({ isAuthorized })
  }

  render() {
    return (
      <div style={{width: 400, marginBottom: "100px"}}>
        {this.state.isAuthorized ? <AdminDashboard/> : <AdminLogin toggleIsAuthorized={this.toggleIsAuthorized}/>}
      </div>
    );
  }
}

export default Page