import React from "react";
import {Col, Row, Table} from "react-bootstrap";
import {getGroupsList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class GroupExplorerPage extends React.Component {
    state = {
        groups: []
    }

    componentDidMount() {
        getGroupsList().then(
            data => this.setState({
                groups: data
            })
        )
    }

    groupSet = (group, index) => {
        return <tr>
            <td>
                <Link to={`/groups/${group.id}`}>
                    {group.name}
                </Link>
            </td>
        </tr>
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Список групп</h2>
                </Col>
            </Row>
            <Table className="mt-5">
                <tbody>
                {
                    this.state.groups.map(this.groupSet)
                }
                </tbody>
            </Table>
        </div>


    }
}
