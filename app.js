
// MIDDLEWEAR AND BASIC CONFIGURATION
const express = require('express');

const fileUpload = require('express-fileupload');

const methodOverride = require('method-override');

const bodyParser = require('body-parser');

const favicon = require('express-favicon');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const path = require('path');

const ejs = require('ejs');

const moment = require('moment');

const flash = require('express-flash');

const morgan = require('morgan')

const validator = require('express-validator');

const app = express();

app.use("/public", express.static(process.cwd() + "/staticFiles"));

app.use(favicon(__dirname + '/public/favicon/favicon.ico'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));

app.use(flash());

app.use(validator());

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use(fileUpload());


app.use(cookieParser('secret'));

app.use(session({
    name: 'SesionExpress',
    secret: 'azertyuiopmlkjhgfdsqwxcvbn',
    cookie: { expire: new Date() + 360000000 },
    resave: false,
    saveUninitialized: false,
}));

app.set("view engine", "ejs");

// MIDDLEWEAR AND BASIC CONFIGURATION



// CONTROLLER
const login = require('./controller/loginControl');
const home = require('./controller/homeControl')
const allconnection = require('./controller/allUsersControl');
const profilPage = require('./controller/userInfosControl');
const favoritesFilms = require('./controller/favoriControl')
// CONTROLLER





// MYSQL DATBASE CONFIGURATION

const connexWithMysql = require('./database/config');

// MYSQL DATBASE CONFIGURATION


// ROOT

app.get('/', login.loginGet);
app.post('/login', login.loginPost);

app.get('/register', login.registerGet);
app.post('/register', login.registerPost);

app.post('/banisMode', login.banisModePostAdmin);

app.get('/users-home', allconnection.getHomeUsers);

app.get('/home', home.getHomeUser);

app.get('/detailsFilm/:id', home.getAlldetailsFilms);
app.post('/detailsFilm/:id', home.postCommentsUser);

app.get('/profil', profilPage.getInfos)
app.post('/modifyInfos', profilPage.modifyInfosUser);
app.put('/modifyPass', profilPage.modifyPassword);
app.post('/modifyAvatar', profilPage.modifyUserAvatar);

app.get('/favorits', favoritesFilms.getFavorite);
app.post('/uploadfilmOK', favoritesFilms.videoPosted);
app.put('/addFavo/:id', favoritesFilms.addToFavorit);
app.delete('/deletFilmFav/:id', favoritesFilms.deleteFavoriteFilm);

app.get('/logout', login.logout);

app.delete('/deletme', profilPage.deletMe);

// ROOT

app.listen(4200, function () {
    console.log("lestening on port 4200");
});
