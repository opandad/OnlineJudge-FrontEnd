import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './utils/Websocket'
import TopNavbar from './component/TopNavbar';
import Footer from './component/Footer'
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './page/Home'
import Login from './page/Login'

import 'antd/dist/antd.less';

class Index extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <TopNavbar />
                    <Layout.Content>
                        <div>
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
                        </div>
                    </Layout.Content>

                    <Footer />
                </Layout>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));