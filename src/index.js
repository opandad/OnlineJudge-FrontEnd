import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './utils/Websocket'
import TopNavbar from './component/navbar/TopNavbar';
import Footer from './component/Footer'
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './page/Home'
import Login from './page/user/Login'
import Resign from './page/user/Registration'
import ProblemList from './page/problem/ProblemList'

import 'antd/dist/antd.less';

class Index extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <TopNavbar />

                    <Layout.Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <Switch>
                            <Route path="/home">
                                <Home />
                            </Route>
                            <Route path="/problem/list">
                                <ProblemList />
                            </Route>
                            <Route path="/contest/list">

                            </Route>
                            <Route path="/submit/list">

                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/regist">
                                <Resign />
                            </Route>
                        </Switch>
                    </Layout.Content>

                    <Footer />
                </Layout>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));