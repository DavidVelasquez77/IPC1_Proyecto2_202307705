import React, { useState, useEffect } from "react";
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

export default function Tendencias() {
  const [datosUser, setDatosUser] = useState(null);
  const navigate = useNavigate();
  const [listaObjetos, setListaObjetos] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [commentCounts, setCommentCounts] = useState({});

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
        return "white";
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
        // Calcula la suma de likes y comentarios para cada publicación
        const postsWithSum = res.publicaciones.map((publicacion) => ({
          ...publicacion,
          sum: (likes[publicacion.id] || 0) + (comments[publicacion.id]?.length || 0),
        }));
        
        // Ordena las publicaciones por la suma en orden descendente
        const sortedPosts = postsWithSum.sort((a, b) => b.sum - a.sum);
        
        // Tomar solo los primeros 10 elementos (top 10)
        const top10Posts = sortedPosts.slice(0, 10);
        
        setListaObjetos(top10Posts);
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
  };

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
<h1 style={{ 
  fontSize: '50px', 
  textAlign: "center", 
  fontWeight: 'bold', 
  color: 'white', 
  background: 'linear-gradient(to right, blue, purple)', 
  marginTop: "20px" 
}}>TENDENCIAS!</h1>      {listaObjetos.length > 0 ? (
        listaObjetos.map((objeto) => (
          <Card key={objeto.id} style={{ maxWidth: 500, margin: "20px auto",  padding: "15px" }}>
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
    </div>
  );
}
