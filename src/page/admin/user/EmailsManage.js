import React, { Component } from 'react'
import { Table, Layout, Space, Button } from 'antd';
import { Link } from 'react-router-dom'
import { REAREND_HOSTNAME } from '../../../configs/Rearend';

export class EmailsManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            usersList: [],
            current: 1,
            pageSize: 10,
            total: 0
        }
        this.onChange = this.onChange.bind(this);
    }

    LoadingUsers(current, pageSize) {
        fetch(REAREND_HOSTNAME + "/admin/email/list?pageIndex=" + current + "&pageSize=" + pageSize, {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                "loginInfo": {
                    "userID": parseInt(window.localStorage.getItem("userID")),
                    "password": window.localStorage.getItem("password"),
                    "authority": window.localStorage.getItem('authority'),
                },
            })
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)

                if (result.httpStatus.isError == false){
                    this.setState({
                        usersList: result.emails,
                        current: current,
                        pageSize: pageSize,
                        total: result.total,
                        isLoaded: true
                    });
                }
                if(result.httpStatus.msg !== ""){
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

    onChange(pagination) {
        this.LoadingUsers(pagination.current, pagination.pageSize)
    }

    componentDidMount() {
        this.LoadingUsers(this.state.current, this.state.pageSize);
    }

    render() {
        const { isLoaded, error } = this.state;
        const columns = [
            {
                title: '邮箱账号',
                dataIndex: 'email',
            },
            {
                title: '用户ID',
                dataIndex: 'userID',
            }
            // {
            //     title: '行为',
            //     key: 'action',
            //     render: (text, record) => (
            //         <Space size="middle">
            //             <Button type="primary">
            //                 <Link to={{
            //                     pathname: "/admin/problem/edit/" + record.id,
            //                     state: {
            //                         userID: record.id
            //                     }
            //                 }}>编辑</Link>
            //             </Button>
            //         </Space>
            //     ),
            // },
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
                        dataSource={this.state.usersList}
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

export default EmailsManage
