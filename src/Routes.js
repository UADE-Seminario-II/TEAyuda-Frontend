import React from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Home from "./homeScreen";
import Cartilla from "./cartillaScreen";
import NavBar from "./components/NavBar";
import DetalleCartilla from "./detalleCartillaScreen";
import Experiencia from "./experienciaScreen";
import Instructivos from "./instructivosScreen";
import AnadirEntidad from "./anadirEntidad";

export default function Routes(){
        console.log("Redirigiendo")
        return (
            <Router history={useHistory}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Home" component={Home}/>
                    <Route exact path="/Busqueda" component={Cartilla}/>
                    <Route exact path="/Busqueda/:entidad/:id" component={DetalleCartilla} />
                    <Route exact path="/Experiencia/Crear" component={Experiencia} />
                    <Route exact path="/Instructivos" component={Instructivos} />
                    <Route exact path="/AnadirEntidad" component={AnadirEntidad}/>
                </Switch>
            </Router>
        )
    }