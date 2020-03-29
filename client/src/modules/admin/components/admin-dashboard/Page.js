import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import { UserOutlined, ToolOutlined, HistoryOutlined} from '@ant-design/icons';

import { Manager, SystemLogs } from "./components/index"

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0, 
      collapsed: false,
      currPage: <Manager/>, 
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

  handleAdminMenu = e => {
    let nextPage = null
    switch(e.key){
      case "Manager":
        nextPage = <Manager/>
        break;
      case "System":
        nextPage = <SystemLogs/>
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
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleAdminMenu}>
                <Menu.Item key="Manager"><UserOutlined/><span>Managers</span></Menu.Item>
                <Menu.Item key="System"><HistoryOutlined/><span>System Logs</span></Menu.Item>
                
                <SubMenu key="sub2"title={<span><ToolOutlined /><span>Settings</span></span>}>
                  <Menu.Item key="ChangePass">Change Password</Menu.Item>
                  <Menu.Item key="logout"><Link to="/login">Logout</Link></Menu.Item>
                </SubMenu>   
              </Menu>
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