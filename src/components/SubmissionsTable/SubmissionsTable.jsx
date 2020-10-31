import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import "./style.scss";

export function SubmissionsTable({ submissions }) {
    return <Accordion className="mt-4">{
        submissions.map(
            (submission, i) => <>
                <Card>
                    <Card.Header as={Alert} variant={submission.status === "OK" ? "success" : "danger"}>
                        <Accordion.Toggle as="div" eventKey={submission.id} className="w-100 submission-brief">
                            <span style={{ border: "none" }}>
                                {i + 1}
                            </span>
                            <span style={{ border: "none" }}>
                                {submission.timestamp.toLocaleDateString("ru")} {submission.timestamp.toLocaleTimeString("ru")}
                            </span>
                            <span>
                                {submission.status}
                            </span>
                            <span style={{ border: "none" }}>
                                {submission.points}/100
                            </span>
                            {
                                submission.username &&
                                <span>
                                    {submission.username}
                                </span>
                            }
                        </Accordion.Toggle>
                    </Card.Header>
                    {
                        submission.errors?.length > 0 &&
                        <Accordion.Collapse eventKey={submission.id}>
                            <Card.Body>
                                <Table as="th" colSpan={3} bordered>
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
                    }

                </Card>
            </>
        )
    }</Accordion>;
}