import React, { useEffect, useState } from "react";
import Fondo2 from "./fondo2.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { UsocialLogo } from "./UsocialLogo.jsx";
import Auxfoto from "./auxfoto.png";
import { Link as RouterLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function VisualizacionPost() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  function obtenerPublicaciones() {
    fetch("http://localhost:5000/obtenerPublicaciones")
      .then((response) => response.json())
      .then((data) => {
        if (data.publicaciones) {
          setPublicaciones(data.publicaciones);
        }
      })
      .catch((error) => console.error(error));
  }

  function eliminarPublicacion(id) {
    fetch(`http://localhost:5000/eliminarPost/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        obtenerPublicaciones();
      })
      .catch((error) => console.error(error));
  }

  function visualizarPublicacion(id) {
    const publicacion = publicaciones.find((p) => p.id === id);
    setPublicacionSeleccionada(publicacion);
  }


  function exportarCSV() {
    const csvContent = "data:text/csv;charset=utf-8,"
      + publicaciones.map((publicacion) => Object.values(publicacion).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "publicaciones.csv");
    document.body.appendChild(link);
    link.click();
  }
  return (
    <div
      style={{
        backgroundImage: `url(${Fondo2})`,
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
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Link href="#" aria-current="page" color="#FFFFFF">
                    Carga Masiva
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Visualización de Datos"
                  variant="flat"
                >
                  <DropdownItem key="Usuarios">
                    <RouterLink to="/cargamasivausuario">Usuarios</RouterLink>
                  </DropdownItem>
                  <DropdownItem key="Publicaciones">
                    <RouterLink to="/cargamasivapost">Publicaciones</RouterLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Link href="#" aria-current="page" color="secondary">
                    Visualización de Datos
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Visualización de Datos"
                  variant="flat"
                >
                  <DropdownItem key="Usuarios">
                    <RouterLink to="/visualizacionusuarios">Usuarios</RouterLink>
                  </DropdownItem>
                  <DropdownItem key="Publicaciones">
                    <RouterLink to="/visualizacionpost">Publicaciones</RouterLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <RouterLink to="/reporte">Reporte</RouterLink>
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
                  src={Auxfoto}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">ipc11s2024@email.com</p>
                </DropdownItem>
                <DropdownItem
                  href="http://localhost:5173/"
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>

  
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button color="primary" variant="shadow" auto onClick={exportarCSV}>
    Exportar CSV
  </Button>
</div>
      <Table aria-label="Tabla de Publicaciones">
        <TableHeader>
          <TableColumn>Código/Carnet</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Anónimo</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {publicaciones.map((publicacion) => (
            <TableRow key={publicacion.id}>
              <TableCell style={{ color: "white" }}>
                {publicacion.user}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                {publicacion.descripcion}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                {publicacion.categoria}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                {publicacion.anonimo.toString()}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Button
                  color="primary"
                  auto
                  onClick={() => visualizarPublicacion(publicacion.id)}
                >
                  Visualizar
                </Button>
                <Button
                  color="danger"
                  auto
                  onClick={() => eliminarPublicacion(publicacion.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mostrar los detalles de la publicación seleccionada */}
      {publicacionSeleccionada && (
        <div style={{ color: "white" }}>
          <Accordion style={{ marginTop: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Detalles de la Publicación
            </AccordionSummary>
            <AccordionDetails>
              <p>Código/Carnet: {publicacionSeleccionada.user}</p>
              <p>Descripción: {publicacionSeleccionada.descripcion}</p>
              <p>Categoría: {publicacionSeleccionada.categoria}</p>
              <p>Anónimo: {publicacionSeleccionada.anonimo.toString()}</p>
              {/* Agrega más detalles si es necesario */}
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}
