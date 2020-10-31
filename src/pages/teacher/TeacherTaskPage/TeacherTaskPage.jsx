import React from "react";
import {Col, ListGroup, Row, Table} from "react-bootstrap";
import {getTask} from "../../../remote/api";
import {Link} from "react-router-dom";

export class TeacherTaskPage extends React.Component {
    state = {
        task: {}
    }

    componentDidMount() {
        getTask(1, 2).then(
            data => this.setState({
                task: data
            })
        )
    }

    submissionSet(submission, index) {
        return <ListGroup.Item>
            Баллы: {submission.points}  Статус: {submission.status}
        </ListGroup.Item>
    }

    render() {
        console.log(this.state.task)
        return <div>
            <Row className="mt-5">
                <Col className="green-under-line justify-content-end">
                    <h2>Задача {this.state.task.name}</h2>
                </Col>
            </Row>
            <Row>
                Решения
                <ListGroup className="w-100">
                    {
                        this.state.task?.submissions?.map(this.submissionSet)
                    }
                </ListGroup>
            </Row>
        </div>


    }
}
