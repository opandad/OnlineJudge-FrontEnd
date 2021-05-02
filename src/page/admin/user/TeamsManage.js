import React, { Component, useState } from 'react'
import { Table, Layout, Space, Button, Row, Modal, Form, Input, Upload, InputNumber, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { REAREND_HOSTNAME } from '../../../configs/Rearend';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

export class AccountsManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            teamsList: [],
            current: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            visible: false
        }

        this.teamAddForm = React.createRef();
        this.onFinish = this.onFinish.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.normFile = this.normFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.uploadExcel = this.uploadExcel.bind(this);
    }

    uploadExcel({file, fileList}){
        if(file["status"] == "done"){
            alert("上传成功") 
            window.location.href=window.location.href
        }
    }

    onChange(page){
        this.LoadingUsers(page.current, page.pageSize)
    }

    //弹出窗口
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (values) => {
        // console.log(this.teamAddForm)
        console.log(values)

        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    onFinish(values) {
        this.setState({
            visible: false
        })

        fetch(REAREND_HOSTNAME + "/admin/team/add", {
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
                "teamNum":values.teamNum
            })
        })
            .then((response) => response.json())
            .then((result) => {
                if(result.isError == false){
                    alert(result.msg)
                    window.location.href=window.location.href
                }
                else{
                    alert(result.msg)
                }
            })
    }

    normFile() {

    }

    LoadingUsers(current, pageSize) {
        fetch(REAREND_HOSTNAME + "/admin/team/list?pageIndex=" + current + "&pageSize=" + pageSize, {
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

                if (result.httpStatus.isError == false) {
                    this.setState({
                        teamsList: result.teams,
                        current: result.page.pageIndex,
                        pageSize: result.page.pageSize,
                        total: result.page.total64,
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

    componentDidMount() {
        this.LoadingUsers(this.state.current, this.state.pageSize);
    }

    render() {
        // console.log(this.state)

        const { isLoaded, error } = this.state;
        const columns = [
            {
                title: 'team账号',
                dataIndex: 'team',
            },
            {
                title: '用户ID',
                dataIndex: 'userID',
            },
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
                    <Row justify="end">
                        <Button type="primary" onClick={this.showModal}>
                            批量添加
                        </Button>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={this.state.teamsList}
                        pagination={{
                            defaultCurrent: this.state.current,
                            total: this.state.total,
                            defaultPageSize: this.state.pageSize,
                            showSizeChanger: true
                        }}
                        onChange={this.onChange}
                    />


                    <Modal
                        visible={this.state.visible}
                        title="批量添加"
                        footer={
                            <>
                                {/* <Button type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                    <Button onClick={this.handleCancel}>
                                        取消
                                    </Button> */}
                            </>
                        }
                    >
                        <Form name="form" ref={this.teamAddForm} onFinish={this.onFinish}>
                            <Row>
                                <Typography>批量添加队伍数（最大为500）</Typography>
                            <Form.Item name="teamNum">
                                <InputNumber min={1} max={500} />
                            </Form.Item>
                            </Row>
                            <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={this.normFile}>
                                <Upload name="files" accept=".xlsx" action={REAREND_HOSTNAME + "/uploadTeamData"} onChange={this.uploadExcel}>
                                    <Button icon={<UploadOutlined />}>批量添加excel表中队伍</Button>
                                </Upload>
                            </Form.Item>
                            <Row>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.handleCancel}>
                                        取消
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </Modal>


                </Layout.Content>
            );
        }
    }
}

export default AccountsManage
