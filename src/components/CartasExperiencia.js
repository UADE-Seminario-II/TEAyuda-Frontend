import React from "react";
import { makeStyles } from "@material-ui/styles/";
import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const CartasExperiencia = (props) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "#3f51b5",
    },
    root: {
      minWidth: 275,
      display: "inline-block",
      backgroundColor: "#3f51b5",
      color: "white",
      margin: "20px",
      maxWidth:"200px",
      maxHeight:"300px",
      wordWrap:"break-word",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
      color: "white",
    },
    title: {
      fontSize: 20,
      fontWeight:"bold",
      color: "white",
    },
    pos: {
      marginBottom: 12,
      color: "white",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      {props.cartas.map((item, index) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {item.titulo}
            </Typography>
            <Typography variant="h5" component="h2">
              {item.detalleTipoExperiencia}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.tipoExperiencia}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.puntaje}
            </Typography>
            <Typography variant="body2" component="p">
              {item.comentario}
              <br />
              <br />
              {item.usuario.usuario}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Button</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CartasExperiencia;
