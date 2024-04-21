    const express = require('express');

    const router = express.Router();


    const {registro,   DatosUsuarios, iniciarSesion,  ActualizarUsuarios, EliminarUsuarios} = require('../controllers/Access');
//--------------GET----------------
    router.get('/DatosUsuarios', DatosUsuarios);
//--------------POST----------------
    router.post('/registro', registro);
    router.post('/iniciarSesion', iniciarSesion);
    
//--------------PUT----------------
    router.put('/ActualizarUsuarios',  ActualizarUsuarios);
//--------------DELETE----------------
    router.delete('/EliminarUsuarios', EliminarUsuarios);
    
    module.exports = router;
