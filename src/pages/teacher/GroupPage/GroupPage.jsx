import React from "react";
import {Col, ListGroup, Row, Table} from "react-bootstrap";
import {getGroup, getGroupTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class GroupPage extends React.Component {
    state = {
        group: null,
        tasks: []
    }
    componentDidMount() {
        getGroup(this.props.groupId).then(
            data => this.setState({
                group: data
            })
        )
        getGroupTasksList(this.props.groupId).then(
            data => this.setState({
                tasks: data
            })
        )
    }

    studentSet = (studentId, index) =>{
        return <ListGroup.Item>{studentId}</ListGroup.Item>
    }

    taskSet = (task, index) =>{
        return <ListGroup.Item>{task.name}</ListGroup.Item>
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col className="green-under-line justify-content-end">
                    <h2>Группа {this.state.group?.name}</h2>
                </Col>
            </Row>

            Задачи
            <ListGroup>
                {
                    this.state.tasks?.map(this.taskSet)
                }
            </ListGroup>

            Ученики
            <ListGroup>
                {
                    this.state.group?.students.map(this.studentSet)
                }
            </ListGroup>
        </div>


    }
}
