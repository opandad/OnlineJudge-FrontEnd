import React, { Component } from 'react';
import { Table, Layout } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import { Link } from 'react-router-dom'

export class ContestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            contestsList: [],
            current: 1,
            pageSize: 10,
            total: 0
        }
        this.onChange = this.onChange.bind(this);
    }

    LoadingProblem(current, pageSize) {
        fetch(REAREND_HOSTNAME + "/contest?pageIndex=" + current + "&pageSize=" + pageSize, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result)
                this.setState({
                    contestsList: result.contest,
                    current: current,
                    pageSize: pageSize,
                    total: result.page.total,
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
        let columns = null

        columns = [
            {
                title: '竞赛编号',
                dataIndex: 'id',
                render: function (id) {
                    let link = "/contest/detail/" + id
                    return (
                        <Link to={{
                            pathname: link,
                            state: {
                                contestID: id
                            }
                        }}>{id}</Link>
                    )
                }
            },
            {
                title: '竞赛名称',
                dataIndex: 'name',
            },
            {
                title: '竞赛开始时间',
                dataIndex: 'startTime',
            },
            {
                title: '竞赛结束时间',
                dataIndex: 'startTime',
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
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.contestsList}
                        pagination={{
                            defaultCurrent: this.state.current,
                            total: this.state.total,
                            defaultPageSize: this.state.pageSize,
                            showSizeChanger: true
                        }}
                        onChange={this.onChange}
                    />
                </Layout.Content>
            );
        }
    }
}

export default ContestList
