import React, { useState } from 'react';
import Fondoregistro from "./fondoregistro.png";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function EditarPerfil() {
    const [codigo, setCodigo] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [facultad, setFacultad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo_electronico, setCorreo_electronico] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si la contraseña cumple con los requisitos
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-+,.%#*?&])[A-Za-z\d@+.,$!#%*?&]{8,}$/;
    if (!regex.test(contraseña)) {
      alert("La contraseña debe tener al menos 8 caracteres, entre estos caracteres deberá contar con al menos 1 mayúscula, 1 minúscula y 1 carácter especial.");
      return;
    }

    const JsonDatos = {
      codigo: codigo,
      nombres: nombres,
      apellidos: apellidos,
      genero: genero,
      facultad: facultad,
      carrera: carrera,
      correo_electronico: correo_electronico,
      contraseña: contraseña,
    };

    fetch("http://localhost:5000/ActualizarUsuarios", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JsonDatos),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
          alert(data.error); // Mostrar el mensaje de error si existe
      } else {
          console.log(data);
          alert("Registro correcto");
      }
  })
  .catch(error => console.error('Error:', error));
};

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
        USocial - Editar Perfil
        </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ width: "max-content" }}>
          <Input
            isRequired
            type="text"
            label="Código USAC"
            variant="bordered"
            onChange={(event) => setCodigo(event.target.value)}
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
              onChange={(event) => setNombres(event.target.value)}
              variant="bordered"
              className="max-w-xs"
            />
            <div style={{ width: "10px" }}></div>
            <Input
              isRequired
              type="text"
              label="Apellidos"
              onChange={(event) => setApellidos(event.target.value)}
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
              onChange={(event) => setGenero(event.target.value)}
              variant="bordered"
              className="max-w-xs"
            />
            <div style={{ width: "10px" }}></div>
            <Input
              isRequired
              type="text"
              label="Correo Electrónico"
              onChange={(event) => setCorreo_electronico(event.target.value)}
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
              onChange={(event) => setFacultad(event.target.value)}
              variant="bordered"
              className="max-w-xs"
            />
            <div style={{ width: "10px" }}></div>
            <Input
              isRequired
              type="text"
              label="Carrera"
              onChange={(event) => setCarrera(event.target.value)}
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
              onChange={(event) => setContraseña(event.target.value)}
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
            marginTop: "20px",
          }}
        >
          <Button type='submit' color="primary" variant="faded" style={{ marginRight: "10px" }}>
            Editar Perfil
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="shadow">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </form>
      
    </div>
  );
}