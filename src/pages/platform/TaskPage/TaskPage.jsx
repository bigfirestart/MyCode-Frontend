import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";

const TASK_TAB = "task-tab";
const SUBMISSIONS_TAB = "submissions-tab";

export function TaskPage({ groupId, taskId }) {    
    const [tab, setTab] = useState(TASK_TAB);
    const [sourceCode, setSourceCode] = useState("");
    const [language, setLanguage] = useState("");

    /** @type {import("../../../remote/api").Task} */
    const task = {
        id: taskId,
        problem: "### Hello world\n Task description \n\n Task description \n\n **Bye**",
        samples: [
            {
                input: "3\n1 2 3",
                output: "3 2 1"
            },
            {
                input: "3\n1 2 3",
                output: "3 2 1"
            }
        ],
        deadline: new Date(),
        timeLimit: 2,
        memoryLimit: 1,
        testType: "TEST",
        postprocessorType: "EASY",
        submissions: []
    };

    const onUploadFile = (ev) => {
        const file = ev.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            setSourceCode(event.target.result.toString());
        });
        reader.readAsText(file);
    };

    return <div>
        <h2 className="mt-5 green-under-line mb-4">Название задачи</h2>
        <Tabs onSelect={setTab} activeKey={tab}>
            <Tab title="Задание" eventKey={TASK_TAB}>
                <h3 className="mt-4">Проблема</h3>
                <div className="markdown-container mb-4">
                    <ReactMarkdown>
                        {task?.problem}
                    </ReactMarkdown>
                </div>
                <h3 className="mt-4">Ограничения</h3>
                <div>
                    <div className="limits-container">
                        Ограничения по времени: {task.timeLimit} сек.
                    </div>
                    <div>
                        Ограничения по памяти: {task.memoryLimit} МБ
                    </div>
                </div>
                <h3 className="mt-4">Примеры работы программы</h3>
                <Container className="samples-container">{
                    task.samples.map(
                        (sample, i) => <>
                            <Row className="mb-3">
                                <Col md="3">
                                    <div>Вход</div>
                                    <div style={{ whiteSpace: "pre" }}>{sample.input}</div>
                                </Col>
                                <Col md="3">
                                    <div>Выход</div>
                                    <div style={{ whiteSpace: "pre" }}>{sample.output}</div>
                                </Col>
                            </Row>
                        </>
                    )
                }</Container>
                <h3 className="mt-4">Отправка решения</h3>
                <Form className="mt-2">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.File
                                name="file"
                                label="Прирепите файл с исходным кодом"
                                onChange={onUploadFile}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Выберите язык</Form.Label>
                            <Form.Control as="select" value={language} onChange={(ev) => setLanguage(ev.target.value)}>
                                <option value="c_cpp">C/C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option style={{ display: "none" }} value="" />
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="source-code">
                                Редактор кода
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="source-code">
                            <AceEditor
                                mode={language}
                                value={sourceCode}
                                theme="xcode"
                                onChange={setSourceCode}
                                fontSize={14}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 4,
                                    useWorker: false,
                                }}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Button 
                    type="submit"
                    className="mt-4"
                >
                    Отправить
                </Button>
            </Tab>
            <Tab title="Попытки" eventKey={SUBMISSIONS_TAB}>
                <div className="submissions-table">Таблица попыток</div>
            </Tab>
        </Tabs>
    </div>;
}
