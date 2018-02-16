const connexWithMysql = require('./../database/config');

function videoPost(films, genre, years, biographyfilm, hourfilm, imagefilm, videofilm) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("INSERT INTO `homefilms` (`films`,`genre`,`years`,`biographyfilm`,`hourfilm`,`imagefilm`,`videofilm`) VALUES (?,?,?,?,?,?,?);", [films, genre, years, biographyfilm, hourfilm, imagefilm, videofilm]);
        return resultat;
    })
}


function getAllfilms(users_id) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("SELECT * FROM users INNER JOIN favorits ON favorits.users_id = users.id INNER JOIN homefilms ON favorits.filmshome_id = homefilms.id WHERE favorits.users_id = ?", [users_id]);
        return resultat;
    })
}

function addFav(users_id, filmshome_id) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("INSERT INTO favorits(favorits.users_id, favorits.filmshome_id, favorits.likefilm) VALUES (?,?, 1)", [users_id, filmshome_id]);
        return resultat;
    })
}

function deleteFilm(filmshome_id) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("DELETE FROM favorits where favorits.filmshome_id = ?", [filmshome_id]);
        return resultat;
    });
}

function getCountFilm(users_id) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("SELECT count(filmshome_id) AS favorits from favorits where favorits.users_id = ?", [users_id]);
        return resultat;
    })
}



module.exports = {
    videoPost: videoPost,
    getAllfilms: getAllfilms,
    addFav: addFav,
    deleteFilm: deleteFilm,
    getCountFilm: getCountFilm
}