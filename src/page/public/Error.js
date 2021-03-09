import React, { Component } from 'react'

export class Error extends Component {
    render() {
        return (
            <div className="Error">Error: {this.props.msg}</div>
        )
    }
}

export default Error
