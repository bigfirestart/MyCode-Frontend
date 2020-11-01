import React from "react";
import {
    Button,
    ListGroup,
    InputGroup,
    FormControl
} from "react-bootstrap";
import {getGroupsList, postGroup} from "../../../remote/api";
import {Link} from "react-router-dom";

export class GroupExplorerPage extends React.Component {
    state = {
        groups: [],
        addGroupForm: false,
        addGroupFormValue: "",
        uploadingNewGroup: false
    }

    componentDidMount() {
        getGroupsList().then(
            data => this.setState({
                groups: data,
            })
        )
    }

    setGroup = (group, index) => {
        return <ListGroup.Item as={Link} to={`/groups/${group.id}`} action className="justify-content-between">
            {group.name}
        </ListGroup.Item>;
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

    addNewGroup = async () => {
        this.setState({
            uploadingNewGroup: true
        });

        const newGroup = { name: this.state.addGroupFormValue };
        await postGroup(newGroup);

        this.setState({
            groups: [
                newGroup,
                ...this.state.groups,
            ],
            addGroupForm: false,
            uploadingNewGroup: false
        });
    }

    render() {
        const { uploadingNewGroup } = this.state;
        return <div>
            <h2 className="green-under-line mt-5">Список групп</h2>

            {
                this.state.addGroupForm
                    ? <InputGroup className="mt-4">
                            <FormControl value={this.state.addGroupFormValue} onChange={this.setAddGroupFormValue}
                                        placeholder="Имя новой группы"
                                        aria-label="Имя новой группы"
                                        aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button
                                    onClick={this.addNewGroup}
                                    disabled={uploadingNewGroup}
                                >
                                    { uploadingNewGroup ? "Загрузка..." : "Сохранить" }
                                </Button>
                                <Button variant="dark" onClick={this.closeAddGroupForm}>Отмена</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    : <div className="mt-4">
                        <Button onClick={this.openAddGroupForm} variant="outline-primary">Создать группу</Button>
                    </div>
            }
            <ListGroup className="mt-2">
                {
                    this.state.groups.map(this.setGroup)
                }
            </ListGroup>
        </div>
    }
}
