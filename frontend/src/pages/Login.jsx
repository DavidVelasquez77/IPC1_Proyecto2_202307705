import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Fondo from "./fondologin.jpg";

function Login() {
  const [carnet, setcarnet] = useState("");
  const [contraseña, setcontraseña] = useState("");

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
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          alert("Bienvenido");
        } else if (res.status === 401) {
          alert("Carnet o contraseña incorrecta");
        } else {
          console.log(res);  
        }
      })
      .catch((error) => console.error(error));
  };
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
              onChange={(e) => setcarnet(e.target.value)}
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
              onChange={(e) => setcontraseña(e.target.value)}
              className="w-full bg-transparent text-white border border-white"
              style={{ color: "white" }}
            />
          </div>
          <div>
            <Button type="submit" color="primary" className="text-white">
              Inicio de Sesión
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Login;
