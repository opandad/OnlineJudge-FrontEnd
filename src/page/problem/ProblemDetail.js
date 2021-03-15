import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import CodeEditor from '../../component/TextEditor/CodeEditor'
import { FRONTEND_HOSTNAME } from '../../configs/Frontend';
import { Typography, Space, Layout } from 'antd';

export class ProblemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            problem: null,
            isLoaded: false,
            error: false,
            languages: null,
        }
    }

    loadingProlemDetail() {
        fetch(REAREND_HOSTNAME + "/problem/" + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                //test
                // console.log("problem detail result")
                // console.log(result)

                if (result.httpStatus.isError === false) {
                    this.setState({
                        languages: result.languages,
                        problem: result.problem,
                        isLoaded: true
                    });
                }
                if (result.httpStatus.msg !== "") {
                    alert(result.httpStatus.message)
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

    loadingContestProblemDetail(){
        // console.log(this.props)

        this.setState({
            languages: this.props.location.state.languages
        })

        fetch(REAREND_HOSTNAME + "/problem/" + this.props.location.state.problemID, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                //test
                // console.log("problem detail result")
                // console.log(result.languages)

                if (result.httpStatus.isError === false) {
                    this.setState({
                        problem: result.problem,
                        isLoaded: true
                    });
                }
                if (result.httpStatus.msg !== "") {
                    alert(result.httpStatus.message)
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

    componentDidMount() {
        if (window.localStorage.getItem('userID') === null || window.localStorage.getItem('userID') === "") {
            alert("请先登录")
            window.location.href = FRONTEND_HOSTNAME + "/login"
        }

        console.log("problem detail")
        console.log(this.props)

        if(parseInt(this.props.location.state.contestID) === 0){
            // console.log("no contest")

            this.loadingProlemDetail()
        }
        else{
            // console.log("yes contest")

            this.loadingContestProblemDetail()
        }
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <div>
                        error: {this.state.error.message}
                    </div>
                )
            }
            else {
                return (
                    <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Space direction="vertical" size={10}>
                                    <Typography.Title>
                                        {this.state.problem.name}
                                    </Typography.Title>
                                    <Typography.Title level={4}>
                                        题目描述
                                    </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.problemDescription}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        输入描述
                                </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.inputDescription}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        输出描述
                                </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.outputDescription}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        输入样例
                                </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.inputCase}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        输出样例
                                </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.outputCase}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        提示
                                </Typography.Title>
                                    <Typography.Text>
                                        {this.state.problem.description.tips}
                                    </Typography.Text>
                                    <Typography.Title level={4}>
                                        其他限制
                                </Typography.Title>
                                </Space>
                            </Row>
                            <Row>
                                <Space size={10}>
                                    <Typography.Text>
                                        C/C++时间限制：{this.state.problem.description.timeLimit}ms
                                    </Typography.Text>
                                    <Typography.Text>
                                        其他语言时间限制：{this.state.problem.description.realTimeLimit}ms
                                    </Typography.Text>
                                    <Typography.Text>
                                        内存限制：{this.state.problem.description.memoryLimit}KB
                                    </Typography.Text>
                                    <Typography.Text>
                                        文件大小限制：{this.state.problem.description.fileSizeLimit}KB
                                    </Typography.Text>
                                </Space>
                            </Row>
                        </Col>
                        <Col span={12}><CodeEditor problemID={this.props.location.state.problemID} contestID={this.props.location.state.contestID} languages={this.state.languages} /></Col>
                    </Row>
                    </Layout.Content>
                )
            }
        }
    }
}

export default ProblemDetail
