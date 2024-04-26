import Fondo2 from "./fondo2.png";
import React, { useState, useEffect } from "react";
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

export default function CargaMasivaPost() {
  const [data, setData] = useState(() => {
    // Intenta cargar los datos del sessionStorage al iniciar
    const sessionData = sessionStorage.getItem('data');
    return sessionData ? JSON.parse(sessionData) : [];
  });

  useEffect(() => {
    // Guarda los datos en el sessionStorage cada vez que cambien
    sessionStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setData(jsonData);
      } catch (error) {
        console.error("Error al leer el archivo JSON:", error);
      }
    };

    reader.readAsText(file);
  };

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
      </div>
      <Table aria-label="Tabla de Datos">
        <TableHeader>
          <TableColumn>Código</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Categoría</TableColumn>
          <TableColumn>Anónimo</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: "white" }}>{item.codigo}</TableCell>
              <TableCell style={{ color: "white" }}>
                {item.descripcion}
              </TableCell>
              <TableCell style={{ color: "white" }}>{item.categoria}</TableCell>
              <TableCell style={{ color: "white" }}>
                {item.anonimo ? "Sí" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
