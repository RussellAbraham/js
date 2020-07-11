browser.cookies.check = function(){
    var user = browser.cookies.get("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            browser.cookies.set("username", user, 365);
        }
    }
}