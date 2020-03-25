import React, { Component } from 'react';
import { Table, Tag, Drawer, Button, Form, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddBookComponents from "./components/bookDrawer"

const dummy_data = [
  {
    key: '1',
    title: 'The Smiths',
    authors: 'John Smith',
    publisher: 'New York Publications',
    publication: 2010,
    isbn: 1234567890123,
    status: 0,
  },
  {
    key: '2',
    title: 'The Smiths Part 2',
    authors: 'John Smith',
    publisher: 'New York Publications',
    publication: 2010,
    isbn: 1234567890123,
    status: 1,
  },
];
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
        },
        {
          title: 'Publisher',
          dataIndex: 'publisher',
          key: 'publisher',
        },
        {
          title: 'Year of Publication',
          dataIndex: 'publication',
          key: 'publication',
        },
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: status => (
            <span>
              <Tag color={status ? 'green' : 'volcano'}>
                {status ? 'AVAILABLE' : 'RESERVED'}
              </Tag>
            </span>
          ),
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

  toggleAddDrawer(AddDrawerVisible){
    this.setState({AddDrawerVisible})
  }

  toggleEditDrawer(EditDrawerVisible){
    this.setState({EditDrawerVisible})
  }

  handleAddBookSubmit = values => {
    message.success("Book Successfully Added!")
    this.toggleAddDrawer(false)
    console.log("Values of New Book: ", values);
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
        <Table columns={this.state.columns} dataSource={dummy_data} />
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