import React from "react";
import { ListGroup } from "react-bootstrap";
import { getTasksList } from "../../../remote/api";
import { Link } from "react-router-dom";

export class TaskExplorerPage extends React.Component {
    state = {
        groupTasks: []
    }

    componentDidMount() {
        getTasksList().then(
            data => this.setState({groupTasks: data})
        )
    }

    render() {
        const { groupTasks } = this.state;

        return <div>
            <h2 className="green-under-line mt-5">Задачи</h2>
            <ListGroup className="mt-4">
            {
                groupTasks.map(
                    (groupTask) => <ListGroup.Item
                        as={Link}
                        to={`/groups/${groupTask.group[0]}/tasks/${groupTask.task.id}`}
                        action
                    >
                        {groupTask.task.name}
                    </ListGroup.Item>
                )
            }
            </ListGroup>
        </div>
    }
}
