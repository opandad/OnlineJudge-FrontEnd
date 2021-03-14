import React, { Component } from 'react'
import { UnControlled } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror'
import 'codemirror/theme/material.css'
import 'codemirror/mode/clike/clike';
import { Form, Button, Select } from 'antd';
import { REAREND_HOSTNAME } from '../../configs/Rearend'

/*
    传入语言，参数等
*/

export class CodeEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {}

    onLanguageChange = (value) => {
        this.setState((value) => {
            return { language: value }
        })
    };

    onFinish = (values) => {
        let languageID
        for(let i = 0; i < this.props.languages.length; i++){
            if(this.props.languages[i].language === values.language){
                languageID = this.props.languages[i].id
            }
        }
        
        fetch(REAREND_HOSTNAME + "/submit", {
            method: 'POST',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            },
            body: JSON.stringify({
                //验证信息
                "loginInfo": {
                    "userID": parseInt(window.localStorage.getItem("userID")),
                    "snowflakeID": window.localStorage.getItem("snowflakeID"),
                    "password": window.localStorage.getItem("password"),
                    "authority": window.localStorage.getItem("authority"),
                },
                "submit": {
                    //题目信息
                    "userID": parseInt(window.localStorage.getItem("userID")),
                    "problemID": this.props.problemID,
                    "contestID": this.props.contestID,
                    "languageID": languageID,
                    "submitCode": this.code,
                    // "submitTime": null
                }
            })
        })
            .then((response) => response.json())
            .then((result) => {
                //test
                console.log(result)

                if (result.isError === false) {
                    this.setState({
                        languages: result.languages,
                        problem: result.problem,
                        isLoaded: true
                    });
                }
                if (result.msg !== "") {
                    alert(result.msg)
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })

                }
            )
    };

    render() {
        // console.log(this.props.languages)
        // console.log(this.state.languageID)

        const languageOptionItem = this.props.languages.map(
            (element) => <Select.Option value={element.language}>{element.language}</Select.Option>
        )

        return (
            <>
                <Form name="codeForm" onFinish={this.onFinish} initialValues={{ language: this.props.languages[0].language }}>
                    <Form.Item
                        name="language"
                        label="语言："
                    >
                        <Select
                            value={this.props.languages[0].language}
                            onChange={this.onLanguageChange}
                        >
                            {languageOptionItem}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <UnControlled
                            options={{
                                theme: 'material',
                                lineNumbers: true,
                                fullScreen: true
                            }}
                            onBeforeChange={() => { }}
                            onBlur={editor => {
                                this.code = editor.getValue();
                            }}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
            </>
        )
    }
}

export default CodeEditor
