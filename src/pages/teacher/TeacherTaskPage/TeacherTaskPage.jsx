import React from "react";
import {Col, Row, Table} from "react-bootstrap";
import {getTask} from "../../../remote/api";
import {Link} from "react-router-dom";

export class TeacherTaskPage extends React.Component {
    state = {
        task: {}
    }
    componentDidMount() {
        getTask(this.props.taskId).then(
            data => this.setState({
                task: data
            })
        )
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col className="green-under-line justify-content-end">
                    <h2>Задача {this.state.task.name}</h2>
                </Col>
            </Row>
        </div>


    }
}
