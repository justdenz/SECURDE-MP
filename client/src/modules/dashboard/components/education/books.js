import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, PageHeader } from 'antd';

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
    ],
  }

  componentDidMount(){
    this._isMounted = true;
    this.getAllCurrentBooks()
  }

  componentDidUpdate(){
    this.getAllCurrentBooks()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAllCurrentBooks(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user_id: this.props.user.user_id })
    }
    fetch("http://localhost:8000/user/get_current_books", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR" && this._isMounted)
          console.log("Cause of Error: ", res.payload);
        else
          console.log("Current Books: ", res.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { columns } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Books Page"
          subTitle="Browse through your currently borrowed books"
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={[]} pagination={{defaultPageSize: 8}}/>
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