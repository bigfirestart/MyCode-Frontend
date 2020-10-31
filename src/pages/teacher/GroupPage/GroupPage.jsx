import React from "react";
import { Button, Col, ListGroup, Row, Tabs, Tab } from "react-bootstrap";
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
        const { tasks } = this.state;

        return <div>
            <h2 className="green-under-line mt-5">Группа {this.state.group?.name}</h2>
            <Tabs defaultActiveKey="tasks" className="mt-4">
                <Tab title="Задачи" eventKey="tasks">
                    <ListGroup className="mt-3">{
                        tasks?.map(this.taskSet)
                    }</ListGroup>                </Tab>
                <Tab title="Ученики" eventKey="students">
                    <ListGroup className="mt-3">{
                        this.state.group?.students.map(this.studentSet)
                    }</ListGroup>
                </Tab>
            </Tabs>
        </div>;
    }
}
