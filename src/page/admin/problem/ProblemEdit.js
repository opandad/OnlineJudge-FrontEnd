import React, { Component } from 'react'
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Row,
    Col,
    Typography,
    Layout,
    Space,
    Input,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { REAREND_HOSTNAME } from '../../../configs/Rearend';

const { Option } = Select;

export class ProblemEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            problem: null
        }
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    onFinish = (values) => {
        console.log('Received values of form: ');
        console.log(values)
    };


    LoadingProblem() {
        fetch(REAREND_HOSTNAME + "/admin/problem/edit/" + this.props.location.state.problemID, {
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
                //test
                console.log("problem detail result")
                console.log(result)

                if (result.httpStatus.isError === false) {
                    this.setState({
                        problem: result.problem,
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

    componentDidMount() {
        this.LoadingProblem()
        console.log(this.props)
    }

    render() {
        console.log("problem edit")

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
                return (
                    <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Form
                            onFinish={this.onFinish}
                            initialValues={{
                            }}>
                            <Row>
                                <Col span={12}>
                                        <Space direction="vertical">
                                            <Typography.Title level={4}>
                                                题目名称
                                            </Typography.Title>
                                            <Form.Item name="problemName">
                                                <Input defaultValue={this.state.problem.name} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                题目描述
                                            </Typography.Title>
                                            <Form.Item name="problemDescription">
                                                <Input defaultValue={this.state.problem.description.problemDescription} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                输入描述
                                            </Typography.Title>
                                            <Form.Item name="inputDescription">
                                                <Input defaultValue={this.state.problem.description.inputDescription} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                输出描述
                                            </Typography.Title>
                                            <Form.Item name="outputDescription">
                                                <Input defaultValue={this.state.problem.description.outputDescription} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                输入样例
                                            </Typography.Title>
                                            <Form.Item name="inputCase">
                                                <Input defaultValue={this.state.problem.description.inputCase} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                输出样例
                                            </Typography.Title>
                                            <Form.Item name="outputCase">
                                                <Input defaultValue={this.state.problem.description.outputCase} />
                                            </Form.Item>

                                            <Typography.Title level={4}>
                                                提示
                                            </Typography.Title>
                                            <Form.Item name="tips">
                                                <Input defaultValue={this.state.problem.description.tips} />
                                            </Form.Item>
                                        </Space>
                                </Col>
                                <Col span={12}>
                                <Space direction="vertical">
                                        <Typography.Title level={4}>
                                            其他限制
                                        </Typography.Title>
                                        <Typography.Text>
                                            C/C++时间限制
                                                </Typography.Text>
                                        <Form.Item name="timeLimit">
                                            <InputNumber size="small" min={1000} max={10000} defaultValue={this.state.problem.description.timeLimit} />ms
                                        </Form.Item>

                                        <Typography.Text>
                                            其他语言时间限制(一般是C/C++时间的1倍)
                                        </Typography.Text>
                                        <Form.Item name="realTimeLimit">
                                            <InputNumber size="small" min={1000} max={10000} defaultValue={this.state.problem.description.realTimeLimit} />ms
                                        </Form.Item>


                                        <Typography.Text>
                                            内存限制
                                        </Typography.Text>
                                        <Form.Item name="memoryLimit">
                                            <InputNumber size="small" min={1024} max={1048576} defaultValue={this.state.problem.description.MemoryLimit} />KB
                                        </Form.Item>
                                        
                                        <Typography.Text>
                                            文件大小限制
                                        </Typography.Text>
                                        <Form.Item name="fileSizeLimit">
                                            <InputNumber size="small" min={1024} max={1048576} defaultValue={this.state.problem.description.fileSizeLimit} />KB
                                        </Form.Item>

                                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={this.normFile}>
                                        <Upload.Dragger name="files" action="/upload.do">
                                            <p className="ant-upload-drag-icon">
                                                <UploadOutlined />
                                            </p>
                                            <p className="ant-upload-text">上传文件</p>
                                            <p className="ant-upload-hint">仅支持题目数据</p>
                                        </Upload.Dragger>
                                    </Form.Item>
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

export default ProblemEdit
