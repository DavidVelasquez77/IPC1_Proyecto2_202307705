import React, { useState, useEffect, useRef } from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  TextField,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import Chart from 'chart.js/auto';

export default function Home() {
  const [datosUser, setDatosUser] = useState(null);
  const navigate = useNavigate();
  const [listaObjetos, setListaObjetos] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const chartLikesRef = useRef(null); // Referencia para el elemento canvas de la gráfica de likes
  const chartPieRef = useRef(null); // Referencia para el elemento canvas de la gráfica de pie

  function getHighlightColor(categoria) {
    switch (categoria) {
      case "Aviso importante":
        return "lightcoral";
      case "Divertido":
        return "lightblue";
      case "Académico":
        return "lightgreen";
      case "Variedad":
        return "plum";
      default:
        return "lightgray";
    }
  }

  useEffect(() => {
    const storedComments = sessionStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
    const storedLikes = sessionStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }

    const usuario = JSON.parse(Cookies.get("usuario") || "{}");
    setDatosUser(usuario);

    fetch(`http://localhost:5000/getPost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setListaObjetos(res.publicaciones);
        // Calcular el conteo de comentarios para cada publicación
        const commentCounts = {};
        res.publicaciones.forEach((publicacion) => {
          commentCounts[publicacion.id] = comments[publicacion.id]
            ? comments[publicacion.id].length
            : 0;
        });
        setCommentCounts(commentCounts);
      })
      .catch((error) => console.error(error));
  }, [comments]); // Actualizar cuando se agregan nuevos comentarios

  const handleCommentInputChange = (postId, value) => {
    setCommentInput({
      ...commentInput,
      [postId]: value,
    });
  };

  const handleCommentSubmit = (postId) => {
    const newComment = commentInput[postId];
    if (newComment.trim() !== "") {
      const updatedComments = {
        ...comments,
        [postId]: [
          ...(comments[postId] || []),
          {
            commenter: datosUser
              ? `${datosUser.nombres} ${datosUser.apellidos}`
              : "Usuario Anónimo",
            faculty: datosUser ? datosUser.facultad : "Universidad",
            career: datosUser ? datosUser.carrera : "",
            comment: newComment,
          },
        ],
      };
      setComments(updatedComments);
      setCommentInput({
        ...commentInput,
        [postId]: "",
      });
      sessionStorage.setItem("comments", JSON.stringify(updatedComments)); // Guardar en localStorage
    }
  };

  const handleLogout = () => {
    Cookies.remove("usuario");
    navigate("/login");
  };

  const handleLike = (id) => {
    const updatedLikes = {
      ...likes,
      [id]: (likes[id] || 0) + 1,
    };
    setLikes(updatedLikes);
    // Guardar la cantidad de likes en el localStorage
    sessionStorage.setItem("likes", JSON.stringify(updatedLikes));
    // Forzar un nuevo renderizado
    setListaObjetos([...listaObjetos]);
  };

  useEffect(() => {
    // Verificar si Chart.js está disponible
    if (typeof Chart !== 'function') {
      console.error("Error: Chart.js no está disponible.");
      return;
    }

    // Verificar si la referencia al elemento canvas de la gráfica de likes está disponible
    if (!chartLikesRef.current) {
      console.error("Error: Referencia al elemento canvas de la gráfica de likes no encontrada.");
      return;
    }

    // Obtener los datos de likes de la sessionStorage
    const likesData = JSON.parse(sessionStorage.getItem("likes") || "{}");

    // Convertir los datos en un array de objetos [{ id: "id", likes: cantidad }]
    const likesArray = Object.keys(likesData).map(id => ({ id, likes: likesData[id] || 0 }));

    // Obtener los 5 posts con más likes
    const top5Likes = likesArray
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);

    // Configuración de los datos para la gráfica de likes
    const dataLikes = {
      labels: top5Likes.map((item, index) => `Publicación ${index + 1}`), // Etiquetas de las partes de la gráfica
      datasets: [{
        label: 'Likes por Publicación',
        data: top5Likes.map(item => item.likes), // Datos de likes
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        hoverOffset: 5
      }]
    };

    // Configuración de la gráfica de likes
    const configLikes = {
      type: "pie", // Tipo de gráfica
      data: dataLikes // Datos de la gráfica
    };

    // Crear una instancia de la gráfica en el elemento canvas
    const chartLikes = new Chart(chartLikesRef.current, configLikes);

    // Devolver una función para limpiar la gráfica al desmontar el componente
    return () => chartLikes.destroy();
  }, []);

  useEffect(() => {
    // Verificar si Chart.js está disponible
    if (typeof Chart !== 'function') {
      console.error("Error: Chart.js no está disponible.");
      return;
    }

    // Verificar si la referencia al elemento canvas de la gráfica de pie está disponible
    if (!chartPieRef.current) {
      console.error("Error: Referencia al elemento canvas de la gráfica de pie no encontrada.");
      return;
    }

    // Crear instancia de la gráfica de pie si aún no existe
    if (!chartPieRef.current.chartInstance) {
      const categoryCounts = {};
      listaObjetos.forEach((objeto) => {
        categoryCounts[objeto.categoria] = (categoryCounts[objeto.categoria] || 0) + 1;
      });

      // Configuración de datos para la gráfica de pie
      const dataConfig = {
        labels: Object.keys(categoryCounts),
        datasets: [{
          label: 'Cantidad de Publicaciones por Categoría',
          data: Object.values(categoryCounts),
          backgroundColor: [
            'lightcoral',
            'lightblue',
            'lightgreen',
            'plum',
            'lightgray'
            // Puedes agregar más colores si tienes más categorías
          ],
          hoverOffset: 5
        }]
      };

      // Configuración de la gráfica de pie
      const config = {
        type: "pie",
        data: dataConfig
      };

      // Crear instancia de la gráfica en el elemento canvas
      chartPieRef.current.chartInstance = new Chart(chartPieRef.current, config);
    } else {
      // Si la instancia de la gráfica ya existe, solo actualizar los datos
      const categoryCounts = {};
      listaObjetos.forEach((objeto) => {
        categoryCounts[objeto.categoria] = (categoryCounts[objeto.categoria] || 0) + 1;
      });

      chartPieRef.current.chartInstance.data.labels = Object.keys(categoryCounts);
      chartPieRef.current.chartInstance.data.datasets[0].data = Object.values(categoryCounts);

      // Actualizar la gráfica
      chartPieRef.current.chartInstance.update();
    }

  }, [listaObjetos]); // Actualizar cuando la lista de objetos cambie

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
              <DropdownItem onClick={handleLogout} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {listaObjetos.length > 0 ? (
        listaObjetos.map((objeto) => (
          <Card key={objeto.id} style={{ maxWidth: 500, margin: "20px auto",  padding: "10px"}}>
            <CardHeader />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {objeto.anonimo ? (
                  <p>
                    <strong>Usuario anónimo</strong>
                  </p>
                ) : (
                  <p>
                    <strong>
                      {objeto.user} {objeto.apellidos}
                    </strong>
                  </p>
                )}
                {!objeto.anonimo && (
                  <div>
                    <p>
                      {objeto.carrera} ({objeto.facultad})
                    </p>
                  </div>
                )}
                <p
                  style={{
                    backgroundColor: getHighlightColor(objeto.categoria),
                    borderRadius: "5px",
                    display: "inline-block",
                    padding: "2px 4px",
                  }}
                >
                  {objeto.categoria}
                </p>
              </div>
              <p>Fecha: {new Date(objeto.fechaHora).toLocaleString()}</p>
            </div>
            {objeto.imagen && (
              <CardMedia
                component="img"
                height="140"
                image={objeto.imagen}
                alt="Imagen del post"
              />
            )}
            <CardContent>
              <p>{objeto.descripcion}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  startIcon={<CommentIcon />}
                  style={{ backgroundColor: "#C133FF", color: "white" }}
                  onClick={() => handleCommentSubmit(objeto.id)}
                  disabled={objeto.apellidos === "anónimo"}
                >
                  Comentar ({commentCounts[objeto.id] || 0})
                </Button>
                <Button
                  startIcon={<ThumbUpIcon />}
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => handleLike(objeto.id)}
                >
                  Me gusta {likes[objeto.id] || 0}
                </Button>
              </div>
              <TextField
                fullWidth
                variant="outlined"
                label="Escribir comentario"
                value={commentInput[objeto.id] || ""}
                onChange={(e) =>
                  handleCommentInputChange(objeto.id, e.target.value)
                }
                style={{ marginTop: "10px" }}
              />
              {comments[objeto.id] &&
                comments[objeto.id].map((comment, index) => (
                  <div key={index} style={{ marginTop: "10px" }}>
                    <p>
                      <strong>{comment.commenter}</strong>
                    </p>
                    <p>
                      {comment.career}({comment.faculty})
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div style={{ maxWidth: 400 }}>
          <h2>Likes por Publicación</h2>
          <canvas ref={chartLikesRef} width="400" height="400"></canvas>
        </div>

        <div style={{ maxWidth: 400 }}>
          <h2>Cantidad de Publicaciones por Categoría</h2>
          <canvas ref={chartPieRef} width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
}
