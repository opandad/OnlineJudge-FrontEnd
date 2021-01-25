import React, { Component } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../../page/Home'
import { Login } from '../../page/Login';

/*
    @Title
    
    ~/src/component/navbar/TopNavbar.js
    
    @Description
    
    导航栏
    
    @Func List（这个需打开函数检查）
    
    | func name         | develop  | unit test |
    
    | NavigationBar     |    no    |     no    |
*/
export class TopNavbar extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/home">OnlineJudge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/problems">问题</Nav.Link>
                            <Nav.Link href="/contests">竞赛</Nav.Link>
                            <Nav.Link href="/submit_status">提交状态</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                        <Button href="/login">
                            登录
                        </Button>
                        <Button href="/regist">
                            注册
                    </Button>
                    </Navbar.Collapse>
                </Navbar>
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
        );
    }
}