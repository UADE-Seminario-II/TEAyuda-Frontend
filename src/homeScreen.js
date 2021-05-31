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
export default function Home() {
    const useStyles = makeStyles((theme) => ({
        Home:{
          backgroundColor:"#F2EFEB",
        },
        CardContainer:{
            flexDirection: "row",
            // justifyContent:"center",
            // alignItems: "center"
        },
        root: {
            marginTop:"3rem",
            marginBottom:"5%",
            maxWidth: 345,
            marginLeft:"32%",
            padding:"3.96%"
          },
          root1: {
            marginTop:"3rem",
            marginBottom:"5%",
            maxWidth: 345,
            marginLeft:"32%",
            padding:"4.5%"
          },
          media: {
            height: 350,
            backgroundSize:"contain",
          },
    }));
    const classes = useStyles();
    const history= useHistory();
    return(
        <div className={classes.Home}>
            {/* <div>En el home</div>
            <button onClick={() => history.push({pathname:'/Cartilla',state:"Vengo del home"})}>Ir a cartilla</button> */}
            <div class="col-12 row mx-auto" >
              <div class="col-md-6" >
                <Card className={classes.root}>
                  <CardActionArea onClick={() => history.push({pathname:'/Cartilla'})}>
                    <CardMedia
                      className={classes.media}
                      image={Cartilla}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Cartilla
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Busque profesionales, instituciones y actividades especializadas en el TEA (Transtorno del Espectro Autista)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div class="col-md-4">  
                <Card className={classes.root1}>
                  <CardActionArea onClick={() => history.push({pathname:'/Experiencias'})}>
                    <CardMedia
                      className={classes.media}
                      image={Reviews}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Añadir profesional o lugar de interés
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Conoces un profesional/lugar de interés y queres compartirlo con nosotros? Hace click acá
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