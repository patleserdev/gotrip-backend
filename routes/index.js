var express = require('express');
var router = express.Router();

var usersRouter = require('../routes/users');
var markersRouter = require('../routes/markers');
var categoriesRouter = require('../routes/categories')
var markerPicturesRouter = require('../routes/markerpictures')
var authRouter = require('../routes/auth')

const  auth = require("../middlewares/auth")

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/markers',auth, markersRouter);
router.use('/categories',auth, categoriesRouter);
router.use('/markerpictures',auth, markerPicturesRouter);


module.exports = router;
