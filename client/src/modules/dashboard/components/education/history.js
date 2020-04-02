import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

class Page extends Component {
  _isMounted = false;
  state = {
    columns: [
      {
        title: 'Book Instance ID',
        dataIndex: 'bookinstance_id',
        key: 'bookinstance_id',
      },
      {
        title: 'Book Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Date Borrowed',
        dataIndex: 'date_borrowed',
        key: 'date_borrowed',
      },
      {
        title: 'Date Returned',
        dataIndex: 'date_returned',
        key: 'date_returned',
      },
    ],
  }

  componentDidMount(){
    this._isMounted = true;
    this.getAllPreviousBooks()
  }

  componentDidUpdate(){
    this.getAllPreviousBooks()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAllPreviousBooks(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user_id: this.props.user.user_id })
    }
    fetch("http://localhost:8000/user/get_previous_books", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR" && this._isMounted)
          console.log("Cause of Error: ", res.payload);
        else
          console.log("Previous Books: ", res.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { columns } = this.state
    return (
      <div>
        <h1>History Page</h1>
        <Table columns={columns} dataSource={[]}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  user: state.simpleReducer.user,
  userType: state.simpleReducer.userType
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);