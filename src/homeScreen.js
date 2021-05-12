import React  from "react";
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Cartilla from './components/assets/cartilla.png';
import Reviews from './components/assets/customerreview.png';
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
        footer:{
            marginTop:"15rem"
        },
        root: {
            margin: "5%",
            maxWidth: 345,
            
          },
          media: {
            height: 350,
          },
    }));
    const classes = useStyles();
    const history= useHistory();
    return(
        <div className={classes.Home}>
            {/* <div>En el home</div>
            <button onClick={() => history.push({pathname:'/Cartilla',state:"Vengo del home"})}>Ir a cartilla</button> */}
            <div class= "row">
            <Card className={classes.root}>
      <CardActionArea onClick={() => history.push({pathname:'/Cartilla',state:"Vengo del home"})}>
        <CardMedia
          className={classes.media}
          image={Cartilla}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Cartilla
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Busque profesionales, instituciones y actividades especializadas en el TEA
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push({pathname:'/Cartilla',state:"Vengo del home"})}>
        <CardMedia
          className={classes.media}
          image={Reviews}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Compartir Experiencias
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Comparta o lea experiencias y datos acerca del TEA en nuestro foro comunitario
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
        
    );
}