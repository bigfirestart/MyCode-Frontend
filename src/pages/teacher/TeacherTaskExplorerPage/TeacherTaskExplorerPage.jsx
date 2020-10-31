import React from "react";
import {Col, Row, Table} from "react-bootstrap";
import {getGroupsList, getTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class TeacherTaskExplorerPage extends React.Component {
    state = {
         groupsTasks: []
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
            <td>
                <Link to={`/tasks/${groupsTask.task.id}`}>
                    {groupsTask.task.name}
                </Link>
            </td>
        </tr>
    }
    render() {
        return <div>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Список тестов</h2>
                </Col>
            </Row>
            <Table className="mt-5">
                <tbody>
                    {
                        this.state.groupsTasks.map(this.taskSet)
                    }
                </tbody>
            </Table>
        </div>
    }
}
