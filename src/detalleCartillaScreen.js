import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory} from "react-router-dom";
import Footer from "./components/Footer";
import { AirlineSeatIndividualSuiteRounded } from "@material-ui/icons";

export default function DetalleCartillaScreen(props) {
    const useStyles = makeStyles((theme) => ({
        Titulo:{
          fontFamily:"Garamond", 
          fontWeight:'bold',
          fontSize:"35px",
          textAlign:"center",
          marginTop:"10rem",
          
        },
        Titulo1:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"50px",
            textAlign:"left",
            marginTop:"7rem",
            color:"#7F3004",
            
          },
          Titulo2:{
            fontSize:"25px",
            textAlign:"left",
            marginTop:"5rem",
            textAlign:"left",
            marginLeft:"12rem",
          },
          footer:{
              marginTop:"5rem"
          },
          margin:{
            color:"white",
            backgroundColor:"#D27805",
            '&:hover': {
                backgroundColor:"#E89907",
            }
        },
        margin1:{
            color:"white",
            backgroundColor:"#D27805",
            '&:hover': {
                backgroundColor:"#E89907",
            },
            marginLeft:"1rem"
        },
      }));
    const [entidad,setEntidad]=useState(props.location.state)
    const history= useHistory();
    const classes = useStyles();
    return (
      <div className={classes.DetalleEntidad}>
        <div className={classes.Titulo}>
            {entidad.nombre} {entidad.apellido}   
        </div>
        <div class="col-12 row mb-5">
            <div class="col-lg-3 col-md-8 col-sm-12 mt-5">
                <img src={entidad.image} style={{marginLeft:"5rem"}}height="500px" class="img-fluid" alt="Responsive image" />
            </div>
            <div class="col-lg-7 col-md-4 col-sm-12 row">
                <div className={classes.Titulo2} >
                    Especialidad: {entidad.especialidad}<br />
                    Dirreción: {entidad.direccion} {entidad.piso}<br />
                    Teléfono: {entidad.telefono}<br />
                    E-mail: {entidad.mail}<br />
                    Matrícula: {entidad.matricula}<br />
                    {entidad.rating === "1" ?
                        <div>
                            Valoración: 1 estrella (&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "2" ?
                        <div>
                            Valoración: 2 estrellas (&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "3" ?
                        <div>
                            Valoración: 3 estrellas (&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "4" ?
                        <div>
                            Valoración: 4 estrellas (&#9733;&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "5" ?
                        <div>
                            Valoración: 5 estrellas (&#9733;&#9733;&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                </div>
            </div>
        </div>
        <div class="col-md-11 mx-auto">
                <Button variant="outlined" size="medium" color="primary" className={classes.margin}>
                    Copiar Link
                </Button>
                <Button variant="outlined" size="medium" color="primary" className={classes.margin1} onClick={() => history.push({pathname:'/Experiencias'})}>
                    Ver experiencias
                </Button>
        </div>
        <div className={classes.footer}>
            <Footer />
        </div>
      </div>
    );
  }