import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { REAREND_HOSTNAME } from '../../configs/Rearend';
import CodeMirror from '../../component/codeEditor/CodeMirror'

export class ProblemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            problem: null,
            isLoaded: false,
            error: null
        }
    }

    loadingProlemDetail() {
        console.log(REAREND_HOSTNAME + "/problem/" + this.props.match.params.id);

        fetch(REAREND_HOSTNAME + "/problem/" + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Accept': '/application/json',
                'Content-type': '/application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    problem: result.problem,
                    isLoaded: true
                }
                );
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
        this.loadingProlemDetail()
    }

    render() {
        console.log(this.state.problem)

        if (this.state.isLoaded == false) {
            return (
                <div>
                    正在加载中。。。。。。。
                </div>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <div>
                        error: {this.state.error.message}
                    </div>
                )
            }
            else {
                return (
                    <Row>
                        <Col span={12}>
                            col-12
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        </Col>
                        <Col span={12}><CodeMirror /></Col>
                    </Row>
                )
            }
        }
    }
}

export default ProblemDetail
