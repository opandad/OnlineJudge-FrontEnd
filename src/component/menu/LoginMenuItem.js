import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

export class LoginMenuItem extends Component {
    render() {
        return (
            <Menu.Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">
                    登录
                </Link>
            </Menu.Item>
        )
    }
}

export default LoginMenuItem
