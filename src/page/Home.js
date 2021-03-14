import React, { Component } from 'react'
import { Layout, Typography, Space } from 'antd'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Space direction='vertical'>
                    <Typography.Title>OnlineJudge</Typography.Title>
                    <Typography.Text>快速提高算法编程能力</Typography.Text>
                    
                    <Link to="/login">
                        登录
                    </Link>
                </Space>
            </Layout.Content>
        )
    }
}
