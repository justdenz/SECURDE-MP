import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Row, Col, Input, Drawer, Button, Form, Divider, Card, Popconfirm, message, PageHeader, Modal, Comment, Avatar, Popover } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import '../../index.css'
class Page extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      instances: [],
      selectedBook: {},
      bookReviews: [],
      selectedBookInstanceID: null,
      reviewVisible: false,
      borrowVisible: false,
      modalVisible: false,
      searchText: '',
      searchedColumn: '',
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: '15%',
          sorter: {
            compare: (a, b) => {
              if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
              if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
              return 0;
            },
            multiple: 1,
          },
          render: text => <a>{text}</a>,
          ...this.getColumnSearchProps('title'),
        },
        {
          title: 'Authors',
          dataIndex: 'authorNames',
          key: 'authorNames',
          sorter: {
            compare: (a, b) => {
              if(a.authorNames.toString().toLowerCase() < b.authorNames.toString().toLowerCase()) { return -1; }
              if(a.authorNames.toString().toLowerCase() > b.authorNames.toString().toLowerCase()) { return 1; }
              return 0;
            },
            multiple: 2,
          },
          ...this.getColumnSearchProps('authorNames'),
          render: authors => {
            if(authors.length > 1){
            const content = authors.map(author => <p>{author} <br/></p>)
              return(
                <div>
                  {authors[0] + " "}
                  <Popover content={content} title="Authors" placement="right">
                    <a>et al.</a>
                  </Popover>
                </div>)
            }
            else
              return(authors[0])}
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
          sorter: {
            compare: (a, b) => {
              if(a.publisher.toLowerCase() < b.publisher.toLowerCase()) { return -1; }
              if(a.publisher.toLowerCase() > b.publisher.toLowerCase()) { return 1; }
              return 0;
            },
            multiple: 3,
          },
          ...this.getColumnSearchProps('publisher'),
        },
        {
          title: 'Year',
          dataIndex: 'year_publication',
          key: 'year_publication',
          sorter: {
            compare: (a, b) => a.year_publication - b.year_publication,
            multiple: 4,
          },
          ...this.getColumnSearchProps('year_publication'),
        },
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn',
          width: '20%',
          sorter: {
            compare: (a, b) => a.isbn - b.isbn,
            multiple: 5,
          },
          ...this.getColumnSearchProps('isbn'),
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <span>
              <a style={{ marginRight: 16 }} onClick={() => {
                this.setState({selectedBook: record, reviewVisible: true}, () => this.getReviewsOfBook())
              }}>Reviews</a>

              <a onClick={() => {
                this.props.userType === "GUEST" ? this.toggleModal(true) :
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

  componentWillUnmount(){
    this._isMounted = false;
  }

  getAllBooks = () => {
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

  getReviewsOfBook(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ book_id: this.state.selectedBook.book_id })
    }
    fetch("http://localhost:8000/review/get_all_review_book", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else
          this.setState({bookReviews: res.payload})
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
          message.error(res.payload);
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

  toggleModal(modalVisible){
    this.setState({modalVisible})
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => text
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleReviewSubmit = values => {
    if(this.props.userType === "GUEST"){
      this.toggleModal(true)
    } else {
      const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ book_id: this.state.selectedBook.book_id , user_id: this.props.user.user_id, comment: values.review })
      }
      fetch("http://localhost:8000/review/add_review", reqOptions)
        .then(res => res.json())
        .then(res => {
          if(res.status === "ERROR")
            message.error(res.payload);
          else
            message.success("Successfully Reviewed Book!")
            this.toggleReviewDrawer(false)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { columns, books, instances, selectedBook, bookReviews } = this.state
    const { user } = this.props
    const name = user.first_name ? user.first_name : "Guest"
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Library Page"
          subTitle={"Welcome to Xavier’s Library for Gifted Youngsters, " + name + "!"}
          backIcon={false}
          style={{marginBottom: "20px"}}
        />
        <Table columns={columns} dataSource={books} pagination={{defaultPageSize: 8}}/>
        <Drawer
          title="Reviews"
          width={720}
          onClose={() => this.toggleReviewDrawer(false)}
          visible={this.state.reviewVisible}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
          footer={null}
        >
        { bookReviews.length ? bookReviews.map(review => 
          <Comment
            key={review.review_id}
            author={<a>{review.first_name + " " + review.last_name}</a>}
            avatar={<Avatar style={{ backgroundColor: 'rgb(64, 145, 247)' }} icon={<UserOutlined />} />}
            content={<Row justify="left"><p>{review.comment}</p></Row>}
            datetime={<span>{review.created_at.split('T', 1)[0]}</span>}
          />
        ) : <p>No Reviews for this Book</p>}
        <Divider/>
          <Form layout="vertical" hideRequiredMark onFinish={this.handleReviewSubmit}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="review"
                  label="Write your review here"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a review!',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} style={{resize: 'none'}} placeholder="Leave a review for this book" />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ textAlign: 'right'}}>
              <Button onClick={() => this.toggleReviewDrawer(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit</Button>
            </div>
          </Form>
        </Drawer>

        {/* BORROW DRAWER */}
        <Drawer
          title="Book Instances"
          width={350}
          onClose={() => this.toggleBorrowDrawer(false)}
          visible={this.state.borrowVisible}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
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
        <Modal
          title="Create an Account"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal(false)}
          destroyOnClose
        >
          <p>Join our Community! Register now to borrow endless books and submit your very own book reviews!</p>
          <Row style={{width: "100%", marginTop: 20}} justify="end">
            <Button onClick={() => this.toggleModal(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit"><Link to="/register">Register</Link></Button>
          </Row>  
        </Modal>
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