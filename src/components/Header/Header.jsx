import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { ROLES, STUDENT_ROLE, TEACHER_ROLE } from "../../constants";
import { Link } from "react-router-dom";

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
            user,
            isAuthenticated
        } = this.props;

        return <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Мой|Код</Navbar.Brand>
            <Navbar.Toggle />
            {
                isAuthenticated &&
                <Navbar.Collapse className="justify-content-between">
                    <Nav>
                        {
                            role === TEACHER_ROLE && <>
                                <Nav.Link as={Link} to="/groups">Группы</Nav.Link>
                                <Nav.Link as={Link} to="/tasks">Задания</Nav.Link>
                            </>
                        }
                        {
                            role === STUDENT_ROLE &&
                            <Nav.Link as={Link} to="/tasks">Задания</Nav.Link>
                        }
                    </Nav>
                    <div>
                        <Navbar.Text>
                            {user?.name}: {ROLES[role]}
                        </Navbar.Text>
                        <Button variant="outline-primary">Выход</Button>
                    </div>
                </Navbar.Collapse>
            }

      </Navbar>;
    }
}
