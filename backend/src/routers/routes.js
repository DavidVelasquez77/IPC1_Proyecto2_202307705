    const express = require('express');

    const router = express.Router();


    const {registro,   DatosUsuarios, iniciarSesion,  ActualizarUsuarios, EliminarUsuarios, crearPost, getPost, getReporteBarra, obtenerPublicaciones, eliminarPost } = require('../controllers/Access');
//--------------GET----------------
    router.get('/DatosUsuarios', DatosUsuarios);
    router.get('/obtenerPublicaciones', obtenerPublicaciones);
    router.get('/getPost', getPost);
    router.get('/getReporteBarra', getReporteBarra);
//--------------POST----------------
    router.post('/registro', registro);
    router.post('/iniciarSesion', iniciarSesion);
    router.post('/crearPost', crearPost);
    
    
//--------------PUT----------------
    router.put('/ActualizarUsuarios',  ActualizarUsuarios);
//--------------DELETE----------------
    router.delete('/EliminarUsuarios', EliminarUsuarios);
    router.delete('/eliminarPost/:id', eliminarPost);
    
    module.exports = router;
