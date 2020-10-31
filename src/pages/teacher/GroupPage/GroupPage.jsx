import React from "react";
import {Button, Col, ListGroup, Row, Table} from "react-bootstrap";
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


    studentSet = (studentId, index) => {
        return <ListGroup.Item>{studentId}</ListGroup.Item>
    }

    taskSet = (task, index) => {
        return <ListGroup.Item>
            <Link to={`/tasks/${task.id}`}>
                {task.name}
            </Link>

        </ListGroup.Item>
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col className="green-under-line justify-content-end">
                    <h2>Группа {this.state.group?.name}</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={11} className="align-items-center"><h4>Задачи</h4></Col>
                <Col lg={1}><Button>+</Button></Col>
            </Row>
            <ListGroup className="mt-3">
                {
                    this.state.tasks?.map(this.taskSet)
                }
            </ListGroup>
            <Row className="mt-4">
                <Col lg={11} className="align-items-center"><h4>Ученики</h4></Col>
                <Col lg={1}><Button>+</Button></Col>
            </Row>
            <ListGroup className="mt-3">
                {
                    this.state.group?.students.map(this.studentSet)
                }
            </ListGroup>
        </div>


    }
}
