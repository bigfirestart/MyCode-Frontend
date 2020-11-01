import React from "react";
import {Button, Col, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import {getGroupsList, getTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

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
        return <ListGroupItem as={Link} to={`/tasks/${groupsTask.task.id}`} action>
            {groupsTask.task.name}
        </ListGroupItem>;
    }

    render() {
        return <div>
            <h2 className="mt-5 green-under-line">Список задач</h2>
            <LinkContainer to="/tasks/constructor">
                <Button
                    className="mt-4"
                    variant="outline-primary"
                >
                    Добавить
                </Button>  
            </LinkContainer>
            <ListGroup className="mt-2">
                {
                    this.state.groupsTasks.map(this.taskSet)
                }
            </ListGroup>
        </div>
    }
}
