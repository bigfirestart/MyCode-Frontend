import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import TaskExplorerCard from "./TaskExplorerCard";
import { getTasksList } from "../../../remote/api"

export class TaskExplorerPage extends React.Component {
    constructor(props) {
        super(props);
        getTasksList().then(console.log)
    }
    render() {
        return <Container fluid>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Задачи</h2>
                </Col>
            </Row>
            <TaskExplorerCard taskName="Task 1" />
            <TaskExplorerCard taskName="Task 1" />
            <TaskExplorerCard taskName="Task 1" />

        </Container>
    }
}
