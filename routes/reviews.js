var express = require('express');
const reseñasModel = require('../models/ModelReviews');
var router = express.Router();

/* GET users listing. */
router.get('/reviews', async function (req, res, next) {
  console.log("-> request /reviews")
  var docs = await reseñasModel.find({})
  res.json(docs);
});

/* GET users listing. */
router.get('/reviewsByid', async function (req, res, next) {
  console.log("GET -> request "+req.url)
  console.log(req.query.id)
  var docs = await reseñasModel.find({idPublicacion: req.query.id})
  res.json(docs);
});


/* POST users listing. */
router.post('/addreviews', async function (req, res, next) {
  console.log("POST -> post reviews")
  console.log(req.body, req.query)
  //var doc = await reseñasModel.findOne({ idPublicacion: req.body.isbn, usuario: req.body.usuario });
  //if (doc == null) {
    reseñasModel.insertMany(req.body).then((state) => {
      res.json(state[0]);
    })
      .catch((err) => { console.error(err); res.json({ error: err }); });
  /*} else {
    reseñasModel.findByIdAndUpdate(doc._id, req.body).then((state) => {
      res.json({ code: "OK" });
    })
      .catch((err) => { console.error(err); res.json({ error: err }); });
  }*/
});

/* DELETE users listing. */
router.delete('/deletereviews', async function (req, res, next) {
  var doc = await reseñasModel.findOne({ isbn: req.query.isbn, usuario: req.query.usuario });
  if (doc == null) {
    res.json({ error: "no existe en la base de datos" });
  } else {
    reseñasModel.deleteOne({ _id: doc._id }).then((state) => {
      res.json({ code: "OK" });
    })
      .catch((err) => { console.error(err); res.json({ error: err }); });
  }
});



module.exports = router;
