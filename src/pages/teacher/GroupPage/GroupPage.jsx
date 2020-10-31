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
import {getGroup, getGroupTasksList} from "../../../remote/api";
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export class GroupPage extends React.Component {
    state = {
        group: null,
        tasks: [],
        addTaskForm: false,
        addStudentForm: false
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


    studentSet = (studentId, index) => {
        return <ListGroup.Item>{studentId}</ListGroup.Item>
    }

    taskSet = (task, index) => {
        return <ListGroup.Item>
            <Link to={`/tasks/${task.id}`}>
                {task.name}
            </Link>

        </ListGroup.Item>
    }

    //forms actions
    openAddTaskForm = () => {

    }
    hideAddTaskForm = () => {

    }
    openAddStudentForm = () => {

    }
    hideAddStudentForm = () => {

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
                    <Col lg={1}><Button>+</Button></Col>
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
                                menuAlign={{lg: 'right'}}
                                title="Left-aligned but right aligned when large screen"
                                id="dropdown-menu-align-responsive-1"
                            >
                                <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
                            </DropdownButton>
                            <InputGroup.Append>
                                <Button onClick={this.addNewGroup}>Сохранить</Button>
                                <Button variant="dark" onClick={this.closeAddGroupForm}>Отмена</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </ListGroupItem>
            }
            <ListGroup>
                {
                    this.state.tasks?.map(this.taskSet)
                }
            </ListGroup>
            <Row className="mt-4 mb-3">
                <Col lg={11} className="align-items-center"><h4>Ученики</h4></Col>
                {
                    !this.state.addStudentForm &&
                    <Col lg={1}><Button>+</Button></Col>
                }

            </Row>
            {
                this.state.addStudentForm &&
                <ListGroupItem>
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.addGroupFormValue} onChange={this.setAddGroupFormValue}
                                         placeholder="UUID ученика"
                                         aria-label="UUID ученика"
                                         aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button onClick={this.addNewGroup}>Сохранить</Button>
                                <Button variant="dark" onClick={this.closeAddGroupForm}>Отмена</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </ListGroupItem>
            }

            <ListGroup>
                {
                    this.state.group?.students.map(this.studentSet)
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
