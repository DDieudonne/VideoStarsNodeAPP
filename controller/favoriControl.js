const query = require('../model/favoritMod');

function getFavorite(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.getAllfilms(req.session.user.id).then(function (resultat, err) {
            query.getCountFilm(req.session.user.id).then(function (resultat2, err) {
                if (err) {
                    throw err;
                } else {
                    console.log('le resultat2',resultat2)
                    res.render('favoritesPage', { resultat: resultat, resultat2: resultat2 });
                }
            })
        })
    }
}

function videoPosted(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        if (req.files) {

            // upload image
            let imgupload = req.files.fileimage;
            let imagefilm = imgupload.name;
            // upload image

            // upload video
            let vidupload = req.files.filevideo;
            let videofilm = vidupload.name;
            // upload video


            // upload image
            imgupload.mv("./staticFiles/imgUpload/upl_" + imagefilm, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                // upload image

                // upload video
                vidupload.mv("./staticFiles/videoUpload/upl_" + videofilm, function (err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // upload video

                    query.videoPost(req.body.namefilm, req.body.genrefilms, req.body.yearfilm, req.body.biographyfilm, req.body.hourfilm, imagefilm, videofilm).then(function (resultat, err) {
                        if (err) {
                            throw err;
                        } else {
                            res.redirect('/home');
                        }
                    });
                });
            });
        }
    }
}

function addToFavorit(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.addFav(req.session.user.id, req.params.id).then(function (resultat, err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/favorits');
            }
        })
    }
}

function deleteFavoriteFilm(req, res) {
    if (!req.session.user || req.session.user == undefined) {
        res.redirect('/');
    } else {
        query.deleteFilm(req.params.id).then(function (resultat, err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/favorits');
            }
        })
    }
}

module.exports = {
    getFavorite: getFavorite,
    videoPosted: videoPosted,
    addToFavorit: addToFavorit,
    deleteFavoriteFilm: deleteFavoriteFilm
}