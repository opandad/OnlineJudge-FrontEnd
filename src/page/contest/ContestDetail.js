import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import ProblemDetail from '../problem/ProblemDetail';
import { Switch, Route, Link } from 'react-router-dom';
import SubmitList from '../submit/SubmitList';
import Rank from './Rank'

export class ContestDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contest: null,
            isLoaded: false,
            error: null,
            problems: null,
            languages: null,
            link: "/contest/detail/" + this.props.match.params.id + "/",
        }

        this.handleClick = this.handleClick.bind(this);
        this.problemID2Index = [];
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
                // console.log(result)

                if (result.httpStatus.msg !== "") {
                    alert(result.httpStatus.msg)
                }

                if (result.httpStatus.isError === false) {
                    if (result.problems !== null) {
                        for (let i = 0; i < result.problems.length; i++) {
                            this.problemID2Index.push(result.problems[i].id)
                        }
                    }

                    this.setState(
                        {
                            contest: result.contest,
                            problems: [].concat(result.problems),
                            languages: [].concat(result.languages),
                            contest: result.contest,
                            isLoaded: true
                        }
                    );
                }
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
            // console.log(this.problemID2Index)
            let index = 65
            const problemMenuItem = this.problemID2Index.map((number) =>
                <Menu.Item key={number}>
                    <Link to={{
                        pathname: this.state.link + "problem/" + String.fromCharCode(index),
                        state: {
                            contestID: parseInt(this.props.match.params.id),
                            problemID: number,
                            languages: this.state.languages
                        }
                    }}>
                        {String.fromCharCode(index++)}
                    </Link>
                </Menu.Item>
            );

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
                                        contestID: this.props.match.params.id,
                                        problemsIndex: this.problemID2Index,
                                        contestStartTime: this.state.contest.startTime,
                                        contestEndTime: this.state.contest.endTime
                                    }
                                }}>
                                    排名
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="submit">
                                <Link to={{
                                    pathname: this.state.link + "submit",
                                    state: {
                                        contestID: parseInt(this.props.match.params.id),
                                    }
                                }}>
                                    提交
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Switch>
                        <Route path={this.state.link + "problem/:problemID"} component={ProblemDetail} />
                        <Route path={this.state.link + "rank"} component={Rank} />
                        <Route path={this.state.link + "submit"} component={SubmitList} />
                    </Switch>
                </>
            )
        }
    }
}

export default ContestDetail
