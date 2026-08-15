function showLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


function login() {

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    let message = document.getElementById("loginMessage");


    if (email === "" || password === "") {

        message.innerText = "Please enter email and password.";

        return;
    }


    message.innerText = "Login system will be connected to database later.";

}