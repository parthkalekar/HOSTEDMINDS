const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'fkjhsidbfjds@$%^65932$%kndg';

// Swagger - Imports
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml'); 

// -

const Rooms = require("./routes/RoomCreation");
const cors = require('cors');
const port = 4000;

app.use(cors())

app.use(express.json());

app.use("/", Rooms);

// swagger middleware ...
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// -

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port,'192.168.29.18', () => console.log(`Example app listening on port ${port}!`));

