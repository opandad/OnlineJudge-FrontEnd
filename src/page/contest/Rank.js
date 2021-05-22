import React, { Component } from 'react'
import { REAREND_HOSTNAME } from '../../configs/Rearend'
import moment from 'moment';
import { Table, Layout, Space, Button, Row, Col } from 'antd';

export class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null
        }
        this.rank = new Array();
        this.problemID2Index = [];
    }

    componentDidMount() {
        this.props.location.state.contestID = parseInt(this.props.location.state.contestID)
        this.LoadingSubmit()
    }

    LoadingSubmit() {
        fetch(REAREND_HOSTNAME + "/contest/rank/" + this.props.location.state.contestID, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)

                if (result.httpStatus.isError === false) {
                    // console.log(this.props.location.state)
                    for (let i = 0; i < this.props.location.state.problemsIndex.length; i++) {
                        this.problemID2Index[this.props.location.state.problemsIndex[i]] = String.fromCharCode(i + 65)
                    }
                    // console.log(this.problemID2Index)

                    // console.log("submit", result.submits, "users", result.users)

                    for (let i = 0; i < result.users.length; i++) {
                        this.rank[result.users[i].id] = [];
                        this.rank[result.users[i].id]["name"] = result.users[i].name
                        this.rank[result.users[i].id]["sumTime"] = 0
                        this.rank[result.users[i].id]["acCount"] = 0
                        this.rank[result.users[i].id]["problems"] = []

                        for (let j = 0, index = 65; j < this.props.location.state.problemsIndex.length; j++, index++) {
                            let ABCIndex = String.fromCharCode(index)

                            this.rank[result.users[i].id]["problems"][ABCIndex] = []//["index"] = index
                            this.rank[result.users[i].id]["problems"][ABCIndex]["waCount"] = 0 //错误次数
                            this.rank[result.users[i].id]["problems"][ABCIndex]["acTime"] = null //用时
                            this.rank[result.users[i].id]["problems"][ABCIndex]["isError"] = true
                        }
                    }

                    // console.log("修改前",this.rank)

                    for (let i = 0; i < result.submits.length; i++) {
                        let ABCIndex = this.problemID2Index[result.submits[i].problemID]

                        //console.log(this.problemID2Index[result.submits[i].problemID])

                        if (result.submits[i].isError === false && result.submits[i].submitState === "Accepted" && this.rank[result.submits[i].userID]["problems"][ABCIndex]["isError"] === true) {
                            this.rank[result.submits[i].userID]["problems"][ABCIndex].acTime = moment(result.submits[i].submitTime).diff(moment(this.props.location.state.contestStartTime), "second")
                            this.rank[result.submits[i].userID]["problems"][ABCIndex].isError = false
                            this.rank[result.submits[i].userID].acCount++
                            this.rank[result.submits[i].userID].sumTime += this.rank[result.submits[i].userID]["problems"][ABCIndex].acTime + this.rank[result.submits[i].userID]["problems"][ABCIndex]["waCount"] * 1200

                            // console.log("ac: ", i)
                        }
                        else if (result.submits[i].isError === true && this.rank[result.submits[i].userID]["problems"][ABCIndex]["isError"] === true) {
                            this.rank[result.submits[i].userID]["problems"][ABCIndex]["waCount"]++
                            // console.log("wa: ", i)
                        }
                    }

                    console.log("修改后", result.submits)

                    this.rank.sort(function (a, b) {
                        if (a.acCount != b.acCount) {
                            return a.acCount > b.acCount
                        }
                        return a.sumTime > b.sumTime
                    })

                    // console.log(this.rank)

                    this.setState({
                        isLoaded: true
                    });
                }
                if (result.httpStatus.msg !== "") {
                    alert(result.httpStatus.msg)
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

    render() {
        // console.log(this.acSubmits, this.waSubmits)

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
                        error: {this.state.error}
                    </div>
                )
            }
            else {
                // console.log(this.rank)
                let problemsIndex = []
                for (let i = 0; i < this.props.location.state.problemsIndex.length; i++) {
                    problemsIndex.push({
                        title: String.fromCharCode(i + 65),
                        key: String.fromCharCode(i + 65),
                        render: (text, record, index) => {
                            // console.log("record", record)
                            console.log("index", record)
                            var d = moment.duration(record["problems"][String.fromCharCode(i + 65)]["acTime"], 'milliseconds');
                            var hours = Math.floor(d.asHours());
                            var mins = Math.floor(d.asMinutes()) - hours * 60;
                            //还没开始a
                            // if()
                            //wa中
                            if (record["problems"][String.fromCharCode(i + 65)]["isError"] === true && record["problems"][String.fromCharCode(i + 65)]["waCount"] !== 0) {
                                return (
                                    <Col style={{ background: '#f5222d' }}>
                                        <Row>错误次数：{record["problems"][String.fromCharCode(i + 65)]["waCount"]}</Row>
                                        <Row>解答时间：{(hours) + ":" + (mins) + ":" + (d % 60)}</Row>
                                    </Col>
                                )
                            }

                            //ac了
                            if (record["problems"][String.fromCharCode(i + 65)]["isError"] === false) {
                                return (
                                    <Col style={{ background: '#a0d911' }}>
                                        <Row>错误次数：{record["problems"][String.fromCharCode(i + 65)]["waCount"]}</Row>
                                        <Row>解答时间：{(hours) + ":" + (mins) + ":" + (d % 60)}</Row>
                                    </Col>
                                )
                            }

                            return (
                                <Col>
                                    <Row>错误次数：{record["problems"][String.fromCharCode(i + 65)]["waCount"]}</Row>
                                    <Row>解答时间：{(hours) + ":" + (mins) + ":" + (d % 60)}</Row>
                                </Col>
                            )
                        },
                    })
                }

                const rankTable = [
                    {
                        title: '排名',
                        render: function (text, record, index) {
                            return (
                                <Row>{index + 1}</Row>
                            )
                        }
                    },
                    {
                        title: '队名',
                        dataIndex: 'name',
                        key: "name",
                    },
                    {
                        title: '解题数',
                        dataIndex: 'acCount',
                        key: "acCount"
                    },
                    {
                        title: '用时',
                        dataIndex: 'sumTime',
                        key: "sumTime",
                        render: function (text) {
                            var d = moment.duration(text, 'milliseconds');
                            var hours = Math.floor(d.asHours());
                            var mins = Math.floor(d.asMinutes()) - hours * 60;
                            return (
                                <Row>{(hours) + ":" + (mins) + ":" + (d % 60)}</Row>
                            )
                        }
                    },
                    {
                        title: '题目',
                        key: "problems",
                        children: problemsIndex
                    }
                ];

                return (
                    <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Table
                            columns={rankTable}
                            dataSource={this.rank}
                            // pagination={{
                            //     defaultCurrent: this.state.current,
                            //     total: this.state.total,
                            //     defaultPageSize: this.state.pageSize,
                            //     showSizeChanger: true
                            // }}
                            onChange={this.onChange}
                        />
                    </Layout.Content>
                )
            }
        }
    }
}

export default Rank
