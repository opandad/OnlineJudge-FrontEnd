import React, { Component } from 'react';
import { Table, Space } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';

export class ProblemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            problemsList: [],
            pageIndex: 1,
            pageSize: 5
        }
    }

    LoadingProblem(pageIndex, pageSize){
        fetch(REAREND_HOSTNAME + "/problem?pageIndex="+pageIndex+"&pageSize="+pageSize, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type':'/application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    problemsList: result.Problem //bug
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

    componentDidMount() {
        this.LoadingProblem(1, 5)
    }

    render() {
        const {isLoaded, error} = this.state;

        const columns = [
            {
                title: '题目编号',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>,
            },
            {
                title: '题目名称',
                dataIndex: 'name',
                key: 'name',
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

        if (isLoaded === false){
            return(
                <div>
                    正在加载中。。。。。。。
                </div>
            );
        }else{
            if (error){
                return(
                    <div>
                        error: {error.message}
                    </div>
                );
            }
            return(<Table columns={columns} dataSource={this.problem} />);
        }
    }
}

export default ProblemList
