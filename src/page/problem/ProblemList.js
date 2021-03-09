import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';

export class ProblemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            problemsList: []
        }
    }

    componentDidMount() {
        fetch(REAREND_HOSTNAME + "/problem", {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type':'/application/json'
            },
            body:{
                "pageIndex":1,
                "pageSize":5
            }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                this.setState({
                    isLoaded: true,
                    problemsList: [] //bug
                });

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
        const columns = [
            {
                title: '题目编号',
                dataIndex: 'ID',
                key: 'ID',
                render: text => <a>{text}</a>,
            },
            {
                title: '题目名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];

        return (
            <Table columns={columns} dataSource={this.problem} />
        )
    }
}

export default ProblemList
