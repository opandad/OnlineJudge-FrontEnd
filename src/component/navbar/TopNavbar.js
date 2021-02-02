import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { browserHistory } from 'react-router'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../../page/Home'
import { Login } from '../../page/Login';

import 'antd/dist/antd.css';
import '../../assets/css/TopNavbar.css';

/*
    @Title
    
    ~/src/component/navbar/TopNavbar.js
    
    @Description
    
    导航栏
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export default class TopNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            pathname:""
        };
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <Layout.Header>
                <BrowserRouter>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">主页</Menu.Item>
                        <Menu.Item key="2">问题</Menu.Item>
                        <Menu.Item key="3">竞赛</Menu.Item>
                    </Menu>

                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/problems">

                        </Route>
                        <Route path="/contests">

                        </Route>
                        <Route path="/submit_status">

                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/regist">

                        </Route>
                    </Switch>
                </BrowserRouter>
            </Layout.Header>
        );
    }
}