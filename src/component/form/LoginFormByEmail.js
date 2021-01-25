import React, { Component } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import * as Route from '../../configs/Route'
import {SHA1} from 'crypto-js'

/*
    @Title
    
    ~/src/component/form/LoginForm.js
    
    @Description
    
    登录框
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
//method="get" action={Route.REAREND_ROUTE["LoginByEmail"]}
export default class LoginFormByEmail extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container>
            <Col xl={{span:6, offset:3}}>
                <Form controlId="login_form_by_email" onSubmit={this.login()}>
                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm="2">
                            账号
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" placeholder="邮箱" name="email"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="password">
                        <Form.Label column sm="2">
                            密码
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="密码" name="password"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="submit">
                        <Button variant="primary" type="submit">
                            登录
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            </Container>  
        );
    }

    login(){
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        console.log("email: "+ email + "  password: " + password);
        // password.value = SHA1(password.value);
        return false;
    }
}
