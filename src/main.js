// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

myFunction(); */

const loginSection = document.querySelector("#login");
const signupSection = document.querySelector("#signup");
const muroSection = document.querySelector("#muro");
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
      loginSection.style.display = "none";
      muroSection.style.display = "block";
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
      loginSection.style.display = "none";
      muroSection.style.display = "block";
    })
    .catch((err) => {
      console.log(err);
    });
});

/* signup - registrarse */
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("registrandote");
  const signupEmail = document.querySelector("#signup-email").value;
  const signupPassword = document.querySelector("#signup-password").value;

  auth
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then((userCredential) => {
      console.log("registrado");
      signupForm.reset();
      signupSection.style.display = "none";
      loginSection.style.display = "block";
    });
});

/* logout - cerrar sesion */
const logout = document.querySelector("#logout-button");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("cerraste sesion");
    loginSection.style.display = "block";
    muroSection.style.display = "none";
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
