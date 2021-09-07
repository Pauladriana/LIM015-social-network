// NUEVA PUBLICACION
import {
  addPost,
  deletePost,
  fsUpdate,
  getPost,
  postLike,
} from '../controller/post.js';

import {
  fs,
} from '../controller/firebaseSet.js';

export const addNewPost = () => {
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

export const dataPost = () => {
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

  getPost(post.idPost).then((ele) => {
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
        postLike(postId, postLikes);
        // fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      } else {
        const postLikes = doc.likes;
        postLikes.splice(result, 1);
        postLike(postId, postLikes);
        // fs.collection('publicaciones').doc(postId).update({ likes: postLikes });
      }
    });
    likesCounter.appendChild(theDiv);
  };
  fs.collection('publicaciones').doc(post.idPost).onSnapshot((snapshot) => {
    // console.log(snapshot.data());
    postTotalLikes(snapshot.data());
  });
};

export const postEditing = () => {
  const post = JSON.parse(localStorage.getItem('postSelected'));
  const editLocation = document.querySelector('#editLocation');
  const editTitle = document.querySelector('#editTitle');
  const editCost = document.querySelector('#editCost');
  const editDays = document.querySelector('#editDays');
  const editNight = document.querySelector('#editNight');
  const editPeople = document.querySelector('#editPeople');
  const editchild = document.querySelector('#editchild');
  const editContent = document.querySelector('#editContent');

  editLocation.value = post.locationPost;
  editTitle.value = post.titlePost;
  editCost.value = post.costPost;
  editDays.value = post.daysPost;
  editNight.value = post.nightPost;
  editPeople.value = post.peoplePost;
  editchild.value = post.kidsPost;
  editContent.value = post.contentPost;
};

// funcion guardar editado del post
export const savePost = () => {
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
export const removePost = () => {
  const post = JSON.parse(localStorage.getItem('postSelected'));
  const buttonRemove = document.querySelector('#textRemovePost');
  buttonRemove.addEventListener('click', () => {
    deletePost(post.idPost).then(() => {
      // console.log('eliminaste el post')
      window.location.hash = 'home';
    });
  });
};

export const modalFunction = () => {
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
