import React, { Component } from 'react'
import { SHA1 } from 'crypto-js'
import { ws } from '../../utils/Websocket'
import { Form, Input, Button, Checkbox } from 'antd';

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
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

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
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
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
