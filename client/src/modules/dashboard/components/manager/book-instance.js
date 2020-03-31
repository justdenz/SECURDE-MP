import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Form, Row, Select, Table, Button, Modal, Tag, message, Radio, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

class Page extends Component {
  state = {
    selectedBookInstance: {},
    books: [],
    instances: [],
    modalVisible: false,
    columns: [
      {
        title: 'Book Instance ID',
        dataIndex: 'bookinstance_id',
        key: 'bookinstance_id',
      },
      {
        title: 'Book Title',
        dataIndex: 'book_id',
        key: 'book_id',
        render: (book_id) => {
          const book = this.state.books.filter(book => book.book_id === book_id)
          return book[0].title
        }
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (
          <span>
            <Tag color={Number(status) ? 'green' : 'volcano'}>
              {Number(status) ? 'AVAILABLE' : 'RESERVED'}
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
                onClick={() => this.setState({selectedBookInstance: record, modalVisible: true})}>Edit</a>
              <Popconfirm
                title="Are you sure delete this book instance?"
                onConfirm={() => this.deleteBookInstance()}
                okText="Confirm"
                cancelText="Cancel">
                <a onClick={() => this.setState({selectedBookInstance: record})}>Delete</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ],
  }

  componentDidMount(){
    this.getAllBooks()
    this.getAllBookInstances()
  }

  componentDidUpdate(){
    this.getAllBookInstances()
  }

  getAllBooks(){
    fetch("http://localhost:8000/book/")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR"){
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

  getAllBookInstances(){
    fetch("http://localhost:8000/book/get_all_bookinstances")
      .then(res => res.json())
      .then(res => {
        if(res.status !== "ERROR"){
          let instances = res.payload.map(instance => {
            return({
              key: instance.bookinstance_id,
              ...instance,
            })
          })
          this.setState({instances})
        }
      })
  }

  deleteBookInstance(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({bookinstance_id: this.state.selectedBookInstance.bookinstance_id})
    }
    fetch("http://localhost:8000/book/delete_bookinstance", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else{
          message.success("Book Instance Deleted!")
          this.getAllBookInstances()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleAddBookInstanceSubmit = value => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({book_id: value.instance})
    }
    fetch("http://localhost:8000/book/add_bookinstance", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else{
          message.success("Book Instance Successfully Added!")
          this.getAllBookInstances()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUpdateBookInstance = value => {
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({bookinstance_id: this.state.selectedBookInstance.bookinstance_id, status: value.status})
    }
    fetch("http://localhost:8000/book/update_bookinstance", reqOptions)
      .then(res => res.json())
      .then(res => {
        if(res.status === "ERROR")
          console.log("Cause of Error: ", res.payload);
        else{
          message.success("Book Instance Updated!")
          console.log(res.payload);
          this.getAllBookInstances()
          this.toggleModal(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleModal = modalVisible => {
    this.setState({modalVisible})
  }

  render() {
    const { books, selectedBookInstance } = this.state
    return (
      <div>
        <h1 style={{marginBottom: 50}}>Book Instances Page</h1>
        <Form layout="inline" hideRequiredMark onFinish={this.handleAddBookInstanceSubmit}>
          <Row style={{width: "100%"}} justify="center">
            <Form.Item
              name="instance"
              rules={[{ required: true, message: 'Please select a book'}]}
            >
              <Select style={{ width: 300 }} placeholder="Please select a book">
                {books.map(book => <Option key={book.book_id} value={book.book_id}>{book.title}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <PlusOutlined /> Add book instance
              </Button>
            </Form.Item>
          </Row>
        </Form>
        <Table style={{marginTop: 50}} columns={this.state.columns} dataSource={this.state.instances}/>
        <Modal
          title="Edit Book Instance"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal(false)}
          destroyOnClose
        >
          <Form layout="inline" hideRequiredMark onFinish={this.handleUpdateBookInstance}
            initialValues={{status: Number(selectedBookInstance.status)}}>
            <Row style={{width: "100%"}} justify="center">
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please input status of book instance!'},]}
              >
                <Radio.Group value={this.state.selectedBookInstance.status}>
                  <Radio value={0}><Tag color="volcano">RESERVED</Tag></Radio>
                  <Radio value={1}><Tag color="green">AVAILABLE</Tag></Radio>
                </Radio.Group>
              </Form.Item>
            </Row>
            <Row style={{width: "100%", marginTop: 20}} justify="end">
              <Button onClick={() => this.toggleModal(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Row>      
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Page;