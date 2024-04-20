import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import VisualizacionUsuarios from './pages/VisualizacionUsuarios.jsx'
import VisualizacionPost from './pages/VisualizacionPost.jsx'
import CargaMasiva from './pages/CargaMasiva.jsx'
import Reporte from './pages/Reporte.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/visualizacionusuarios",
    element: <VisualizacionUsuarios/>
  },
  {
    path: "/visualizacionpost",
    element: <VisualizacionPost/>
  },
  {
    path: "/cargamasiva",
    element: <CargaMasiva/>
  },
  {
    path: "/reporte",
    element: <Reporte/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className='dark text-foregraund bg-background'>
    <RouterProvider router={router}/>
    </main>
  </React.StrictMode>
);
