import React from "react";
import {
    Button,
    Col,
    Form,
    FormText,
    ListGroup,
    Row,
    Table,
    ListGroupItem,
    InputGroup,
    FormControl
} from "react-bootstrap";
import {getGroupsList} from "../../../remote/api";
import {Link} from "react-router-dom";

export class GroupExplorerPage extends React.Component {
    state = {
        groups: [],
        addGroupForm: false,
        addGroupFormValue: ""
    }

    componentDidMount() {
        getGroupsList().then(
            data => this.setState({
                groups: data,
            })
        )
    }

    setGroup = (group, index) => {
        return <tr>
            <ListGroupItem>
                <Link to={`/groups/${group.id}`}>
                    {group.name}
                </Link>
            </ListGroupItem>
        </tr>
    }

    openAddGroupForm = () => {
        if (!this.state.addGroupForm) {
            this.setState({addGroupForm: true})
        }
    }
    closeAddGroupForm = () => {
        if (this.state.addGroupForm) {
            this.setState({addGroupForm: false})
        }
    }
    setAddGroupFormValue = (ev) => {
        this.setState({
            addGroupFormValue: ev.target.value
        })
    }
    addNewGroup = () => {
        this.setState({
            groups: [
                {
                    name: this.state.addGroupFormValue
                },
                ...this.state.groups
            ]
        })
    }

    render() {
        return <div>
            <Row className="mt-5 mb-5">
                <Col lg={3} className="green-under-line justify-content-end">
                    <h2>Список групп</h2>
                </Col>
                {
                    !this.state.addGroupForm &&
                    <Col lg={1} className="offset-8">
                        <Button onClick={this.openAddGroupForm}>+</Button>
                    </Col>
                }

            </Row>
            {
                this.state.addGroupForm &&
                <ListGroupItem>
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.addGroupFormValue} onChange={this.setAddGroupFormValue}
                                         placeholder="Имя новой группы"
                                         aria-label="Имя новой группы"
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
                    this.state.groups.map(this.setGroup)
                }
            </ListGroup>
        </div>


    }
}
