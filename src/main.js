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
    /*const contraseña = document.querySelector("#signup-password");
    const mensajePassword = document.querySelector("#shortPassword");
    contraseña.addEventListener( "change" , () => {
      if (contraseña.value.length < 6) {
        mensajePassword.innerHTML = "Tu contraseña debe tener al menos 6 caracteres";
       mensajePassword.style.color = "red";
     } else {
      mensajePassword.style.display = "none";
     }
    })*/
    //fin

/* -----------  validar <formulario  de registro> vacios y condiciones  --------------- */
    const formularioRegistro = document.getElementById('signup-form'); //formulario
    const inputsRegistro = document.querySelectorAll('#signup-form input'); //todos los imputs del formulario

    const mensajeFullname = document.querySelector('#campoFullname'); // mensaje fullname <p>
    const mensajeUsername = document.querySelector('#campoUsername'); // mensaje username <p>
    const mensajeContraseña1 = document.querySelector('#campoContraseñaPrimero'); // mensaje contraseña 1 <p>
    const mensajeContraseña2 = document.querySelector('#campoContraseñaSegundo'); // mensaje contraseña 2 <p>
    const mensajeCorreo = document.querySelector('#campoCorreo'); // mensaje correo <p>
    const mensajeChecket = document.querySelector('#campoChecket'); // mensaje Checket <p>
    const camposVacios = document.querySelector('#camposVacios'); // mensaje de campops vacios <p>
    const textoTerminos = document.querySelector('#textoTerminos'); // texto de terminos <label>

    // expresiones regulares
    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
      password: /^.{6,12}$/, // 4 a 12 digitos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const campos = {
      fullname: false,
      username: false,
      password: false,
      email: false
    }

    const validarFormulario = (e) => {
      switch (e.target.name){
        case "fullname":
          /*
          if(expresiones.nombre.test(e.target.value)){
            mensajeFullname.innerHTML = "Es válido";
            mensajeFullname.style.color = "green";
            campos['fullname'] = true;
          } else {
            mensajeFullname.innerHTML = "Solo debe tener Letras";
            mensajeFullname.style.color = "red";
            campos['fullname'] = false;
          }*/
          if (e.target.value.length == 0) {
            mensajeFullname.innerHTML = "Este campo esta vacio";
            mensajeFullname.style.color = "red";
            campos['fullname'] = false;
          } else if (expresiones.nombre.test(e.target.value)) {
            mensajeFullname.innerHTML = "Es válido";
            mensajeFullname.style.color = "green";
            campos['fullname'] = true;
          } else {
            mensajeFullname.innerHTML = "Solo debe tener Letras";
            mensajeFullname.style.color = "red";
            campos['fullname'] = false;
          }
        break;
        case "username":
          if (e.target.value.length == 0) {
            mensajeUsername.innerHTML = "Este campo esta vacio";
            mensajeUsername.style.color = "red";
            campos['username'] = false;
          } else if (expresiones.usuario.test(e.target.value)){
            mensajeUsername.innerHTML = "Es válido";
            mensajeUsername.style.color = "green";
            campos['username'] = true;
          } else {
            mensajeUsername.innerHTML = "Maximo 16 caracteres";
            mensajeUsername.style.color = "red";
            campos['username'] = false;
          }
        break;
        case "signup-password":
          if (e.target.value.length == 0) {
            mensajeContraseña1.innerHTML = "Este campo esta vacio";
            mensajeContraseña1.style.color = "red";
          } else if(expresiones.password.test(e.target.value)){
            mensajeContraseña1.innerHTML = "Es válido";
            mensajeContraseña1.style.color = "green";
          } else {
            mensajeContraseña1.innerHTML = "La contraseña tiene que ser de 6 a 12 digitos";
            mensajeContraseña1.style.color = "red";
          }
          validarContraseña2();
        break;
        case "confirm-password":
          validarContraseña2();
        break;
        case "signup-email":
          if (e.target.value.length == 0) {
            mensajeCorreo.innerHTML = "Este campo esta vacio";
            mensajeCorreo.style.color = "red";
            //campos['email'] = false;
          } else if(expresiones.correo.test(e.target.value)){
            mensajeCorreo.innerHTML = "Es válido";
            mensajeCorreo.style.color = "green";
            campos['email'] = true;
          } else {
            mensajeCorreo.innerHTML = "El correo solo puede contener letras, numeros, puntos y guion bajo";
            mensajeCorreo.style.color = "red";
            campos['email'] = false;
          }
        break;
      }
    }

    // validar contraseña repetida
    const validarContraseña2 = () => {
      const contraseña1 = document.querySelector('#signup-password'); // signup-password
      const contraseña2 = document.querySelector('#confirm-password'); // confirm-password

      if (contraseña1.value !== contraseña2.value) {
        mensajeContraseña2.innerHTML = "La contraseña no es la misma";
        mensajeContraseña2.style.color = "red";
        campos['password'] = false;
      } else {
        mensajeContraseña2.innerHTML = "Es válido";
        mensajeContraseña2.style.color = "green";
        campos['password'] = true;
      }
    }
    // fin - validar contraseña repetida

    // validar ckecket
    
    const terminos = document.querySelector('#accept');
    terminos.addEventListener("change", validaCheckbox, false);
    function validaCheckbox(){
      if(terminos.checked){
        mensajeChecket.style.display = "none";
      } else {
        mensajeChecket.style.display = "block";
        mensajeChecket.style.color = "red";
        mensajeChecket.innerHTML = "Acepta los terminos y condiciones";
      }
    }

    // fin - validar ckecket

    inputsRegistro.forEach( (input) => {
      input.addEventListener( 'keyup', validarFormulario);
      input.addEventListener( 'blur', validarFormulario);
    });

    const botonSignup = document.querySelector('#submit-button');

    botonSignup.addEventListener( 'click' , (e) => {
      //e.preventDefault(); // no lleva a otra pagina y no cambia url
      const terminos = document.querySelector('#accept'); // check
      if(campos.fullname && campos.username && campos.password && campos.email && terminos.checked) {
        formularioRegistro.reset(); // se resetea el formulairio
        // mensaje de enviado correctamente
        const mensajeExito = document.querySelector('#campoEnviado');
        mensajeExito.innerHTML = "Se ha enviado correctamente";
        mensajeExito.style.color = "green";
        // mensaje de exito en 2 segundos desaparece
        setTimeout( () => {
          mensajeExito.style.display = "none";
        }, 2000);
        // los mensajEs válidos desaparecen
        mensajeFullname.style.display = "none";
        mensajeUsername.style.display = "none";
        mensajeContraseña1.style.display = "none";
        mensajeContraseña2.style.display = "none";
        mensajeCorreo.style.display = "none";
      } else {
        // mensaje de error al encontrar campos sin rellenar
        const mensajeError = document.querySelector('#campoError');
        mensajeError.innerHTML = "Error: Por favor rellena el formulario correctamente";
        mensajeError.style.color = "red";
        // mensaje de error en 1 segundo desaparece
        setTimeout( () => {
          mensajeError.style.display = "none";
        }, 2000);
      }
    })

/* ---------------------------------- fin ------------------------------- */

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











