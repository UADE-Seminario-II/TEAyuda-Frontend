import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { makeStyles } from '@material-ui/styles/';
import Logo from "./assets/LogoBlancoBrillante.png";
const FooterPage = () => {
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor:"#115DBF",
        },
        title:{
            color:"white",
        },
        title1:{
            color:"white",
            marginLeft:"1rem"
        },
      })); 
      const classes = useStyles();
  return (
    <div className={classes.container}>
    <MDBFooter className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-md-left">
        <MDBRow>
          <MDBCol md="6" >
            <div className="offset-md-3"><img alt="TEAyuda" src={Logo} width="250" height="100" /></div>
          </MDBCol>
          <MDBCol md="4">
            <h5 className={classes.title1}>Contacto</h5>
            <ul>
              <li className={classes.title}>
                <a>Teléfono: +54 9 11 5599-6606</a>
              </li>
              <li className={classes.title}>
                <a>Email: TEAyuda@hotmail.com / TEAyuda@gmail.com</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className={classes.title}>
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a>TEAyuda</a>
            </MDBContainer>
        </div>
      </div>
    </MDBFooter>
    </div>
  );
}

export default FooterPage;