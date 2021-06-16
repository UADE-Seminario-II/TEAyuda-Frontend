import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import axios from "axios";
import GaleriaInstructivos from './components/Instructivos'
let ready = false;

function Instructivos(props) {
  let [responseData, setResponseData] = React.useState([]);
      
  React.useEffect(() => {
      axios
        .get(`https://sip2-backend.herokuapp.com/${props.location.state.entidad}es/${props.location.state.id}/Instructivo`)
        .then((response) => {
          console.log(response.data);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  /*
   const tileData = [
     {
       img: image,
       title: 'HOLAAAAAAAAAAAAAAA',
       author: 'LUCAS',
     },
     {
        img: image,
        title: 'DOS',
        author: 'LUCAS',
      },
    ];*/

  return (
    <div>
      <NavBar></NavBar>
      <div style={{ backgroundColor: "#115DBF", height:"5rem",}}>
                <div style={{height:"1rem"}}></div>
                <text style={{fontFamily: "Open Sans", fontSize: "2rem", color:"white", marginLeft:"2.5%", fontWeight:"bold"}}>Ayuda visual del ambiente</text> {/* chequear como era el nombre de esta pantalla */}
      </div>

      <GaleriaInstructivos elem={responseData}></GaleriaInstructivos>
    </div>
  );
}

export default Instructivos;
