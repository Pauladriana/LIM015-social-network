import {createLogin, createSignup, createMuro} from './logingroup.js';

//ENROUTAMIENTO codigo bonito
const secciones = document.querySelector('#secciones');

//EVITANDO 404
console.log(window.location.pathname);
if(window.location.pathname === '/login'){
  secciones.innerHTML = createLogin;
} else if (window.location.pathname === '/signup'){
  secciones.innerHTML = createSignup;
} else if (window.location.pathname === '/muro'){
  secciones.innerHTML = createMuro;
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
      /* logout - cerrar sesion */
      const logout = document.querySelector("#logout-button");
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          console.log("cerraste sesion");
          window.history.pushState( {} , 'muro', '/login' );
          secciones.innerHTML = createLogin;

        });
      });

  
}

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

    // limitar contraseña
    const contraseña = document.querySelector("#signup-password");
    const mensajePassword = document.querySelector("#shortPassword");
    contraseña.addEventListener( "change" , () => {
      if (contraseña.value.length < 6) {
        mensajePassword.innerHTML = "Tu contraseña debe tener al menos 6 caracteres";
       mensajePassword.style.color = "red";
     } else {
      mensajePassword.style.display = "none";
     }
    })
    //fin

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
      window.history.pushState( {} , 'signup', '/login' );
      secciones.innerHTML = createLogin;// no deberia se asi, casi nos morimos f
    })
    .catch((err) => {
      const wrongSignupEmail = document.querySelector('#wrongSUemail');
      if (err.message == 'The email address is already in use by another account.'){
        wrongSignupEmail.innerHTML = 'Este correo ya esta en uso, intenta con otro';
        wrongSignupEmail.style.color = 'red'
      }
    })

  })
} else if (window.location.hash === '#login') {
  console.log('mostrar login');
  secciones.innerHTML = createLogin;
  changeRoute(window.location.hash)
} else if (window.location.hash === '#muro'){
  changeRoute(window.location.hash);
  secciones.innerHTML = createMuro;
}

});

//FLECHAS DE ATRAS Y ADELANTE ---------> NO FUNCIONA!
/*window.onpopstate( () => {
  if(window.location.pathname === '/login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === '/signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }  
}); */

// login - logearse
const loginForm = document.querySelector("#login-form");
const loginButon = document.querySelector('#login-button');

loginButon.addEventListener("click", (e) => {
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
      window.history.pushState( {} , 'login', '/muro' );
      secciones.innerHTML = createMuro;
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
      /* logout - cerrar sesion */
      const logout = document.querySelector("#logout-button");
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          console.log("cerraste sesion");
          window.history.pushState( {} , 'muro', '/login' );
          secciones.innerHTML = createLogin;

        });
      });
  
    })
    .catch((err) => {
      const wrongLoginEmail = document.querySelector('#wrongemail');
      if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
        wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
        wrongLoginEmail.style.color = 'red'
      }
    })
});

// login with google - logearse con google hola
const googleButton = document.querySelector("#google-login");
googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("te logueaste con google");
      loginForm.reset();
      window.history.pushState( {} , 'login', '/muro' );
      secciones.innerHTML = createMuro;
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
      /* logout - cerrar sesion */
      const logout = document.querySelector("#logout-button");
      logout.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          console.log("cerraste sesion");
          window.history.pushState( {} , 'muro', '/login' );
          secciones.innerHTML = createLogin;

        });
      });

    })
    .catch((err) => {
      console.log(err);
    });
});










