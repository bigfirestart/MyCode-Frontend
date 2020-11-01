import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {ROLES, STUDENT_ROLE, TEACHER_ROLE} from "../../constants";
import {Link} from "react-router-dom";
import {ReactComponent as ReactLogo} from "./logo.svg";

export class Header extends React.Component {
    static defaultProps = {
        user: {
            name: "Вася Пупкин"
        },
        role: STUDENT_ROLE
    }
    logout = () => {
        localStorage.removeItem("user-role")
        localStorage.removeItem("access-token")
        window.location.reload(false);
    }

    render() {
        const {
            role,
            user,
            isAuthenticated
        } = this.props;

        return <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
                <div className="ml-4">
                    <ReactLogo/>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle/>
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
                            {user?.username}: {ROLES[role]}
                        </Navbar.Text>
                        <Button onClick={this.logout} variant="outline-primary" className="ml-2">Выход</Button>
                    </div>
                </Navbar.Collapse>
            }

        </Navbar>;
    }
}
