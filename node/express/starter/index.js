const express = require('express');
const port = process.env.PORT || 3000;
const ip   = process.env.IP || "0.0.0.0";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){ 
    res.render("index"); 
});

app.get("*", function(req, res){ 
    res.render("404"); 
});

app.listen(port, ip);