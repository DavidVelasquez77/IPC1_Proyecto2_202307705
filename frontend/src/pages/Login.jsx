import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Fondo from "./fondologin.jpg";

export default function Login() {
  const [carnet, setCarnet] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [redirectPath, setRedirectPath] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const JsonDatos = {
      carnet: carnet,
      contraseña: contraseña,
    };

    fetch("http://localhost:5000/iniciarSesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JsonDatos),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "inicio de sesion exitoso") {
          if (data.usuario.isAdmin) {
            alert(
              `Bienvenido administrador ${data.usuario.nombres} ${data.usuario.apellidos}`
            );
            setRedirectPath("/admin");
          } else {
            alert(
              `Bienvenido usuario ${data.usuario.nombres} ${data.usuario.apellidos}`
            );
            setRedirectPath("/home");
          }
        } else if (
          data.error === "el usuario no existe o la contraseña es incorrecta"
        ) {
          alert("Carnet o contraseña incorrecta");
        } else {
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }
  return (
    <main
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-transparent p-8 rounded-md shadow-lg text-center">
        <h1 className="font-bold text-lg text-white mb-8">LOGIN</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <div>
            <Input
              type="text"
              label="carnet"
              onChange={(e) => setCarnet(e.target.value)}
              value={carnet}
              autoComplete="off"
              className="w-full bg-transparent text-white border border-white"
              style={{ color: "white" }}
            />
          </div>
          <div>
            <Input
              type="password"
              label="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full bg-transparent text-white border border-white"
              style={{ color: "white" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              type="submit"
              color="primary"
              className="text-white"
              variant="shadow"
            >
              Login
            </Button>
            <div style={{ width: "10px" }}></div>
            <div>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button color="primary" variant="faded">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
