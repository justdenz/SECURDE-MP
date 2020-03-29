import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
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
      collapsed: false,
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
      default:
        break
    }
    this.setState({currPage: nextPage})
  };

  render() {
    return (
      <div style={{width: this.state.width, height: this.state.height, marginTop: "-100px"}}>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            { this.props.userType === "EDUCATION"  &&
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleEducationMenu}>
                <Menu.Item key="Library"><span><BookOutlined/><span>Library</span></span></Menu.Item>
                
                <SubMenu key="sub1" title={<span><UserOutlined /><span>User</span></span>}>
                  <Menu.Item key="History">History</Menu.Item>
                  <Menu.Item key="Books">Books</Menu.Item>
                  <Menu.Item key="Reviews">Reviews</Menu.Item>
                </SubMenu>
                
                <SubMenu key="sub2"title={<span><ToolOutlined /><span>Settings</span></span>}>
                  <Menu.Item key="ChangePass">Change Password</Menu.Item>
                  <Menu.Item key="logout"><Link to="/login">Logout</Link></Menu.Item>
                </SubMenu>   
              </Menu>}
            { this.props.userType === "MANAGER" &&
              <Menu theme="dark" defaultSelectedKeys={['ManagerBooks']} mode="inline" onClick={this.handleManagerMenu}>
                <Menu.Item key="ManagerBooks"><span><BookOutlined/><span>Books</span></span></Menu.Item>
                <Menu.Item key="BookInstances"><span><BarcodeOutlined/><span>Book Instances</span></span></Menu.Item>
                <Menu.Item key="Authors"><span><UserOutlined/><span>Authors</span></span></Menu.Item>
                
                <SubMenu key="sub2"title={<span><ToolOutlined /><span>Settings</span></span>}>
                  <Menu.Item key="ChangePass">Change Password</Menu.Item>
                  <Menu.Item key="logout"><Link to="/login">Logout</Link></Menu.Item>
                </SubMenu>   
              </Menu>
            } 
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 30, minHeight: 650, marginTop: 16 }}>
                {this.state.currPage}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
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