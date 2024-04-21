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
import { Link as RouterLink } from "react-router-dom";

export default function Tendencias() {
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
