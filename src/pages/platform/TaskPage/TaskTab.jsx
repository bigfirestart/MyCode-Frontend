import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";

const editorLanguage = {
    "c": "c_cpp",
    "cpp": "c_cpp",
    "java": "java"
};

const apiLanguage = {
    "c": "C",
    "cpp": "CPP",
    "java": "JAVA"
};

export function TaskTab({ task, onSubmit }) {
    const [sourceCode, setSourceCode] = useState("");
    const [language, setLanguage] = useState("");

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

    const onClickSubmit = () => onSubmit(apiLanguage[language], sourceCode);

    return <>
        <h3 className="mt-4">Проблема</h3>
        <Card className="markdown-container mb-4">
            <Card.Body>
                <ReactMarkdown>
                    {task?.problem}
                </ReactMarkdown>
            </Card.Body>
        </Card>
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
        <Table className="samples-container" bordered>
            <thead>
                <tr>
                    <th>Ввод</th>
                    <th>Вывод</th>
                </tr>
            </thead>
            <tbody>
            {
                task.samples.map(
                    (sample, i) => <>
                        <tr className="mb-3">
                            <td>
                                <div style={{ whiteSpace: "pre" }}>{sample.input}</div>
                            </td>
                            <td>
                                <div style={{ whiteSpace: "pre" }}>{sample.output}</div>
                            </td>
                        </tr>
                    </>
                )
            }
            </tbody>
        </Table>
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
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="java">Java</option>
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
                        mode={editorLanguage[language]}
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
            onClick={onClickSubmit}
        >
            Отправить
        </Button>
    </>;
}
