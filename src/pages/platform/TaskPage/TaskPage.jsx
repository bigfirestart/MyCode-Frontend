import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";

const TASK_TAB = "task-tab";
const SUBMISSIONS_TAB = "submissions-tab";

export function TaskPage({ groupId, taskId }) {
    const [tab, setTab] = useState(TASK_TAB);
    const [sourceCode, setSourceCode] = useState("");

    /** @type {import("../../../remote/api").Task} */
    const task = {
        id: taskId,
        problem: "# Hello world\n Task description \n\n Task description \n\n **Bye**",
        samples: [{
            input: "1 2 3",
            output: "3 2 1"
        }],
        deadline: new Date(),
        timeLimit: 5000,
        memoryLimit: 1000,
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
        <h2>Название задачи</h2>
        <Tabs onSelect={setTab} activeKey={tab}>
            <Tab title="Задание" eventKey={TASK_TAB}>
                <div className="markdown-container">
                    <ReactMarkdown>
                        {task?.problem}
                    </ReactMarkdown>
                </div>
                <div className="limits-container">
                    Ограничения по времени: {task.timeLimit}
                </div>
                <div>
                    Ограничения по памяти: {task.memoryLimit}
                </div>
                <div className="samples-container">{
                    task.samples.map(
                        (sample) => <>
                            <div>Вход: {sample.input}</div>
                            <div>Выход: {sample.output}</div>
                        </>
                    )
                }</div>
                <h3>Отправка решения</h3>
                <div className="attachment-container">
                    <AceEditor
                        mode="javascript"
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
                            useWorker: false
                        }}
                        style={{
                            width: "100%"
                        }}
                    />
                    <Form>
                        <Form.File
                            name="file"
                            label="Прирепите файл с исходным кодом"
                            onChange={onUploadFile}
                        />

                        <Button 
                            type="submit"
                            className="mt-4"
                        >
                            Отправить
                        </Button>
                    </Form>
                </div>
            </Tab>
            <Tab title="Попытки" eventKey={SUBMISSIONS_TAB}>
                <div className="submissions-table">Таблица попыток</div>
            </Tab>
        </Tabs>
    </div>;
}
