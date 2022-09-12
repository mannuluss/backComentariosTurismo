const mongoose = require('mongoose');

var reseñasModel = mongoose.model("reviewsModel",
    {
        usuario: String,
        idPublicacion: String,
        estrellas: Number,
        comentario: String
    }, "reviews");

module.exports = reseñasModel;