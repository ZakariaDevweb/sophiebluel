let login = document.getElementById("login");
login.setAttribute("style","font-weight : 600");
let form = document.querySelector("form");
let inputMail = document.getElementById("email");
let inputPassword = document.getElementById("password")
let errorMail=document.getElementById("errorMail");
let errorPassword=document.getElementById("errorPassword");
let errorLogin=document.getElementById("errorLogin");
let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]+");
let regexPassword =new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){6,}");
form.addEventListener("input", VerifyId )
form.addEventListener("submit", (event) => {
   event.preventDefault();
   LogIn() 
 });

function VerifyId(){
   if (regexMail.test(inputMail.value)){
      errorMail.innerHTML=""
   }
   else {
      errorMail.innerHTML="<br> Email non valide"
   };
   if (regexPassword.test(inputPassword.value)){
      errorPassword.innerHTML=""
   }
   else {
      errorPassword.innerHTML="<br> Mot de passe non valide"
   }
 }
async function LogIn (){
   const id = {
      email : inputMail.value,
      password : inputPassword.value
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
      window.localStorage.setItem("token",idtoken)
      window.location.href="index.html"
   }
   else {
      errorLogin.innerHTML="<br> Email ou mot de passe incorrect";
   }
 }