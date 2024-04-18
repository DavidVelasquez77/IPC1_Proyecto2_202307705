    const express = require('express');
    const cors = require('cors');

    const app = express();

    app.use(express.json());
    app.use(cors());

    const Router = require('./routers/routes');
    app.use( Router);


    const port = 5000
    app.listen(port, () => {
        console.log(`Server is running on port  https://localhost:${port}`);
    });