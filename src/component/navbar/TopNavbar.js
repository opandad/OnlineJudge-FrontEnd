import React, { Component } from 'react'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { UnorderedListOutlined, AppstoreOutlined, UserAddOutlined ,SettingOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons'

import '../../assets/css/TopNavbar.less'
import { ws } from '../../utils/Websocket'

/*
    @Title
    
    ~/src/component/TopNavbar.js
    
    @Description
    
    导航栏
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export default class TopNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: ws.data['data']['user']['id'] != null ? true : false,
            authority: ws.data['data']['user']['authority'],
            current: 'home',
        };
    }

    componentDidMount(){

    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        console.log(this.state.isLoggedIn)
    };

    render() {
        return (
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">
                            主页
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="problems" icon={<UnorderedListOutlined />}>
                        <Link to="/problems">
                            问题
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="app" icon={<AppstoreOutlined />}>
                        竞赛
                        </Menu.Item>
                    <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                        <Menu.ItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    {this.state.isLoggedIn ? this.LoggedInMenuItem() : this.LoginMenuItem()}
                    {this.state.isLoggedIn ? null : this.RegistMenuItem()}
                </Menu>
            </Layout.Header>
        );
    }

    LoginMenuItem(props) {
        return (
            <Menu.Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">
                    登录
                </Link>
            </Menu.Item>
        );
    }
    RegistMenuItem(props) {
        return (
            <Menu.Item key="regist" icon={<UserAddOutlined />}>
                <Link to="/regist">
                    注册
                </Link>
            </Menu.Item>
        );
    }

    LoggedInMenuItem(props) {
        return (
            <Menu.SubMenu key="user">
                <Menu.ItemGroup>
                    <Menu.Item>
                        {/*TODO 设置*/}
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.Divider>我是一条分割线</Menu.Divider>

                <Menu.ItemGroup>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        <Link to="/logout">
                            退出
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        );
    }

    AdminSubmenuItem(props) {
        return ("");
    }
}