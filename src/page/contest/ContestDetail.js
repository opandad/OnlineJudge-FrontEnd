import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import ProblemDetail from '../problem/ProblemDetail';
import { Switch, Route, Link } from 'react-router-dom';
import SubmitList from '../submit/SubmitList';

export class ContestDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: null,
            isLoaded: false,
            error: null,
            problems: null,
            languages: null,
            link: "/contest/detail/" + this.props.match.params.id + "/",
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.loadingContest()
    }

    loadingContest() {
        fetch(REAREND_HOSTNAME + "/contest/" + this.props.match.params.id, {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                "loginInfo": {
                    "userID": parseInt(window.localStorage.getItem("userID")),
                    "password": window.localStorage.getItem("password"),
                    "authority": window.localStorage.getItem("authority"),
                    "snowflakeID": window.localStorage.getItem("snowflakeID")
                }
            })
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState(
                    {
                        problems: [].concat(result.problems),
                        languages: [].concat(result.languages),
                        contest: result.contest,
                        isLoaded: true
                    }
                );
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    handleClick(e) {
    }

    render() {
        let problemID2Index = new Array();
        if (this.state.problems !== null) {
            for (let i = 0; i < this.state.problems.length; i++) {
                problemID2Index.push(this.state.problems[i].id)
            }
        }
        const problemMenuItem = problemID2Index.map((number) =>
            <Menu.Item key={number}>
                <Link to={{
                    pathname: this.state.link + "problem/" + number,
                    state: {
                        contestID: parseInt(this.props.match.params.id),
                        problemID: number,
                        languages: this.state.languages
                    }
                }}>
                    {number}
                </Link>
            </Menu.Item>
        );

        // console.log(problemID2Index)
        // console.log(this.props)
        // console.log(this.state.link+"problem/:problemID")

        if (this.state.isLoaded === false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            );
        } else {
            if (this.state.error) {
                return (
                    <div>
                        error: {this.state.error.message}
                    </div>
                );
            }
            return (
                <>
                    <Layout.Sider>
                        <Menu
                            onClick={this.handleClick}
                            width={200}
                            mode="inline"
                            style={{ height: '100%' }}
                        >
                            <Menu.SubMenu key="problem" title="题目">
                                {problemMenuItem}
                            </Menu.SubMenu>

                            <Menu.Item key="rank">
                                <Link to={{
                                    pathname: this.state.link + "rank",
                                    state: {
                                        contestID: this.props.match.params.id
                                    }
                                }}>
                                    排名
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="submit">
                                <Link to={{
                                    pathname: this.state.link + "submit",
                                    state: {
                                        contestID: parseInt(this.props.match.params.id)
                                    }
                                }}>
                                    提交
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Switch>
                        <Route path={this.state.link + "problem/:problemID"} component={ProblemDetail} />
                        <Route path={this.state.link + "rank"} component={null} />
                        <Route path={this.state.link + "submit"} component={SubmitList} />
                    </Switch>
                </>
            )
        }
    }
}

export default ContestDetail
