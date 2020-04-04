import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, PageHeader } from 'antd';
class Page extends Component {
  _isMounted = false;
  state = {
    books: [],
    reviews: [],
    columns: [
      {
        title: 'Book Title',
        dataIndex: 'book_id',
        key: 'book_id',
        render: (book_id) => {
          const book = this.state.books.filter(book => book.book_id === book_id)
          return book[0] ? book[0].title : "Undefined"
        }
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
    this.getAllBooks()
    this.getAllReviewsOfUser()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAllBooks(){
    fetch("http://localhost:8000/book/")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR" && this._isMounted){
          let books = res.payload.map(book => {
            return({
              key: book.book_id,
              ...book,
            })
          })
          this.setState({books})
        }
      })
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
    const { columns } = this.state
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Reviews Page"
          subTitle="Browse through your book reviews"
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={this.state.reviews} pagination={{defaultPageSize: 8}}/>
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