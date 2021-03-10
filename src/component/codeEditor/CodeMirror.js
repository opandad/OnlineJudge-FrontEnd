import React, { Component } from 'react'
import { UnControlled, Controlled } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror'
import 'codemirror/theme/material.css'

export class CodeMirror extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null,
        }
    }

    render() {
        return (
            // <Controlled
            //     value={this.state.value}
            //     onBeforeChange={(editor, data, value) => {
            //         this.setState({ value });
            //     }}
            //     onChange={(editor, data, value) => {
            //     }}

            // />
            <UnControlled
                value='<h1>I ♥ react-codemirror2</h1>'
                options={{
                    mode: 'xml',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                }}
            />
        )
    }
}

export default CodeMirror
