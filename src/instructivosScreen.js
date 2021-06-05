import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import axios from "axios";
import GaleriaInstructivos from './components/Instructivos'
let ready = false;

function Instructivos(props) {
  let [responseData, setResponseData] = React.useState([]);

  React.useEffect(() => {
    if (!ready) {
      axios
        .get(`https://sip2-backend.herokuapp.com/${props.location.state.entidad}es/${props.location.state.id}/Instructivo`)
        .then((response) => {
          console.log(response.data);
          setResponseData(response.data);
          ready = true;
        })
        .catch((error) => {
          console.log(error);
          ready = true;
        });
      ready = true;
    }
  }, [setResponseData, responseData]);

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

      <GaleriaInstructivos elem={responseData}></GaleriaInstructivos>
    </div>
  );
}

export default Instructivos;
