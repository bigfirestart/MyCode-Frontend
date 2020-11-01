import React from "react";
import {
    Dropdown,
    DropdownButton,
    Button,
    Col,
    FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Tabs,
    Tab,
    Row,
    Table
} from "react-bootstrap";
import {getGroup, getGroupTasksList, getTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export class GroupPage extends React.Component {
    state = {
        group: null,
        tasks: [],
        addTaskForm: false,
        addTaskFormValue: null,
        addStudentForm: false,
        addStudentFormValue: null,
        availableTasks: []
    }

    componentDidMount() {
        getGroup(this.props.groupId).then(
            data => this.setState({
                group: data
            })
        )
        getGroupTasksList(this.props.groupId).then(
            data => this.setState({
                tasks: data
            })
        )
    }


    setStudent = (studentId, index) => {
        return <ListGroup.Item>{studentId}</ListGroup.Item>
    }

    setTask = (task, index) => {
        return <ListGroup.Item>
            <Link to={`/groups/${this.props.groupId}/tasks/${task.id}`}>
                {task.name}
            </Link>

        </ListGroup.Item>
    }

    setDropdownTasks = (groupsTask, index) => {
        return <Dropdown.Item eventKey={groupsTask.task.name}>{groupsTask.task.name}</Dropdown.Item>

    }

    //forms actions
    openAddTaskForm = () => {
        getTasksList().then(
            data => this.setState({
                    availableTasks: data
                }
            )
        )
        if (!this.state.addTaskForm) {
            this.setState({addTaskForm: true})
        }
    }
    closeAddTaskForm = () => {
        if (this.state.addTaskForm) {
            this.setState({addTaskForm: false})
        }
    }

    addNewTask = () => {
        console.log(this.state.addTaskFormValue)
        this.setState({
            tasks: [
                {
                    name: this.state.addTaskFormValue
                },
                ...this.state.tasks
            ]
        })
    }
    taskSelectEvent = (event_key, ev) => {
        this.setState({
            addTaskFormValue: event_key
        })
    }

    openAddStudentForm = () => {
        if (!this.state.addStudentForm) {
            this.setState({addStudentForm: true})
        }
    }
    closeAddStudentForm = () => {
        if (this.state.addStudentForm) {
            this.setState({addStudentForm: false})
        }
    }

    addNewStudent = () => {
        let group = this.state.group;
        let students = group.students.reverse()
        students.push(
            this.state.addStudentFormValue
        )
        group.students = students.reverse()
        this.setState({
            group: group
        })
    }

    setStudentValue = (ev) => {
        this.setState({
            addStudentFormValue: ev.target.value
        })
    }


    render() {
        return <div>
            <h2 className="green-under-line mt-5">Группа {this.state.group?.name}</h2>
            <Tabs defaultActiveKey="tasks" className="mt-4 mb-2">
                <Tab title="Задания" eventKey="tasks">
                    {
                        this.state.addTaskForm
                            ? <InputGroup className="mt-2">
                                <DropdownButton
                                    as={ButtonGroup}
                                    variant="outline-secondary"
                                    title="Выбере задачу"
                                    id="dropdown-menu-align-responsive-1"
                                    onSelect={this.taskSelectEvent}
                                >
                                    {
                                        this.state.availableTasks?.map(this.setDropdownTasks)
                                    }
                                </DropdownButton>
                                <InputGroup.Append>
                                    <Button onClick={this.addNewTask}>Сохранить</Button>
                                    <Button variant="dark" onClick={this.closeAddTaskForm}>Отмена</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            : <Button className="mt-2" onClick={this.openAddTaskForm}
                                      variant="outline-primary">Добавить</Button>
                    }
                    <ListGroup className={"mt-2"}>
                        {this.state.tasks?.map(this.setTask)}
                    </ListGroup>
                </Tab>

                <Tab title="Ученики" eventKey="students">
                    {
                        this.state.addStudentForm
                            ? <InputGroup className="mt-2">
                                <FormControl onChange={this.setStudentValue}
                                             placeholder="ID ученика"
                                             aria-label="ID ученика"
                                             aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button onClick={this.addNewStudent}>Сохранить</Button>
                                    <Button variant="dark" onClick={this.closeAddStudentForm}>Отмена</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            : <Button className="mt-2" onClick={this.openAddStudentForm}
                                      variant="outline-primary">Добавить</Button>
                    }
                    <ListGroup className="mt-2">
                        {this.state.group?.students.map(this.setStudent)}
                    </ListGroup>

                </Tab>
            </Tabs>
        </div>
    }
}