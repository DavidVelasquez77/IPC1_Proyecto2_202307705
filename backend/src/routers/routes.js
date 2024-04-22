    const express = require('express');

    const router = express.Router();


    const {registro,   DatosUsuarios, iniciarSesion,  ActualizarUsuarios, EliminarUsuarios, crearPost, getPost} = require('../controllers/Access');
//--------------GET----------------
    router.get('/DatosUsuarios', DatosUsuarios);
    router.get('/getPost', getPost);
//--------------POST----------------
    router.post('/registro', registro);
    router.post('/iniciarSesion', iniciarSesion);
    router.post('/crearPost', crearPost);
    
    
//--------------PUT----------------
    router.put('/ActualizarUsuarios',  ActualizarUsuarios);
//--------------DELETE----------------
    router.delete('/EliminarUsuarios', EliminarUsuarios);
    
    module.exports = router;
