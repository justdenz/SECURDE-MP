import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Row, Col, Input, Drawer, Button, Form, Divider, Card, Popconfirm, message, PageHeader} from 'antd';
import 'antd/dist/antd.css';
import '../../index.css'
class Page extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      instances: [],
      selectedBook: {},
      selectedBookInstanceID: null,
      reviewVisible: false,
      borrowVisible: false,
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Authors',
          dataIndex: 'authors',
          key: 'authors',
          render: authors => authors.length > 1 ? (authors[0] + " et al.") : (authors[0])
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
        },
        {
          title: 'Year',
          dataIndex: 'year_publication',
          key: 'year_publication',
        },
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn',
          width: '20%',
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <span>
              <a style={{ marginRight: 16 }} onClick={() => this.setState({selectedBook: record, reviewVisible: true})}>Reviews</a>
              <a onClick={() => {
                this.setState({selectedBook: record, borrowVisible: true}, () => this.getAllInstanceofBook())
              }}>Borrow</a>
            </span>
          ),
        },
      ],
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.getAllBooks()
  }

  componentDidUpdate(){
    this.getAllBooks()
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

  getAllInstanceofBook(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ book_id: this.state.selectedBook.book_id })
    }
    fetch("http://localhost:8000/book/get_bookinstance_bybookid", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else
          this.setState({instances: res.payload})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  borrowBook(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ bookinstance_id: this.state.selectedBookInstanceID, user_id: this.props.user.user_id })
    }
    fetch("http://localhost:8000/user/borrow_bookinstance", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else
          message.success("Successfully Borrowed Book!")
          this.toggleBorrowDrawer(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleReviewDrawer(reviewVisible){
    this.setState({reviewVisible})
  }

  toggleBorrowDrawer(borrowVisible){
    this.setState({borrowVisible})
  }

  render() {
    const { columns, books, instances, selectedBook } = this.state
    const { user } = this.props
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Library Page"
          subTitle={"Welcome to Xavier’s Library for Gifted Youngsters, " + user.first_name + "!"}
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={books} />
        <Drawer
          title="Reviews"
          width={720}
          onClose={() => this.toggleReviewDrawer(false)}
          visible={this.state.reviewVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => this.toggleDrawer(false)}
                style={{ marginRight: 8 }}
              >
                Back
              </Button>
              <Button onClick={() => this.toggleDrawer(false)} type="primary">
                Submit
              </Button>
            </div>
          }
        >
        {/* ADD BOOK REVIEWS HERE */}
          <Divider/>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="review"
                  label="Write a Review for this Book"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a review!',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Write your review for this book here" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

        {/* BORROW DRAWER */}
        <Drawer
          title="Book Instances"
          width={350}
          onClose={() => this.toggleBorrowDrawer(false)}
          visible={this.state.borrowVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={null}
        >
          {instances.length ? instances.map(instance => {
            return(
              <Card key={instance.bookinstance_id} title={selectedBook.title} style={{ width: 300 }} extra={
              <Popconfirm
                title="Borrow this book instance?"
                onConfirm={() => this.borrowBook()}
                okText="Confirm"
                cancelText="Cancel"
                placement="bottomRight">
                <a data-id={instance.bookinstance_id} disabled={Number(instance.status) ? false : true} onClick={(e) => this.setState({selectedBookInstanceID: e.target.getAttribute('data-id')})}>Select</a>
              </Popconfirm>}> 
                <Row justify="left">
                    <p>Book Instance ID: {instance.bookinstance_id}</p>
                </Row>
                <Row justify="left">
                  <p> Status:  
                    <Tag style={{marginLeft: "5px"}}color={Number(instance.status) ? 'green' : 'volcano'}>
                      {Number(instance.status) ? 'AVAILABLE' : 'RESERVED'}
                    </Tag>
                  </p>
                </Row>
              </Card>)
          }) : <p>No Instances of this Book Found</p>}
        </Drawer>
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