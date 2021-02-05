import React, { Component } from 'react'
import { SHA1 } from 'crypto-js'
import { ws } from '../../utils/Websocket'
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { MailOutlined, LoadingOutlined, CheckOutlined } from '@ant-design/icons'


export class RegistrationFormByEmail extends Component {
    

    sendVerifyCode(props){

    }
    
    render() {
        return (
            <Row justify="center">
                <Form
                    {...this.layout}
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
                        <Input />
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
                        rules={[
                            {
                                required: true,
                                message: '请再一次输入密码！',
                            },
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
                        <Input />
                        <Button onClick={this.sendVerifyCode} icon={<MailOutlined />}>
                            发送验证码
                        </Button>
                    </Form.Item>
                    <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>自动登录</Checkbox>
                    </Form.Item>
                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        )
    }
}

export default RegistrationFormByEmail
