import React from "react";
import {Button, Col, FormText, Row, Table} from "react-bootstrap";
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
        if (group.editable){
            return <tr>
                <td>
                    <Row>
                        <Col><Button>Save</Button></Col>
                    </Row>
                </td>
            </tr>
        }
        else {
            return <tr>
                <td>
                    <Link to={`/groups/${group.id}`}>
                        {group.name}
                    </Link>
                </td>
            </tr>
        }

    }

    createGroup = () => {
        let groups = this.state.groups.reverse();
        groups.push({
                name: "GroupName",
                editable: true
            }
        )
        groups.reverse()
        console.log(groups)
        this.setState({
            groups: groups
        })
    }

    render() {
        return <div>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Список групп</h2>
                </Col>
                <Col  lg={1} className="offset-8">
                   <Button onClick={this.createGroup}>+</Button>
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
