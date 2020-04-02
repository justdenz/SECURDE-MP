import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import 'antd/dist/antd.css';
//import './index.css';
import { Layout, Menu, Row } from 'antd';
import { UserOutlined, BookOutlined, ToolOutlined, BarcodeOutlined} from '@ant-design/icons';

import { Books, ChangePass, History, Reviews, Library} from "./components/education/"
import { ManagerBooks, Authors, BookInstances } from "./components/manager"

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0, 
      collapsed: true,
      currPage: this.props.userType === "MANAGER" ? <ManagerBooks/> : <Library/>, 
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleEducationMenu = e => {
    let nextPage = null
    switch(e.key){
      case "Library":
        nextPage = <Library/>
        break;
      case "Books":
        nextPage = <Books/>
        break;
      case "ChangePass":
        nextPage = <ChangePass/>
        break;
      case "History":
        nextPage = <History/>
        break;
      case "Reviews":
        nextPage = <Reviews/>
        break;
      default:
        break
    }
    this.setState({currPage: nextPage})
  };

  handleManagerMenu = e => {
    let nextPage = null
    switch(e.key){
      case "ManagerBooks":
        nextPage = <ManagerBooks/>
        break;
      case "BookInstances":
        nextPage = <BookInstances/>
        break;
      case "Authors":
        nextPage = <Authors/>
        break;
      case "ChangePass":
        nextPage = <ChangePass/>
        break;
      default:
        break
    }
    this.setState({currPage: nextPage})
  };

  render() {
    const { userType } = this.props
    return (
      <div style={{width: this.state.width, height: this.state.height, marginTop: "-100px"}}>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"></div>
            { (userType === "EDUCATION" || userType === "GUEST")  &&
              <Menu theme="dark" defaultSelectedKeys={['Library']} mode="inline" onClick={this.handleEducationMenu}>
                <Menu.Item key="Library">
                  <Row justify="left"><span><BookOutlined/><span>Library</span></span></Row>
                </Menu.Item>
                
                { userType === "EDUCATION" && 
                <SubMenu key="sub1" title={<Row justify="left"><span><UserOutlined /><span>User</span></span></Row>}>
                  <Menu.Item key="History"><Row justify="left">History</Row></Menu.Item>
                  <Menu.Item key="Books"><Row justify="left">Books</Row></Menu.Item>
                  <Menu.Item key="Reviews"><Row justify="left">Reviews</Row></Menu.Item>
                </SubMenu>}
                
                { userType === "EDUCATION" && 
                <SubMenu key="sub2"title={<Row justify="left"><span><ToolOutlined /><span>Settings</span></span></Row>}>
                  <Menu.Item key="ChangePass"><Row justify="left">Change Password</Row></Menu.Item>
                  <Menu.Item key="logout"><Link to="/login"><Row justify="left">Logout</Row></Link></Menu.Item>
                </SubMenu>} 
                
              </Menu>}
            { userType === "MANAGER" &&
              <Menu theme="dark" defaultSelectedKeys={['ManagerBooks']} mode="inline" onClick={this.handleManagerMenu}>
                <Menu.Item key="ManagerBooks"><Row justify="left"><span><BookOutlined/><span>Books</span></span></Row></Menu.Item>
                <Menu.Item key="BookInstances"><Row justify="left"><span><BarcodeOutlined/><span>Book Instances</span></span></Row></Menu.Item>
                <Menu.Item key="Authors"><Row justify="left"><span><UserOutlined/><span>Authors</span></span></Row></Menu.Item>
                
                <SubMenu key="sub2"title={<Row justify="left"><span><ToolOutlined /><span>Settings</span></span></Row>}>
                  <Menu.Item key="ChangePass"><Row justify="left">Change Password</Row></Menu.Item>
                  <Menu.Item key="logout"><Link to="/login"><Row justify="left">Logout</Row></Link></Menu.Item>
                </SubMenu>   
              </Menu>
            } 
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 30, minHeight: 710, marginTop: 16 }}>
                {this.state.currPage}
              </div>
            </Content>
          </Layout>
        </Layout>
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