import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { ROLES, STUDENT_ROLE } from "../../constants";

export class Header extends React.Component {
    static defaultProps = {
        user: {
            name: "Вася Пупкин"
        },
        role: STUDENT_ROLE
    }

    render() {
        const {
            role,
            user
        } = this.props;

        return <Navbar bg="light" expand="lg">
            <Navbar.Brand>Мой|Код</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {user?.name}: {ROLES[role]}
                </Navbar.Text>

                <Button>Выход</Button>
            </Navbar.Collapse>
      </Navbar>;
    }
}
