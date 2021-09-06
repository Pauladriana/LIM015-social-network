import { addComment, getComments } from '../controller/post.js';

export const showCommentary = () => {
  const posts = document.querySelector('#commentary');
  const userName = JSON.parse(localStorage.getItem('user')).displayName;
  const userPhoto = JSON.parse(localStorage.getItem('user')).photoURL;
  const boxCommentary = `
    <div class='imageAndComment'>
      <img src='${userPhoto}' alt='' class='userComment' id='userComment'>
        <div class='userAndComment' >
        <h2>${userName}</h2>
        <input class='commentaryContent' id='commentaryContent' placeholder='Comenta...' autofocus></input>
        </div>
    </div>
    <button id='sendCommentary'>Enviar</button>
    <div class='allComments' id='allComments'>
    </div>`;
  posts.innerHTML = boxCommentary;

  const buttonSendCommentary = document.querySelector('#sendCommentary');
  const allComments = document.querySelector('#allComments');
  const postId = JSON.parse(localStorage.getItem('postSelected')).idPost;
  const username = JSON.parse(localStorage.getItem('user')).displayName;

  // Suma de comentarios
  const commentsCounter = document.querySelector('.commentaryCounter');
  const totalOfComments = (docs) => {
    commentsCounter.innerHTML = '';
    const theDiv = document.createElement('div');
    const divTemplate = `
                          <i class='far fa-comment'></i>
                          <span id='comentsPost'>${docs.length}</span>`;
    theDiv.innerHTML = divTemplate;
    commentsCounter.appendChild(theDiv);
  };
  getComments(postId)
    .onSnapshot((snapshot) => {
      // console.log(snapshot.docs);
      totalOfComments(snapshot.docs);
    });

  // mostrar comentario
  getComments(postId)
    .onSnapshot((querySnapshop) => {
      allComments.innerHTML = '';
      querySnapshop.forEach((doc) => {
        allComments.innerHTML += `
            <div class='imageAndComment comentUser'>
              <img src='${doc.data().photoUrl
}' alt='' class='userComment' id='userComment'>
              <div class='userAndCommentResponse'>
                <h2>${doc.data().usuario}</h2>
                <p class='commentaryContent'>${doc.data().comentario}</p>
              </div>
            </div>
          `;
      });
    });

  buttonSendCommentary.addEventListener('click', (e) => {
    e.preventDefault();
    const commentary = document.querySelector('#commentaryContent').value;
    addComment(postId, username, commentary, userPhoto);
    document.querySelector('#commentaryContent').value = '';
  });
};
