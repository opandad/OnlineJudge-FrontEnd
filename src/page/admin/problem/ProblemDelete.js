import React, { Component } from 'react'
import { REAREND_HOSTNAME } from '../../../configs/Rearend'

export class ProblemDelete extends Component {
    componentDidMount() {
        fetch(REAREND_HOSTNAME + "/admin/problem/delete/" + this.props.location.state.problemID, {
            method: 'Delete',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                alert(result.httpStatus.message)
                if (result.httpStatus.isError === false) {
                    window.location.href = REAREND_HOSTNAME + "/admin/problem/list"
                }
            },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    render() {
        return (
            <div>
                删除中。。。。。。
            </div>
        )
    }
}

export default ProblemDelete
