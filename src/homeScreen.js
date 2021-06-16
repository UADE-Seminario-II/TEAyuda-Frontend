import React  from "react";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Cartilla from './components/assets/busqueda.png';
import Reviews from './components/assets/addentity.png';
import Typography from '@material-ui/core/Typography';
import { useHistory} from "react-router-dom";
import Footer from "./components/Footer";
import { BorderColor } from "@material-ui/icons";
export default function Home() {
    const useStyles = makeStyles((theme) => ({
        Home:{
          backgroundColor:"white",
        },
        CardContainer:{
            flexDirection: "row",
        },
        root: {
            marginTop:"3rem",
            maxWidth: 350,
            marginLeft:"40%",
            padding:"1%",
            borderColor:"red",
        },
        root1: {
            marginTop:"2.9rem",
            maxWidth: 350,
            marginLeft:"35%",
            padding:"1%"
          }, 
        media: {
          height: 170,
          backgroundSize:"contain",
        },
        title: {
          marginBottom:"11%",
        },
        barraIntro:{
          backgroundColor: "#115DBF", 
          height:"10rem",
          textAlign:"center",
        },
    }));
    const classes = useStyles();
    const history= useHistory();
    return(
      <div className={classes.Home}>
        <div className={classes.barraIntro} >
          <div style={{height:"1.8rem"}}></div>
          <text style={{fontFamily: "Open Sans", fontSize: "4rem", color:"white", fontWeight:"bold"}}>¿Cómo te podemos ayudar?</text>
        </div>
        <div class="col-12 row mx-auto" >
          <div class="col-md-5">
            <Card className={classes.root} style={{backgroundColor:"#115DBF"}}>
              <CardActionArea style={{backgroundColor:"white", padding:"2rem"}} onClick={() => history.push({pathname:'/Cartilla'})}>
                <CardMedia
                  className={classes.media}
                  image={Cartilla}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    Buscar profesionales y lugares de interés
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Busque profesionales, instituciones y actividades especializadas en el TEA (Transtorno del Espectro Autista)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div class="col-md-6">  
            <Card className={classes.root1} style={{backgroundColor:"#115DBF"}}>
              <CardActionArea style={{backgroundColor:"white", padding:"2rem"}} onClick={() => history.push({pathname:"/AnadirEntidad"})}>
                <CardMedia
                  className={classes.media}
                  image={Reviews}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    Añadir profesional o lugar de interés
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    ¿Conoces un profesional/lugar de interés y queres compartirlo con nosotros? Hace click acá!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>       
        </div>         
        <Footer />
      </div>
        
    );
}