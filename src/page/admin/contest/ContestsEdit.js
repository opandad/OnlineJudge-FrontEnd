import React, { Component } from 'react'
import { DatePicker, Space, Layout,Form, Row, Col, Typography, Input, Button } from 'antd';
import { REAREND_HOSTNAME } from '../../../configs/Rearend';

export class ContestsEdit extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoaded: false,
            error: null
        }
        this.onOk = this.onOk.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFinish = this.onFinish.bind(this);

        this.contestForm = React.createRef();
    }

    contestLoading(){
        console.log(REAREND_HOSTNAME + "/admin/contest/edit/" + this.props.location.state.contestID)

        fetch(REAREND_HOSTNAME + "/admin/contest/edit/" + this.props.location.state.contestID, {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                "userID": parseInt(window.localStorage.getItem("userID")),
                "password": window.localStorage.getItem("password"),
                "authority": window.localStorage.getItem('authority'),
            })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.httpStatus.isError === false) {
                    this.setState({
                        isLoaded: true
                    });
                    console.log(result)
                    this.contestForm.current.setFieldsValue({
                        "contest": result.contest,
                        "problems":result.problems,
                        "languages": result.languages,
                        "users": result.users
                    })
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

    componentDidMount(){
        this.contestLoading()
    }

    onFinish(values){
        console.log(values)
    }

    onOk(e){

    }
    onChange(e){

    }
    
    render() {
        if (this.state.isLoaded === false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            )
        } else {
            if (this.state.error) {
                return (
                    <div>
                        error problem edit: {this.state.error.message}
                    </div>
                )
            }
            else {
                let showButton
                if (this.props.location.state.problemID === 0) {
                    showButton = "增加"
                }
                else {
                    showButton = "修改"
                }

                return (
                    <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Form onFinish={this.onFinish} ref={this.contestForm} name="contestForm">
                            <Row>
                                <Col span={12}>
                                    <Space direction="vertical">
                                        <Typography.Title level={4}>
                                            比赛名称
                                        </Typography.Title>
                                        <Form.Item name="contest">
                                            <Input />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            比赛时间
                                        </Typography.Title>
                                        <Form.Item name="outputDescription">
                                            <DatePicker.RangePicker
                                                showTime={{ format: 'HH:mm:ss' }}
                                                format="YYYY-MM-DD HH:mm:ss"
                                                onChange={this.onChange}
                                                // onOk={this.onOk}
                                            />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            比赛题目
                                        </Typography.Title>

                                        <Typography.Title level={4}>
                                            比赛语言
                                </Typography.Title>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical">

                                    </Space>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                                        <Button type="primary" htmlType="submit">
                                            修改
                                    </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Layout.Content >
                )
            }
        }
    }
}
export default ContestsEdit
