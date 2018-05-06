import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App.jsx";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/nav/Navbar';
import Info from "./components/info/Info.jsx";

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route exact path="/login" component={Login} />
                <Route path="/" component={App} />
                <Route path="/info" component={Login}/>
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
    ,
    document.getElementById("root")
);

registerServiceWorker();
