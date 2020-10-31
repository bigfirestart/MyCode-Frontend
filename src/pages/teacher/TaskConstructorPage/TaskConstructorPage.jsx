import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";

export function TaskConstructorPage() {
    const [validated, setValidated] = useState(false);
    const [problem, setProblem] = useState("");
    const [tests, setTests] = useState([{
        input: "",
        output: "",
        weight: 1
    }]);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setValidated(true);
    };

    const setTest = (newTest, i) => {
        const newTests = [...tests];
        newTests[i] = newTest;
        setTests(newTests);
    }

    const addTest = () => {
        setTests([
            ...tests,
            {
                input: "",
                output: "",
                weight: 100
            }
        ])
    };

    return <div>
        <h2 className="green-under-line">Новое задание</h2>
        <Form
            className="mt-3" 
            noValidate 
            validated={validated} 
            onSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Label>Название задания</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="A+B"
                        required
                        // value={username}
                        // onChange={(ev) => setUsername(ev.target.value)}
                />
            </Form.Group>

            <div className="markdown-container">
                <Tabs>
                    <Tab title="Редактирование легенды" eventKey="edit-legend">
                        <Form className="mt-2" >
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    value={problem}
                                    onChange={(ev) => setProblem(ev.target.value)}
                                    placeholder="Введите **markdown** текст сюда"
                                    style={{
                                        overflowY: "auto",
                                        height: "300px"
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </Tab>
                    <Tab title="Превью" eventKey="preview-legend">
                        <ReactMarkdown className="mt-2">
                            {problem}
                        </ReactMarkdown>
                    </Tab>
                </Tabs>
            </div>

            <h3>Тесты</h3>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Вход</th>
                        <th>Выход</th>
                        <th>Вес</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tests.map(
                            (sample, i) => <Form as="tr">
                                <th>{i + 1}</th>
                                <Form.Group as="th">
                                    <Form.Control
                                        as="textarea"
                                        value={sample.input}
                                        onChange={
                                            (ev) => setTest({
                                                ...sample,
                                                input: ev.target.value
                                            }, i)
                                        }
                                        style={{ height: "6em" }}
                                    />
                                </Form.Group>
                                <Form.Group as="th">
                                    <Form.Control
                                        as="textarea"
                                        value={sample.output}
                                        onChange={
                                            (ev) => setTest({
                                                ...sample,
                                                output: ev.target.value
                                            }, i)
                                        }
                                        style={{ height: "6em" }}
                                    />
                                </Form.Group>
                                <Form.Group 
                                    as="th"
                                    style={{ verticalAlign: "middle" }}
                                >
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={sample.weight}
                                        onChange={
                                            (ev) => setTest({
                                                ...sample,
                                                weight: ev.target.value
                                            }, i)
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        )    
                    }
                    <tr>
                        <th>{tests.length + 1}</th>
                        <th colSpan={3}>
                            <Button
                                variant="outline-primary"
                                onClick={addTest}
                            >Добавить</Button>
                        </th>
                    </tr>
                </tbody>
            </Table>

            <Button type="submit">Создать</Button>
        </Form>
    </div>;
}
