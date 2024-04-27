import React, { useState, useEffect } from 'react';
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
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Papa from 'papaparse';
export default function VisualizacionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realizar solicitud GET para obtener la lista de usuarios
    fetch("http://localhost:5000/DatosUsuarios")
      .then(response => response.json())
      .then(data => {
        setUsuarios(data.usuarios);
      })
      .catch(error => console.error('Error:', error));
  }, []);



const handleEliminarUsuario = (codigo) => {
  fetch(`http://localhost:5000/EliminarUsuarios`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ codigo }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.message === "usuario eliminado con exito") {
      // Recarga la página después de eliminar el usuario
      window.location.reload();
    }
    // Puedes mostrar algún mensaje de éxito o manejar la respuesta del servidor según necesites
  })
  .catch(error => console.error('Error:', error));
};

  const exportarUsuariosACSV = () => {
  const csv = Papa.unparse(usuarios);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'usuarios.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div
    style={{
      backgroundImage: `url(${Fondo2})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Centra el contenido horizontalmente
    }}
    >
      <Navbar>
        <NavbarBrand>
          <UsocialLogo />
          <p className="font-bold text-white" style={{ color: "white" }}>
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
    <DropdownMenu aria-label="Visualización de Datos" variant="flat">
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
              <DropdownMenu aria-label="Visualización de Datos" variant="flat">
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
                <p className="font-semibold text-black">Signed in as</p>
                <p className="font-semibold text-">ipc11s2024@email.com</p>
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

  <Button
      color="primary"
      variant="shadow"
      onClick={exportarUsuariosACSV}
      style={{ marginBottom: "20px" }} // Espacio entre el botón y la tabla
    >
      Exportar a CSV
    </Button>
    <Table aria-label="Tabla de Usuarios" style={{ width: "80%" }}>
    <TableHeader>
      <TableColumn>Código</TableColumn>
      <TableColumn>Nombres</TableColumn>
      <TableColumn>Apellidos</TableColumn>
      <TableColumn>Género</TableColumn>
      <TableColumn>Facultad</TableColumn>
      <TableColumn>Carrera</TableColumn>
      <TableColumn>Correo Electrónico</TableColumn>
      <TableColumn>Contraseña</TableColumn>
      <TableColumn>Acciones</TableColumn>
    </TableHeader>
    <TableBody>
      {usuarios.map(usuario => (
        <TableRow key={usuario.codigo}>
          <TableCell style={{ color: "white" }}>{usuario.codigo}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.nombres}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.apellidos}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.genero}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.facultad}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.carrera}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.correo_electronico}</TableCell>
          <TableCell style={{ color: "white" }}>{usuario.contraseña}</TableCell>
          <TableCell>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Button color="primary">Visualizar</Button>
                </AccordionSummary>
                <AccordionDetails>
                  <p>Nombres: {usuario.nombres}</p>
                  <p>Apellidos: {usuario.apellidos}</p>
                  <p>Género: {usuario.genero}</p>
                  <p>Facultad: {usuario.facultad}</p>
                  <p>Carrera: {usuario.carrera}</p>
                  <p>Correo Electrónico: {usuario.correo_electronico}</p>
                  <p>Contraseña: {usuario.contraseña}</p>
                </AccordionDetails>
              </Accordion>
              <Button onClick={() => handleEliminarUsuario(usuario.codigo)} color="danger">Eliminar</Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>


    </div>
  );
}
