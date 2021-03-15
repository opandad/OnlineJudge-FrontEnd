import React, { Component } from 'react'
import { Table, Tag, Space, Layout } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';

export class SubmitList extends Component {
    columns = [
        {
            title: '提交ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
        },
        {
            title: '用户ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: '问题ID',
            dataIndex: 'problemID',
            key: 'problemID',
        },
        {
            title: '竞赛ID',
            dataIndex: 'contestID',
            key: 'contestID',
        },
        {
            title: '使用语言',
            dataIndex: 'languageID',
            key: 'languageID',
        },
        {
            title: '问题状态',
            key: 'submitState',
            dataIndex: 'submitState',
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
    
    onChange(pagination){
        this.getSubmitList(pagination.current, pagination.pageSize)
    }

    componentDidMount() {
        this.getSubmitList(1, 10)
    }

    getSubmitList(pageIndex, pageSize) {
        // console.log(REAREND_HOSTNAME + "/submit/list")

        fetch(REAREND_HOSTNAME + "/submit/list", {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                submit: {
                    contestID: 0,
                    problemID: 0,
                    languageID: 0,
                    userID: 0
                },
                page: {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            })
        }).then((response) => response.json())
            .then((result) => {
                console.log("result", result)

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
        console.log("render", this.state.page)

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
