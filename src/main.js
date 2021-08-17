import {createLogin, createSignup, createMuro} from './logingroup.js';
import {showAuthUsers} from './authuser.js';
import {cerrarSesion} from './logout.js';
import {googleRegister, loginWithEmail} from './login.js';
import {validarRegistro} from './validaciones.js';

//RUTA SIN #
/*const changeRoute = (hash) => {
  if (hash === '#login'){
    window.location.hash = '/login';
  } else if (hash === '#signup'){
    window.location.hash = 'signup';
  } else if (hash === '#muro'){
    window.location.hash = 'muro';
  }
};*/

// crear la funcion mostrar seccion
const showSeccion = (ruta) => {
  const secciones = document.querySelector('#secciones');
  secciones.innerHTML = '';
  switch (ruta) {
    case '#login': { return secciones.innerHTML = createLogin,mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en login");}
    case '#signup': { return secciones.innerHTML = createSignup, botonCancelarRegistro(),  validarRegistro(), console.log("hola estoy en regsitro"); }
    case '#muro': { return secciones.innerHTML = createMuro, showAuthUsers(), cerrarSesion(), console.log("hola estoy en muro"); }
    case '': { return secciones.innerHTML = createLogin, mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en login"); }
    case '/': { return secciones.innerHTML = createLogin, mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en login"); }

  default: {return secciones.innerHTML = `estoy en otro lado 404`}
  }
};
//--------------

// si el usuario esta logeado 
const userLoggedIn = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) { 
      showSeccion(window.location.hash);
    } else {
      window.location.hash = '#login';    
    }
  });
  window.addEventListener('hashchange', () => showSeccion(window.location.hash));
};
// función que muestra la vista al momento de recargar
window.addEventListener('load', userLoggedIn);
//-------------

// funcion mostrar contraseña
const mostrarContraseña = () => {
  const showPassword = document.querySelector('#show-password');
  showPassword.addEventListener('change', () => {
    const password1 = document.querySelector('#login-password');
      if ( password1.type === "text" ) {
          password1.type = "password"
      } else {
          password1.type = "text"
      }
  });
}
// ---------------



// boton "cancel"
const botonCancelarRegistro = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
  window.location.hash = 'login';
    //showSeccion();
  });
} // ---------------

// evento click - logearse con correo y contraseña
const botonLogin = () => {
  const loginButon = document.querySelector('#login-button');
  const loginForm = document.querySelector('#login-form')
  loginButon.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("logueandote");
      const loginEmail = document.querySelector("#login-email").value;
      const loginPassword = document.querySelector("#login-password").value;
      console.log(loginEmail, loginPassword);

      loginWithEmail(loginEmail, loginPassword).then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("logueo exitoso");
            window.location.hash = 'muro';
          }
        });
      })
      .catch((err) => {
        const wrongLoginPassword = document.querySelector('#wrongpassword');
        const wrongLoginEmail = document.querySelector('#wrongemail');
        if (err.message == 'The password is invalid or the user does not have a password.'){
          wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
          wrongLoginPassword.style.color = 'red'
        }
        if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
          wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
          wrongLoginEmail.style.color = 'red'
        }
      });
  });

      /*loginWithEmail(loginEmail, loginPassword).then((userCredential) => {
        const user = userCredential.user.emailVerified;
        if(user){
          console.log("logueado");
          loginForm.reset();
          console.log("resea el formulario")
          window.location.hash = 'muro';
          //showSeccion();
          console.log("ruta del muro")
        }
        }) // fin then
        .catch((err) => {
          const wrongLoginPassword = document.querySelector('#wrongpassword');
          const wrongLoginEmail = document.querySelector('#wrongemail');
          if (err.message == 'The password is invalid or the user does not have a password.'){
            wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
            wrongLoginPassword.style.color = 'red'
          }
          if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
            wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
            wrongLoginEmail.style.color = 'red'
          }
        }) //Termina login con firebase*/
    }

// Logearse con google
const gogleaRegistro = () => {
  const googleButton = document.querySelector("#google-login");
  googleButton.addEventListener("click", (e) => {
    e.preventDefault();
    googleRegister().then(() => {
      if (firebase.auth().currentUser) {
        console.log("te logueaste con google");
        window.location.hash = 'muro';
      }
    });
});
    //Termina login google con firebase
}// ----------

//FLECHAS DE ATRAS Y ADELANTE
window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  console.log('POPOPOPOPOP');
  if(window.location.pathname === 'login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === 'signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }  
}); // -----------



