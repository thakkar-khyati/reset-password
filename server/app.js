const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('./db')
const router = require('./routes/routes')
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors({origin:'http://localhost:4200'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/user', router)