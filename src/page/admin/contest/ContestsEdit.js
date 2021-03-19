import React, { Component } from 'react'
import { DatePicker, Space, Layout, Form, Row, Col, Typography, Input, Button, Select } from 'antd';
import { REAREND_HOSTNAME } from '../../../configs/Rearend';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FRONTEND_HOSTNAME } from '../../../configs/Frontend';

export class ContestsEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            selectLanguages: [],
            selectLanguagesMap: null
        }
        this.onFinish = this.onFinish.bind(this);

        this.contestForm = React.createRef();
    }

    onOk(values) {
        console.log("onOk", values)
    }

    contestLoading() {
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
                // console.log(result)
                if (result.httpStatus.isError === false) {
                    let selectLanguages = []
                    let selectLanguagesMap = []
                    for (let i = 0; i < result.selectLanguages.length; i++) {
                        selectLanguages.push(<Select.Option key={result.selectLanguages[i].id} value={result.selectLanguages[i].language}>{result.selectLanguages[i].language}</Select.Option>);
                        // selectLanguagesMap.push(result.selectLanguages[i].language)
                        selectLanguagesMap[result.selectLanguages[i].language] = result.selectLanguages[i].id
                    }

                    // console.log(selectLanguagesMap)

                    this.setState({
                        isLoaded: true,
                        selectLanguages: selectLanguages,
                        selectLanguagesMap: selectLanguagesMap
                    });

                    let languages = []
                    for (let i = 0; i < result.languages.length; i++) {
                        languages.push(result.languages[i].language)
                    }

                    let problems = []
                    for (let i = 0; i < result.problems.length; i++) {
                        problems.push(result.problems[i].id)
                    }

                    let users = []
                    for (let i = 0; i < result.users.length; i++) {
                        users.push(result.users[i].id)
                    }

                    this.contestForm.current.setFieldsValue({
                        //contest
                        "contestName": result.contest.name,
                        "contestTime": [moment(result.contest.startTime), moment(result.contest.endTime)],
                        "languages": languages,
                        "problems": problems,
                        "users": users
                    })

                    // console.log(problems)
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
        this.contestLoading()
    }

    onFinish(values) {
        // console.log(this.state)
        //selectLanguagesMap
        for (let i = 0; i < values.problems.length; i++) {
            values.problems[i] = parseInt(values.problems[i])
        }

        for (let i = 0; i < values.languages.length; i++) {
            values.languages[i] = this.state.selectLanguagesMap[values.languages[i]]
        }

        let problems = []
        for (let i = 0; i < values.problems.length; i++) {
            problems.push({
                id: values.problems[i],
            })
        }

        let languages = []
        for (let i = 0; i < values.languages.length; i++) {
            languages.push({
                id: values.languages[i],
            })
        }

        if (this.props.location.state.contestID !== 0) {
            fetch(REAREND_HOSTNAME + "/admin/contest/edit/" + this.props.location.state.contestID, {
                method: 'PUT',
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
                    "contest": {
                        "id": this.props.location.state.contestID,
                        "name": values.contestName,
                        "startTime": moment(values.contestTime[0]._d).format("YYYY-MM-DD HH:mm:ss"),
                        "endTime": moment(values.contestTime[1]._d).format("YYYY-MM-DD HH:mm:ss"),
                    },
                    "languages": languages,
                    "problems": problems
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.httpStatus.msg !== "") {
                        alert(result.httpStatus.message)
                    }
                    if (result.httpStatus.isError === false) {
                        window.location.href = FRONTEND_HOSTNAME + "/admin/contest/list"
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
        else{
            fetch(REAREND_HOSTNAME + "/admin/contest/edit/" + this.props.location.state.contestID, {
                method: 'PUT',
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
                    "contest": {
                        "id": this.props.location.state.contestID,
                        "name": values.contestName,
                        "startTime": moment(values.contestTime[0]._d).format("YYYY-MM-DD HH:mm:ss"),
                        "endTime": moment(values.contestTime[1]._d).format("YYYY-MM-DD HH:mm:ss"),
                    },
                    "languages": languages,
                    "problems": problems
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.httpStatus.msg !== "") {
                        alert(result.httpStatus.message)
                    }
                    if (result.httpStatus.isError === false) {
                        window.location.href = FRONTEND_HOSTNAME + "/admin/contest/list"
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
                        error contest edit: {this.state.error.message}
                    </div>
                )
            }
            else {
                let showButton
                if (this.props.location.state.contestID === 0) {
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
                                        <Form.Item name="contestName">
                                            <Input />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            比赛时间
                                        </Typography.Title>
                                        <Form.Item name="contestTime">
                                            {/* <Form.Item name="timetest"> */}
                                            <DatePicker.RangePicker showTime />
                                        </Form.Item>

                                        <Typography.Title level={4}>
                                            比赛题目
                                        </Typography.Title>
                                        <Form.List name="problems">
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Row>
                                                            {/* {console.log(field, index)} */}
                                                            <Form.Item
                                                                validateTrigger={['onChange', 'onBlur']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "请输入题目ID",
                                                                    },
                                                                ]}
                                                                key={index}
                                                                name={index}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        </Row>
                                                    ))}
                                                    <Row>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            style={{ width: '60%' }}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            添加
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Row>
                                                </>
                                            )}
                                        </Form.List>

                                        <Typography.Title level={4}>
                                            比赛语言
                                        </Typography.Title>
                                        <Form.Item name="languages">
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{ width: '100%' }}
                                                placeholder="请选择竞赛所使用的语言"
                                            >
                                                {this.state.selectLanguages}
                                            </Select>
                                        </Form.Item>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Typography.Title level={4}>
                                        参赛用户ID列表
                                    </Typography.Title>
                                    {/* <Form.Item name="users">
                                        <Input.TextArea />
                                    </Form.Item> */}
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
export default ContestsEdit
