let element = function(id){
    return document.getElementById(id);
}

let sign_in = element('sign_in');
let sign_up = element('sign_up')

let email = element('email');
let username = element('username');
let password = element('password');
let confPassword = element('confirm-password');


let signInBtn = element("sign-in-btn")
let signUpBtn = element('sign-up-btn');

let signInContainer = element("sign-in-container");
let signUpContainer = element("sign-up-container")


/****    SERVER IS NOT YET IMPLEMENTED  ****/
// Handle sign up button 
sign_up.addEventListener('click', function(){
    console.log("HERE TO SIGN UP ")
    signUpContainer.style.visibility = "visible";
    signInContainer.style.visibility = "hidden";
    sign_up.style.background = "#c2c2c2";
    sign_in.style.background = "#e0dede"
})

sign_in.addEventListener('click', function(){
    console.log("HERE TO SIGN IN")
    signUpContainer.style.visibility = "hidden";
    signInContainer.style.visibility = "visible";
    sign_in.style.background = "#c2c2c2";
    sign_up.style.background = "#e0dede"
})

