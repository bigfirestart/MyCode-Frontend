import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";

export function TaskConstructor({ task, setTask, groups, onSubmit, setGroupId, groupId }) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (ev.currentTarget.checkValidity()) {
            onSubmit(task);
            return;
        }

        setValidated(true);
    };

    const setTest = (newTest, i) => {
        const newTask = {
            ...task,
            tests: task.tests.map(
                (test, j) => i === j ? newTest : test
            )
        };

        setTask(newTask);
    }

    const addTest = () => {
        setTask({
            ...task,
            tests: [
                ...task.tests,
                {
                    input: "",
                    output: "",
                    weight: 100,
                    number: task.tests.length + 1
                }
            ]
        });
    };

    const setName = (taskName) => {
        setTask({
            ...task,
            name: taskName
        })
    };

    const setProblem = (problem) => {
        setTask({
            ...task,
            problem
        });
    };

    const setTimeLimit = (timeLimit) => {
        setTask({
            ...task,
            timeLimit
        });
    };

    const setMemoryLimit = (memoryLimit) => {
        setTask({
            ...task,
            memoryLimit
        });
    };

    const setSample = (newSample, i) => {
        setTask({
            ...task,
            samples: task.samples.map((sample, j) => i === j ? newSample : sample)
        })
    }

    const addSample = () => setTask({
        ...task,
        samples: [
            ...task.samples,
            {
                input: "",
                output: ""
            }
        ]
    });

    return <Form
        className="mt-4"
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
                    value={task.name}
                    onChange={(ev) => setName(ev.target.value)}
            />
        </Form.Group>

        <Tabs>
            <Tab title="Редактирование легенды" eventKey="edit-legend">
                <Form className="mt-2">
                    <Form.Group>
                        <Form.Control
                            required
                            as="textarea"
                            value={task.problem}
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
                <Card className="mt-2">
                    <Card.Body>
                        <ReactMarkdown>
                            {task.problem}
                        </ReactMarkdown>
                    </Card.Body>
                </Card>
            </Tab>
        </Tabs>

        <h3 className="mt-4">Ограничения</h3>
        <Form.Group>
            <Form.Label>По времени</Form.Label>
            <Form.Control
                type="number"
                min={0}
                value={task?.timeLimit}
                onChange={(ev) => setTimeLimit(ev.target.value)}
                style={{ width: "fit-content" }}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>По памяти</Form.Label>
            <Form.Control
                type="number"
                min={0}
                value={task?.memoryLimit}
                onChange={(ev) => setMemoryLimit(ev.target.value)}
                style={{ width: "fit-content" }}
            />
        </Form.Group>

        <h3 className="mt-4">Тесты</h3>
        <Table>
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
                    task.tests.map(
                        (test, i) => <tr>
                            <th style={{ verticalAlign: "middle" }}>{test.number}</th>
                            <Form.Group as="th">
                                <Form.Control
                                    as="textarea"
                                    value={test.input}
                                    onChange={
                                        (ev) => setTest({
                                            ...test,
                                            input: ev.target.value
                                        }, i)
                                    }
                                    style={{ height: "6em" }}
                                />
                            </Form.Group>
                            <Form.Group as="th">
                                <Form.Control
                                    as="textarea"
                                    value={test.output}
                                    onChange={
                                        (ev) => setTest({
                                            ...test,
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
                                    value={test.weight}
                                    onChange={
                                        (ev) => setTest({
                                            ...test,
                                            weight: ev.target.value
                                        }, i)
                                    }
                                />
                            </Form.Group>
                        </tr>
                    )    
                }
                <tr>
                    <th>{task.tests.length + 1}</th>
                    <th colSpan={3}>
                        <Button
                            variant="outline-primary"
                            onClick={addTest}
                        >Добавить</Button>
                    </th>
                </tr>
            </tbody>
        </Table>

        <h3 className="mt-4">Сэмплы</h3>
        <p>Примеры входных и выходных данных, которые будут видеть ученики</p>
        <Table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Вход</th>
                    <th>Выход</th>
                </tr>
            </thead>
            <tbody>
                {
                    task.samples.map(
                        (sample, i) => <tr>
                            <th style={{ verticalAlign: "middle" }}>{i + 1}</th>
                            <Form.Group as="th">
                                <Form.Control
                                    as="textarea"
                                    value={sample.input}
                                    onChange={
                                        (ev) => setSample({
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
                                        (ev) => setSample({
                                            ...sample,
                                            output: ev.target.value
                                        }, i)
                                    }
                                    style={{ height: "6em" }}
                                />
                            </Form.Group>
                        </tr>
                    )
                }
                <tr>
                    <th>{task.samples.length + 1}</th>
                    <th colSpan={3}>
                        <Button
                            variant="outline-primary"
                            onClick={addSample}
                        >Добавить</Button>
                    </th>
                </tr>
            </tbody>
        </Table>
        
        {
            groups && <>
                <h3 className="mt-4">Назначение</h3>
                <Form.Group>
                    <Form.Label>Учебная группа</Form.Label>
                    <Form.Control as="select" onChange={(ev) => setGroupId(ev.target.value)} value={groupId}>
                        {
                            groups.map(
                                ({ id, name }) => <option value={id}>
                                    {id}
                                </option>
                            )
                        }
                        <option />
                    </Form.Control>
                </Form.Group>
            </>
        }

        <Button type="submit">Создать</Button>
    </Form>;
}