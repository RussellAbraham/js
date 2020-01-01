// small script to add random messages like advertisements to the page
const ids = [
    'startbutton',
    'stopbutton',
    'target',
    'badge',
    'output',
    'outputbody'
];
ids.forEach(function(id){
    window[id] = document.getElementById(id)
});

// For updating badges and messages
function setText(id, text){
    id.textContent = "";
    id.textContent = text
}
function setHTML(id, html){
    id.innerHTML = "";
    id.innerHTML = html
}
// blank.html calls this function onload,
// encrypt a string to base64 with btoa()
// open blank in a new window with the location hashed to the encrypted string
// set the hidden card body to the decrypted message.
function blank(){
    const 
        { hash } = window.location, 
        message = atob(hash.replace('#', '')),
        day = new Date();
    if(message){
        input.style.display = "none";
        hidden.style.display = "block";
        hiddenbody.innerHTML = message;
        hiddenfoot.innerHTML = day.toLocaleDateString();
    }
}
