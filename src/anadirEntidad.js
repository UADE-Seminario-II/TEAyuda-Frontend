import React, { useState, useEffect , useStyles} from "react";
import NavBar from "./components/NavBar";
import { makeStyles } from '@material-ui/core/styles';

export default function AnadirEntidad() {

    return (
        <div style={{backgroundColor: "white", height: "100%", minHeight: "100vh"}}>
            <NavBar></NavBar>
            <div style={{backgroundColor: "#115DBF",height:"5rem", }} >
                <div style={{height:"1rem"}}></div>
                <text style={{fontFamily: "Open Sans", fontSize: "2rem", color:"white", marginLeft:"2.5%", fontWeight:"bold"}}>Añadir profesional o lugar de interés</text>
            </div>
        </div>
    );
}