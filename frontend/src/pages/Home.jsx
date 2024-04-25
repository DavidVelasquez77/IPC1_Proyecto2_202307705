import React, { useState, useEffect } from "react";
import Fondohome from "./fondohome.png";
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
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
} from "@material-ui/core";

export default function Home() {
  const [datosUser, setDatosUser] = useState(null);
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [listaObjetos, setListaObjetos] = useState([]);
  function getHighlightColor(categoria) {
    switch (categoria) {
      case "Aviso importante":
        return "lightcoral";
      case "Divertido":
        return "lightblue";
      case "Académico":
        return "lightgreen";
      case "Variedad":
        return "plum";
      default:
        return "white";
    }
  }

  useEffect(() => {
    const usuario = JSON.parse(Cookies.get("usuario") || "{}");
    setDatosUser(usuario);

    fetch(`http://localhost:5000/getPost`, {
      method: "GET", // Utiliza el método POST
      headers: {
        "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setListaObjetos(res.publicaciones);
      })
      .catch((error) => console.error(error));
  }, []);
  function viewIdPost(postId) {
    console.log("ID del post:", postId);
  }
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
              <DropdownItem
                onClick={handleLogout} // Agrega el onClick para llamar a la función de desloguear
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* Mostrar los posts */}
      {listaObjetos.length > 0 ? (
        listaObjetos.map((objeto) => (
          <Card key={objeto.id} style={{ maxWidth: 500, margin: "20px auto" }}>
            <CardHeader />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>
                  <strong>
                    {objeto.user} {objeto.apellidos}
                  </strong>
                </p>
                <p>
                  {objeto.facultad} ({objeto.carrera})
                </p>
                <p
                  style={{
                    backgroundColor: getHighlightColor(objeto.categoria),
                    borderRadius: "5px",
                    display: "inline-block",
                    padding: "2px 4px",
                  }}
                >
                  {objeto.categoria}
                </p>
              </div>
              <p>Fecha: {new Date(objeto.fechaHora).toLocaleString()}</p>
            </div>
            {objeto.imagen && (
              <CardMedia
                component="img"
                height="140"
                image={objeto.imagen}
                alt="Imagen del post"
              />
            )}
            <CardContent>
              <p className="card-description">{objeto.descripcion}</p>
              <Button onClick={() => viewIdPost(objeto.id)}>Comentarios</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
}
