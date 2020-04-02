import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
class Page extends Component {
  _isMounted = false;
  state = {
    columns: [
      {
        title: 'Book Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Review',
        dataIndex: 'review',
        key: 'review',
      },
      {
        title: 'Date Reviewed',
        dataIndex: 'date_reviewed',
        key: 'date_reviewed',
      },
    ],
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { columns } = this.state
    return (
      <div>
        <h1>My Reviews Page</h1>
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