import React, { Component } from 'react'
import { ModalFooter, Container } from 'react-bootstrap'

export class Footer extends Component {
    render() {
        return (
            <ModalFooter className="mt-auto py-3 bg-light">
                <Container>
                    <span class="text-muted">OnlineJudge {new Date().toLocaleDateString()}</span>
                </Container>
            </ModalFooter>
        );
    }
}