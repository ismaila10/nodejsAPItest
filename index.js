require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/configs');
const uri = config.database.url;
const PORT = config.server.port;
const apiRouter = require('./src/routes');

const app = express();


// Create mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true
});

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router(app);
app.use('/api', apiRouter)

// Charger les images contenues dans le dossier spécifié
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Serveur node and express start on port ${uri} ${PORT}`);
})

app.listen(PORT, () => 
    console.log(`votre serveur est sur le port ${PORT}`)
    )