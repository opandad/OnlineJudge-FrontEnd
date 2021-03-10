import React from 'react'
import ReactDOM from 'react-dom'
import TopNavbar from './component/navbar/TopNavbar'
import Footer from './component/Footer'
import { Layout } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './page/Home'
import Login from './page/user/Login'
import Resign from './page/user/Registration'
import ProblemList from './page/problem/ProblemList'
import { REAREND_HOSTNAME } from './configs/Rearend'
import Loading from './page/public/Loading'
import { LoginInfo } from './store/Data'
import { FRONTEND_HOSTNAME } from './configs/Frontend'
import 'antd/dist/antd.less'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }
    }

    authLogin() {
        var loginInfo = new LoginInfo();
        loginInfo.userID = window.localStorage.getItem('userID');
        loginInfo.password = window.localStorage.getItem('password');
        loginInfo.snowflakeID = window.localStorage.getItem('snowflakeID');
        loginInfo.authority = window.localStorage.getItem('authority');

        // console.log(loginInfo)

        if (loginInfo.userID === 0 || loginInfo.userID === null) {
            this.setState({
                isLoaded: true
            })
            return
        }
        else {
            //bug  逻辑：验证是否正确，如不正确清除掉
            fetch(REAREND_HOSTNAME + "/authLogin", {
                method: 'POST',
                headers: {
                    'Accept': '/application/json',
                    'Content-Type': '/application/json'
                },
                body: JSON.stringify({
                    loginInfo: loginInfo
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log(result)

                        if (result.isError === true) {
                            window.localStorage.setItem('userID', null);
                            window.localStorage.setItem('password', null);
                            window.localStorage.setItem('authority', null);
                            alert('账号疑似被盗');
                            window.location.href = FRONTEND_HOSTNAME;
                        }
                        this.setState({
                            isLoaded: true
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    componentDidMount() {
        fetch(REAREND_HOSTNAME + "/snowflakeID", {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-Type': '/application/json'
            },
            body: JSON.stringify({
                "snowflakeID": window.localStorage.getItem('snowflakeID')
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    window.localStorage.setItem('snowflakeID', result.snowflakeID)
                    this.authLogin();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading />;
        }
        else {
            return (
                <BrowserRouter>
                    <Layout>
                        <Layout.Header style={{background: '#fff'}} >
                            <TopNavbar />
                        </Layout.Header>

                        <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/problem/list" component={ProblemList} />
                                <Route path="/contest/list" />
                                <Route path="/submit/list" />
                                <Route path="/login" component={Login} />
                                <Route path="/regist" component={Resign} />
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }} >
                            OnlineJudge {new Date().toLocaleDateString()}
                        </Layout.Footer>
                    </Layout>
                </BrowserRouter>
            )
        }
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));