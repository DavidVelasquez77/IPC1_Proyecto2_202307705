import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Login from './pages/Login.jsx'
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
    path: "/foro",
    element: <h1>Página para mostrar los foros</h1>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className='dark text-foregraund bg-background'>
    <RouterProvider router={router}/>
    </main>
  </React.StrictMode>
);
