import React, { Component } from 'react';

class Page extends Component {
  state = {

  }

  getAllPreviousBooks(){
    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ book_id: this.state.selectedBook.book_id })
    }
    fetch("http://localhost:8000/user/get_current_books", reqOptions)
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

  render() {
    return (
      <div>
        <h1>History Page</h1>
      </div>
    );
  }
}

export default Page;