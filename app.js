const path =require('path');
const express = require('express');
const morgan =require('morgan');
const mongoose =require('mongoose');
const app = express();
// conmectando desde la base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
 .then(db => console.log ('Db connected'))
 .catch(err => console.log (err));

//importar rutas
const indexRoutes = require('./routes/index');

//configuraciones servidor
app.set('port', process.env.PORT || 5040);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);
//configuraciones del servidor

app.listen(app.get('port'), () => {
console.log (`Server on port ${app.get('port')}`);
});