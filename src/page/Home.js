import React, { Component } from 'react'

export class Home extends Component {
    render() {
        return (
            <Container className="px-3">
                <h1>OnlineJudge</h1>
                <p class="lead">快速提高算法编程能力</p>
                <p class="lead">
                    <a href="/login" class="btn btn-lg btn-secondary fw-bold">登录</a>
                </p>
            </Container>
        )
    }
}
