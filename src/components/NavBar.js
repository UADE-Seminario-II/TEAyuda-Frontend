import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory} from "react-router-dom";
import Logo from "./assets/LogoNegroAzulBrillante.png";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:"5.5rem", //ESTO HACE EL ESPACIO ENTRE NAVBAR Y CONTENIDO DE LA PAGINA
},
  appBar: {
   /*  transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }), */
    backgroundColor:"white",//"#115DBF" //FONDO DEL NAVBAR
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    /* transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }), */
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // transition: theme.transitions.create('margin', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    marginRight: -drawerWidth,
  },
  contentShift: {
   /*  transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }), */
    marginRight: 0,
  },
  menuInicio:{
    
    opacity: 1,
    color: "white",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  style: {
    display: 'inline-block',
    margin: '0 32px 16px 0',
    width: '100%'
  },

}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const history= useHistory();
  const [open, setOpen] = React.useState(false);

  

  
  const Redirect = (text) =>{
      if(text==="Home"){
        setOpen(false);
        history.push({
            pathname: '/Home',
        })
      }else if(text==="Busqueda"){
        setOpen(false);
        history.push({
            pathname: '/Cartilla',
        })
      }else if(text==="AñadirEntidad"){
        setOpen(false);
        history.push({
            pathname: '/Experiencias', //cambiar esto por formulario de Añadir profesional/lugar de interes
        })
      }
  }
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title} >
            <img alt="TEAyuda" src={Logo} width="255" height="87" />
          </Typography>
          <Button aria-controls="lock-menu" aria-haspopup="true" size="large" style={{paddingRight:"2%"}} onClick={()=> Redirect("Home")}>
            <HomeRoundedIcon style={{paddingRight:"5%"}}/>Inicio
          </Button> 
          <Button aria-controls="simple-menu" aria-haspopup="true" size="large" style={{paddingRight:"1.5%"}} onClick={()=> Redirect("Busqueda")}>
            <MenuBookRoundedIcon style={{paddingRight:"5%"}}/>Búsqueda
          </Button>
          <Button aria-controls="simple-menu" aria-haspopup="true" size="large" onClick={()=> Redirect("AñadirEntidad")}> 
            <AddCircleOutlineRoundedIcon style={{paddingRight:"4%"}}/>Añadir entidad
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}