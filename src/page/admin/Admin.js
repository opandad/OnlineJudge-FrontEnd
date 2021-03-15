import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { FRONTEND_HOSTNAME } from '../../configs/Frontend'
import { Layout, Menu } from 'antd'
import ProblemsManage from './problem/ProblemsManage'
import UsersManage from './user/UsersManage'
import TeamManage from './team/TeamManage'
import ProblemEdit from './problem/ProblemEdit'

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
                        <Menu.Item key="problem"><Link to="/admin/problem/list">题目管理（未完成）</Link></Menu.Item>
                        <Menu.Item key="contest"><Link to="/admin/contest/list">比赛管理（未完成）</Link></Menu.Item>
                        <Menu.Item key="user"><Link to="/admin/user">用户管理（未完成）</Link></Menu.Item>
                        <Menu.Item key="team"><Link to="/admin/team">队伍管理（未完成）</Link></Menu.Item>
                    </Menu>
                </Layout.Sider>

                <Layout.Content>
                    <Switch>
                        <Route path="/admin/problem/list" component={ProblemsManage} />
                        <Route path="/admin/problem/edit" component={ProblemEdit} />
                        <Route path="/admin/problem/add" component={ProblemEdit} />
                        <Route path="/admin/contest/list" component={null} />
                        <Route path="/admin/contest/edit" component={null} />
                        <Route path="/admin/user" component={UsersManage} />
                        <Route path="/admin/team" component={TeamManage} />
                    </Switch>
                </Layout.Content>
            </>
        )
    }
}

export default Admin
