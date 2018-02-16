const query = require('../model/homeMod');

function getHomeUsers(req, res, resultat) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.getUsers(req.session.user.id).then(function (resultat, err) {
            res.render('users-home', { resultat: resultat});
        })
    }
}


module.exports = {
    getHomeUsers: getHomeUsers
}