import React, { Component } from 'react'
import {Layout} from 'antd'

export default class Footer extends Component {
    render() {
        return (
            <Layout.Footer style={{ textAlign: 'center' }}>
                OnlineJudge {new Date().toLocaleDateString()}
            </Layout.Footer>
        );
    }
}