require("dotenv").config();
const cors = require("cors");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require('helmet')

var app = express();

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
//Helmet is a middleware function that sets security-related HTTP response headers. Helmet sets the following headers by default:
app.use(helmet())

// Configuration CORS
const corsOptions = {
  //origin: 'https://alice-frontend-three.vercel.app',
  origin: "http://localhost:3001",
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,  // Permettre l'envoi des cookies ou des headers d'authentification
  optionsSuccessStatus: 200,
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const routes = require('./routes');

app.use("/api", routes);

module.exports = app;
