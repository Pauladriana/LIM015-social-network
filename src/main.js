import {createLogin, createSignup, createMuro} from './logingroup.js';
import {createNewPost, viewPost, editPost} from './postgroup.js';
import {showAuthUsers} from './authuser.js';
import {showFsPost} from './fsPost.js';
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
    case '#login': {
      return (
        (secciones.innerHTML = createLogin),
        mostrarContraseña(),
        botonLogin(),
        gogleaRegistro(),
        console.log('hola estoy en login')
      );
    }
    case '#signup': {
      return (
        (secciones.innerHTML = createSignup),
        botonCancelarRegistro(),
        validarRegistro(),
        console.log('hola estoy en regsitro')
      );
    }
    case '#newpost': {
      return (
        (secciones.innerHTML = createNewPost),
        crearPost(),
        console.log('hola estoy en crear post')
      );
    }
    case '#viewpost': {
      return (
        (secciones.innerHTML = viewPost),
        console.log('hola estoy en ver post')
      );
    }
    case '#editpost': {
      return (
        (secciones.innerHTML = editPost),
        console.log('hola estoy en crear post')
      );
    }
    case '#muro': {
      return (
        (secciones.innerHTML = createMuro),
        showFsPost(),
        showAuthUsers(),
        cerrarSesion(),
        /*botonesPost(),*/ console.log('hola estoy en muro')
      );
    }
    case '': {
      return (
        (secciones.innerHTML = createLogin),
        mostrarContraseña(),
        botonLogin(),
        gogleaRegistro(),
        console.log('hola estoy en muro')
      );
    }
    case '/': {
      return (
        (secciones.innerHTML = createLogin),
        mostrarContraseña(),
        botonLogin(),
        gogleaRegistro(),
        console.log('hola estoy en login')
      );
    }
    default: {
      return (secciones.innerHTML = `estoy en otro lado 404`);
    }
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
  window.addEventListener('hashchange', () =>
    showSeccion(window.location.hash)
  );
};
// función que muestra la vista al momento de recargar
window.addEventListener('load', userLoggedIn);
//-------------

// funcion mostrar contraseña
const mostrarContraseña = () => {
  const showPassword = document.querySelector('#show-password');
  showPassword.addEventListener('change', () => {
    const password1 = document.querySelector('#login-password');
    if (password1.type === 'text') {
      password1.type = 'password';
    } else {
      password1.type = 'text';
    }
  });
};
// ---------------

// boton 'cancel'
const botonCancelarRegistro = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    window.location.hash = 'login';
    //showSeccion();
  });
}; // ---------------

// evento click - logearse con correo y contraseña
const botonLogin = () => {
  const loginButon = document.querySelector('#login-button');
  const loginForm = document.querySelector('#login-form');
  loginButon.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('logueandote');
    const loginEmail = document.querySelector('#login-email').value;
    const loginPassword = document.querySelector('#login-password').value;
    console.log(loginEmail, loginPassword);

    loginWithEmail(loginEmail, loginPassword)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log('logueo exitoso');
            window.location.hash = 'muro';
          }
        });
      })
      .catch((err) => {
        const wrongLoginPassword = document.querySelector('#wrongpassword');
        const wrongLoginEmail = document.querySelector('#wrongemail');
        if (
          err.message ==
          'The password is invalid or the user does not have a password.'
        ) {
          wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
          wrongLoginPassword.style.color = 'red';
        }
        if (
          err.message ==
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          wrongLoginEmail.innerHTML =
            'Este correo no es valido, por favor corrigelo';
          wrongLoginEmail.style.color = 'red';
        }
      });
  });

  /*loginWithEmail(loginEmail, loginPassword).then((userCredential) => {
        const user = userCredential.user.emailVerified;
        if(user){
          console.log('logueado');
          loginForm.reset();
          console.log('resea el formulario')
          window.location.hash = 'muro';
          //showSeccion();
          console.log('ruta del muro')
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
};

const validateEmail = (user) => {
  const fs = firebase.firestore();
  fs.collection('users')
    .get()
    .then((querySnapshot) => {
      let tmp = querySnapshot.docs.find(ele =>   ele.data().email === user.email  );
      console.log(tmp);
      // Si no encuentra el email que se quiere registrar; el valor de tmp será undefined, por ende agrega el nuevo user en base de datos
      // si encuentra el email en base de datos; el valor de tmp será el user encontrado , por ende solo cambia la vista a muro
      if (tmp != undefined) {
        console.log('usuario existente logueado');
        window.location.hash = 'muro';
      } else {
        fs.collection('users')
        .add({
          username: user.displayName,
          fullname: user.displayName,
          password: user.providerId,
          email: user.email,
        })
        .then((docRef) => {
          console.log('Creado y agregado a database');
          window.location.hash = 'muro';
          // console.log('Este es el nuevo usuario: ' + docRef.id);
        })
        .catch((error) => {
          // console.log('Tienes el siguiente error: ' + error);
        });
      }
    });
};

// Logearse con google
const gogleaRegistro = () => {
  const googleButton = document.querySelector('#google-login');
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(firebase.auth().currentUser);
    // Si hay sesion activa , desloguea antes de loguear nuevamente, sino sigue el flujo normal de login con google
    if (firebase.auth().currentUser) {
      auth.signOut().then(() => {
        console.log('DESLOGUEANDO');
        googleRegister().then( () => {
          if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser.providerData[0];
            console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
            validateEmail(user);
          }
        });
      });
    } else {
      googleRegister().then( () => {
        if (firebase.auth().currentUser) {
          const user = firebase.auth().currentUser.providerData[0];
          console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
          validateEmail(user);
        }
      });
    }
  });
  //Termina login google con firebase
}; // ----------

//FLECHAS DE ATRAS Y ADELANTE
window.addEventListener('popstate', (event) => {
  console.log(
    'location: ' + document.location + ', state: ' + JSON.stringify(event.state)
  );
  console.log('POPOPOPOPOP');
  if (window.location.pathname === 'login') {
    secciones.innerHTML = createLogin;
    console.log(' LOGIN');
  } else if (window.location.pathname === 'signup') {
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO');
  }
}); // -----------

//NUEVA PUBLICACION
const crearPost = () => {
  const publiPost = document.querySelector('#publiPost');
  publiPost.addEventListener('click', async (e) => {
    e.preventDefault();

    // llamar a los inputs
    const costoInput = document.querySelector('#costoInput');
    const diasInput = document.querySelector('#diasInput');
    const nochesInput = document.querySelector('#nochesInput');
    const personasInput = document.querySelector('#personasInput');
    const ninosInput = document.querySelector('#ninosInput');
    const tituloPost = document.querySelector('#tituloPost');
    const contenidoPost = document.querySelector('#contenidoPost');
    const locacionInput = document.querySelector('#locacionInput');

    if (
      costoInput.value !== '' &&
      diasInput.value !== '' &&
      nochesInput.value !== '' &&
      personasInput.value !== '' &&
      ninosInput.value !== '' &&
      tituloPost.value !== '' &&
      contenidoPost.value !== '' &&
      locacionInput.value !== ''
    ) {
      const costoInput = document.querySelector('#costoInput').value;
      const diasInput = document.querySelector('#diasInput').value;
      const nochesInput = document.querySelector('#nochesInput').value;
      const personasInput = document.querySelector('#personasInput').value;
      const ninosInput = document.querySelector('#ninosInput').value;
      const tituloPost = document.querySelector('#tituloPost').value;
      const contenidoPost = document.querySelector('#contenidoPost').value;
      const locacionInput = document.querySelector('#locacionInput').value;

      const response = await fs.collection('publicaciones').doc().set({
        costoInput,
        diasInput,
        nochesInput,
        personasInput,
        ninosInput,
        tituloPost,
        contenidoPost,
        locacionInput
      });
      console.log(response);
      console.log(tituloPost, contenidoPost);
      window.location.hash = 'muro';
    } else {
      const mensaje = document.querySelector('#mensajeValidacion');
      mensaje.innerHTML = 'Por favor llena todos los campos';
      mensaje.style.color = 'red';
    }
  });
};

// boton de eliminar post - falta completar
/*const botonesPost = () => {
  const btnDelete = document.querySelectorAll('.btn-delete');
  console.log(btnDelete);
  console.log(botonesPost);
}*/
