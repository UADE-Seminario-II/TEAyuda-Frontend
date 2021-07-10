import React from "react";
import { makeStyles } from "@material-ui/styles/";
import { Card, CardContent, Typography } from "@material-ui/core";
//import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const CartasExperiencia = (props) => {
  console.log(props.imagen)
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "white",// FONDOBLANCO: #e2eeff  FONDOCELESTE: white
    },
    root: {
      minWidth: 275,
      display: "inline-block",
      backgroundColor: "white", // FONDOBLANCO: #e2eeff  FONDOCELESTE: white
      color: "black",
      width: "92%",
      marginLeft: "4%",
      wordWrap: "break-word",
      borderRadius:"1rem",
      marginBottom:"1%",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
      color: "black",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
    pos: {
      marginBottom: 3,
      color: "black",
    },
  }));
  const classes = useStyles();

  return (
    <div style={{ width:"100%"}}>
      {props.cartas.map((item, index) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="p" component="p">
              <PersonRoundedIcon/>  {(item.nickname != null) ? item.nickname : "Anonimo/a"}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <Rating
                name="read-only"
                value={item.puntaje}
                size="small"
                readOnly
              />
              {"  ⇀  " + item.titulo}
            </Typography>
            <Typography variant="h5" component="h2">
              {item.detalleTipoExperiencia}
            </Typography>
            <Typography variant="body2" component="p" style={{fontStyle:"italic"}}>
              {'"' + item.comentario + '"'}
            </Typography>
            <div>
              {props.imagen.map((imagen, index) => (
              imagen.id===item.id?
                <img style={{width:200, height:200}}src={`data:image/jpeg;base64, ${(imagen.image[0])}`} />:null))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartasExperiencia;
