// to be able to connect with mongoose
const mongoose = require("mongoose");
// to be able to use .env variables
const dotenv = require("dotenv");

var express = require("express");
var passport = require("passport");
var session = require("express-session");
// passport-github2 is the current way to to connect to github using passport via oAuth 2.0
var GitHubStrategy = require("passport-github2").Strategy;
var partials = require("express-partials");

dotenv.config();

//Variables hidden in .env
const mongoURL = process.env.MONGO_DB_URL;
const port = process.env.PORT || 9000;
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

// connection to mongoose database
const main = async () => {
  mongoose.set("strictQuery");
  await mongoose.connect(mongoURL);
};
main().catch((err) => console.log(err));

// Schema for User
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  githubId: String,
});

// Model for User
const User = mongoose.model("users", userSchema);

const app = express();
// to enable server to read JSON
app.use(express.json());
// to enable server to read input from frontend
app.use(express.urlencoded({ extended: true }));
//to initialize passport
app.use(passport.initialize());
app.use(partials());

// both session methods are needed to create a session token on your browser - so the website knows you logged in
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// creating a new Strategy (a way of connecting) for github
passport.use(
  new GitHubStrategy.Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      // this should be set to the callbackURL you use when creating an oAuth app on Github
      callbackURL: "http://localhost:3000/auth/github/test",
    },
    function (accessToken, refreshToken, profile, cb) {
      // look in the database, if the user already exists
      User.findOne({ githubId: profile.id })
        .then((user) => {
          console.log("user", user);
          console.log("profile", profile);
          // if they don't exist, create a new one using only the githubId
          if (!user) {
            user = new User({ githubId: profile.id });
            user
              .save()
              .then(() => cb(null, user))
              .catch((err) => cb(err));
          } else {
            // if they exist, return the profile
            cb(null, profile);
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

// nothing really happens when you click the "Login" button in frontend
app.post("/login", async (req, res) => {
  console.log("req.body on login", req.body);
});

// sends user to github page to login. On login user gets sent to /auth/github/test
app.get("/auth/github", passport.authenticate("github"));

// user gets sent here from login on github
app.get(
  "/auth/github/test",
  // if login was not successful it should go back to signup page
  passport.authenticate("github", {
    // since frontend runs on localhost:3001 (and backend runs on locahost:3000), we need to write everything in the redirect
    failureRedirect: "http://localhost:3001/signup",
  }),
  // if successful the user will be redirected to /content
  (req, res) => {
    console.log("redirect fired, App.js - Zeile 115");
    res.redirect("http://localhost:3001/content");
  }
);

// when the user clicks the logout button, they will be signed of and redirected to the home page
app.get("/logout", function (req, res, next) {
  console.log("request in logout, Zeile 123", req);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3001/");
  });
});
// if people click on "content" in Frontend Navbar, it will be checked if they are logged in.
// if they are not logged in, they will be sent to "/".
// if they are logged in, they will be redirected to "/content"
app.get("/content", ensureAuthenticated, function (req, res) {
  res.redirect("http://localhost:3001/content");
});
app.listen(port, () => {
  console.log("listening on ", port);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  }
  console.log("not authenticated");
  res.redirect("http://localhost:3001/");
}
