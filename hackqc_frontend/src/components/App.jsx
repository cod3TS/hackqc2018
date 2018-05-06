import React, { Component } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { MapComponent } from "./map/Map";
import Chat from "./chat/Chat";
import Navbar from "./nav/Navbar";
import Login from "./login/Login";
import Info from "./info/Info";
import ArticleContainer from "./news/ArticlesContainer";
import PieChart from "./stats/PieChart";
class App extends Component {
    constructor() {
        super();
    }
    componentWillMount() {
        if (!window.localStorage.getItem("user")) {
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/map" component={MapComponent} />
                    <Route exact path="/chat" component={Chat} />
                    <Route exact path="/info" component={Info} />
                    <Route exact path="/news" component={ArticleContainer} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/stats" component={PieChart}/>
                </Switch>
            </div>
        );
    }
}

export default App;
