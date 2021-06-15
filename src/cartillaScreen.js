import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
// import {LocalidadesList} from "./components/LocalidadesList";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import {resultados} from "./components/resultados";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Cartilla() {
    const useStyles = makeStyles((theme) => ({
        Cartilla: {
            backgroundColor: "white",
            height: "100%",
            minHeight: "100vh"
        },
        footer: {
            marginTop: "21rem"
        },
        margin: {
            color: "white",
            backgroundColor: "#F9C25D",
            '&:hover': {
                backgroundColor: "#D27805",
            },
            marginTop:"7%",
            /* width:"200%", */
        },
        labels: {
            fontSize: "1rem",
            width:"20rem",
        },
        input: {
            height: "2rem",
            width: "13.8rem",
        },
        divider: {
            backgroundColor: "black",
            /* marginTop: "1.5rem", */
            width: "100%",
            orientation: "vertical",
        },
        select: {
            width: "13.8rem",
            height: "2rem",
            marginTop:"1%",
            marginBottom:"1%",
        },
        listdivider: {
            backgroundColor: "black",
            marginTop: "1.5rem",
            maxWidth: "50rem",
        },
        root: {
            width: "100%",
            maxWidth: "50rem",
            marginTop:"2%"
            
            
        },
        avatar: {
            width: "4rem",
            height: "4rem",
            marginTop: "0.5rem",
            marginRight: "0.5rem",
        },
        lista:{
            marginLeft:"2%",
            width:"60%",
            backgroundColor:"#bcd7ff",
            borderRadius:"1rem",
            
            //width:"60%"
        },
        barraIntro:{
            backgroundColor: "#115DBF", 
            height:"5rem",
            //textAlign:"center",
        },
    }));
    const classes = useStyles();
    const history = useHistory();

    const [entidadSelected, setEntidadSelected] = useState("");
    const [resultados, setResultados] = useState([]);
    const [copyResult, setCopyResult] = useState([]);
    const [copyTop6Result, setCopyTop6Result] = useState([]);
    const [copyResultSearch, setCopyResultSearch] = useState([]);

    const [localidadSelected, setLocalidadSelected] = useState("");
    const [LocalidadesB, setLocalidadesB] = useState([]);

    const [ratingSelected, setRatingSelected] = useState("");

    const [disableSearch, setDisableSearch] = useState(true);
    const [buscado, setBuscado] = useState("");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const url = "https://sip2-backend.herokuapp.com/"

    useEffect(() => {
        fetch(url + "search/top6")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setResultados(result);
                    setCopyTop6Result(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch(url + "localidades")
            .then(res => res.json())
            .then((result) => {
                setLocalidadesB(result);
            })
    }, []);

    const onEntidad = (value) => {
        setIsLoaded(false);
        fetch(url + "search/" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setResultados(result);
                    setCopyResult(result);
                    if (value !== "") {
                        setDisableSearch(false);
                        filterentidad(value, result);
                    }
                    else {
                        setDisableSearch(true);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        setEntidadSelected(value);
        // console.log(value)
    }
    const filterentidad = (value, result) => {
        if (ratingSelected !== "" && localidadSelected !== "") {
            setResultados(
                result.filter((valor) =>
                    (valor.entidad.match(value) && ratingSelected.match(valor.valoracionPromedio) && valor.localidad.localidad.match(localidadSelected))
                ))
        } else if (ratingSelected === "" && localidadSelected !== "") {
            setResultados(
                result.filter((valor) =>
                    (valor.entidad.match(value) && valor.localidad.localidad.match(localidadSelected))
                ))
        } else if (ratingSelected !== "" && localidadSelected === "") {
            setResultados(
                result.filter((valor) =>
                    (valor.entidad.match(value) && ratingSelected.match(valor.valoracionPromedio))
                ))
        } else {
            setResultados(
                result.filter((valor) =>
                    valor.entidad.match(value)
                ))
        }
    }
    const onLocalidad = (value) => {
        if (value === null) {
            setResultados(copyResult)
            setLocalidadSelected("")
            if (entidadSelected !== "" && ratingSelected !== "") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.entidad.match(entidadSelected) && ratingSelected.match(valor.valoracionPromedio)
                    ))
            } else if (entidadSelected !== "" && ratingSelected === "") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.entidad.match(entidadSelected)
                    ))
            } else if (entidadSelected === "" && ratingSelected !== "") {
                setResultados(
                    copyResult.filter((valor) =>
                        ratingSelected.match(valor.valoracionPromedio)
                    ))
            }
        } else {
            setLocalidadSelected(value.localidad);
            if (entidadSelected !== "" && ratingSelected !== "") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.localidad.localidad.match(value.localidad) && valor.entidad.match(entidadSelected) && ratingSelected.match(valor.valoracionPromedio)
                    ))
            } else if (entidadSelected !== "" && ratingSelected === "") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.localidad.localidad.match(value.localidad) && valor.entidad.match(entidadSelected)
                    ))
            } else if (entidadSelected === "" && ratingSelected !== "") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.localidad.localidad.match(value.localidad) && ratingSelected.match(valor.valoracionPromedio)
                    ))
            }
            else {
                setLocalidadSelected(value.localidad);
                setResultados(
                    copyResult.filter((valor) =>
                        valor.localidad.localidad.match(value.localidad)
                    ))
            }
        }
    }
    const onRating = (value) => {
        setRatingSelected(value);
        if (localidadSelected !== "" && entidadSelected !== "") {
            setResultados(
                copyResult.filter((valor) =>
                    (valor.localidad.localidad.match(localidadSelected) && value.match(valor.valoracionPromedio) && valor.entidad.match(entidadSelected))
                ))
        } else if (localidadSelected === "" && entidadSelected !== "") {
            setResultados(
                copyResult.filter((valor) =>
                    (valor.entidad.match(entidadSelected) && value.match(valor.valoracionPromedio))
                ))
        } else if (localidadSelected !== "" && entidadSelected === "") {
            setResultados(
                copyResult.filter((valor) =>
                    (valor.localidad.localidad.match(localidadSelected) && value.match(valor.valoracionPromedio))
                ))
        }
        else {
            setResultados(
                copyResult.filter((valor) =>
                    value.match(valor.valoracionPromedio)
                ))
        }
    }
    const entidades = () => {
        return (
            <div style={{width:"300%"}}>
                <label className={classes.labels} for="entidad">Seleccione una entidad</label><br />
                <select className={classes.select} value={entidadSelected} id="entidad" name="entidadlist" form="entidadform" onChange={(e) => { onEntidad(e.target.value) }}>
                    <option value="" disabled selected>Entidad</option>
                    <option value="Profesional">Especialista</option>
                    <option value="Institucion">Institución</option>
                    <option value="Actividad">Actividad</option>
                </select>
            </div>
        );
    }
/*     const entidades = () => {
        return (
            <div class="col-md-2 mb-2 my-auto offset-md-1">
                <label className={classes.labels} for="entidad">Seleccione una entidad</label><br />
                <select className={classes.select} value={entidadSelected} id="entidad" name="entidadlist" form="entidadform" onChange={(e) => { onEntidad(e.target.value) }}>
                    <option value="" disabled selected>Seleccione una entidad</option>
                    <option value="Profesional">Especialista</option>
                    <option value="Institucion">Institucion</option>
                    <option value="Actividad">Actividad</option>
                </select>
            </div>
        );
    } */
    const localidades = () => {
        if (disableSearch === true) {
            return null;
        }
        else return (
            <div class="col-md-2 mb-2 my-auto" syle={{width:"100%"}}>
                {/*<label className={classes.labels}for="localidad">Seleccione una localidad</label><br />
                    <select className={classes.select} value={localidadSelected} id="localidad" name="localidadlist" form="localidadform" onChange={(e) =>{onLocalidad(e.target.value)}}>
                        <option value="" disabled selected>Seleccione una localidad</option>
                        {LocalidadesB.map((value) => (
                        <option value={value.localidad}>{value.localidad}</option>
                        ))}
                        </select>*/}
                <label className={classes.labels} for="localidad">Seleccione una localidad</label><br />
                <Autocomplete
                    id="combo-box-demo"
                    options={LocalidadesB}
                    getOptionLabel={(option) => option.localidad}
                    onChange={(event, value) => { onLocalidad(value) }}
                    style={{ width: 300, marginTop:"1%",
                    marginBottom:"2%",}}
                    renderInput={(params) => <TextField style={{ width: "13.8rem", backgroundColor: "white" }}  {...params} placeholder="Localidad" />}
                />
            </div>
        )
    }

    const ratings = () => {
        if (disableSearch === true) {
            return null;
        } else {
            return (
                <div class="col-md-2 mb-2 my-auto">
                    <label className={classes.labels} style={{marginTop:"2%"}} for="rating">Seleccione una valoración</label><br />
                    <select className={classes.select} style={{marginTop:"2%"}} value={ratingSelected} id="rating" name="ratinglist" form="ratingform" onChange={(e) => { onRating(e.target.value) }}>
                        <option value="" disabled selected>Valoración</option>
                        <option value={1}>1 estrella (&#9733;)</option>
                        <option value={2}>2 estrellas (&#9733;&#9733;)</option>
                        <option value={3}>3 estrellas (&#9733;&#9733;&#9733;)</option>
                        <option value={4}>4 estrellas (&#9733;&#9733;&#9733;&#9733;)</option>
                        <option value={5}>5 estrellas (&#9733;&#9733;&#9733;&#9733;&#9733;)</option>
                    </select>
                </div>
            )
        }
    }
    const onSearch = (value) => {
        setBuscado(value);
        if (value === "") {
            if (entidadSelected !== "" && ratingSelected !== "" && localidadSelected !== "") {
                setResultados(
                    copyResult.filter((valor) =>
                        (valor.entidad.match(entidadSelected) && ratingSelected.match(valor.valoracionPromedio) && valor.localidad.localidad.match(localidadSelected))
                    ))
                
            } else
                if (entidadSelected === "" && ratingSelected !== "" && localidadSelected !== "") {
                    setResultados(
                        copyResult.filter((valor) =>
                            (ratingSelected.match(valor.valoracionPromedio) && valor.localidad.localidad.match(localidadSelected))
                        ))
                   
                } else
                    if (entidadSelected !== "" && ratingSelected === "" && localidadSelected !== "") {
                        setResultados(
                            copyResult.filter((valor) =>
                                (valor.entidad.match(entidadSelected) && valor.localidad.localidad.match(localidadSelected))
                            ))
                        
                    } else
                        if (entidadSelected !== "" && ratingSelected !== "" && localidadSelected === "") {
                            setResultados(
                                copyResult.filter((valor) =>
                                    (valor.entidad.match(entidadSelected) && ratingSelected.match(valor.valoracionPromedio))
                                ))
                            
                        } else
                            if (entidadSelected !== "" && ratingSelected === "" && localidadSelected === "") {
                                setResultados(
                                    copyResult.filter((valor) =>
                                        (valor.entidad.match(entidadSelected))
                                    ))
                               
                            } else
                                if (entidadSelected === "" && ratingSelected !== "" && localidadSelected === "") {
                                    setResultados(
                                        copyResult.filter((valor) =>
                                            (ratingSelected.match(valor.valoracionPromedio))
                                        ))
                                    
                                } else
                                    if (entidadSelected === "" && ratingSelected === "" && localidadSelected !== "") {
                                        setResultados(
                                            copyResult.filter((valor) =>
                                                (valor.localidad.localidad.match(localidadSelected))
                                            ))
                                        
                                    }
        } else
            if (entidadSelected === "Profesional") {
                setResultados(
                    copyResult.filter((valor) =>
                        valor.especialidad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                    ))
            } else
                if (entidadSelected === "Actividad") {
                    setResultados(
                        copyResult.filter((valor) =>
                            valor.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                        ))
                } else
                    if (entidadSelected === "Institucion") {
                        setResultados(
                            copyResult.filter((valor) =>
                                valor.especialidad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                            ))
                    }
    }
    const search = () => {
        if (disableSearch === true) return null;
        else return (
            <div class="col-md-3 mb-2 my-auto">
                {entidadSelected === "Profesional" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar por especialidad</label><br />
                        <input
                            id="search"
                            name="searchlist"
                            form="searchform"
                            type="text"
                            placeholder="ej. psicólogo, médico clínico"
                            value={buscado}
                            autoComplete="off"
                            onChange={(e) => { onSearch(e.target.value) }}
                            disabled={disableSearch}
                            className={classes.input}

                        />
                    </div>)
                    : <div />}
                {entidadSelected === "Actividad" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar por actividad</label><br />
                        <input
                            id="search"
                            name="searchlist"
                            form="searchform"
                            type="text"
                            placeholder="p ej. taller de dibujo, rugby"
                            value={buscado}
                            autoComplete="off"
                            onChange={(e) => { onSearch(e.target.value) }}
                            disabled={disableSearch}
                            className={classes.input}

                        />
                    </div>)
                    : <div />}
                {entidadSelected === "Institucion" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar institución por especialidad</label><br />
                        <input
                            id="search"
                            name="searchlist"
                            form="searchform"
                            type="text"
                            placeholder="p ej. primario, clases de idioma"
                            value={buscado}
                            autoComplete="off"
                            onChange={(e) => { onSearch(e.target.value) }}
                            disabled={disableSearch}
                            className={classes.input}

                        />
                    </div>)
                    : <div />}
            </div>
        )
    }
    const resetFilters = () => {
        setEntidadSelected("");
        setBuscado("");
        setDisableSearch(true);
        setLocalidadSelected("");
        setRatingSelected("");
        setResultados(copyTop6Result);
    }
    const resetFilter = () => {
        return (
            <div class="col-md-2 mb-2 my-auto" style={{width:"100%"}} >
                <Button  size="medium" color="primary" className={classes.margin} onClick={resetFilters}>
                    Resetear filtros
                </Button>
            </div>
        )
    }
    const seeMoreInfo = (value) => {
            history.push({ pathname: `/Cartilla/${value.entidad}/${value.id}`, state: value })
        }
    const listEntidades = () => {
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <LinearProgress style={{marginLeft:"0rem"}}/>;
        }else {
            return (
                <div className={classes.root}>
                    
                    {resultados.map((value) => (
                        <List class="ml-md-auto ml-sm-auto">
                            <ListItem alignItems="flex-start" button onClick={() => { seeMoreInfo(value) }}>
                                <ListItemAvatar>
                                    <Avatar alt="imagen" className={classes.avatar} src={value.imagen} />
                                </ListItemAvatar>
                                {value.entidad === "Profesional" &&
                                    <ListItemText
                                        style={{marginLeft:"5%"}}
                                        primary={value.nombre + " " + value.apellido}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Especialidad médica: " + value.especialidad}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Localidad: " + value.localidad.localidad}
                                                </Typography>
                                                <br />
                                                {value.valoracionPromedio === 1.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 2.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 3.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 4.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 5.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}

                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => { seeMoreInfo(value) }} >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </React.Fragment>
                                        }
                                    />
                                }
                                {value.entidad === "Institucion" &&
                                    <ListItemText
                                        style={{marginLeft:"5%"}}
                                        primary={value.nombre}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Nivel educativo: " + value.especialidad}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Localidad: " + value.localidad.localidad}
                                                </Typography>
                                                <br />
                                                {value.valoracionPromedio === 1.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 2.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 3.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 4.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 5.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}

                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => { seeMoreInfo(value) }} >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </React.Fragment>
                                        }
                                    />
                                }

                                {value.entidad === "Actividad" &&
                                    <ListItemText
                                        style={{marginLeft:"5%"}}
                                        primary={value.nombre}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Tipo de recreación: " + value.especialidad}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {"- Localidad: " + value.localidad.localidad}
                                                </Typography>
                                                <br />
                                                {value.valoracionPromedio === 1.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 2.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 3.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 4.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}
                                                {value.valoracionPromedio === 5.0 ? (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >- Valoración: &#9733;&#9733;&#9733;&#9733;&#9733;</Typography>
                                                ) : <div />}

                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => { seeMoreInfo(value) }} >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </React.Fragment>
                                        }
                                    />
                                }


                            </ListItem>
                            <Divider className={classes.listdivider} />
                        </List>
                    ))}
                </div>
            )
        }
    }

    return (
        <div className={classes.Cartilla}>
            <div className={classes.barraIntro} >
                <div style={{height:"1rem"}}></div>
                <text style={{fontFamily: "Open Sans", fontSize: "2rem", color:"white", marginLeft:"2.5%"}}>Búsqueda de profesionales/lugares de interés</text>
            </div>
            <div style={{marginTop:"2%"}}>
                <text style={{fontFamily: "Open Sans", fontSize: "1.5rem", color:"black", marginLeft:"2.5%"}}>Filtros de búsqueda:</text>
                {/* <Divider style={{ backgroundColor:"black", marginLeft:"25%", marginTop:"1%"}} /> */}
            </div>
            <div style={{display: "flex", alignContent:"center", marginTop:"1%"}} >
                <div  style={{marginLeft:"3%"}}>
                    {entidades()}
                    {localidades()}
                    {ratings()}
                    {search()}
                    {resetFilter()}
                </div>             
                <div className={classes.lista} >
                    {listEntidades()}
                </div>
            </div>
        </div>
    );

}