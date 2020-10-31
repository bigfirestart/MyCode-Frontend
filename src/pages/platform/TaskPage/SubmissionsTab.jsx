import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./style.scss";

export function SubmissionsTab({ submissions }) {
    const [activeKey, setActiveKey] = useState(null);

    return <Accordion className="mt-4">{
            submissions.map(
                (submission, i) => <>
                    <Card>
                        <Card.Header as={Alert} variant="danger">
                            <Accordion.Toggle as="div" eventKey={submission.id} className="w-100 submission-brief">
                                <span style={{ border: "none" }}>
                                    {i + 1}
                                </span>
                                <span style={{ border: "none" }}>
                                    Hello
                                </span>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={submission.id}>
                            <Card.Body>
                                <Table as="th" colSpan={3}>
                                    <thead>
                                        <tr>
                                            <th>Номер теста</th>
                                            <th>Код ошибки</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        submission.errors.map(
                                            (err) => <tr>
                                                <th>{err.failedTest}</th>
                                                <th>{err.status}</th>
                                            </tr>
                                        )
                                    }</tbody>

                                </Table>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </>
            )
        }</Accordion>
}
