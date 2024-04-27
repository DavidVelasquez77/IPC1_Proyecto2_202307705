import React, { useState } from 'react';
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
} from "@nextui-org/react";
import { UsocialLogo } from "./UsocialLogo.jsx";
import Auxfoto from "./auxfoto.png";
import { Link as RouterLink } from "react-router-dom";

export default function CargaMasivaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    codigo: '',
    nombres: '',
    apellidos: '',
    genero: '',
    facultad: '',
    carrera: '',
    correo_electronico: '',
    contraseña: '',
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      setUsuarios(json); // Actualizar el estado con los datos del archivo JSON
      // Envía los usuarios al backend para el registro
      json.forEach(async (usuario) => {
        try {
          const response = await fetch('http://localhost:5000/registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
          });
          const data = await response.json();
          console.log(data); // Maneja la respuesta del backend según necesites
        } catch (error) {
          console.error('Error al registrar usuario:', error);
        }
      });
    };
    reader.readAsText(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
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
        alignItems: "center",
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
      
      <input type="file" accept=".json" onChange={handleFileUpload} />
      
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
