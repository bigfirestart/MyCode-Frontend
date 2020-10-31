import React from "react";
import {Button, Col, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import {getGroupsList, getTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class TeacherTaskExplorerPage extends React.Component {
    state = {
        groupsTasks: [],
        addFieldOn: false
    }

    componentDidMount() {
        getTasksList().then(
            data => this.setState({
                groupsTasks: data
            })
        )
    }

    taskSet = (groupsTask, index) => {
        return <tr>
            <ListGroupItem>
                <Link to={`/tasks/${groupsTask.task.id}`}>
                    {groupsTask.task.name}
                </Link>
            </ListGroupItem>
        </tr>
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Список тестов</h2>
                </Col>
                <Col lg={1} className="offset-8">
                        <Link to={`/tasks/constructor`}>
                            <Button>
                            +
                            </Button>
                        </Link>
                </Col>
            </Row>
            <ListGroup className="mt-5 w-100">
                {
                    this.state.groupsTasks.map(this.taskSet)
                }
            </ListGroup>
        </div>
    }
}
