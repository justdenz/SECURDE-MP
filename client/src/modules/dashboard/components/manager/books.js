import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Drawer, Button, Form, message, Popconfirm} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddBookComponents from "./components/bookDrawer"
class Page extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      selectedBook: {},
      AddDrawerVisible: false,
      EditDrawerVisible: false,
      columns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Authors',
          dataIndex: 'authorNames',
          key: 'authorNames',
          render: authors => authors.length > 1 ? (authors[0] + " et al.") : (authors[0])
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
        },
        {
          title: 'Year of Publication',
          dataIndex: 'year_publication',
          key: 'year_publication',
        },
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn',
        },
        {
          title: 'Call Number',
          dataIndex: 'call_number',
          key: 'call_number',
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return(
              <span>
                <a style={{ marginRight: 16 }} 
                onClick={() => this.setState({selectedBook: record, EditDrawerVisible: true})}>Edit</a>
                <Popconfirm
                  title="Are you sure delete this book?"
                  onConfirm={() => this.deleteBook()}
                  okText="Confirm"
                  cancelText="Cancel">
                <a onClick={() => this.setState({selectedBook: record})}>Delete</a>
                </Popconfirm>
              </span>
            )
          },
        },
      ],
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.getAllBooks()
    this.getAllAuthors()
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

  getAllAuthors(){
    fetch("http://localhost:8000/author/")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR")
          this.setState({authors: res.payload})
      })
  }

  toggleAddDrawer(AddDrawerVisible){
    this.setState({AddDrawerVisible})
  }

  toggleEditDrawer(EditDrawerVisible){
    this.setState({EditDrawerVisible})
  }

  handleAddBookSubmit = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: values.title,
        publisher: values.publisher,
        year_publication: values.publication,
        isbn: values.isbn,
        authors: values.authors,
        user_id: this.props.user.user_id,
        call_number: values.call_number,
      })
    }
    fetch("http://localhost:8000/book/create_book", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          message.error(res.payload)
        else{
          message.success("Book Successfully Added!")
          this.getAllBooks()
          this.toggleAddDrawer(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUpdateBookSubmit = values => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        book_id: this.state.selectedBook.book_id,
        title: values.title,
        publisher: values.publisher,
        year_publication: values.publication,
        isbn: values.isbn,
        authors: values.authors,
        user_id: this.props.user.user_id,
        call_number: values.call_number,
      })
    }
    fetch("http://localhost:8000/book/update_book", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          message.error(res.payload)
        else{
          message.success("Book Successfully Updated!")
          this.getAllBooks()
          this.toggleEditDrawer(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteBook(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({book_id: this.state.selectedBook.book_id, user_id: this.props.user.user_id,})
    }
    fetch("http://localhost:8000/book/delete_book", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          message.error(res.payload);
        else{
          message.success("Book Deleted!")
          this.getAllBooks()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { selectedBook, authors } = this.state
    return (
      <div>
        <h1>Books Page</h1>
        <Button type="primary" style={{marginTop: 20, marginBottom: 20}} onClick={() => this.toggleAddDrawer(true)}>
          <PlusOutlined /> Add book
        </Button>
        <Table columns={this.state.columns} dataSource={this.state.books} pagination={{defaultPageSize: 7}}/>
        <Drawer
          title="Create a new book"
          width={720}
          onClose={() => this.toggleAddDrawer(false)}
          visible={this.state.AddDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.handleAddBookSubmit}>
            <AddBookComponents options={authors}/>
            <div style={{ textAlign: 'right'}}>
              <Button onClick={() => this.toggleAddDrawer(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Add</Button>
            </div>
          </Form>
        </Drawer>
        
        <Drawer
          title="Edit book details"
          width={720}
          onClose={() => this.toggleEditDrawer(false)}
          visible={this.state.EditDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.handleUpdateBookSubmit} 
            initialValues={{
              title: selectedBook.title,
              authors: selectedBook.authorID,
              publisher: selectedBook.publisher,
              publication: selectedBook.year_publication,
              isbn: selectedBook.isbn,
              call_number: selectedBook.call_number,
            }}>
            <AddBookComponents options={authors}/>
            <div style={{ textAlign: 'right'}}>
              <Button onClick={() => this.toggleEditDrawer(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </div>
          </Form>
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