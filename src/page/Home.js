import React, { Component } from 'react'
import { Layout } from 'antd'

export default class Home extends Component {
    render() {
        return (
            <Layout.Content style={{ padding: '0 50px' }}>
                <h1>OnlineJudge</h1>
                <p class="lead">快速提高算法编程能力</p>
                <p class="lead">
                    <a href="/login" class="btn btn-lg btn-secondary fw-bold">登录</a>
                </p>
            </Layout.Content>
        )
    }
}
