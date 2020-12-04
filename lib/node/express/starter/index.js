const port = process.env.PORT || 3000;
const ip   = process.env.IP || "0.0.0.0";

const express = require('express');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){ 
    res.render("index"); 
});

app.get("*", function(req, res){ 
    res.render("404"); 
});

app.listen(3050, function(){
    console.log('express server @ port 3050');
});