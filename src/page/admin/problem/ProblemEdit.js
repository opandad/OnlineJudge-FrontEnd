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
import { FRONTEND_HOSTNAME } from '../../../configs/Frontend';

const { Option } = Select;

export class ProblemEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            problem: null
        }
        this.problemForm = React.createRef();
        // this.uploadFile = this.uploadFile.bind(this);
    }

    normFile = (e) => {
        // console.log(e)
    };

    onFinish = (values) => {
        // console.log(values)

        if (this.props.location.state.problemID > 0) {
            fetch(REAREND_HOSTNAME + "/admin/problem/edit/" + this.props.location.state.problemID, {
                method: 'PUT',
                headers: {
                    'Accept': '/application/json',
                    'Content-type': '/application/json; multipart/form-data; boundary=another cool boundary'
                },
                body: JSON.stringify({
                    "loginInfo": {
                        "userID": parseInt(window.localStorage.getItem("userID")),
                        "password": window.localStorage.getItem("password"),
                        "authority": window.localStorage.getItem('authority'),
                    },
                    "problem": {
                        "id": this.props.location.state.problemID,
                        "name": values.problemName,
                        "description": {
                            "problemDescription": values.problemDescription,
                            "inputDescription": values.inputDescription,
                            "outputDescription": values.outputDescription,
                            "inputCase": values.inputCase,
                            "outputCase": values.outputCase,
                            "tips": values.tips,
                            "timeLimit": values.timeLimit,
                            "memoryLimit": values.memoryLimit,
                            "realTimeLimit": values.realTimeLimit,
                            "fileSizeLimit": values.fileSizeLimit
                        }
                    }
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    //test
                    // console.log("problem detail result")
                    // console.log(result)

                    if (result.httpStatus.isError === false) {
                        alert(result.httpStatus.msg)
                        window.location.href = FRONTEND_HOSTNAME + "/admin/problem/list"
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
                );
        }
        else {
            fetch(REAREND_HOSTNAME + "/admin/problem/add", {
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
                    "problem": {
                        "id": this.props.location.state.problemID,
                        "name": values.problemName,
                        "description": {
                            "problemDescription": values.problemDescription,
                            "inputDescription": values.inputDescription,
                            "outputDescription": values.outputDescription,
                            "inputCase": values.inputCase,
                            "outputCase": values.outputCase,
                            "tips": values.tips,
                            "timeLimit": values.timeLimit,
                            "memoryLimit": values.memoryLimit,
                            "realTimeLimit": values.realTimeLimit,
                            "fileSizeLimit": values.fileSizeLimit
                        }
                    }
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    
                    if (result.httpStatus.isError === false) {
                        console.log("跳转")

                        alert(result.httpStatus.msg)
                        window.location.href = FRONTEND_HOSTNAME + "/admin/problem/list"
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
                );
        }
    }

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
                // console.log("problem detail result")
                // console.log(result)

                if (result.httpStatus.isError === false) {
                    this.setState({
                        isLoaded: true
                    });
                    this.problemForm.current.setFieldsValue({
                        "problemName": result.problem.name,
                        "problemDescription": result.problem.description.problemDescription,
                        "inputDescription": result.problem.description.inputDescription,
                        "outputDescription": result.problem.description.outputDescription,
                        "inputCase": result.problem.description.inputCase,
                        "outputCase": result.problem.description.outputCase,
                        "tips": result.problem.description.tips,
                        "timeLimit": result.problem.description.timeLimit,
                        "memoryLimit": result.problem.description.memoryLimit,
                        "realTimeLimit": result.problem.description.realTimeLimit,
                        "fileSizeLimit": result.problem.description.fileSizeLimit
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

    componentDidMount() {
        // console.log(this.props.location.state.problemID)

        if (this.props.location.state.problemID !== 0) {
            this.LoadingProblem()
        }
        else {
            this.setState({
                isLoaded: true
            })
        }
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
                if(this.props.location.state.problemID === 0){
                    showButton = "增加"
                }
                else{
                    showButton="修改"
                }

                return (
                    <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Form onFinish={this.onFinish} ref={this.problemForm} name="problemForm">
                            <Row>
                                <Col span={12}>
                                    <Space direction="vertical">
                                        <Typography.Title level={4}>
                                            题目名称
                                        </Typography.Title>
                                        <Form.Item name="problemName">
                                            <Input />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            题目描述
                                            </Typography.Title>
                                        <Form.Item name="problemDescription">
                                            <Input.TextArea />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            输入描述
                                            </Typography.Title>
                                        <Form.Item name="inputDescription">
                                            <Input.TextArea />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            输出描述
                                            </Typography.Title>
                                        <Form.Item name="outputDescription">
                                            <Input.TextArea />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            输入样例
                                            </Typography.Title>
                                        <Form.Item name="inputCase">
                                            <Input.TextArea />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            输出样例
                                            </Typography.Title>
                                        <Form.Item name="outputCase">
                                            <Input.TextArea />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            提示
                                            </Typography.Title>
                                        <Form.Item name="tips">
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical">
                                        <Typography.Title level={4}>
                                            其他限制
                                        </Typography.Title>
                                        <Row>
                                            <Typography.Text>
                                                C/C++时间限制
                                                </Typography.Text>
                                            <Form.Item name="timeLimit">
                                                <InputNumber size="small" min={1000} max={10000} />
                                            </Form.Item>
                                            <Typography.Text>ms</Typography.Text>
                                        </Row>

                                        <Row>
                                            <Typography.Text>
                                                其他语言时间限制(一般是C/C++时间的1倍)
                                        </Typography.Text>
                                            <Form.Item name="realTimeLimit">
                                                <InputNumber size="small" min={1000} max={10000} />
                                            </Form.Item>
                                            <Typography.Text>ms</Typography.Text>
                                        </Row>

                                        <Row>
                                            <Typography.Text>
                                                内存限制
                                        </Typography.Text>
                                            <Form.Item name="memoryLimit">
                                                <InputNumber size="small" min={65536} max={1048576} />
                                            </Form.Item>
                                            <Typography.Text>KB</Typography.Text>
                                        </Row>

                                        <Row>
                                            <Typography.Text>
                                                文件大小限制
                                        </Typography.Text>
                                            <Form.Item name="fileSizeLimit">
                                                <InputNumber size="small" min={524288} max={1048576} />
                                            </Form.Item>
                                            <Typography.Text>KB</Typography.Text>
                                        </Row>

                                        <Form.Item name="uploadFiles" valuePropName="fileList" getValueFromEvent={this.normFile}>
                                            <Upload.Dragger name="files" accept=".in,.out" action={REAREND_HOSTNAME + "/uploadProblemData"} multiple={true}>
                                                <p className="ant-upload-drag-icon">
                                                    <UploadOutlined />
                                                </p>
                                                <p className="ant-upload-text">上传文件</p>
                                                <p className="ant-upload-hint">仅支持题目数据（一个.in文件需对应一个.out文件）</p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </Space>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
                                        <Button type="primary" htmlType="submit">
                                            {showButton}
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
