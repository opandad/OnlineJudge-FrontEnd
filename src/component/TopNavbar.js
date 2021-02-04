import React, { Component } from 'react'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { UnorderedListOutlined, AppstoreOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons'
import LoginMenuItem from './menu/LoginMenuItem'
import LogoutMenuItem from './menu/LogoutMenuItem'

import '../assets/css/TopNavbar.less'

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
            isLoggedIn: false,
            current: 'mail',
        };
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const isLoggedIn=this.state.isLoggedIn;
        let isLoggedInMenuItem;
        if(isLoggedIn){
            isLoggedInMenuItem = <LogoutMenuItem />
        }else{
            isLoggedInMenuItem = <LoginMenuItem />
        }

        return (
            <Layout.Header>
                <div className="logo" />
                <Menu theme="dark" onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">
                            主页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="problems" icon={<UnorderedListOutlined />}>
                        题目
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

                    {isLoggedInMenuItem}
                </Menu>
            </Layout.Header>
        );
    }
}