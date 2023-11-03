const login = document.getElementById("login");
const form = document.querySelector("form");
const inputMail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const errorMail = document.getElementById("errorMail");
const errorPassword = document.getElementById("errorPassword");
const errorLogin = document.getElementById("errorLogin");


const regexMail = /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]+/;
const regexPassword = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){6,}/;


form.addEventListener("input", VerifyId);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    LogIn();
});


function VerifyId() {
    if (regexMail.test(inputMail.value)) {
        errorMail.innerHTML = "";
    } else {
        errorMail.innerHTML = "<br> Email non valide";
    }

    if (regexPassword.test(inputPassword.value)) {
        errorPassword.innerHTML = "";
    } else {
        errorPassword.innerHTML = "<br> Mot de passe non valide";
    }
}

async function LogIn() {
    const id = {
        email: inputMail.value,
        password: inputPassword.value
    };
    const chargeUtile = JSON.stringify(id);

    let res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });

    if (res.status === 200) {
        const data = await res.json();
        let idtoken = data.token;
        window.localStorage.setItem("token", idtoken);
        window.location.href = "index.html";
    } else {
        errorLogin.innerHTML = "<br> Email ou mot de passe incorrect";
    }
}


login.style.fontWeight = "600";
