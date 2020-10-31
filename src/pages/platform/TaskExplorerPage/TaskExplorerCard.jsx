import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class TaskExplorerCard extends React.Component {
    render() {
        return <Row className="justify-content-center mt-4">
            <Card className="w-100">
                <Card.Body>
                    <Row>
                        <Col lg={10}>
                            <Card.Title>
                                <Link to={`/groups/${this.props.groupId}/tasks/${this.props.taskId}/`}>
                                    {this.props.taskName}
                                </Link>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                            </Card.Text>
                        </Col>
                        <Col lg={2} className="align-self-center">
                            <h3>100</h3>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Row>
    }
}