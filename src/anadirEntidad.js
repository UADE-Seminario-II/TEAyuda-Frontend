import React, { useState } from "react";
import NavBar from "./components/NavBar";
import {
  Select,
  TextField,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { BoxUpload, ImagePreview } from "./style";
import { useHistory } from "react-router-dom";
import FolderIcon from "./components/assets/folder_icon_transparent.png";
import CloseIcon from "./components/assets/CloseIcon.svg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "40vw",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  },
  margin: {
    color: "white",
    backgroundColor: "#D27805",
    "&:hover": {
      backgroundColor: "#E89907",
    },
  },
  select: {
    width: "98%",
    margin: "1%",
  },
  blocker: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    paddingTop: "45vh",
    backgroundColor: "#fff5",
    webkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    zIndex: 10000,
  },
}));

function AnadirEntidad(props) {
  console.log("Experiencias");
  // console.log("props   ", props);
  // useEffect(() => {
  //     // will be true
  //     console.log("props   ", props);
  //   });
  const classes = useStyles();
  const history = useHistory();
  const [valueNew, setValueNew] = useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setValueNew("");
    setOpen(false);
    props.history.push({
      pathname: `/Home`,
      state: props.location.state,
    });
  };

  function myHandleSubmit(data, callback) {
    console.log("Enviando solicitud");

    /*
    Alta Profesional
    https://sip2-backend.herokuapp.com/Profesionales/Alta/Mail
    {
      "nombreSolicitante":"Juan",
      "apellidoSolicitante":"Perez",
      "mailSolicitante":"mail@gmail.com",
      "telefonoSolicitante":"tel",
      "nombre":"nombre",
      "apellido":"apellido",
      "matricula":"mat",
      "especialidad":"esp",
      "direccion":"dir",
      "localidad":"loc",
      "piso":"piso",
      "telefono":"tel",
      "mail":"mail",
      "observaciones":"obs"
    }
    Alta Actividad
    https://sip2-backend.herokuapp.com/Actividades/Alta/Mail
    {
      "nombreSolicitante":"Juan",
      "apellidoSolicitante":"Perez",
      "mailSolicitante":"mail@gmail.com",
      "telefonoSolicitante":"tel",
      "nombre":"nombre",
      "descripcion":"desc1",
      "especialidad":"esp",
      "direccion":"dir",
      "localidad":"loc",
      "telefono":"tel",
      "mail":"mail",
      "observaciones":"obs"
    }
    
    Alta Institucion
    https://sip2-backend.herokuapp.com/Instituciones/Alta/Mail
    {
      "nombreSolicitante":"Juan",
      "apellidoSolicitante":"Perez",
      "mailSolicitante":"mail@gmail.com",
      "telefonoSolicitante":"tel",
      "nombre":"nombre",
      "descripcion":"desc1",
      "especialidad":"esp",
      "direccion":"dir",
      "localidad":"loc",
      "telefono":"tel",
      "mail":"mail",
      "observaciones":"obs"
    }
    */

    let endpoint;
    let exp;

    if (data.tipo == "Especialista") {
      endpoint = "https://sip2-backend.herokuapp.com/Profesionales/Alta/Mail";
      exp = {
        nombreSolicitante: data.nombreSolicitante,
        apellidoSolicitante: data.apellidoSolicitante,
        mailSolicitante: data.emailSolicitante,
        telefonoSolicitante: data.telefonoSolicitante,
        nombre: data.nombre,
        apellido: data.apellido,
        matricula: data.matricula,
        especialidad: data.especialidad,
        direccion: data.direccion,
        localidad: data.localidad,
        piso: data.piso,
        telefono: data.telefono,
        mail: data.email,
        observaciones: data.observaciones || "",
      };
    }

    if (data.tipo == "Actividad") {
      endpoint = "https://sip2-backend.herokuapp.com/Actividades/Alta/Mail";
      exp = {
        nombreSolicitante: data.nombreSolicitante,
        apellidoSolicitante: data.apellidoSolicitante,
        mailSolicitante: data.emailSolicitante,
        telefonoSolicitante: data.telefonoSolicitante,
        nombre: data.nombre,
        descripcion: data.descripcion || "",
        especialidad: data.especialidad,
        direccion: data.direccion,
        localidad: data.localidad,
        telefono: data.telefono,
        mail: data.email,
        observaciones: data.observaciones || "",
      };
    }

    if (data.tipo == "Institucion") {
      endpoint = "https://sip2-backend.herokuapp.com/Instituciones/Alta/Mail";
      exp = {
        nombreSolicitante: data.nombreSolicitante,
        apellidoSolicitante: data.apellidoSolicitante,
        mailSolicitante: data.emailSolicitante,
        telefonoSolicitante: data.telefonoSolicitante,
        nombre: data.nombre,
        descripcion: data.descripcion || "",
        especialidad: data.especialidad,
        direccion: data.direccion,
        localidad: data.localidad,
        telefono: data.telefono,
        mail: data.email,
        observaciones: data.observaciones || "",
      };
    }

    //debug alert
    //alert(JSON.stringify(exp));

    setLoading(true);
    axios.post(endpoint, exp).then((res) => {
      console.log(res);
      console.log(res.data);
      setLoading(false);
      // fin
      handleClickOpen();
    });
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Dirección de correo inválida";
    }
    return error;
  }

  function validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Requerido";
    } else if (!/[0-9-+ ]{8,16}$/i.test(value)) {
      error = "Número de teléfono inválido";
    }
    return error;
  }

  function validateRequired(value) {
    let error;
    if (!value) {
      error = "Requerido";
    }
    return error;
  }

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Requerido";
    } else if (!/[A-Za-z ]{1,50}$/i.test(value)) {
      error = "Solo usar letras y espacios";
    }
    return error;
  }

  function validateExperienceName(value) {
    let error;
    if (!value) {
      error = "Requerido";
    } else if (!/[A-Za-z0-9 -_+&()@,.:!?]{1,100}$/i.test(value)) {
      error = "Contiene caracteres inválidos";
    }
    return error;
  }

  return (
    <div>
      {loading && (
        <div className={classes.blocker}>
          <h3>Tu solicitud está siendo procesada</h3>
          <h4>¡Gracias por su paciencia!</h4>
          <CircularProgress color={"primary"} />
        </div>
      )}
      <NavBar></NavBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Formik
          validateOnBlur={false}
          validateOnChange={validateAfterSubmit}
          validateOnMount={false}
          initialValues={{
            nombreSolicitante: "",
            apellidoSolicitante: "",
            emailSolicitante: "",
            telefonoSolicitante: "",
            tipo: "",
            nombre: "",
            apellido: "",
            matricula: "",
            especialidad: "",
            direccion: "",
            localidad: "",
            piso: "",
            telefono: "",
            email: "",
            observaciones: "",
            descripcion: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            myHandleSubmit(data, () => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            formik,
          }) => (
            <Form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid item xs={12}>
                {values.tipo == "" && (
                  <>
                    <h3>Seleccione una categoría</h3>
                    <br></br>
                  </>
                )}
                <Field
                  as={Select}
                  className={classes.select}
                  value={values.tipo}
                  id="entidad"
                  label="Seleccione una entidad"
                  name="tipo"
                  type="select"
                  variant="filled"
                >
                  <MenuItem value="Especialista">Especialista</MenuItem>
                  <MenuItem value="Institucion">Institucion</MenuItem>
                  <MenuItem value="Actividad">Actividad</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12}>
                {values.tipo != "" && (
                  <>
                    <br></br>
                    <h3>Tus datos</h3>
                    <Field
                      name="nombreSolicitante"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 221 }}
                      validate={validateUsername}
                      error={errors.nombreSolicitante != null}
                      helperText={errors.nombreSolicitante}
                    />
                    <Field
                      name="apellidoSolicitante"
                      label="Apellido"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 221 }}
                      validate={validateUsername}
                      error={errors.apellidoSolicitante != null}
                      helperText={errors.apellidoSolicitante}
                    />
                    <Field
                      name="emailSolicitante"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 221 }}
                      validate={validateEmail}
                      error={errors.emailSolicitante != null}
                      helperText={errors.emailSolicitante}
                    />
                    <Field
                      name="telefonoSolicitante"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 221 }}
                      validate={validatePhoneNumber}
                      error={errors.telefonoSolicitante != null}
                      helperText={errors.telefonoSolicitante}
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                {values.tipo === "Especialista" && (
                  <>
                    <br></br>
                    <h3>Datos del Especialista</h3>
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateUsername}
                      error={errors.nombre != null}
                      helperText={errors.nombre}
                    />
                    <Field
                      name="apellido"
                      label="Apellido"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateUsername}
                      error={errors.apellido != null}
                      helperText={errors.apellido}
                    />
                    <Field
                      name="matricula"
                      label="Matrícula"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.matricula != null}
                      helperText={errors.matricula}
                    />
                    <br></br>
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.especialidad != null}
                      helperText={errors.especialidad}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.direccion != null}
                      helperText={errors.direccion}
                    />
                    <Field
                      name="localidad"
                      label="Localidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.localidad != null}
                      helperText={errors.localidad}
                    />
                    <br></br>
                    <Field
                      name="piso"
                      label="Piso"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.piso != null}
                      helperText={errors.piso}
                    />
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validatePhoneNumber}
                      error={errors.telefono != null}
                      helperText={errors.telefono}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateEmail}
                      error={errors.email != null}
                      helperText={errors.email}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="descripcion"
                        value={values.descripcion}
                      />
                    </Grid>
                  </>
                )}
                {values.tipo === "Actividad" && (
                  <>
                    <br></br>
                    <h3>Datos de la Actividad</h3>
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateExperienceName}
                      error={errors.nombre != null}
                      helperText={errors.nombre}
                    />
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.especialidad != null}
                      helperText={errors.especialidad}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.direccion != null}
                      helperText={errors.direccion}
                    />
                    <br></br>
                    <Field
                      name="localidad"
                      label="Localidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.localidad != null}
                      helperText={errors.localidad}
                    />
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validatePhoneNumber}
                      error={errors.telefono != null}
                      helperText={errors.telefono}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateEmail}
                      error={errors.email != null}
                      helperText={errors.email}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="descripcion"
                        value={values.descripcion}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="observaciones"
                        value={values.observaciones}
                      />
                    </Grid>
                  </>
                )}
                {values.tipo === "Institucion" && (
                  <>
                    <br></br>
                    <h3>Datos de la Institucion</h3>
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateExperienceName}
                      error={errors.nombre != null}
                      helperText={errors.nombre}
                    />
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.especialidad != null}
                      helperText={errors.especialidad}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.direccion != null}
                      helperText={errors.direccion}
                    />
                    <br></br>
                    <Field
                      name="localidad"
                      label="Localidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateRequired}
                      error={errors.localidad != null}
                      helperText={errors.localidad}
                    />
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validatePhoneNumber}
                      error={errors.telefono != null}
                      helperText={errors.telefono}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                      validate={validateEmail}
                      error={errors.email != null}
                      helperText={errors.email}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="descripcion"
                        value={values.descripcion}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={5}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="observaciones"
                        value={values.observaciones}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              {(values.tipo == "" && (
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ minHeight: "10vh" }}
                >
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() =>
                        props.history.push({
                          pathname: `/Home`,
                          state: props.location.state,
                        })
                      }
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              )) || (
                <>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: "10vh" }}
                  >
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() =>
                          props.history.push({
                            pathname: `/Home`,
                            state: props.location.state,
                          })
                        }
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        variant="outlined"
                        size="medium"
                        color="primary"
                        className={classes.margin}
                        disabled={isSubmitting}
                        onClick={() => {
                          setValidateAfterSubmit(true);
                        }}
                      >
                        Publicar
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sugerencia enviada 👍 "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu sugerencia se envió con éxito!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
            onClick={handleClose}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AnadirEntidad;