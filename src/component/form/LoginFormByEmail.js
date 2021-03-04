import React, { Component } from 'react'
import { SHA1 } from 'crypto-js'
import WS from '../../utils/Websocket'
import { Form, Input, Button, Checkbox, Row } from 'antd';

/*
    还差加密，存cookie

    @Title
    
    ~/src/component/form/LoginForm.js
    
    @Description
    
    登录框
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export default class LoginFormByEmail extends Component {
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    onFinish = (values) => {
        //TODO 加密
        var loginInfo = {
            RequestPath:"user/login/email",
            user:{
                account: values["account"],
                password: values["password"]//SHA1(values["password"]).toString()
            }
        };

        //TODO 存入cookie
        if(values["remember"]){
        }

        WS.sendData(loginInfo)
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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

                    <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>自动登录</Checkbox>
                    </Form.Item>
                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        );
    }
}
