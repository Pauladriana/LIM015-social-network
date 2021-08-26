import {createLogin, createSignup, createMuro} from './logingroup.js';
import {createNewPost, viewPost, editPost} from './postgroup.js';
import {showAuthUsers} from './authuser.js';
import {showFsPost, showMyPosts} from './fsPost.js';
import {cerrarSesion} from './logout.js';
import {googleRegister, loginWithEmail} from './login.js';
import {validarRegistro} from './validaciones.js';
import {showCommentary} from './comentario.js';
import {addPost, fsUpdate, deletePost, getPubli} from './post.js';
import {pageNotFound} from './notfound.js';
import {pageprofile, setProfileAttributes} from './profile.js';

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
        cerrarSesion(),
        console.log('hola estoy en crear post')
      );
    }

    case '#viewpost': {
      return (
        (secciones.innerHTML = viewPost),
        window.addEventListener('hashchange', dataPost()),
        showCommentary(),
        dataPost(),
        funcionModal(),
        removePost(),
        cerrarSesion(),
        console.log('hola estoy en ver post')
      );
    }
    case '#editpost': {
      return (
        (secciones.innerHTML = editPost),
        editadoPost(),
        savePost(),
        cerrarSesion(),
        console.log('hola estoy en crear post')
      );
    }
    case '#muro': {
      return (
        (secciones.innerHTML = createMuro),
        showFsPost(),
        // showAuthUsers(),
        cerrarSesion(),
        console.log('hola estoy en muro')
      );
    }
    case '#profile': {
      return (
        (secciones.innerHTML = pageprofile),
        setProfileAttributes(),
        showMyPosts(),
        cerrarSesion(),
        console.log('hola estoy en profile')
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
      return (
        (secciones.innerHTML = pageNotFound)
      );
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
            console.log('logueo exitoso', user);
            localStorage.setItem('user', JSON.stringify(user.providerData[0]));
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
        localStorage.setItem('user', JSON.stringify(user));
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
          localStorage.setItem('user', JSON.stringify(user));
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
            console.log(user);
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
      const likes = [];
      const sistemaFecha = new Date();
      const hora = sistemaFecha.getHours();
      const minutos = sistemaFecha.getMinutes();
      const day = sistemaFecha.getDate();
      const mes = sistemaFecha.getMonth()+1;
      const ano = sistemaFecha.getFullYear();
      const fecha = day+ '/' + mes + '/' + ano;
      console.log(fecha);

      const email = JSON.parse(localStorage.getItem('user')).email;
      const username = JSON.parse(localStorage.getItem('user')).displayName;
      const userId = JSON.parse(localStorage.getItem('user')).uid;
      const response = fs.collection('publicaciones').doc().set({
        costoInput,
        diasInput,
        nochesInput,
        personasInput,
        ninosInput,
        tituloPost,
        contenidoPost,
        locacionInput,
        email,
        username,
        userId,
        likes,
        fecha
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

const dataPost = () => {
  let imagUsuario = document.querySelector('#pepe');
  let locacionTravel = document.querySelector('#viewLocation');
  let tituloTravel = document.querySelector('#viewTitulo');
  let costoTravel = document.querySelector('#viewCosto');
  let diasTravel = document.querySelector('#viewDias');
  let nochesTravel = document.querySelector('#viewNoches');
  let personasTravel = document.querySelector('#viewPersonas');
  let ninosTravel = document.querySelector('#viewNinos');
  let contenidoTravel = document.querySelector('#viewContenido');
  let userEmailPost = document.querySelector('#userEmailPost');
  let fechaPost = document.querySelector('#fechaPost');
  let likesPost = document.querySelector('#likesPost');
  let comentsPost = document.querySelector('#comentsPost');

    /*locacionTravel.innerHTML = localStorage.getItem('locacion');
    tituloTravel.innerHTML = localStorage.getItem('titulo');
    costoTravel.innerHTML = localStorage.getItem('costo');
    diasTravel.innerHTML = localStorage.getItem('dias');
    nochesTravel.innerHTML = localStorage.getItem('noches');
    personasTravel.innerHTML = localStorage.getItem('personas');
    ninosTravel.innerHTML = localStorage.getItem('ninos');
    contenidoTravel.innerHTML = localStorage.getItem('contenido');*/
    let post = JSON.parse(localStorage.getItem('postSelected'));
    let userLogged = JSON.parse(localStorage.getItem('user'));

  fs.collection('publicaciones').doc(post.idPost).get().then((ele)=>{
    console.log(ele.data());
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

    const postOptions = document.querySelector('#optionPost')
    if(userLogged.uid !== nombre.userId){
      postOptions.style.display = 'none'
    }
  });


  //ACTUALIZAR LIKES 
  const likesCounter = document.querySelector('.contadorLikes');
  const postTotalLikes = (doc) => {
    let postId = JSON.parse(localStorage.getItem('postSelected')).idPost;
    likesCounter.innerHTML = '';
    const elDiv = document.createElement('div');
    const divTemplate = `
                      <i class="fas fa-heart  ${
                        doc.likes.includes(userLogged.uid) ? 'liked' : 'unliked'
                      }"></i><span class='totalLikes'>${doc.likes.length}</span>`;
    elDiv.innerHTML = divTemplate;
    const likes = elDiv.querySelector('.fa-heart');
    likes.addEventListener( 'click', () => {
      const result = doc.likes.indexOf(userLogged.uid);
      if (result === -1) {
        let postLikes = doc.likes
        postLikes.push(userLogged.uid);
        fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      } else {
        let postLikes = doc.likes
        postLikes.splice(result, 1);
        fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      }
    });
    likesCounter.appendChild(elDiv);
  };
  fs.collection('publicaciones').doc(post.idPost).onSnapshot(snapshot => {
    console.log(snapshot.data());
    postTotalLikes(snapshot.data())
  })
  

}





// Modales - editar-eliminar y mensaje de confirmacion
const funcionModal = () => {
  const showModal = document.querySelector('#optionPost');
  const modalEditRemove = document.querySelector('#modalEditRemove');
  const closeModal = document.querySelector('#closeModalEditRomve'); 
  
  // mostrar el modal
  showModal.addEventListener("click", () => {
    modalEditRemove.style.display = "flex";
  });
  
  // cerrar el modal
  closeModal.addEventListener("click", ()=> {
    modalEditRemove.style.display = "none";
  })
  
  const show = document.querySelector('#ShowModalConfirmation');
  const modal = document.querySelector('#modalRemove');
  const close = document.querySelector('#closeModal'); 
  
  // mostrar el modal
  show.addEventListener("click", () => {
    modal.style.display = "flex";
    modalEditRemove.style.display = "none";
  });
  
  // cerrar el modal
  close.addEventListener("click", ()=> {
    modal.style.display = "none";
  })
  // fin de los modales
}
  // funcion eliminar Post
  const removePost = () => {
    let post = JSON.parse(localStorage.getItem('postSelected'));
    const buttonRemove = document.querySelector('#textRemovePost');
    buttonRemove.addEventListener("click", () => {
      deletePost(post.idPost).then(() => {
        console.log('eliminaste el post')
        window.location.hash = 'muro';
      })
    })
  }

  // funcion de editar post

  const editadoPost = () => {
    let post = JSON.parse(localStorage.getItem('postSelected'));

    let locacionTravel = document.querySelector('#editLocation');
    let tituloTravel = document.querySelector('#editTitulo');
    let costoTravel = document.querySelector('#editCosto');
    let diasTravel = document.querySelector('#editDias');
    let nochesTravel = document.querySelector('#editNoches');
    let personasTravel = document.querySelector('#editPersonas');
    let ninosTravel = document.querySelector('#editNinos');
    let contenidoTravel = document.querySelector('#editContenido');
    let idUsername = document.querySelector('#idUsername');
  
      locacionTravel.value = post.locationPost;
      tituloTravel.value = post.titlePost;
      costoTravel.value = post.costoPost;
      diasTravel.value = post.diasPost;
      nochesTravel.value = post.nochesPost;
      personasTravel.value = post.peoplePost;
      ninosTravel.value = post.ninosPost;
      contenidoTravel.value = post.contentPost;

      fs.collection('publicaciones').doc(post.idPost).get().then((ele)=>{
        const nombre = ele.data();
        
        idUsername.innerHTML = nombre.username;
      });  
    
  }

  // funcion guardar editado del post 
const savePost = () => {
  const buttonGuardar = document.querySelector('#guardarPost');

  buttonGuardar.addEventListener('click', () => {
    let locacionTravel = document.querySelector('#editLocation').value;
    let tituloTravel = document.querySelector('#editTitulo').value;;
    let costoTravel = document.querySelector('#editCosto').value;;
    let diasTravel = document.querySelector('#editDias').value;;
    let nochesTravel = document.querySelector('#editNoches').value;;
    let personasTravel = document.querySelector('#editPersonas').value;;
    let ninosTravel = document.querySelector('#editNinos').value;;
    let contenidoTravel = document.querySelector('#editContenido').value;;

    let post = JSON.parse(localStorage.getItem('postSelected'));
    fsUpdate(post.idPost,locacionTravel, tituloTravel, costoTravel, diasTravel, nochesTravel, ninosTravel, personasTravel, contenidoTravel).then(() => {
      console.log('editaste el post')
      window.location.hash = 'muro';
    });
 });
}
