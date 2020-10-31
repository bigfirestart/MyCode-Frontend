import React from "react";
import { Button, Col, ListGroup, Row, Tabs, Tab } from "react-bootstrap";
import {
    Dropdown,
    DropdownButton,
    Button,
    Col,
    FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
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
        addStudentForm: false,
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
            <Link to={`/tasks/${task.id}`}>
                {task.name}
            </Link>

        </ListGroup.Item>
    }

    setDropdownTasks = (groupsTask, index) => {
        console.log(groupsTask)
        return <Dropdown.Item eventKey="1">{groupsTask.task.name}</Dropdown.Item>

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



    render() {
        const { tasks } = this.state;
        return <div>
            <Row className="mt-5">
                <Col className="green-under-line justify-content-end">
                    <h2>Группа {this.state.group?.name}</h2>
                </Col>
            </Row>
            <Row className="mt-4 mb-3">
                <Col lg={11} className="align-items-center"><h4>Задачи</h4></Col>
                {
                    !this.state.addTaskForm &&
                    <Col lg={1}><Button onClick={this.openAddTaskForm}>+</Button></Col>
                }
            </Row>
            {
                this.state.addTaskForm &&
                <ListGroupItem>
                    <Row>
                        <InputGroup className="mb-3">
                            <DropdownButton
                                as={ButtonGroup}
                                variant="outline-secondary"
                                title="Выбере задачу"
                                id="dropdown-menu-align-responsive-1"
                            >
                                {
                                    this.state.availableTasks?.map(this.setDropdownTasks)
                                }
                            </DropdownButton>
                            <InputGroup.Append>
                                <Button onClick={this.addNewGroup}>Сохранить</Button>
                                <Button variant="dark" onClick={this.closeAddTaskForm}>Отмена</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </ListGroupItem>
            }
            <ListGroup>
                {
                    this.state.tasks?.map(this.setTask)
                }
            </ListGroup>
            <Row className="mt-4 mb-3">
                <Col lg={11} className="align-items-center"><h4>Ученики</h4></Col>
                {
                    !this.state.addStudentForm &&
                    <Col lg={1}><Button onClick={this.openAddStudentForm}>+</Button></Col>
                }

            </Row>
            {
                this.state.addStudentForm &&
                <ListGroupItem>
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.addGroupFormValue} onChange={this.setAddGroupFormValue}
                                         placeholder="ID ученика"
                                         aria-label="ID ученика"
                                         aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button onClick={this.addNewGroup}>Сохранить</Button>
                                <Button variant="dark" onClick={this.closeAddStudentForm}>Отмена</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </ListGroupItem>
            }

            <ListGroup>
                {
                    this.state.group?.students.map(this.setStudent)
                }
            </ListGroup>
        </div>

        return <div>
            <h2 className="green-under-line mt-5">Группа {this.state.group?.name}</h2>
            <Tabs defaultActiveKey="tasks" className="mt-4">
                <Tab title="Задачи" eventKey="tasks">
                    <ListGroup className="mt-3">{
                        tasks?.map(this.taskSet)
                    }</ListGroup>                </Tab>
                <Tab title="Ученики" eventKey="students">
                    <ListGroup className="mt-3">{
                        this.state.group?.students.map(this.studentSet)
                    }</ListGroup>
                </Tab>
            </Tabs>
        </div>;
    }
}
