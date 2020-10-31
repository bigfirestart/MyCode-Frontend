import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { signIn, signUp } from "../../../remote/auth";
import { LOCALSTORAGE_ROLE_KEY } from "../../../constants";

/*
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} name
 * @property {string} surname
 * @property {string} middlename
 * @property {string} email
 * @property {string} dateOfBirth
 * @property {string} role # Temporary
 * 
*/

export function AuthPage({ onAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [role, setRole] = useState("");
    const [validated, setValidated] = useState(false);
    const [tab, setTab] = useState("sign-in");
    const [error, setError] = useState(null);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        const form = ev.currentTarget;
        if (form.checkValidity()) {
            if (tab === "sign-in") {
                try {
                    const data = await signIn(username, password);
                    localStorage.setItem(LOCALSTORAGE_ROLE_KEY, data.role);
                    onAuthenticated({ username }, data.role);
                }
                catch(err) {
                    setError(err.message);
                }
            }
            else if (tab === "sign-up") {
                try {
                    await signUp({
                        username,
                        password,
                        name,
                        surname,
                        middlename,
                        email,
                        dateOfBirth,
                        role
                    });

                    onAuthenticated({ username }, role);
                }
                catch(err) {
                    setError(err.message);
                }
            }
        }

        setValidated(true);
    };

    return <>
        <Tabs className="mt-4" onSelect={setTab} activeKey={tab}>
            <Tab eventKey="sign-in" title="Вход в систему">
                <Form 
                    className="mt-3" 
                    noValidate 
                    validated={validated} 
                    onSubmit={handleSubmit}
                >
                    <Form.Group>
                    <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Логин"
                            required
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                    />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password" 
                            placeholder="Пароль"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit">Войти</Button>
                </Form>
            </Tab>
            <Tab eventKey="sign-up" title="Регистрация">
                <Form 
                    className="mt-3" 
                    onSubmit={handleSubmit}
                    noValidate
                    validated={validated} 
                >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Иван"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Иванов"
                                value={surname}
                                onChange={(ev) => setSurname(ev.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Отчество</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Отчество"
                                    value={middlename}
                                    onChange={(ev) => setMiddlename(ev.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Логин"
                                required
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Почта</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="ivan@ivanov.com"
                                required
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password" 
                                placeholder="Пароль"
                                required
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="28.04.2005"
                                required
                                value={dateOfBirth}
                                onChange={(ev) => setDateOfBirth(ev.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>(Роль)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="TEACHER"
                                required
                                value={role}
                                onChange={(ev) => setRole(ev.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit">Зарегистрироваться</Button>
                    </Form.Row>
                    {
                        error &&
                        <Form.Row className="mt-2">
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        </Form.Row>
                    }
                </Form>
            </Tab>
        </Tabs>
    </>;
}
