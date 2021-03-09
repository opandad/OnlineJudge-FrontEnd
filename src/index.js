import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import TopNavbar from './component/navbar/TopNavbar'
import Footer from './component/Footer'
import { Layout } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './page/Home'
import Login from './page/user/Login'
import Resign from './page/user/Registration'
import ProblemList from './page/problem/ProblemList'
import 'antd/dist/antd.less'
import { REAREND_HOSTNAME } from './configs/Rearend'
import Loading from './page/public/Loading'
import Error from './page/public/Error'
import { LoginInfo } from './store/Data'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }
    }

    authLogin(){
        var loginInfo = new LoginInfo();
        loginInfo.userID = window.localStorage.getItem('userID');
        loginInfo.password = window.localStorage.getItem('password');
        loginInfo.snowflakeID = window.localStorage.getItem('snowflakeID');
        if(loginInfo.userID == ""){
            this.state({
                isLoaded:true
            })
            return
        }
        else{
            //bug  逻辑：验证是否正确，如不正确清除掉
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
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            // return <div>Error: {error.message}</div>;
            return(
                <Error msg={error} />
            )
        } else if (!isLoaded) {
            return <Loading />;
        }
        else {
            return (
                <BrowserRouter>
                    <Layout>
                        <TopNavbar />

                        <Layout.Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/problem/list" component={ProblemList} />
                                <Route path="/contest/list" />
                                <Route path="/submit/list" />
                                <Route path="/login" component={Login} />
                                <Route path="/regist" component={Resign} />
                            </Switch>
                        </Layout.Content>

                        <Footer />
                    </Layout>
                </BrowserRouter>
            )
        }
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));