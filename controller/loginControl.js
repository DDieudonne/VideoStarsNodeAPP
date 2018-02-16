
const query = require('./../model/loginMod');

const bcryptjs = require('bcryptjs');

const saltRounds = 12;

const moment = require('moment');

function loginGet(req, res) {
    res.render('login');
}

function registerGet(req, res) {
    res.render('register');
}

function registerPost(req, res) {
    bcryptjs.hash(req.body.password, saltRounds, function (err, hash) {
        query.registerPost(req.body.email, req.body.age, hash, req.body.firstname, req.body.lastname).then(function (resultat, err) {
            if (err) {
                throw err;
                res.redirect('/register');
            }
            else {
                res.redirect('/');
            }
        })
    });
}

function loginPost(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    query.loginPost(email).then(function (resultat, err) {
        if (err) {
            throw err;
        }
        if (resultat.length === 1) {

            // matching with password in loginPost
            bcryptjs.compare(password, resultat[0].password, function (err, resCompare) {
                if (resCompare === true) {
                    req.session.user = { user: true, id: resultat[0].id, ban: resultat[0].bannis };
                    if (resultat[0].administrator === 1) {
                        req.session.admin = true;
                        res.redirect('/users-home'); //redirection vers page admin
                    } else if (resultat[0].bannis === 1) {
                        query.banisModeGet(req.session.user.id).then(function (resultat3, err) {
                            res.render('banMod', { resultat3: resultat3 });
                        })
                    }
                    else {
                        res.redirect('/users-home'); // redirection vers page utillisateur normal
                    }

                } else {
                    req.session.user = false;
                    res.redirect('/') // tromper de mot de passe
                }
            });
        } else {
            res.redirect('/') // email n'existe pas
        }
    });
}

function banisModePostAdmin(req, res) {
    let date = moment(Date.now()).format('DD/MM/YYYY à HH:mm:ss').toString();
    query.banisModePost(req.session.user.id, req.body.messageadmin, date).then(function (resultat, err) {
        query.hasSent(req.session.user.id).then(function (resultat, err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        })
    });
}

function forget(req, res) {
    res.render('forgetpass');
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('SesionExpress');
            res.redirect('/');
        }
    })
}


module.exports = {
    registerGet: registerGet,
    registerPost: registerPost,
    loginGet: loginGet,
    loginPost: loginPost,
    banisModePostAdmin: banisModePostAdmin,
    logout: logout,
    // forget: forget
};
