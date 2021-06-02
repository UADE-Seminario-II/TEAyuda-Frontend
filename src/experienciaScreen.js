import React, { useState} from "react";
export default function Experiencia(props) {
    return(
        <div>
            {props.location.state.nombre} <br />
            {props.location.state.direccion}
        </div>
    );
}