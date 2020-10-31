import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import TaskExplorerCard from "./TaskExplorerCard";
import {getTasksList} from "../../../remote/api"

export class TaskExplorerPage extends React.Component {
    state = {
        groupTasks: []
    }

    componentDidMount() {
        getTasksList().then(
            data => this.setState({groupTasks: data})
        )
    }


    taskSet = (groupTask, i) => {
        return <TaskExplorerCard
            groupId={groupTask.groupId}
            taskId={groupTask.task.id}
            taskName={groupTask.task.name}
        />
    }


    render() {
        return <Container fluid>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Задачи</h2>
                </Col>
            </Row>
            {
                this.state.groupTasks.map(this.taskSet)
            }
        </Container>
    }
}
