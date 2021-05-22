import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import LoginFormByEmail from '../../component/form/LoginFormByEmail'
import LoginFormByTeam from '../../component/form/LoginFormByTeam';

export default class Login extends Component {
    render() {
        return (
            // <LoginFormByTeam />
            <>
            <Layout.Sider>
                <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                    <Menu.Item key="email" ><Link to="/login/email">email</Link></Menu.Item>
                    <Menu.Item key="team"><Link to="/login/team">team</Link></Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Switch>
                    <Route path="/login/email" component={LoginFormByEmail} />
                    <Route path="/login/team" component={LoginFormByTeam}/>
                </Switch>
            </Layout.Content>
            </>
        );
    }
}
