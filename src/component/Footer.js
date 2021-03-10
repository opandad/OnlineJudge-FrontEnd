import React, { Component } from 'react'
import 'antd/dist/antd.less'

export default class Footer extends Component {
    render() {
        return (
            <>
            OnlineJudge {new Date().toLocaleDateString()}
            </>
        );
    }
}