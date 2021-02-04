import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

export class LogoutMenuItem extends Component {
    render() {
        return (
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <Link to="/logout">
                    退出
                </Link>
            </Menu.Item>
        )
    }
}

export default LogoutMenuItem
