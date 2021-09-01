import { createLogin, createSignup, createMuro } from './logingroup.js';
import { createNewPost, viewPost, editPost } from './postgroup.js';
// import { showAuthUsers } from './authuser.js';
import { showFsPost, showMyPosts } from './fsPost.js';
import { cerrarSesion } from './logout.js';
import { googleRegister, loginWithEmail } from './login.js';
import { validarRegistro } from './validaciones.js';
import { showCommentary } from './comentario.js';
import { addPost, fsUpdate, deletePost } from './post.js';
import { pageNotFound } from './notfound.js';
import { pageprofile, setProfileAttributes } from './profile.js';

const fs = firebase.firestore();
const secciones = document.querySelector('#secciones');

// RUTA SIN #
/* const changeRoute = (hash) => {
  if (hash === '#login'){
    window.location.hash = '/login';
  } else if (hash === '#signup'){
    window.location.hash = 'signup';
  } else if (hash === '#muro'){
    window.location.hash = 'muro';
  }
}; */

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

const validateEmail = (user) => {
  fs.collection('users')
    .get()
    .then((querySnapshot) => {
      const tmp = querySnapshot.docs.find((ele) => ele.data().email === user.email);
      // console.log(tmp);
      /* Si no encuentra el email que se quiere registrar;
      el valor de tmp será undefined, por ende agrega el nuevo user en base de datos */
      // si encuentra el email en base de datos; el valor
      // de tmp será el user encontrado , por ende solo cambia la vista a muro
      if (tmp !== undefined) {
        localStorage.setItem('user', JSON.stringify(user));
        // console.log('usuario existente logueado');
        window.location.hash = 'muro';
      } else {
        fs.collection('users')
          .add({
            username: user.displayName,
            fullname: user.displayName,
            password: user.providerId,
            email: user.email,
          })
          .then(() => {
            localStorage.setItem('user', JSON.stringify(user));
            // console.log('Creado y agregado a database');
            window.location.hash = 'muro';
            // console.log('Este es el nuevo usuario: ' + docRef.id);
          })
          .catch(() => {
            // console.log('Tienes el siguiente error: ' + error);
          });
      }
    });
};

// Modales - editar-eliminar y mensaje de confirmacion
const funcionModal = () => {
  const showModal = document.querySelector('#optionPost');
  const modalEditRemove = document.querySelector('#modalEditRemove');
  const closeModal = document.querySelector('#closeModalEditRomve');

  // mostrar el modal
  showModal.addEventListener('click', () => {
    modalEditRemove.style.display = 'flex';
  });

  // cerrar el modal
  closeModal.addEventListener('click', () => {
    modalEditRemove.style.display = 'none';
  });

  const show = document.querySelector('#ShowModalConfirmation');
  const modal = document.querySelector('#modalRemove');
  const close = document.querySelector('#closeModal');

  // mostrar el modal
  show.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalEditRemove.style.display = 'none';
  });

  // cerrar el modal
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // fin de los modales
};

// evento click - logearse con correo y contraseña
const botonLogin = () => {
  const loginButon = document.querySelector('#login-button');
  // const loginForm = document.querySelector('#login-form');
  loginButon.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('logueandote');
    const loginEmail = document.querySelector('#login-email').value;
    const loginPassword = document.querySelector('#login-password').value;
    // console.log(loginEmail, loginPassword);

    loginWithEmail(loginEmail, loginPassword)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          // verifica el correo si es true
          if (user.emailVerified) {
            // console.log('logueo exitoso', user);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
            window.location.hash = 'muro';
            // console.log('*****************');
            // console.log(user.emailVerified);
            // console.log('*****************');
          } else {
            const errorVerified = document.querySelector('#wrongpassword');
            errorVerified.innerHTML = 'tu correo no esta verificado';
            errorVerified.style.color = 'red';
          }
        });
      })
      .catch((err) => {
        const wrongLoginPassword = document.querySelector('#wrongpassword');
        const wrongLoginEmail = document.querySelector('#wrongemail');
        if (
          err.message
          === 'The password is invalid or the user does not have a password.'
        ) {
          wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
          wrongLoginPassword.style.color = 'red';
        }
        if (
          err.message
          === 'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
          wrongLoginEmail.style.color = 'red';
        }
      });
  });
};

// Logearse con google
const gogleaRegistro = () => {
  const auth = firebase.auth();
  const googleButton = document.querySelector('#google-login');
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(firebase.auth().currentUser);
    // Si hay sesion activa , desloguea antes de loguear
    // nuevamente, sino sigue el flujo normal de login con google
    if (firebase.auth().currentUser) {
      auth.signOut().then(() => {
        // console.log('DESLOGUEANDO');
        googleRegister().then(() => {
          if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser.providerData[0];
            // console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
            validateEmail(user);
            // console.log(user);
          }
        });
      });
    } else {
      googleRegister().then(() => {
        if (firebase.auth().currentUser) {
          const user = firebase.auth().currentUser.providerData[0];
          // console.log('te logueaste con google', firebase.auth().currentUser.providerData[0]);
          validateEmail(user);
        }
      });
    }
  });
  // Termina login google con firebase
}; // ----------

// boton 'cancel'
const botonCancelarRegistro = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    window.location.hash = 'login';
    // showSeccion();
  });
}; // ---------------

// NUEVA PUBLICACION
const crearPost = () => {
  const publiPost = document.querySelector('#publiPost');
  publiPost.addEventListener('click', (e) => {
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
      costoInput.value !== ''
      && diasInput.value !== ''
      && nochesInput.value !== ''
      && personasInput.value !== ''
      && ninosInput.value !== ''
      && tituloPost.value !== ''
      && contenidoPost.value !== ''
      && locacionInput.value !== ''
    ) {
      const likes = [];
      const sistemaFecha = new Date();
      const day = sistemaFecha.getDate();
      const mes = sistemaFecha.getMonth() + 1;
      const ano = sistemaFecha.getFullYear();
      const fecha = `${day}/${mes}/${ano}`;
      // console.log(fecha);

      const email = JSON.parse(localStorage.getItem('user')).email;
      const username = JSON.parse(localStorage.getItem('user')).displayName;
      const userId = JSON.parse(localStorage.getItem('user')).uid;
      const photoUser = JSON.parse(localStorage.getItem('user')).photoURL;

      addPost(costoInput.value, diasInput.value, nochesInput.value, personasInput.value,
        ninosInput.value, tituloPost.value, contenidoPost.value, locacionInput.value,
        email, username, userId, likes, fecha, photoUser)
        .then(() => { window.location.hash = 'muro'; });

      // console.log(tituloPost, contenidoPost);
    } else {
      const mensaje = document.querySelector('#mensajeValidacion');
      mensaje.innerHTML = 'Por favor llena todos los campos';
      mensaje.style.color = 'red';
      mensaje.style.fontSize = '18px';
    }
  });
};

const dataPost = () => {
  const locacionTravel = document.querySelector('#viewLocation');
  const tituloTravel = document.querySelector('#viewTitulo');
  const costoTravel = document.querySelector('#viewCosto');
  const diasTravel = document.querySelector('#viewDias');
  const nochesTravel = document.querySelector('#viewNoches');
  const personasTravel = document.querySelector('#viewPersonas');
  const ninosTravel = document.querySelector('#viewNinos');
  const contenidoTravel = document.querySelector('#viewContenido');
  const userEmailPost = document.querySelector('#userEmailPost');
  const fechaPost = document.querySelector('#fechaPost');
  const pepe = document.querySelector('#pepe');

  const post = JSON.parse(localStorage.getItem('postSelected'));
  const userLogged = JSON.parse(localStorage.getItem('user'));

  fs.collection('publicaciones').doc(post.idPost).get().then((ele) => {
    // console.log(ele.data());
    const nombre = ele.data();

    locacionTravel.innerHTML = nombre.locacionInput;
    tituloTravel.innerHTML = nombre.tituloPost;
    costoTravel.innerHTML = nombre.costoInput;
    diasTravel.innerHTML = nombre.diasInput;
    nochesTravel.innerHTML = nombre.nochesInput;
    personasTravel.innerHTML = nombre.personasInput;
    ninosTravel.innerHTML = nombre.ninosInput;
    contenidoTravel.innerHTML = nombre.contenidoPost;
    userEmailPost.innerHTML = nombre.username;
    fechaPost.innerHTML = nombre.fecha;
    pepe.setAttribute('src', nombre.photoUser);

    const postOptions = document.querySelector('#optionPost');
    if (userLogged.uid !== nombre.userId) {
      postOptions.style.display = 'none';
    }
  });

  // ACTUALIZAR LIKES
  const likesCounter = document.querySelector('.contadorLikes');
  const postTotalLikes = (doc) => {
    const postId = JSON.parse(localStorage.getItem('postSelected')).idPost;
    likesCounter.innerHTML = '';
    const elDiv = document.createElement('div');
    const divTemplate = `
                      <i class='fas fa-heart  ${doc.likes.includes(userLogged.uid) ? 'liked' : 'unliked'}'></i><span class='totalLikes'>${doc.likes.length}</span>`;
    elDiv.innerHTML = divTemplate;
    const likes = elDiv.querySelector('.fa-heart');
    likes.addEventListener('click', () => {
      const result = doc.likes.indexOf(userLogged.uid);
      if (result === -1) {
        const postLikes = doc.likes;
        postLikes.push(userLogged.uid);
        fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      } else {
        const postLikes = doc.likes;
        postLikes.splice(result, 1);
        fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      }
    });
    likesCounter.appendChild(elDiv);
  };
  fs.collection('publicaciones').doc(post.idPost).onSnapshot((snapshot) => {
    // console.log(snapshot.data());
    postTotalLikes(snapshot.data());
  });
};

const editadoPost = () => {
  const post = JSON.parse(localStorage.getItem('postSelected'));
  const locacionTravel = document.querySelector('#editLocation');
  const tituloTravel = document.querySelector('#editTitulo');
  const costoTravel = document.querySelector('#editCosto');
  const diasTravel = document.querySelector('#editDias');
  const nochesTravel = document.querySelector('#editNoches');
  const personasTravel = document.querySelector('#editPersonas');
  const ninosTravel = document.querySelector('#editNinos');
  const contenidoTravel = document.querySelector('#editContenido');
  const idUsername = document.querySelector('#idUsername');

  locacionTravel.value = post.locationPost;
  tituloTravel.value = post.titlePost;
  costoTravel.value = post.costoPost;
  diasTravel.value = post.diasPost;
  nochesTravel.value = post.nochesPost;
  personasTravel.value = post.peoplePost;
  ninosTravel.value = post.ninosPost;
  contenidoTravel.value = post.contentPost;

  fs.collection('publicaciones').doc(post.idPost).get().then((ele) => {
    const nombre = ele.data();
    idUsername.innerHTML = nombre.username;
  });
};

// funcion guardar editado del post
const savePost = () => {
  const buttonGuardar = document.querySelector('#guardarPost');

  buttonGuardar.addEventListener('click', () => {
    const locacionTravel = document.querySelector('#editLocation').value;
    const tituloTravel = document.querySelector('#editTitulo').value;
    const costoTravel = document.querySelector('#editCosto').value;
    const diasTravel = document.querySelector('#editDias').value;
    const nochesTravel = document.querySelector('#editNoches').value;
    const personasTravel = document.querySelector('#editPersonas').value;
    const ninosTravel = document.querySelector('#editNinos').value;
    const contenidoTravel = document.querySelector('#editContenido').value;
    const post = JSON.parse(localStorage.getItem('postSelected'));
    fsUpdate(post.idPost, locacionTravel, tituloTravel, costoTravel, diasTravel, nochesTravel,
      ninosTravel, personasTravel, contenidoTravel).then(() => {
      // console.log('editaste el post')
      window.location.hash = 'muro';
    });
  });
};

// funcion eliminar Post
const removePost = () => {
  const post = JSON.parse(localStorage.getItem('postSelected'));
  const buttonRemove = document.querySelector('#textRemovePost');
  buttonRemove.addEventListener('click', () => {
    deletePost(post.idPost).then(() => {
      // console.log('eliminaste el post')
      window.location.hash = 'muro';
    });
  });
};

// crear la funcion mostrar seccion
const showSeccion = (ruta) => {
  secciones.innerHTML = '';
  function setHash(seccion) {
    secciones.innerHTML = seccion;
  }
  switch (ruta) {
    case '#login': {
      setHash(createLogin);
      mostrarContraseña();
      botonLogin();
      gogleaRegistro();
      // console.log('hola estoy en login');
      break;
    }
    case '#signup': {
      setHash(createSignup);
      botonCancelarRegistro();
      validarRegistro();
      // console.log('hola estoy en regsitro');
      break;
    }
    case '#newpost': {
      setHash(createNewPost);
      crearPost();
      cerrarSesion();
      // console.log('hola estoy en crear post');
      break;
    }

    case '#viewpost': {
      secciones.innerHTML = viewPost;
      window.addEventListener('hashchange', dataPost());
      showCommentary();
      dataPost();
      funcionModal();
      removePost();
      cerrarSesion();
      // console.log('hola estoy en ver post');
      break;
    }

    case '#editpost': {
      secciones.innerHTML = editPost;
      editadoPost();
      savePost();
      cerrarSesion();
      // console.log('hola estoy en crear post');
      break;
    }
    case '#muro': {
      secciones.innerHTML = createMuro;
      showFsPost();
      cerrarSesion();
      // console.log('hola estoy en muro');
      break;
    }
    case '#profile': {
      secciones.innerHTML = pageprofile;
      setProfileAttributes();
      showMyPosts();
      cerrarSesion();
      // console.log('hola estoy en profile');
      break;
    }
    case '': {
      secciones.innerHTML = createLogin;
      mostrarContraseña();
      botonLogin();
      gogleaRegistro();
      // console.log('hola estoy en login');
      break;
    }
    case '/': {
      secciones.innerHTML = createLogin;
      mostrarContraseña();
      botonLogin();
      gogleaRegistro();
      // console.log('hola estoy en login');
      break;
    }
    default: {
      secciones.innerHTML = pageNotFound;
      break;
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
  window.addEventListener('hashchange', () => showSeccion(window.location.hash));
};
// función que muestra la vista al momento de recargar
window.addEventListener('load', userLoggedIn);
//-------------

// FLECHAS DE ATRAS Y ADELANTE
window.addEventListener('popstate', () => {
  // console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state);
  // console.log('POPOPOPOPOP');
  if (window.location.pathname === 'login') {
    secciones.innerHTML = createLogin;
    // console.log(' LOGIN');
  } else if (window.location.pathname === 'signup') {
    secciones.innerHTML = createSignup;
    // console.log(' REGISTRO');
  }
}); // -----------

// funcion de editar post
