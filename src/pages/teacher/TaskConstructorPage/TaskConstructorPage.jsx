import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function TaskConstructorPage() {
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setValidated(true);
    };

    return <div>
        <h2 className="green-under-line">Новое задание</h2>
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
                        // value={username}
                        // onChange={(ev) => setUsername(ev.target.value)}
                />
            </Form.Group>

            <Button type="submit">Войти</Button>
        </Form>
    </div>;
}
