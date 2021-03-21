import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { FRONTEND_HOSTNAME } from '../../configs/Frontend'
import { Layout, Menu } from 'antd'
import ProblemsManage from './problem/ProblemsManage'
import UsersManage from './user/UsersManage'
import ProblemEdit from './problem/ProblemEdit'
import {UserOutlined, QuestionOutlined, TrophyOutlined} from '@ant-design/icons'
import ProblemDelete from './problem/ProblemDelete'
import ContestsManage from './contest/ContestsManage'
import ContestsEdit from './contest/ContestsEdit'

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
                        <Menu.Item key="problem" icon={<QuestionOutlined />}><Link to="/admin/problem/list">题目管理（未完成）</Link></Menu.Item>
                        <Menu.Item key="contest" icon={<TrophyOutlined />}><Link to="/admin/contest/list">比赛管理（未完成）</Link></Menu.Item>
                        <Menu.SubMenu key="account" icon={<UserOutlined />} title="用户账号管理">
                            <Menu.Item key="user"><Link to="/admin/user">用户管理（未完成）</Link></Menu.Item>
                            <Menu.Item key="team"><Link to="/admin/team">队伍管理（未完成）</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>

                <Layout.Content>
                    <Switch>
                        <Route path="/admin/problem/list" component={ProblemsManage} />
                        <Route path="/admin/problem/edit" component={ProblemEdit} />
                        <Route path="/admin/problem/add" component={ProblemEdit} />
                        <Route path="/admin/problem/delete" component={ProblemDelete} />
                        <Route path="/admin/contest/list" component={ContestsManage} />
                        <Route path="/admin/contest/edit" component={ContestsEdit} />
                        <Route path="/admin/user" component={UsersManage} />
                    </Switch>
                </Layout.Content>
            </>
        )
    }
}

export default Admin
