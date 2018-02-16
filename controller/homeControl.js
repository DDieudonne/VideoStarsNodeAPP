const query = require('../model/homeMod');
const moment = require('moment');

function getHomeUser(req, res) {
  if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
    query.getUsers(req.session.user.id).then(function (infosuser, err) {
      query.getAllfilms().then(function (resultat, err) {
        if (err) {
          throw err;
        } else {
          res.render('home', { infosuser: infosuser, resultat: resultat });
        }
      })
    })
  }
}

function getAlldetailsFilms(req, res) {
  if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
    query.getfilmId(req.params.id).then(function (resultat1, err) {
        query.getUsers(req.session.user.id).then(function (infosuser, err) {
          query.getCommentUser(req.params.id).then(function (AllComments, err) {
            if (err) {
              throw err;
            } else {
              res.render('detailsFilm', { resultat1: resultat1, infosuser: infosuser, AllComments: AllComments });
            }
          })
        })
    })
  }
}



function postCommentsUser(req, res) {
  if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    }
  else {
    let date = moment(Date.now()).format('DD/MM/YYYY à HH:mm:ss', 'fr').toString();
    console.log("nouvelle date:", date);
    console.log('commenting...')
    query.postCommentUser(req.session.user.id, req.params.id, req.body.commentairesUsersHomeFilms, date).then(function (resultat, err) {
      if (err) {
        throw err;
      } else {
        console.log('commented')
        res.redirect('back');
      }
    })
  }
}

function publishFilms(req, res) {
  if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } query.publishFilmId(req).then(function (resultat, err) {
    if (err) {
      throw err;
    } else {
      res.redirect('/home');
    }
  })
}

function publishFilmDeleted(req, res) {
  if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } query.publishFilmDel(req).then(function (resultat, err) {
    if (err) {
      throw err;
    } else {
      res.redirect('/home');
    }
  })
}

module.exports = {
  getHomeUser: getHomeUser,
  publishFilms: publishFilms,
  publishFilmDeleted: publishFilmDeleted,
  postCommentsUser: postCommentsUser,
  getAlldetailsFilms: getAlldetailsFilms,
};
