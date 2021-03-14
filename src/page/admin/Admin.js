import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { FRONTEND_HOSTNAME } from '../../configs/Frontend'
import { Layout, Menu } from 'antd'

export class Admin extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window.localStorage.getItem("authority") !== "admin") {
            alert("非管理员")
            window.location.href = FRONTEND_HOSTNAME + "/"
        }
    }

    render() {
        return (
            <>
                <Layout.Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="problem"><Link to="/admin/problem">test1</Link></Menu.Item>
                        <Menu.Item key="user"><Link to="/admin/user">test2</Link></Menu.Item>
                        <Menu.Item key="team"><Link to="/admin/team">test2</Link></Menu.Item>

                        <Menu.SubMenu key="sub1" title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub3" title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>

                <Layout.Content>
                    <Switch>
                        {/* <Route path="/admin/test1" component={Test1} />
                        <Route path="/admin/test2" component={Test2} /> */}
                    </Switch>
                </Layout.Content>
            </>
        )
    }
}

export default Admin
