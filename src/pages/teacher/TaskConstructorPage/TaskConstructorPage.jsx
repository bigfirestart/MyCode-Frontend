import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";
import ContentEditable from "react-contenteditable";

export function TaskConstructorPage() {
    const [validated, setValidated] = useState(false);
    const [problem, setProblem] = useState("");

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setValidated(true);
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
                        <Form className="mt-2">
                            <Form.Group>
                                <Form.Control
                                    as={ContentEditable}
                                    html={problem}
                                    onChange={(ev) => setProblem(ev.target.value)}
                                    placeholder="Введите **markdown** текст сюда"
                                    contentEditable
                                    style={{
                                        height: "600px",
                                        overflowY: "auto",
                                        paddingBottom: "5em"
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

            <Button type="submit">Войти</Button>
        </Form>
    </div>;
}
