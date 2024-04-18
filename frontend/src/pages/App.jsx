
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { UsocialLogo } from "./UsocialLogo.jsx";
import Fondo from "./fondo.png";
import Fondo2 from "./fondo2.png"; // Importa la imagen de fondo2.png
import Fondo3 from "./fondo3.png"; // Importa la imagen de fondo3.png
import Fondo4 from "./fondo4.png"; // Importa la imagen de fondo4.png
import mujer from "./mujer.png"; // Importa la imagen de mujer.png
import desarrollador from "./desarrollador.png"; // Importa la imagen de desarrollador.png
import soporte from "./soporte.png"; // Importa la imagen de soporte.png
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export default function App() {


  return (
    <div>
      <header>
        <Navbar isBordered style={{ position: 'fixed', width: '100%', zIndex: '1000' }}>
          <NavbarBrand>
            <a href="http://localhost:5173/">
              <UsocialLogo />
              <motion.p
                className="font-bold text-inherit"
                style={{ color: 'white' }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', bounce: 0.6, duration: 2 }}
              >
                USocial
              </motion.p>
            </a>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <a href="#acerca-de" style={{ color: 'white' }}>Acerca de</a>
            </NavbarItem>
            <NavbarItem isActive>
              <a href="#desarrollador" style={{ color: 'white' }}>Desarrollador</a>
            </NavbarItem>
            <NavbarItem>
              <a href="#soporte" style={{ color: 'white' }}>Soporte</a>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" href="#signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </header>

      <main>
        {/* Fondo */}
        <div style={{
          backgroundImage: `url(${Fondo})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          height: '100vh',
          position: 'relative',
        }}>
          <div id="inicio" style={{ position: 'absolute', top: '36%', left: '5%', transform: 'translateY(-40%)' }}>
            <motion.p
              className="font-bold text-inherit"
              style={{ color: 'white', fontSize: '6rem' }}
              initial={{ x: -50 }}
              animate={{ x: 20 }}
              transition={{ type: 'spring', duration: 0.7 }}
            >
              USocial
            </motion.p>
          </div>
          <div style={{ position: 'absolute', top: '51%', left: '5%', transform: 'translateY(-40%)' }}>
            <motion.p
              className="font-bold text-inherit"
              style={{ color: '#0ea5e9', fontSize: '1.2rem' }}
              initial={{ x: -60 }}
              animate={{ x: 20 }}
              transition={{ type: 'spring', duration: 0.7 }}
            >
              La red social de la Universidad San Carlos de Guatemala
            </motion.p>
          </div>
        </div>
        <section id="acerca-de" style={{ backgroundImage: `url(${Fondo2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', paddingBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ textAlign: 'left', maxWidth: '50%', padding: '20px' }}>
    <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>Acerca de</h2>
    <p style={{ color: 'white', fontSize:"1rem" }}>Descubre más sobre USocial y cómo esta plataforma está transformando la forma en que los estudiantes y catedráticos se conectan e interactúan en la universidad. Conoce nuestro compromiso con la transparencia, la diversidad de opiniones y la creación de un ambiente colaborativo y enriquecedor.</p>
  </div>
  <div style={{ maxWidth: '55%', marginTop: '50px' }}>
  <motion.img 
  src={mujer} 
  alt="Mujer" 
  style={{ width: '100%' }} 
  animate={{ 
    y: [0, 20, 0], // Cambia estos valores para ajustar el rango de movimiento
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  }}
/>

  </div>
</section>
  {/* Desarrollador */}
  <section id="desarrollador" style={{ backgroundImage: `url(${Fondo3})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', paddingBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ maxWidth: '55%', marginTop: '50px' }}>
    <motion.img 
      src={desarrollador} 
      alt="Desarrollador" 
      style={{ 
        width: '100%', 
        filter: 'brightness(100%)', // Brillo normal
        position: 'relative', // Para permitir el posicionamiento absoluto dentro de este contenedor
      }} 
      animate={{ 
        y: [0, 20, 0], // Animación de flotación
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      whileHover={{ 
        filter: 'brightness(150%)', // Brillo aumentado al pasar el mouse
      }} 
    />
  </div>
  <div style={{ textAlign: 'right', maxWidth: '50%', padding: '20px' }}>
    <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>Desarrollador</h2>
    <p style={{ color: 'white', fontSize:"1rem" }}>Conoce más sobre el desarrollador de USocial y su contribución a la creación de esta plataforma innovadora. Yo soy Josué David Velásquez Ixchop , Carnet: 202307705 estudiante de tercer semestre de ingeniería en Ciencias y Sistemas en la Universidad San Carlos de Guatemala. </p>
  </div>
</section>


{/* Soporte */}
<section id="soporte" style={{ backgroundImage: `url(${Fondo4})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', paddingBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
  <div style={{ textAlign: 'center', maxWidth: '80%', padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem', marginBottom: '20px' }}>Soporte</h2>
    <p style={{ color: 'white', fontSize:"1rem", textAlign: 'center' }}>¿Necesitas ayuda? ¡Estamos aquí para ayudarte! Contáctanos al +502 8429-3920 o al correo jds.vela@gmail.com para obtener soporte técnico, reportar problemas o hacer sugerencias para mejorar USocial.</p>
  </div>
  <div style={{ maxWidth: '25%', marginTop: '1px' }}>
    <motion.img 
      src={soporte} 
      alt="Soporte" 
      style={{ width: '100%' }} 
      whileHover={{ 
        scale: 1.1, 
        opacity: 0.5, 
      }}
      transition={{ duration: 0.5, repeat: Infinity }} 
    />
  </div>
</section>




      </main> 
    </div>
  );
}
