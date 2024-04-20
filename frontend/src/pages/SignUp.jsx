import Fondoregistro from "./fondoregistro.png";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div
      style={{
        backgroundImage: `url(${Fondoregistro})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "white",
          fontSize: "2em",
          fontWeight: "bold",
        }}
      >
        USocial - Registro
      </h1>
      <div style={{ width: "max-content" }}>
        <Input
          isRequired
          type="text"
          label="Carnet/Código USAC"
          variant="bordered"
          className="max-w-md"
        />
        <hr
          style={{
            height: "8px",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            isRequired
            type="text"
            label="Nombres"
            variant="bordered"
            className="max-w-xs"
          />
          <div style={{ width: "10px" }}></div>
          <Input
            isRequired
            type="text"
            label="Apellidos"
            variant="bordered"
            className="max-w-xs"
          />
        </div>
        <hr
          style={{
            height: "8px",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            isRequired
            type="text"
            label="Género (M/F)"
            variant="bordered"
            className="max-w-xs"
          />
          <div style={{ width: "10px" }}></div>
          <Input
            isRequired
            type="text"
            label="Correo Electrónico"
            variant="bordered"
            className="max-w-xs"
          />
        </div>
        <hr
          style={{
            height: "8px",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            isRequired
            type="text"
            label="Facultad"
            variant="bordered"
            className="max-w-xs"
          />
          <div style={{ width: "10px" }}></div>
          <Input
            isRequired
            type="text"
            label="Carrera"
            variant="bordered"
            className="max-w-xs"
          />
        </div>
        <hr
          style={{
            height: "8px",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            isRequired
            type="password"
            label="Contraseña"
            variant="bordered"
            className="max-w-xs"
          />
          <div style={{ width: "10px" }}></div>
          <Input
            isRequired
            type="password"
            label="Confirmar Contraseña"
            variant="bordered"
            className="max-w-xs"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px", // Agregué un margen superior aquí para separar los botones del formulario
        }}
      >
        <Button color="primary" variant="faded" style={{ marginRight: "10px" }}>
          Registrarse
        </Button>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button color="primary" variant="shadow">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
