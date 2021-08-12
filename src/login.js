
// login con email y contraseña
const loginForm = document.querySelector("#login-form"); // todo el formulario
const loginButon = document.querySelector('#login-button'); // boton de "login"
const showPassword = document.querySelector('#show-password'); // checkbox para mostrar contraseña

//Logearse con google
const googleButton = document.querySelector("#google-login");
googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("te logueaste con google");
      loginForm.reset();
      window.history.pushState( {} , 'login', '#muro' );
      //cambioRuta();
    })
    .catch((err) => {
      console.log(err);
    })
  //Termina login google con firebase
});