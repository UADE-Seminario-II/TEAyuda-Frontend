import React from "react";
import { BrowserRouter as Router,Route, useHistory, Switch} from "react-router-dom";
import Home from "./homeScreen";
import Cartilla from "./cartillaScreen";
import NavBar from "./components/NavBar";
import DetalleCartilla from "./detalleCartillaScreen";
import Experiencia from "./experienciaScreen";
export default function Routes(){
        console.log("Redirigiendo")
        return (
            <Router history={useHistory}>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Home" component={Home}/>
                    <Route exact path="/Cartilla" component={Cartilla}/>
                    <Route exact path="/Cartilla/:entidad/:id" component={DetalleCartilla} />
                    <Route exact path="/Experiencia/Crear" component={Experiencia} />
                </Switch>
            </Router>
        )
    }