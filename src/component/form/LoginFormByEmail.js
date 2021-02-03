import React, { Component } from 'react'
import { SHA1 } from 'crypto-js'
import { ws } from '../../utils/Websocket'
import { Form, Input, Button, Checkbox, Row } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/*
    @Title
    
    ~/src/component/form/LoginForm.js
    
    @Description
    
    登录框
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export default class LoginFormByEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.loginEmailChange = this.loginEmailChange.bind(this);
        this.loginPasswordChange = this.loginPasswordChange.bind(this);
        this.loginByEmail = this.loginByEmail.bind(this);
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {
        return (
            <Row justify="center">
                <Form
                    name="loginByEmail"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item label="用户名" name="email"
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

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>自动登录</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                    </Button>
                    </Form.Item>
                </Form>
            </Row>
        );
    }

    loginByEmail(event) {
        event.preventDefault();
        // console.log("email: " + this.state.email + "  password: " + this.state.password);
        // console.log(SHA1(this.state.password).toString());

        //TODO
        var loginInfo = {
            "account": this.state.email,
            "password": this.state.password,//SHA1(this.state.password).toString(),
            "loginByWhat": "email",
            "msg": "login",
        }

        ws.send(JSON.stringify(loginInfo));
    }

    loginEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    loginPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
}
