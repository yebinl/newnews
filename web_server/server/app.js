var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var index = require('./routes/index');
var news = require('./routes/news');
var auth = require('./routes/auth');


var bodyParser = require('body-parser');

var app = express();

var config = require('./config/config.json');
require('./model/main').connect(config.mongoDbUri);


app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));


app.use(cors());

app.use(bodyParser.json());


app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


const authCheckMiddleware = require('./middleware/auth_checker');

app.use('/news', authCheckMiddleware);

app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);


module.exports = app;
