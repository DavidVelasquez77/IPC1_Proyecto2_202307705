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

export default function Home() {
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
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
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
        [postId]: [...(comments[postId] || []), newComment],
      };
      setComments(updatedComments);
      setCommentInput({
        ...commentInput,
        [postId]: "",
      });
      localStorage.setItem("comments", JSON.stringify(updatedComments)); // Guardar en localStorage
    }
  };

  const handleLogout = () => {
    Cookies.remove("usuario");
    navigate("/login");
  };

  const handleLike = (id) => {
    setLikes({
      ...likes,
      [id]: (likes[id] || 0) + 1,
    });
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
              <DropdownItem
                onClick={handleLogout}
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {listaObjetos.length > 0 ? (
        listaObjetos.map((objeto) => (
          <Card key={objeto.id} style={{ maxWidth: 500, margin: "20px auto" }}>
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
                      {objeto.facultad} ({objeto.carrera})
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
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  startIcon={<CommentIcon />}
                  style={{ backgroundColor: '#C133FF', color: 'white' }}
                  onClick={() => handleCommentSubmit(objeto.id)}
                  disabled={objeto.apellidos === "anónimo"}
                >
                  Comentar ({commentCounts[objeto.id] || 0})
                </Button>
                <Button
                  startIcon={<ThumbUpIcon />}
                  style={{ backgroundColor: 'blue', color: 'white' }}
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
              {comments[objeto.id] && comments[objeto.id].map((comment, index) => (
                <div key={index} style={{ marginTop: "10px" }}>
                  <p><strong>{datosUser ? datosUser.nombres : "Usuario"} {datosUser ? datosUser.apellidos : ""}</strong> ({datosUser ? datosUser.facultad : "Universidad"} - {datosUser ? datosUser.carrera : ""})</p>
                  <p>{comment}</p>
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
