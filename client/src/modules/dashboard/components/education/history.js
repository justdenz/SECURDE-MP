import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, PageHeader } from 'antd';

class Page extends Component {
  _isMounted = false;
  state = {
    history: [],
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
        dataIndex: 'borrowed_date',
        key: 'borrowed_date',
      },
      {
        title: 'Date Returned',
        dataIndex: 'return_date',
        key: 'return_date',
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
        if(res.status !== "ERROR" && this._isMounted){
          let history = res.payload.map(record => {
            return({
              key: record.bookinstance_id,
              bookinstance_id: record.bookinstance_id,
              title: record.title.title,
              borrowed_date: record.borrowed_date.split('T', 1)[0],
              return_date: record.return_date.split('T', 1)[0],
            })
          })
          this.setState({history})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { columns, history } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="History Page"
          subTitle="Browse through your previously borrowed books"
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={history} pagination={{defaultPageSize: 8}}/>
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