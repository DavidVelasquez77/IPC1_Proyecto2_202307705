import React, { useState } from "react";
import Fondohome from "./fondohome.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { UsocialLogo } from "./UsocialLogo.jsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Post() {
  //------------------------CONSTANTES---------------------------
  const classes = useStyles();

  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [imagen, setImagen] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const usuario = Cookies.get("usuario");
  const datosUsuario = JSON.parse(usuario);

  //-----------------------FUNCIONES--------------------------------
  const handleImagenChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setImagen(reader.result);
      setImagenURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleContenido = (event) => {
    setContenido(event.target.value);
  };

  const handleCategoria = (event) => {
    setCategoria(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("datosUsuario:", datosUsuario);
    if (!datosUsuario || !datosUsuario.codigo) {
      console.error("datosUsuario o datosUsuario.codigo no están definidos");
      return;
    }
    const dataJson = {
      codigo: datosUsuario.codigo,  
      descripcion: contenido, 
      imagen: imagen, 
      categoria: categoria,
      anonimo: anonimo,
    };

    fetch("http://localhost:5000/crearPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data.mensaje) {
          alert(data.mensaje);
        } else {
          alert('Post creado con éxito');
        }
        setImagenURL("");
      })
    .catch((error) => console.error('Error en la solicitud:', error));
  };
  const handleAnonimo = (event) => {
    setAnonimo(event.target.checked);
    // Aquí puedes agregar más lógica según sea necesario
  };
  const handleCancel = () => {
    // Limpiar los campos y resetear el estado al estado inicial
    setContenido("");
    setCategoria("");
    setAnonimo(false);
    setImagen("");
    setImagenURL("");
  };
  
  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleLogout = () => {
    Cookies.remove("usuario");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Fondohome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar>
        <NavbarBrand>
          <UsocialLogo />
          <p className="font-bold text-inherit" style={{ color: "white" }}>
            USocial
          </p>
        </NavbarBrand>

        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
          style={{ color: "white" }}
        >
          <NavbarItem>
            <RouterLink color="foreground" to="/editarperfil">
              Editar Perfil
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink style={{ color: "violet" }} to="/home">
              Home
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink color="foreground" to="/post">
              Crear Post
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink color="foreground" to="/tendencias">
              Tendencias
            </RouterLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
              </DropdownItem>
              <DropdownItem onClick={handleLogout} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 60px)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            maxWidth: "700px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h1 style={{ fontWeight: "bold", fontSize: "2em" }}>Nuevo Post</h1>
            <TextField
              label="¿Qué quieres escribir en tu post?"
              value={contenido}
              onChange={handleContenido}
              multiline
              rows={4}
              fullWidth
              required // Agregamos el atributo required
            />
            <FormControl className={classes.formControl} required>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                value={categoria}
                onChange={handleCategoria}
                required // Agregamos el atributo required
              >
                <MenuItem value={"Aviso importante"}>Aviso importante</MenuItem>
                <MenuItem value={"Divertido"}>Divertido</MenuItem>
                <MenuItem value={"Académico"}>Académico</MenuItem>
                <MenuItem value={"Variedad"}>Variedad</MenuItem>
              </Select>
            </FormControl>
            <Switch
              checked={anonimo}
              onChange={handleAnonimo}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {anonimo
              ? "¿Quieres publicarlo de forma anónima? (Sí)"
              : "¿Quieres publicarlo de forma anónima? (No)"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
    
            />{" "}
            {/* Agregamos el atributo required */}
            {imagenURL && (
              <img
                src={imagenURL}
                alt="Preview"
                style={{ maxWidth: "400px" }}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              Publicar
            </Button>
            <Button
              onClick={handleCancel}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
