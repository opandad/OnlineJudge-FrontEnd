import React, { Component } from 'react'
import { Table, Tag, Space, Layout } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';

export class SubmitList extends Component {
    columns = [
        {
            title: '提交ID',
            dataIndex: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
        },
        {
            title: '用户ID',
            dataIndex: 'userID',
        },
        {
            title: '问题ID',
            dataIndex: 'problemID',
        },
        {
            title: '竞赛ID',
            dataIndex: 'contestID',
        },
        {
            title: '使用语言',
            dataIndex: 'languageID',
        },
        {
            title: '问题状态',
            dataIndex: 'submitState',
            render: function (submitState) {
                if (submitState === 'Accepted') {
                    return (
                        <Tag color='green'>
                            {submitState}
                        </Tag>
                    );
                }
                if (submitState === 'Pending') {
                    return (
                        <Tag color='grid'>
                            {submitState}
                        </Tag>
                    );
                }

                if (submitState === "Wrong Answer") {
                    return (
                        <Tag color='red'>{submitState}</Tag>
                    );
                }

                return (
                    <Tag color='gold'>
                        {submitState}
                    </Tag>
                );
            }

        },
    ];

    constructor(props) {
        super(props)
        this.state = {
            submits: null,
            isLoaded: false,
            page: null,
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(pagination) {
        this.getSubmitList(pagination.current, pagination.pageSize)
    }

    componentDidMount() {
        this.getSubmitList(1, 10)
    }

    getSubmitList(pageIndex, pageSize) {
        let problemID = 0
        let contestID = 0
        let languageID = 0
        let userID = 0

        if (typeof (this.props.location.state) !== 'undefined') {
            problemID = typeof (this.props.location.state.problemID) !== 'undefined' ? this.props.location.state.problemID : 0
            contestID = typeof (this.props.location.state.contestID) !== 'undefined' ? this.props.location.state.contestID : 0
            languageID = typeof (this.props.location.state.languageID) !== 'undefined' ? this.props.location.state.languageID : 0
            userID = typeof (this.props.location.state.userID) !== 'undefined' ? this.props.location.state.userID : 0
        }

        fetch(REAREND_HOSTNAME + "/submit/list", {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                submit: {
                    contestID: contestID,
                    problemID: problemID,
                    languageID: languageID,
                    userID: userID
                },
                page: {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            })
        }).then((response) => response.json())
            .then((result) => {
                // console.log("result", result)

                if (result.httpStatus.isError === false) {
                    this.setState({
                        submits: result.submit,
                        page: result.page,
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

    render() {
        // console.log("render", this.state.page)

        if (this.state.isLoaded === false) {
            return (
                <div>加载中。。。。。。。</div>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <div>
                        error submit list: {this.state.error}
                    </div>
                )
            }
            return (
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Table columns={this.columns} dataSource={this.state.submits} pagination={{
                        defaultCurrent: this.state.page.current,
                        total: this.state.page.total64,
                        defaultPageSize: this.state.page.pageSize,
                        showSizeChanger: true
                    }} onChange={this.onChange} />
                </Layout.Content>
            )
        }
    }
}

export default SubmitList
