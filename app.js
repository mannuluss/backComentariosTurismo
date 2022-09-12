require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var moongose = require("mongoose");
const reseñasModel = require("./models/ModelReviews");
//import InitialReviews from "./example.json" assert { type: "json" };
const InitialReviews = require("./insertMongoDB.json")

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let uri_mongodb = process.env.MONGODB_HOST;

//configuracion conexion
moongose.connect(uri_mongodb, { dbName: "turismo" }, (err) => {
  if (err) console.log(err);
  else {
    console.log("[Moongose] Connect with mongondb is OK");
    console.log("[App] Load initial Collection and data ....");
    reseñasModel
      .insertMany(InitialReviews)
      .then((res) => {
        console.log("[App] (OK) All insert");
      })
      .catch((err) => console.log(err));
  }
});

var reseñaRouter = require("./routes/reviews");
app.use("/api", reseñaRouter);

module.exports = app;
