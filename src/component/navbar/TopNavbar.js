import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { UserAddOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, HomeOutlined, TrophyOutlined,CloudUploadOutlined, QuestionOutlined } from '@ant-design/icons'
import { REAREND_HOSTNAME } from '../../configs/Rearend'
import { FRONTEND_HOSTNAME } from '../../configs/Frontend'
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
            isLoggedIn: (window.localStorage.getItem('userID') === 0 || window.localStorage.getItem('userID') === null) ? false : true,
            authority: window.localStorage.getItem('authority'),
            current: 'home',
        };
        this.logout = this.Logout.bind(this);
    }

    handleClick = e => {
        // console.log('click ', e);
        this.setState({ current: e.key });
        // console.log(this.state.isLoggedIn)
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">
                        主页
                        </Link>
                </Menu.Item>

                <Menu.Item key="problem" icon={<QuestionOutlined />}>
                    <Link to="/problem/list">
                        问题
                    </Link>
                </Menu.Item>

                <Menu.Item key="contest" icon={<TrophyOutlined />}>
                    <Link to="/contest/list">
                        竞赛
                    </Link>
                </Menu.Item>
                <Menu.Item key="submit" icon={<CloudUploadOutlined />}>
                    <Link to="/submit/list">
                        提交
                    </Link>
                </Menu.Item>
                {this.userStatusMenu(this.state.isLoggedIn, this.state.authority)}
            </Menu>
        );
    }

    userStatusMenu(isLoggedIn, authority) {
        if (isLoggedIn === true) {
            if (authority === "user") {
                return (
                    <>
                        <Menu.SubMenu key="user" title={window.localStorage.getItem('userName')}>
                            <Menu.ItemGroup>
                                <Menu.Item icon={<SettingOutlined />}>
                                    设置
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={this.logout}>
                                    退出
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </>
                );
            }

            if (authority === "admin") {
                return (
                    <>
                        <Menu.SubMenu key="user" title={window.localStorage.getItem("userName")}>
                            <Menu.ItemGroup>
                                <Menu.Item key="setting" icon={<SettingOutlined />}>
                                    设置
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item>
                                    <Link key="admin" to="/admin">
                                        管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={this.logout}>
                                    退出
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </>
                );
            }
        }
        else {
            return (
                <>
                    <Menu.Item key="login" icon={<LoginOutlined />}>
                        <Link to="/login">
                            登录
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="regist" icon={<UserAddOutlined />}>
                        <Link to="/regist">
                            注册
                        </Link>
                    </Menu.Item>
                </>
            );
        }
    }

    Logout() {
        fetch(REAREND_HOSTNAME + "/account/logout", {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-Type': '/application/json'
            },
            body: JSON.stringify({
                snowflakeID: window.localStorage.getItem('snowflakeID'),
                userID: window.localStorage.getItem('userID')
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.msg !== "") {
                        alert(result.msg);
                    }
                    if (result.isError === false) {
                        let snowflakeID = window.localStorage.getItem('snowflakeID');
                        window.localStorage.clear();
                        window.localStorage.setItem('snowflakeID', snowflakeID);
                    }
                    window.location.href = FRONTEND_HOSTNAME;
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }
}