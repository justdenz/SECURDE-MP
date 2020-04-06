import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Table } from "antd";

class Page extends Component {
  _isMounted = false;
  state = {
    log: [],
    columns: [
      {
        title: 'User Action ID',
        dataIndex: 'user_action_id',
        key: 'user_action_id',
      },
      {
        title: 'User ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Date Performed',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
    ],
  }

  componentDidMount(){
    this._isMounted = true
    this.getSystemLog()
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }

  getSystemLog(){
    fetch("http://localhost:8000/admin/all_user_actions")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR" && this._isMounted){
          console.log(res.payload);
          let log = res.payload.map(action => {
            return({
              key: action.user_action_id,
              ...action,
            })
          })
          this.setState({log})
        }
      })
  }

  render() {
    const { columns , log } = this.state
    return (
      <div>
        <h1>System Logs Page</h1>
        <Table columns={columns} dataSource={log} pagination={{defaultPageSize: 8}}></Table>
      </div>
    );
  }
}

export default Page;