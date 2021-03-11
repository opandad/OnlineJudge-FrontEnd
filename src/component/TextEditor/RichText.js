import React, { useState, Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class RichText extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: "123456789"
        }
        this.setValue = this.setValue.bind(this);
    }

    setValue(value){
        console.log(value)
    }

    
    render() {
        return (
            <ReactQuill theme="snow" value={this.state.value} onChange={this.setValue()} />
        );
    }
}

export default RichText
