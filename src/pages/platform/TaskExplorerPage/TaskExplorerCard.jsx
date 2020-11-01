import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class TaskExplorerCard extends React.Component {
    render() {
        return <Row className="justify-content-center mt-4">
            <Card className="w-100">
                <Card.Body as={Row}>
                    <Col>
                        <Card.Title>
                            <Link to={`/groups/${this.props.groupId}/tasks/${this.props.taskId}/`}>
                                {this.props.taskName}
                            </Link>
                        </Card.Title>
                    </Col>
                    <Col>
                        <Card.Text>
                            100
                        </Card.Text>
                    </Col>
                </Card.Body>
            </Card>
        </Row>
    }
}