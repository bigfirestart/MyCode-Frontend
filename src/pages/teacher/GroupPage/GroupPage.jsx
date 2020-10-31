import React from "react";
import {Col, Row, Table} from "react-bootstrap";
import {getGroupsList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class GroupPage extends React.Component {

    render() {
        return <div>
            <Row className="mt-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Группа </h2>
                </Col>
            </Row>
        </div>


    }
}
