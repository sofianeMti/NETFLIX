import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Authentification from "./components/Authentification";
import Header from "./components/Header";
import Home from "./components/Home";
import Series from "./components/Series";
import Serie from "./components/Serie";
import Episodes from "./components/Episodes";
import Profil from "./components/Profil";


class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Authentification} />
                <Route exact path="/home" component={Home}/>
                <Route exact path='/series' component={Series}/>
                <Route exact path='/serie/:id' component={Serie}/>
                <Route exact path='/episodes/serie/:id' component={Episodes}/>
                <Route exact path="/Profil" component={Profil}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
