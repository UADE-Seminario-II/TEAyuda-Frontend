import React, { useState } from "react";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";
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
import { Formik, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setValueNew("");
    setOpen(false);
    props.history.push({
      pathname: `/Cartilla/${props.location.state.entidad}/${props.location.state.id}`,
      state: props.location.state,
    });
  };

  function myHandleSubmit(data, callback) {
    console.log("Enviando solicitud");
    console.log(
      "--- La solicitud todavia no se envía porque falta hacer la conección del front al End Point ---"
    );
    /*
    axios
      .post(`https://sip2-backend.herokuapp.com/Experiencias`, exp)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // guardar imagenes
        const formData = new FormData();
        formData.append("image", imageValue);
        let array = [];
        array.push(formData);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        console.log("Array: ", array, "config: ", config);
        axios
          .post(
            `https://sip2-backend.herokuapp.com/Experiencias/${res.data.id}/uploadImages`,
            array,
            config
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            callback();
            handleClickOpen();
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        // fin
        handleClickOpen();
      });
      */
  }

  return (
    <div>
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
          initialValues={{
            nombreSolicitante: "",
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
          }) => (
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid item xs={12}>
                <Field
                  name="nombreSolicitante"
                  label="Tu nombre y apellido"
                  variant="filled"
                  type="input"
                  as={TextField}
                  style={{ width: 300 }}
                />
                <Field
                  name="emailSolicitante"
                  label="Tu correo electrónico"
                  variant="filled"
                  type="input"
                  as={TextField}
                  style={{ width: 300 }}
                />
                <Field
                  name="telefonoSolicitante"
                  label="Tu teléfono"
                  variant="filled"
                  type="input"
                  as={TextField}
                  style={{ width: 300 }}
                />
              </Grid>
              <div class="col-md-2 mb-2 my-auto offset-md-1">
                <label className={classes.labels} for="entidad">
                  Seleccione una entidad
                </label>
                <br />
                <select
                  className={classes.select}
                  value={values.tipo}
                  id="entidad"
                  name="tipo"
                  form="entidadform"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled selected>
                    Seleccione una entidad
                  </option>
                  <option value="Especialista">Especialista</option>
                  <option value="Institucion">Institucion</option>
                  <option value="Actividad">Actividad</option>
                </select>
              </div>
              {values.tipo == "Institucion"}
              <Grid item xs={12}>
                {values.tipo === "Especialista" && (
                  <>
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="apellido"
                      label="Apellido"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="matricula"
                      label="Matrícula"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <br></br>
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="localidad"
                      label="Localidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <br></br>
                    <Field
                      name="piso"
                      label="Piso"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={10}
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
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <br></br>
                    <Field
                      name="localidad"
                      label="Localidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={10}
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
                        rows={10}
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
                    <Field
                      name="nombre"
                      label="Nombre"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="especialidad"
                      label="Especialidad"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="direccion"
                      label="Dirección"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <br></br>
                    <Field
                      name="telefono"
                      label="Teléfono"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Field
                      name="email"
                      label="Correo electrónico"
                      variant="filled"
                      type="input"
                      as={TextField}
                      style={{ width: 300 }}
                    />
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: 930 }}
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={10}
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
                        rows={10}
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
                      >
                        Publicar
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </form>
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