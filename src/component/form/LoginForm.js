import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

/*
    @Title
    
    ~/src/component/form/LoginForm.js
    
    @Description
    
    登录框
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export class LoginForm extends Component {
    render() {
        return (
            <Form id="LoginForm">
                <input type="text">

                </input>
                <input type="password">

                </input>
                <Button>

                </Button>
            </Form>
        );
    }
}
