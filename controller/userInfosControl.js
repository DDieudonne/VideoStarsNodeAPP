const query = require('../model/homeMod');
const bcryptjs = require('bcryptjs');
const saltRounds = 12;
function getInfos(req, res, resultat) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.getUsers(req.session.user.id).then(function (resultat, err) {
            res.render('profilPage', { resultat: resultat });
        })
    }
}

function deletMe(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.deleteMySelf(req.session.user.id).then(function (resultat, err) {
            if (err) {
                throw err;
            }
            else {
                res.redirect('/');
            }
        })
    }
}

function modifyInfosUser(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    }
    else {
        query.modifyInfos(req.body.biography, req.session.user.id).then(function (resultat, err) {
            if (err) {
                throw err;
            }
            else {
                res.redirect('/profil');
            }
        })

    }
}

function modifyPassword(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        bcryptjs.hash(req.body.modifyPasswordUser, saltRounds, function (err, hash) {
            query.modifyPassword(hash, req.session.user.id).then(function (resultat2, err) {
                if (err) {
                    throw err;
                    res.send('erreur de mot de passe');
                } else {
                    res.redirect('/profil');
                }
            })
        });
    }
}
function modifyUserAvatar(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } if (req.files) {
        console.log('je rentre la')
        let avatarImgReal = req.files.avatarImgFile;
        let avatar = avatarImgReal.name;
        avatarImgReal.mv("./staticFiles/imgUpload/upl_" + avatar, function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                query.modifyAvatar(avatar, req.session.user.id).then(function (resultat, err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.redirect('/profil');
                    }
                })
            }
        })
    }
}


module.exports = {
    getInfos: getInfos,
    modifyInfosUser: modifyInfosUser,
    deletMe: deletMe,
    modifyPassword: modifyPassword,
    modifyUserAvatar: modifyUserAvatar
}