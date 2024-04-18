import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Fondo from "./fondologin.jpg";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aqui puedes hacer la peticion a tu API
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Error en la peticion al servidor");
        throw new Error("Error en la peticion al servidor");
      }

      const data = await response.json();
      alert("Inicio de sesion con exito");
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
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
        <h1 className="font-bold text-lg text-white mb-8">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <Input
            type="email"
            label="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full bg-transparent text-white border border-white"
            style={{ color: 'white' }}
          />
          <Input
            type="password"
            label="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent text-white border border-white"
            style={{ color: 'white' }}
          />
          <Button type="submit" color="primary" className="text-white">
            Inicio de Sesión
          </Button>
        </form>
      </div>
    </main>
  );
}