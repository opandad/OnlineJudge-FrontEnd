import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Layout, Breadcrumb } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import { Link } from 'react-router-dom'

export class UserInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "abc",
            phone: "abc",
            qq: "abc"
        }
    }

    loadingUserInfo() {
        fetch(REAREND_HOSTNAME + "/account/userInfo/" + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-Type': '/application/json'
            }
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);

                if (result.httpStatus.msg !== "") {
                    alert(result.httpStatus.msg);
                }

                if (result.httpStatus.isError === false) {
                    this.setState({
                        name: result.user.name,
                        phone: result.user.userInfo.phone,
                        qq: result.user.userInfo.qq
                    })
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount() {
        this.loadingUserInfo()
    }

    editButton() {
        if (this.props.match.params.id !== window.localStorage.getItem('userID')) {
            return null
        }

        return (
            <Row>
                <Link to={{
                    pathname: "/userInformation/" + this.props.match.params.id
                }}>
                    <Button>编辑</Button>
                </Link>
            </Row>
        )
    }

    render() {
        return (
            <>
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Row>{this.editButton()}</Row>
                    <Row>
                        <Col span={12}>
                            <Row>
                                昵称
                            </Row>
                            <Row>
                                张三
                            </Row>
                            <Row>
                                <Col>QQ</Col>
                                <Col>{this.state.qq}</Col>
                            </Row>
                            <Row>
                                学号
                            </Row>
                            <Row>
                                1234567890
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                通过题目
                            </Row>
                            <Row>
                                图
                            </Row>
                            <Row>
                                近期比赛排行
                            </Row>
                        </Col>
                    </Row>
                </Layout.Content>
            </>
        )
    }
}

export default UserInformation
