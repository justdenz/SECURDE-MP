import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, PageHeader } from 'antd';
class Page extends Component {
  _isMounted = false;
  state = {
    reviews: [],
    columns: [
      {
        title: 'Book Title',
        dataIndex: 'book_title',
        key: 'book_title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Your Review',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: 'Date Reviewed',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (created_at) => {
          return created_at.split('T', 1)[0]
        }
      },
    ],
  }

  componentDidMount(){
    this._isMounted = true;
    this.getAllReviewsOfUser()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAllReviewsOfUser(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ user_id: this.props.user.user_id })
    }
    fetch("http://localhost:8000/review/", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR" && this._isMounted){
          let reviews = res.payload.map(review => {
            return({
              key: review.review_id,
              ...review,
            })
          })
          this.setState({reviews})
        }
      })
  }

  render() {
    const { columns, reviews } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Reviews Page"
          subTitle="Browse through your book reviews"
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={reviews} pagination={{defaultPageSize: 8}}/>
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