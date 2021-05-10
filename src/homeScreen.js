import React  from "react";
import { makeStyles } from '@material-ui/styles';
import { useHistory} from "react-router-dom";
import Footer from "./components/Footer";
export default function Home() {
    const useStyles = makeStyles((theme) => ({
        Home:{
          backgroundColor:"#F2EFEB",
        },
        footer:{
            marginTop:"21rem"
        }
    }));
    const classes = useStyles();
    const history= useHistory();
    return(
        <div className={classes.Home}>
            <div>En el home</div>
            <button onClick={() => history.push({pathname:'/Cartilla',state:"Vengo del home"})}>Ir a cartilla</button>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
    );
}