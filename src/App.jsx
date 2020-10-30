import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { AuthPage } from "./pages/shared/AuthPage/AuthPage";
import { checkToken } from "./remote/auth";
import { LOCALSTORAGE_ROLE_KEY, STUDENT_ROLE, TEACHER_ROLE } from "./constants";
import { TaskConstructorPage } from "./pages/teacher/TaskConstructorPage/TaskConstructorPage";
import { TaskExplorerPage } from "./pages/platform/TaskExplorerPage/TaskExplorerPage";

import './App.css';

class App extends React.Component {
    state = {
        role: null,
        isAuthenticated: false,
        checkingAuthentication: true
    }

    componentDidMount() {
        this.checkAuthentication();
        const role = localStorage.getItem(LOCALSTORAGE_ROLE_KEY);
        this.setState({ role });
    }

    checkAuthentication = async () => {
        const isAuthenticated = await checkToken();
        this.setState({
            isAuthenticated,
            checkingAuthentication: false
        });
    }

    render() {
        const {
            role,
            isAuthenticated,
            checkingAuthentication
        } = this.state;

        return (
            <Router>
                <div className="App">
                    <Header />
                    <SideBar />
                    {
                        checkingAuthentication &&
                        <div>Проверка аутентификации</div>
                    }
                    {
                        !checkingAuthentication &&
                        isAuthenticated &&
                        <Switch>
                            {
                                role === STUDENT_ROLE && <>
                                    {/** Дефолтная страница для ученика - это задания */}
                                    <Redirect to="/tasks" />

                                    <Route exact path="/tasks">
                                        <TaskExplorerPage />
                                    </Route>

                                    <Route exact path="/tasks/:taskId">
                                        {/** дописать */}
                                    </Route>
                                </>
                            }
                            {
                                role === TEACHER_ROLE && <>
                                    <Route exact path="/groups">
                                        {/** дописать */}    
                                    </Route>
                                    <Route exact path="/groups/:groupId">
                                        {/** дописать */}
                                    </Route>
                                    <Route exact path="/groups/:groupId/tasks">
                                        {/**  */}
                                    </Route>
                                    <Route exact path="/tasks">
                                        {/** */}
                                    </Route>
                                    <Route exact path="/tasks/:taskId">

                                    </Route>
                                    <Route exact path="/tasks/constructor">
                                        <TaskConstructorPage />
                                    </Route>
                                </>
                            }
                            <Route exact path="/" />
                        </Switch>
                    }
                    {
                        !checkingAuthentication &&
                        !isAuthenticated &&
                        <AuthPage />
                    }
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
