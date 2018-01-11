// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv

// REMEMBER!
// npm run pre-deploy when first create
// TO PUSH FILES - git push heroku master

// MY WEBSITE URL

require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import authenticationRoutes from "./routes/AuthenticationRoutes";
import listRoutes from "./routes/ListRoutes";
import articleRoutes from "./routes/blog/ArticleRoutes";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

// NOTE!!!! // john's hardcoding mlab account!!!!
// need to create go to own mlab, create mongodb, put my own url there
// mongoose.connect("mongodb://jwoo:jwoo@ds151451.mlab.com:51451/aca-test");
mongoose.connect("mongodb://jkilleen15:jkilleen15@ds141796.mlab.com:41796/jkilleen_aca");

const app = express();
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  res.sendFile("public/index.html");
});
app.use(bodyParser.json());
app.use(authenticationRoutes);


const authStrategy = passport.authenticate("authStrategy", { session: false });
app.use(authStrategy);
app.use(listRoutes);
app.use(articleRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
