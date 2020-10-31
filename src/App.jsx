import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { AuthPage } from "./pages/shared/AuthPage/AuthPage";
import { checkToken } from "./remote/auth";
import { LOCALSTORAGE_USER_KEY, STUDENT_ROLE, TEACHER_ROLE } from "./constants";
import { TaskConstructorPage } from "./pages/teacher/TaskConstructorPage/TaskConstructorPage";
import { TaskExplorerPage } from "./pages/platform/TaskExplorerPage/TaskExplorerPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TaskPage } from "./pages/platform/TaskPage/TaskPage";
import "../src/remote/mock";
import { GroupExplorerPage } from "./pages/teacher/GroupExplorerPage/GroupExplorerPage";

class App extends React.Component {
    state = {
        isAuthenticated: false,
        checkingAuthentication: true,
        user: null
    }

    componentDidMount() {
        this.checkAuthentication();
        const user = localStorage.getItem(LOCALSTORAGE_USER_KEY);
        if (user) {
            this.setState({ user });
        }
    }

    checkAuthentication = async () => {
        const user = await checkToken();
        this.setState({
            isAuthenticated: Boolean(user),
            checkingAuthentication: false,
            user
        });
    }

    onAuthenticated = async (user) => {
        this.setState({
            isAuthenticated: true,
            user
        });
    }

    render() {
        const {
            isAuthenticated,
            checkingAuthentication,
            user
        } = this.state;

        return (
            <Router>
                <div className="App">
                    <Header
                        role={user?.role}
                        isAuthenticated={isAuthenticated}
                        user={user}
                    />
                    <Container>
                        <Row>
                            <Col>
                                {
                                    checkingAuthentication &&
                                    <div>Проверка аутентификации</div>
                                }
                                {
                                    !checkingAuthentication &&
                                    isAuthenticated &&
                                    <>
                                        {
                                            user?.role === STUDENT_ROLE && <Switch>
                                                <Route exact path="/tasks">
                                                    <TaskExplorerPage />
                                                </Route>

                                                <Route exact path="/groups/:groupId/tasks/:taskId">{
                                                    ({ match }) => <TaskPage
                                                        taskId={match.params.taskId}
                                                        groupId={match.params.groupId}
                                                    />
                                                }</Route>
                                            </Switch>
                                        }
                                        {
                                            user?.role === TEACHER_ROLE && <Switch>
                                                <Route exact path="/groups">
                                                    <GroupExplorerPage />
                                                </Route>

                                                <Route exact path="/groups/:groupId">
                                                    {/**  */}
                                                </Route>

                                                <Route exact path="/groups/:groupId/tasks">
                                                    {/**  */}
                                                </Route>

                                                <Route exact path="/tasks">
                                                    {/** */}
                                                </Route>

                                                <Route exact path="/tasks/constructor">
                                                    <TaskConstructorPage />
                                                </Route>
                                                
                                                <Route exact path="/tasks/:taskId"></Route>

                                                <Route exact path="/" />
                                            </Switch>
                                        }
                                    </>
                                }
                                {
                                    !checkingAuthentication &&
                                    !isAuthenticated &&
                                    <AuthPage
                                        onAuthenticated={this.onAuthenticated}
                                    />
                                }
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
