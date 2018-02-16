const connexWithMysql = require('./../database/config');
function getAvatar() {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query
            ("SELECT * FROM users");
        return resultat;
    });
}

function registerPost(email, age, password, firstname, lastname) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query
            ("INSERT INTO`users` (`email`,`age`, `password`, `firstname`, `lastname`) VALUES ( ?, ?, ?, ?, ?);",
            [email, age, password, firstname, lastname]);
        return resultat;
    });
}

function loginPost(email) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("SELECT * FROM users WHERE email = ?", [email]);
        return resultat;
    });
}


function banisModePost(users_messad_id, messages_admin, messages_date) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("INSERT INTO `message_for_administrator` (`users_messad_id`, `messages_admin` ,`messages_date`) VALUES ( ?, ?, ?)",
            [users_messad_id, messages_admin, messages_date]);
        return resultat;
    });
}

function hasSent(userId) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("UPDATE `users` SET `message_sent`= 1 WHERE `id`= ?",
            [userId]);
        return resultat;
    })
}


function banisModeGet(userId) {
    return connexWithMysql.then(function (CoMysql) {
        let resultat = CoMysql.query("SELECT message_sent FROM users WHERE `id` = ?",
            [userId]);
        return resultat;
    });
}

module.exports = {

    registerPost: registerPost,
    loginPost: loginPost,
    banisModePost: banisModePost,
    banisModeGet: banisModeGet,
    hasSent: hasSent
};