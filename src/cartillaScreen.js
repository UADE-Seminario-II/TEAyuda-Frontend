import React, {useState}  from "react";
import { makeStyles } from '@material-ui/styles';
import { useHistory} from "react-router-dom";
export default function Cartilla(props) {
    const useStyles = makeStyles((theme) => ({
        Cartilla:{
          backgroundColor:"#F2EFEB",
        },
        footer:{
            marginTop:"21rem"
        }
    }));
    const classes = useStyles();
    const history= useHistory();
    const cartilla=useState(props.location.state)
    return(
        <div className={classes.Cartilla}>
            <div>En la cartilla</div>
            <div>{cartilla}</div>
            <button onClick={() => history.push({pathname:"/"})}>Ir al home</button>
        </div>
    );
}