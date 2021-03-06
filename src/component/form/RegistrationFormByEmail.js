import React, { Component } from 'react'
import { SHA1 } from 'crypto-js'
import WS from '../../utils/Websocket'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { MailOutlined, LoadingOutlined, CheckOutlined } from '@ant-design/icons'
import {Email,RearEndData} from '../../store/RearEndData'

export class RegistrationFormByEmail extends Component {
    //样式
    formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            account: ""
        };
        this.handleAccount = this.handleAccount.bind(this);
        this.sendVerifyCode = this.sendVerifyCode.bind(this);
    }

    handleAccount(event) {
        this.setState({ account: event.target.value });
    }

    sendVerifyCode(event) {
        let rearEndData = new RearEndData();
        rearEndData.httpStatus.requestPath="account/verifyCode/email"
        rearEndData.data.email.push(new Email());
        rearEndData.data.email[0].email=this.state.account;
        WS.SendData(rearEndData)
    }

    onFinish = (values) => {
        let rearEndData = new RearEndData();
        rearEndData.httpStatus.requestPath="account/regist/email";
        rearEndData.data.email.push(new Email());
        rearEndData.data.email[0].email=values["account"];
        rearEndData.data.email[0].user.password=values["password"];
        rearEndData.data.verifyCode=values["verifyCode"];

        //json 避免报错
        rearEndData.data.email[0].user.userInfo="{}"
        WS.SendData(rearEndData)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Row justify="center">
                <Form
                    {...this.formItemLayout}
                    name="loginByEmail"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item label="邮箱" name="account"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的登录邮箱！',
                            },
                        ]}
                    >
                        <Input onChange={this.handleAccount} />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码！',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="repeatPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '请再一次输入相同密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码不相同！');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="邮箱验证码"
                        name="verifyCode"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱收到的验证码！',
                            },
                        ]}
                    >
                        <Row gutter={8}>
                            <Col span={14}>
                                <Input />
                            </Col>
                            <Col span={6}>
                                <Button onClick={this.sendVerifyCode} icon={<MailOutlined />}>
                                    发送验证码
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[8, 8]}>
                            <Col offset={12}>
                                <Button type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Row>
        )
    }
}

export default RegistrationFormByEmail
