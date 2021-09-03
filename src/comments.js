export const showCommentary = () => {
  const fs = firebase.firestore();
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

  // crear comentario y guardar
  const crearItem = (comment) => {
    fs.collection('publicaciones')
      .doc(postId)
      .collection('comentarios')
      .add({
        usuario: username,
        comentario: comment,
        photoUrl: userPhoto,
      })
      .then(() => {
        // console.log('Se agrego correctamente ID:', docRef.id);
      })
      .catch(() => {
        // console.log('Error agregando comentario:', error);
      });
  };
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
  fs.collection('publicaciones')
    .doc(postId)
    .collection('comentarios')
    .onSnapshot((snapshot) => {
      // console.log(snapshot.docs);
      totalOfComments(snapshot.docs);
    });

  // mostrar comentario
  fs.collection('publicaciones')
    .doc(postId)
    .collection('comentarios')
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
    crearItem(commentary);
    document.querySelector('#commentaryContent').value = '';
  });
};
