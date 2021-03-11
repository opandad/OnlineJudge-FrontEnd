import React, { Component } from 'react'
import { UnControlled, Controlled } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror'
import 'codemirror/theme/material.css'
import { Form, Input, Button, Select } from 'antd';

/*
    传入语言，参数等
*/

export class CodeEditor extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            language: null
            // contestID:this.props.location.state.contestID,
            // problemID:this.props.location.state.problemID,
            // userID:int(window.localStorage.getItem("userID")),
        }
    }

    componentDidMount() {
        console.log("code editor")
        console.log(this.props)
    }

    onGenderChange = (value) => {
        switch (value) {
            case 'male':
                this.formRef.current.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;

            case 'female':
                this.formRef.current.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;

            case 'other':
                this.formRef.current.setFieldsValue({
                    note: 'Hi there!',
                });
        }
    };
    onFinish = (values) => {
        console.log(values);
    };
    onReset = () => {
        this.formRef.current.resetFields();
    };
    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    render() {
        return (
            <>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.onGenderChange}
                            allowClear
                        >
                            <Select.Option value="male">male</Select.Option>
                            <Select.Option value="female">female</Select.Option>
                            <Select.Option value="other">other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
              </Button>
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
              </Button>
                        <Button type="link" htmlType="button" onClick={this.onFill}>
                            Fill form
              </Button>
                    </Form.Item>
                    <Form.Item>
                        <Controlled
                            value={this.state.value}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({ value });
                            }}
                            onChange={(editor, data, value) => {
                            }}
                        />
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default CodeEditor
