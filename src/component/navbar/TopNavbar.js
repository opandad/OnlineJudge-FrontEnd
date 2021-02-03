import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { browserHistory } from 'react-router'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../../page/Home'
import { Login } from '../../page/Login';
import { UnorderedListOutlined, AppstoreOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';

import '../../assets/css/TopNavbar.less';

/*
    @Title
    
    ~/src/component/navbar/TopNavbar.js
    
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
            current: 'mail',
        };
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        this.context.router.push(e.key);
    };

    render() {
        return (
            <Layout.Header>
                <div className="logo" />
                {/* <BrowserRouter> */}
                    <Menu theme="dark" onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to="/">
                                主页
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="problems" icon={<UnorderedListOutlined />}>
                            题目
                        </Menu.Item>
                        <Menu.Item key="app"  icon={<AppstoreOutlined />}>
                            Navigation Two
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

                        <Menu.Item key="login" icon={<LoginOutlined />}>
                            <a href="login" rel="noopener noreferrer">
                                登录
                            </a>
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined />}>
                            退出
                    </Menu.Item>
                    </Menu>

                    {/* <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/problems">

                        </Route>
                        <Route path="/contests">

                        </Route>
                        <Route path="/submit_status">

                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/regist">

                        </Route>
                    </Switch>
                </BrowserRouter> */}
            </Layout.Header>
        );
    }
}