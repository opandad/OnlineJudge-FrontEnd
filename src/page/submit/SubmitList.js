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
            // render: function(tags){
            //     tags.map(tag => {
            //         let color
            //         if (tag === 'Accepted') {
            //             color = 'green'
            //         } else if (tag === 'Pending') {
            //             color = 'grid'
            //         }
            //         else {
            //             color = 'volcano'
            //         }

            //         return (
            //             <Tag color={color} key={tag}>
            //                 {tag.toUpperCase()}
            //             </Tag>
            //         );
            //     })
            // }
        },
    ];

    //  data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer'],
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       tags: ['loser'],
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park',
    //       tags: ['cool', 'teacher'],
    //     },
    //   ];

    constructor(props) {
        super(props)
        this.state = {
            submits: null,
            isLoaded: false,
            page: null
        }
    }

    componentDidMount() {
        this.getSubmitList()
    }

    getSubmitList() {
        console.log(REAREND_HOSTNAME + "/submit/list")

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
                page:{
                    pageIndex:1,
                    pageSize: 10
                }
            })
        }).then((response) => response.json())
            .then((result) => {
                console.log(result)

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
        console.log("render",this.state.submits)

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
                <Layout.Content>
                    <Table columns={this.columns} dataSource={this.state.submits} />
                </Layout.Content>
            )
        }
    }
}

export default SubmitList
