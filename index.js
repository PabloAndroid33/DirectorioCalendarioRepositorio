
const { response, application } = require('express');
const express=require('express');
const { dbConnection } = require('./database/config');

const cors=require('cors');

require("dotenv").config();


console.log('hey'+ process.env.port);

//Crear el servidor de express
const app=express();

//Base de Datos
dbConnection();

app.use(cors());





//directorio publico
app.use(express.static('public'));

//lectura y parseo
app.use(express.json());

//Rutas

app.use('/api/auth',require('./routes/auth'))
app.use('/api/events',require('./routes/events'))
//TODO:auth // crear, login, renew
//TODO: crud 



//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})

