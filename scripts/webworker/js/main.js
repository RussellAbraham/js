const ids = [
    /* id of the stop button */
    'startbutton', 'stopbutton',
    /* id of first list item in the left column of the page */
    'target',
    /* id's of list item badges with the left column of the page */
    'pagesbadge', 'postsbadge', 'databadge', 'uploadsbadge',
    /* id's of the main card inside the left columns, forms are placed here */
    'input', 'inputhead', 'inputbody', 'inputfoot',
    /* id's of the hidden left column used for displaying stored data */
    'hidden', 'hiddenhead', 'hiddenbody', 'hiddenfoot'
];
// set global variables to get elements by id name
ids.forEach(function(id){
    window[id] = document.getElementById(id)
});

// For updating badges or other elements
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
