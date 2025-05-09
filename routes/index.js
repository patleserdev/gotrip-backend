var express = require('express');
var router = express.Router();

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var markersRouter = require('../routes/markers');
var categoriesRouter = require('../routes/categories')
var authRouter = require('../routes/auth')

const  auth = require("../middlewares/auth")

// router.use('/', authRouter);
// router.use('/users', usersRouter);
// router.use('/markers', markersRouter);
// router.use('/categories', categoriesRouter);
router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/markers',auth, markersRouter);
router.use('/categories',auth, categoriesRouter);



module.exports = router;
