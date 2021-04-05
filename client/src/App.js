import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Content>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </Content>
      </Router>
    </div>
  );
}

export default App;

/*
    A <Switch> looks through all its children <Route>
    elements and renders the first one whose path
    matches the current URL. Use a <Switch> any time
    you have multiple routes, but you want only one
    of them to render at a time
*/

/* 
  null: any user can access this page.
  true: logged-in-users can view this page.
  false: logged-in-users cannot view this page. 
*/
