const connexWithMysql = require('./../database/config');

function getUsers(userID) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("SELECT * FROM users WHERE id = ?", [userID]);
    return resultat;
  });
}

function modifyPassword(password, useriID) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("UPDATE users SET password = ? WHERE id = ? ", [password, useriID])
  })
}
function modifyAvatar(avatarimg, userID) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("UPDATE users SET  `hasavatarUser` = ? WHERE id = ?",
      [avatarimg, userID])
  })
}

function deleteMySelf(userID) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("DELETE FROM users WHERE id = ?", [userID]);
    return resultat;
  });
}

function modifyInfos(biography, useriID) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("UPDATE users SET  `biography` = ? WHERE `id` = ? ",
      [biography, useriID])
  })
}

function getfilmId(homefilmsId) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("SELECT * FROM homefilms WHERE id  = ? ", [homefilmsId]);
    return resultat
  });
}

function getAllfilms() {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("SELECT * FROM videostars.homefilms ");
    return resultat;
  });
}
function postCommentUser(users_id, films_id, commentaires, datecomments) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("INSERT INTO `commentairesfilms` (`users_id`, `films_id`, `commentaires`, `datecomments`) VALUES (?,?,?,?);", [users_id, films_id, commentaires, datecomments]);
    return resultat;
  })
}

function getCommentUser(films_id) {
  return connexWithMysql.then(function (CoMysql) {
    let resultat = CoMysql.query("SELECT * FROM users INNER JOIN commentairesfilms ON users.id = commentairesfilms.users_id  WHERE films_id = ? ", [films_id]);
    return resultat
  })
}

// SELECT * FROM users INNER JOIN favorits ON favorits.users_id = users.id INNER JOIN homefilms ON favorits.filmshome_id = homefilms.id WHERE favorits.users_id = 83 AND favorits.filmshome_id = 16 

module.exports = {
  getUsers: getUsers,
  getAllfilms: getAllfilms,
  getfilmId: getfilmId,
  postCommentUser: postCommentUser,
  getCommentUser: getCommentUser,
  modifyInfos: modifyInfos,
  deleteMySelf: deleteMySelf,
  modifyPassword: modifyPassword,
  modifyAvatar: modifyAvatar,
};
