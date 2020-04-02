import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, PageHeader } from 'antd';
class Page extends Component {
  _isMounted = false;
  state = {
    columns: [
      {
        title: 'Book Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Review',
        dataIndex: 'review',
        key: 'review',
      },
      {
        title: 'Date Reviewed',
        dataIndex: 'date_reviewed',
        key: 'date_reviewed',
      },
    ],
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
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
        <Table columns={columns} dataSource={[]} pagination={{defaultPageSize: 8}}/>
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