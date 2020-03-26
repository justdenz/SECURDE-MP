import React, { Component } from 'react';
import { Table, Tag, Drawer, Button, Form, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddBookComponents from "./components/bookDrawer"

// const dummy_data = [
//   {
//     key: '1',
//     title: 'The Smiths',
//     authors: ['John Smith ', 'John Smith ', 'John Smith ', 'John Smith ', 'John Smith ', 'John Smith ', 'John Smith ', 'John Smith '],
//     publisher: 'New York Publications',
//     year_publication: 2010,
//     isbn: 1234567890123,
//   },
//   {
//     key: '2',
//     title: 'The Smiths Part 2',
//     authors: ['John Smith'],
//     publisher: 'New York Publications',
//     year_publication: 2010,
//     isbn: 1234567890123,
//   },
// ];
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectedBook: {},
      AddDrawerVisible: false,
      EditDrawerVisible: false,
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
          render: authors => {
            if(authors.length > 1)
              return (authors[0] + "et al.")
            else
              return (authors[0])
          }
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
        },
        {
          title: 'Year of Publication',
          dataIndex: 'year_publication',
          key: 'publication',
        },
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn',
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return(
              <span>
                <a style={{ marginRight: 16 }} 
                onClick={() => this.setState({selectedBook: record, EditDrawerVisible: true})}>Edit</a>
                <a>Delete</a>
              </span>
            )
          },
        },
      ],
    }
  }

  componentDidMount(){
    fetch("http://localhost:8000/book/")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR"){
          this.setState({books: res.payload})
        }
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
        authors: [values.authors],
      })
    }
    fetch("http://localhost:8000/book/create_book", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else{
          message.success("Book Successfully Added!")
          this.toggleAddDrawer(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUpdateBookSubmit = values => {
    message.success("Book Successfully Updated!")
    this.toggleEditDrawer(false)
    console.log("New Values of Book: ", values);
  }

  render() {
    const { selectedBook } = this.state
    return (
      <div>
        <h1>Books Page</h1>
        <Button type="primary" style={{marginTop: 20, marginBottom: 20}} onClick={() => this.toggleAddDrawer(true)}>
          <PlusOutlined /> Add book
        </Button>
        <Table columns={this.state.columns} dataSource={this.state.books} />
        <Drawer
          title="Create a new book"
          width={720}
          onClose={() => this.toggleAddDrawer(false)}
          visible={this.state.AddDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.handleAddBookSubmit}>
            <AddBookComponents/>
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
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.handleUpdateBookSubmit} 
            initialValues={{
              title: selectedBook.title,
              authors: selectedBook.authors,
              publisher: selectedBook.publisher,
              publication: selectedBook.publication,
              isbn: selectedBook.isbn,
            }}>
            <AddBookComponents/>
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

export default Page;