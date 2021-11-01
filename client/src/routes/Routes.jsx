import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Login } from "../Components/Login";
import { NotFound } from "../Components/NotFound";
import { Register } from "../Components/Register";
import { View } from "../Components/View";
import { UsuarioContext } from "../context/UsuarioContext";
import { Add } from "../Views/Add";
import { AddPirate } from "../Views/AddPirate";
import { Auth } from "../Views/Auth";
import { MainPirate } from "../Views/MainPirate";
export const Routes = () => {
    const { usuario, setUsuario } = useContext(UsuarioContext);
    return (
        <div>
            <Router>
            <Switch>
                <Route exact path="/" component={MainPirate} />
                <Route exact path="/login" component={Auth} />
                <Route  exact path="/register" component={Register} />
                <Route  exact path="/edit/:id" component={AddPirate} />
                <Route  exact path="/view/:id" component={View} />
                <Route  exact path="/add" component={Add} />
                <Route  exact path="/addpirate" component={AddPirate} />
                <Route path="*" component={NotFound}/>
            </Switch>
            </Router>
        </div>
    )
}
