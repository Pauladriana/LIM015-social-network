// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

myFunction(); */

import {createLogin, createSignup, createMuro} from './logingroup.js';



/*const loginSection = document.querySelector("#login");
const signupSection = document.querySelector("#signup");
const muroSection = document.querySelector("#muro");*/

//ENROUTAMIENTO
const secciones = document.querySelector('#secciones');

//RUTA SIN #
const changeRoute = (hash) => {
  if (hash === '#login'){
    window.history.replaceState({}, 'login', '/login')
  } else if (hash === '#signup'){
    window.history.replaceState({}, 'signup', '/signup')
  } else if (hash === '#muro'){
    window.history.replaceState({}, 'muro', '/muro')
  }
};

window.addEventListener('hashchange', () => {
    if (window.location.hash === '#signup') {
    console.log('mostrar registro');
    secciones.innerHTML = createSignup;
    changeRoute(window.location.hash)
    const signupForm = document.querySelector("#signup-form");
    const botonForm = document.querySelector("#submit-button");

    botonForm.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("registrandote");
    const signupEmail = document.querySelector("#signup-email").value;
    const signupPassword = document.querySelector("#signup-password").value;
    const usernameInput = document.querySelector("#username").value;
    const fullnameInput = document.querySelector("#fullname").value;
    const passwordInput = document.querySelector('#signup-password').value;
    const emailInput = document.querySelector('#signup-email').value;


    auth
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then((userCredential) => {
      console.log("registrado");
      fs.collection("users").add({
        username: usernameInput,
        fullname: fullnameInput,
        password: passwordInput,
        email: emailInput
      })
      .then((docRef) => {
        console.log("Este es el nuevo usuario: " + docRef.id);
      })
      .catch((error) => {
        console.log("Tienes el siguiente error: " + error);
      })
      signupForm.reset();
      /*secciones.innerHTML = createLogin;*/
      window.history.pushState( {} , 'signup', '/login' );
      secciones.innerHTML = createLogin;// no deberia se asi, casi nos morimos f
    })

  })
} else if (window.location.hash === '#login') {
  console.log('mostrar login');
  secciones.innerHTML = createLogin;
  changeRoute(window.location.hash)
} else if (window.location.hash === '#muro'){
  changeRoute(window.location.hash)
}

});



//CLICK EN OPCION DE REGISTRO DESDE EL LOGIN
/*const wantSignup = document.querySelector("#signingup")
wantSignup.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});*/

//CLINCK EN BOTON "CANCEL" DESDE EL REGISTRO
/*const cancelSignup = document.querySelector("#cancel-button");
cancelSignup.addEventListener("click", ()=> {
  loginSection.style.display = "block";
  signupSection.style.display = "none";
})/*

// AQUI VA:

/* login - logearse */
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("logueandote");
  const loginEmail = document.querySelector("#login-email").value;
  const loginPassword = document.querySelector("#login-password").value;
  console.log(loginEmail, loginPassword);

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      console.log("logueado");
      loginForm.reset();
      /*loginSection.style.display = "none";
      muroSection.style.display = "block";*/
      console.log("sing in");
    });
});

/* login with google - logearse con google*/
const googleButton = document.querySelector("#google-login");
googleButton.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("te logueaste con google");
      loginForm.reset();
      /*loginSection.style.display = "none";
      muroSection.style.display = "block";*/
    })
    .catch((err) => {
      console.log(err);
    });
});

/*signup - registrarse
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("registrandote");
  const signupEmail = document.querySelector("#signup-email").value;
  const signupPassword = document.querySelector("#signup-password").value;
  const usernameInput = document.querySelector("#username").value;
  const fullnameInput = document.querySelector("#fullname").value;
  const passwordInput = document.querySelector('#signup-password').value;
  const emailInput = document.querySelector('#signup-email').value;


  auth
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then((userCredential) => {
      console.log("registrado");
      fs.collection("users").add({
        username: usernameInput,
        fullname: fullnameInput,
        password: passwordInput,
        email: emailInput
      })
      .then((docRef) => {
        console.log("Este es el nuevo usuario: " + docRef.id);
      })
      .catch((error) => {
        console.log("Tienes el siguiente error: " + error);
      })
      signupForm.reset();
      /*signupSection.style.display = "none";
      loginSection.style.display = "block";*//*
    });
});*/


/* logout - cerrar sesion */
const logout = document.querySelector("#logout-button");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("cerraste sesion");
    /*loginSection.style.display = "block";
    muroSection.style.display = "none";*/
  });
});

/* usuarios - lista en el muro */
const allUsers = document.querySelector("#userslist");

const setupUsers = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const user = doc.data();
      console.log(user);
      const li = `
                 <li class='list-group-item list-group-item-action'>
                    <h5>${user.username}</h5>
                    <p>${user.fullname}</p>
                </li>`;
      html += li;
    });
    allUsers.innerHTML = html;
  } else {
    allUsers.innerHTML = `<p>Login to meet the travelers</p>`;
  }
};

// Eventos
// Listar los datos para usuarios autenticados
auth.onAuthStateChanged((user) => {
  if (user) {
    fs.collection("users")
      .get()
      .then((snapshot) => {
        setupUsers(snapshot.docs);
      });
  } else {
    setupUsers([]);
  }
});
