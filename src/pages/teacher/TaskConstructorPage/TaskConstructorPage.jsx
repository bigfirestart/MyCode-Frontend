import React from "react";
import { getGroupsList, postTask } from "../../../remote/api";
import { TaskConstructor } from "../../../components/TaskConstructor/TaskConstructor";

export class TaskConstructorPage extends React.Component {
    constructor(props) {
        super(props);

        const initTask = {
            problem: "",
            name: "",
            tests: [{
                number: 1,
                input: "",
                output: "",
                weight: 100
            }],
            samples: [{
                input: "",
                output: ""
            }],
            deadline: new Date(),
            timeLimit: 1000,
            memoryLimit: 1000,
            testType: "TEST",
            postprocessorType: "EASY",
            submissions: []
        };
        
        this.state = {
            groups: null,
            task: initTask,
            groupId: ""
        };
    }

    async componentDidMount() {
        const groups = await getGroupsList();
        this.setState({ groups })
    }

    onSubmit = async (task) => {
        await postTask(this.state.groupId, task);
    }

    setTask = (task) => this.setState({ task })

    setGroupId = (groupId) => this.setState({ groupId })

    render() {
        const { task, groups, groupId } = this.state
        return <div>
            <h2 className="green-under-line mt-5">Новое задание</h2>
            <TaskConstructor
                task={task}
                groups={groups}
                setTask={this.setTask}
                onSubmit={this.onSubmit}
                setGroupId={this.setGroupId}
                groupId={groupId}
            />
        </div>;
    }
}
