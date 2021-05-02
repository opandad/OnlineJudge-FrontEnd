import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Layout, Breadcrumb } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import { FRONTEND_HOSTNAME } from '../../configs/Frontend';

export class UserInfoEdit extends Component {
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
        if (this.props.match.params.id !== window.localStorage.getItem('userID')) {
            alert("你不是此用户")
            window.location.href = FRONTEND_HOSTNAME
        }
    }

    editButton(){
        if (this.props.match.params.id !== window.localStorage.getItem('userID')){
            return null
        }
        return(
            <Row>
                <Button>保存</Button>
                <Button>修改密码</Button>
            </Row>
        )
    }

    render() {
        return (
            <>
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Row>{this.editButton()}</Row>
                    <Row>
                        <Form>
                        <Col span={12}>
                            <Row>
                                昵称
                            </Row>
                            <Row>
                                <Input></Input>
                            </Row>
                            <Row>
                                <Col>QQ</Col>
                                <Input></Input>
                            </Row>
                            <Row>
                                学号
                            </Row>
                            <Row>
                            <Input></Input>
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
                        </Form>
                    </Row>
                </Layout.Content>
            </>
        )
    }
}

export default UserInfoEdit
