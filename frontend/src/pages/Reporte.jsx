import React, { useState, useEffect} from 'react'; 
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
} from "@nextui-org/react";
import { UsocialLogo } from "./UsocialLogo.jsx";
import Auxfoto from "./auxfoto.png";
import { Link as RouterLink } from "react-router-dom";

export default function Reporte() {
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



    </div>
  );
}
