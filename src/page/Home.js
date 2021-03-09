import React, { Component } from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <Layout.Content style={{ padding: '0 50px' }}>
                <h1>OnlineJudge</h1>
                <p>快速提高算法编程能力</p>
                <Link to="/login">
                    登录
                </Link>
            </Layout.Content>
        )
    }
}
