const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("./models/user");

const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth", { 
    useNewUrlParser : true, 
    useUnifiedTopology : true 
});

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "Random Stuff",
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("home")
});

app.get("/secret", function(req, res){
    res.render("secret")
});

app.get("/register", function(req, res){
    res.render("register")
});

app.post("/register", function(req, res){
   req.body.username;
   req.body.password;
   User.register(new User({ username: req.body.username }), req.body.password, function(err, user){
       if(err){
            console.log(err);
            return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
       });
   })
});


app.get("/login", function(req, res){
  res.render("login")
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){

});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Express Server @ 3000");
//})

app.listen(3000, function(){
    console.log("Express Server @ 3000");
})