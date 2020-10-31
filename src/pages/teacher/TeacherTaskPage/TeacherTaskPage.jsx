import React from "react";
import {getTask} from "../../../remote/api";
import { SubmissionsTable } from "../../../components/SubmissionsTable/SubmissionsTable";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { TaskConstructor } from "../../../components/TaskConstructor/TaskConstructor";

export class TeacherTaskPage extends React.Component {
    state = {
        task: null
    }

    componentDidMount() {
        getTask(1, 2).then(
            data => this.setState({
                task: data
            })
        )
    }

    render() {
        const { task } = this.state;

        if (!task) {
            return <div>Загрузка</div>;
        }

        return <div>
            <h2 className="green-under-line mt-5">Задача {task.name}</h2>
            <Tabs defaultActiveKey="task-constructor" className="mt-4">
                <Tab title="Редактировать задание" eventKey="task-constructor">
                    <TaskConstructor task={task} setTask={(t) => this.setState({ task: t })} />
                </Tab>

                <Tab title="Результаты" eventKey="task-submissions">
                    <SubmissionsTable submissions={task.submissions} />
                </Tab>
            </Tabs>
        </div>
    }
}

