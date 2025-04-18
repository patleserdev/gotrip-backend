require('dotenv').config()
const cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var markersRouter = require('./routes/markers');
var categoriesRouter = require('./routes/categories')

var app = express();

// Configuration CORS
const corsOptions = {
    //origin: 'https://alice-frontend-three.vercel.app',
    origin: 'http://localhost:3001',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,  // Permettre l'envoi des cookies ou des headers d'authentification
    optionsSuccessStatus: 200
  };
  
  // Appliquer CORS à toutes les routes
  app.use(cors(corsOptions));
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/markers', markersRouter);
app.use('/categories', categoriesRouter);

module.exports = app;
