import React, { Component } from 'react';
import { Table } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import { Link } from 'react-router-dom'

export class ProblemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            problemsList: [],
            current: 1,
            pageSize: 10,
            total: 0
        }
        this.onChange = this.onChange.bind(this);
    }

    LoadingProblem(current, pageSize) {
        fetch(REAREND_HOSTNAME + "/problem?pageIndex=" + current + "&pageSize=" + pageSize, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    problemsList: result.problem,
                    current: current,
                    pageSize: pageSize,
                    total: result.total,
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

    onChange(pagination) {
        this.LoadingProblem(pagination.current, pagination.pageSize)
    }

    componentDidMount() {
        this.LoadingProblem(this.state.current, this.state.pageSize);
    }

    render() {
        const { isLoaded, error } = this.state;
        const columns = [
            {
                title: '题目编号',
                dataIndex: 'id',
                render: function(id){
                    let link = "/problem/detail/"+id
                    return(
                        <Link to={{
                            pathname:link,
                            state: {
                                problemID:id,
                                contestID:0
                            }
                        }}>{id}</Link>
                    )
                }
            },
            {
                title: '题目名称',
                dataIndex: 'name',
            }
        ];

        if (isLoaded === false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            );
        } else {
            if (error) {
                return (
                    <div>
                        error: {error.message}
                    </div>
                );
            }
            return (
                <Table
                    columns={columns}
                    dataSource={this.state.problemsList}
                    pagination={{
                        defaultCurrent: this.state.current,
                        total: this.state.total,
                        defaultPageSize: this.state.pageSize,
                        showSizeChanger: true
                    }}
                    onChange={this.onChange}
                />
            );
        }
    }
}

export default ProblemList
