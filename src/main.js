import { createLogin, createSignup, createHome } from './logingroup.js';
import { createNewPost, viewPost, editPost } from './postgroup.js';
// import { showAuthUsers } from './authuser.js';
import { showFsPost, showMyPosts } from './fsPost.js';
import { signOff } from './logout.js';
import { googleRegister, loginWithEmail } from './login.js';
import { registerValidation } from './validations.js';
import { showCommentary } from './comments.js';
import { addPost, fsUpdate, deletePost } from './post.js';
import { pageNotFound } from './notfound.js';
import { pageprofile, setProfileAttributes } from './profile.js';

const fs = firebase.firestore();
const segments = document.querySelector('#segments');

// RUTA SIN #
/* const changeRoute = (hash) => {
  if (hash === '#login'){
    window.location.hash = '/login';
  } else if (hash === '#signup'){
    window.location.hash = 'signup';
  } else if (hash === '#home'){
    window.location.hash = 'muro';
  }
}; */

// funcion mostrar contraseña
const showingPassword = () => {
  const showPassword = document.querySelector('#show-password');
  showPassword.addEventListener('change', () => {
    const passwordFirst = document.querySelector('#login-password');
    if (passwordFirst.type === 'text') {
      passwordFirst.type = 'password';
    } else {
      passwordFirst.type = 'text';
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
        window.location.hash = 'home';
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
            window.location.hash = 'home';
            // console.log('Este es el nuevo usuario: ' + docRef.id);
          })
          .catch(() => {
            // console.log('Tienes el siguiente error: ' + error);
          });
      }
    });
};

// Modales - editar-eliminar y mensaje de confirmacion
const modalFunction = () => {
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
const loginClick = () => {
  const loginButton = document.querySelector('#login-button');
  // const loginForm = document.querySelector('#login-form');
  loginButton.addEventListener('click', (e) => {
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
            window.location.hash = 'home';
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
const googleRegistration = () => {
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
const cancelRegistration = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
    window.location.hash = 'login';
    // showSeccion();
  });
}; // ---------------

// NUEVA PUBLICACION
const addNewPost = () => {
  const sharePost = document.querySelector('#sharePost');
  sharePost.addEventListener('click', (e) => {
    e.preventDefault();

    // llamar a los inputs
    const inputCost = document.querySelector('#inputCost');
    const inputDay = document.querySelector('#inputDay');
    const inputNight = document.querySelector('#inputNight');
    const inputPeople = document.querySelector('#inputPeople');
    const inputChild = document.querySelector('#inputChild');
    const postTitle = document.querySelector('#postTitle');
    const postContent = document.querySelector('#postContent');
    const locationInput = document.querySelector('#locationInput');

    if (
      inputCost.value !== ''
      && inputDay.value !== ''
      && inputNight.value !== ''
      && inputPeople.value !== ''
      && inputChild.value !== ''
      && postTitle.value !== ''
      && postContent.value !== ''
      && locationInput.value !== ''
    ) {
      const likes = [];
      const dateSystem = new Date();
      const day = dateSystem.getDate();
      const month = dateSystem.getMonth() + 1;
      const year = dateSystem.getFullYear();
      const totalDate = `${day}/${month}/${year}`;
      // console.log(totalDate);

      const email = JSON.parse(localStorage.getItem('user')).email;
      const username = JSON.parse(localStorage.getItem('user')).displayName;
      const userId = JSON.parse(localStorage.getItem('user')).uid;
      const photoUser = JSON.parse(localStorage.getItem('user')).photoURL;

      addPost(inputCost.value, inputDay.value, inputNight.value, inputPeople.value,
        inputChild.value, postTitle.value, postContent.value, locationInput.value,
        email, username, userId, likes, totalDate, photoUser)
        .then(() => { window.location.hash = 'home'; });

      // console.log(postTitle, postContent);
    } else {
      const addPostAlert = document.querySelector('#validationAlert');
      addPostAlert.innerHTML = 'Por favor llena todos los campos';
      addPostAlert.style.color = 'red';
      addPostAlert.style.fontSize = '18px';
    }
  });
};

const dataPost = () => {
  const viewLocation = document.querySelector('#viewLocation');
  const viewTitle = document.querySelector('#viewTitle');
  const viewCost = document.querySelector('#viewCost');
  const viewDays = document.querySelector('#viewDays');
  const viewNight = document.querySelector('#viewNight');
  const viewPeople = document.querySelector('#viewPeople');
  const viewchild = document.querySelector('#viewchild');
  const viewContent = document.querySelector('#viewContent');
  const userEmailPost = document.querySelector('#userEmailPost');
  const postDate = document.querySelector('#postDate');
  const veiwPhoto = document.querySelector('#veiwPhoto');

  const post = JSON.parse(localStorage.getItem('postSelected'));
  const userLogged = JSON.parse(localStorage.getItem('user'));

  fs.collection('publicaciones').doc(post.idPost).get().then((ele) => {
    // console.log(ele.data());
    const postObject = ele.data();

    viewLocation.innerHTML = postObject.locacionInput;
    viewTitle.innerHTML = postObject.tituloPost;
    viewCost.innerHTML = postObject.costoInput;
    viewDays.innerHTML = postObject.diasInput;
    viewNight.innerHTML = postObject.nochesInput;
    viewPeople.innerHTML = postObject.personasInput;
    viewchild.innerHTML = postObject.ninosInput;
    viewContent.innerHTML = postObject.contenidoPost;
    userEmailPost.innerHTML = postObject.username;
    postDate.innerHTML = postObject.fecha;
    veiwPhoto.setAttribute('src', postObject.photoUser);

    const postOptions = document.querySelector('#optionPost');
    if (userLogged.uid !== postObject.userId) {
      postOptions.style.display = 'none';
    }
  });

  // ACTUALIZAR LIKES
  const likesCounter = document.querySelector('.likesCounter');
  const postTotalLikes = (doc) => {
    const postId = JSON.parse(localStorage.getItem('postSelected')).idPost;
    likesCounter.innerHTML = '';
    const theDiv = document.createElement('div');
    const divTemplate = `
                      <i class='fas fa-heart  ${doc.likes.includes(userLogged.uid) ? 'liked' : 'unliked'}'></i><span class='totalLikes'>${doc.likes.length}</span>`;
    theDiv.innerHTML = divTemplate;
    const likes = theDiv.querySelector('.fa-heart');
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
    likesCounter.appendChild(theDiv);
  };
  fs.collection('publicaciones').doc(post.idPost).onSnapshot((snapshot) => {
    // console.log(snapshot.data());
    postTotalLikes(snapshot.data());
  });
};

const postEditing = () => {
  const post = JSON.parse(localStorage.getItem('postSelected'));
  const editLocation = document.querySelector('#editLocation');
  const editTitle = document.querySelector('#editTitle');
  const editCost = document.querySelector('#editCost');
  const editDays = document.querySelector('#editDays');
  const editNight = document.querySelector('#editNight');
  const editPeople = document.querySelector('#editPeople');
  const editchild = document.querySelector('#editchild');
  const editContent = document.querySelector('#editContent');
  const idUsername = document.querySelector('#idUsername');

  editLocation.value = post.locationPost;
  editTitle.value = post.titlePost;
  editCost.value = post.costPost;
  editDays.value = post.daysPost;
  editNight.value = post.nightPost;
  editPeople.value = post.peoplePost;
  editchild.value = post.kidsPost;
  editContent.value = post.contentPost;

  fs.collection('publicaciones').doc(post.idPost).get().then((ele) => {
    const postObj = ele.data();
    idUsername.innerHTML = postObj.username;
  });
};

// funcion guardar editado del post
const savePost = () => {
  const savePostButton = document.querySelector('#saveThePost');

  savePostButton.addEventListener('click', () => {
    const saveLocation = document.querySelector('#editLocation').value;
    const savetitle = document.querySelector('#editTitle').value;
    const saveCost = document.querySelector('#editCost').value;
    const saveDays = document.querySelector('#editDays').value;
    const saveNight = document.querySelector('#editNight').value;
    const savePeople = document.querySelector('#editPeople').value;
    const saveChild = document.querySelector('#editchild').value;
    const saveContent = document.querySelector('#editContent').value;
    const post = JSON.parse(localStorage.getItem('postSelected'));
    fsUpdate(post.idPost, saveLocation, savetitle, saveCost, saveDays, saveNight,
      saveChild, savePeople, saveContent).then(() => {
      // console.log('editaste el post')
      window.location.hash = 'home';
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
      window.location.hash = 'home';
    });
  });
};

// crear la funcion mostrar seccion
const showSeccion = (route) => {
  segments.innerHTML = '';
  function setHash(seccion) {
    segments.innerHTML = seccion;
  }
  switch (route) {
    case '#login': {
      setHash(createLogin);
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    case '#signup': {
      setHash(createSignup);
      cancelRegistration();
      registerValidation();
      // console.log('hola estoy en regsitro');
      break;
    }
    case '#newpost': {
      setHash(createNewPost);
      addNewPost();
      signOff();
      // console.log('hola estoy en crear post');
      break;
    }

    case '#viewpost': {
      segments.innerHTML = viewPost;
      window.addEventListener('hashchange', dataPost());
      showCommentary();
      dataPost();
      modalFunction();
      removePost();
      signOff();
      // console.log('hola estoy en ver post');
      break;
    }

    case '#editpost': {
      segments.innerHTML = editPost;
      postEditing();
      savePost();
      signOff();
      // console.log('hola estoy en crear post');
      break;
    }
    case '#home': {
      segments.innerHTML = createHome;
      showFsPost();
      signOff();
      // console.log('hola estoy en muro');
      break;
    }
    case '#profile': {
      segments.innerHTML = pageprofile;
      setProfileAttributes();
      showMyPosts();
      signOff();
      // console.log('hola estoy en profile');
      break;
    }
    case '': {
      segments.innerHTML = createLogin;
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    case '/': {
      segments.innerHTML = createLogin;
      showingPassword();
      loginClick();
      googleRegistration();
      // console.log('hola estoy en login');
      break;
    }
    default: {
      segments.innerHTML = pageNotFound;
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
    segments.innerHTML = createLogin;
    // console.log(' LOGIN');
  } else if (window.location.pathname === 'signup') {
    segments.innerHTML = createSignup;
    // console.log(' REGISTRO');
  }
}); // -----------

// funcion de editar post
