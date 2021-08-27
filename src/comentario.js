// agregar seccion de comentario a viewpost 
// const fs = firebase.firestore(); -> se encuentra en el index -> es la base de datos

export const showCommentary = () => {
  const publicaciones = document.querySelector('#commentary');
  let userId = JSON.parse(localStorage.getItem('user')).email;
  let userName = JSON.parse(localStorage.getItem('user')).displayName;
  let userPhoto = JSON.parse(localStorage.getItem('user')).photoURL;
    const boxCommentary = `
    <div class="imagenAndCommentary">
      <img src="${userPhoto}" alt="" class="usuarioCommentary" id="usuarioCommentary">
        <div class="usuarioAndCommentary" >
        <h2>${userName}</h2>
        <input class="contenidoCommentary" id="contenidoCommentary" placeholder="Comenta..." autofocus></input>
        </div>
    </div>
    <button id="sendCommentary">Enviar</button>
    <div class="allComments" id="allComments">
    </div>
                    `; 
  publicaciones.innerHTML = boxCommentary;

    //variables globales 
    const buttonSendCommentary = document.querySelector('#sendCommentary');
    const allComments = document.querySelector('#allComments');
    let postId = JSON.parse(localStorage.getItem('postSelected')).idPost;
    const photoUser = JSON.parse(localStorage.getItem('user')).photoURL;
    const username = JSON.parse(localStorage.getItem('user')).displayName;
    
    // funciones
      /* crear comentario y guardar*/
    /*const crearItem = (comentario) => {
      console.log(localStorage.getItem('postId'));*/
    
    // funciones
      /* crear comentario y guardar*/
    const crearItem = (comentario) => {
      //fs.collection("comentarios").add({
      fs.collection("publicaciones").doc(postId).collection("comentarios").add({
        usuario: username,
        comentario: comentario,
        photoUrl: photoUser,

        
      })
      .then(function(docRef) {
        console.log("Se agrego correctamente ID:", docRef.id);
      })
      .catch(function(error) {
        console.log("Error agregando comentario:", error);
      }); 
    }
    /*Suma de comentarios*/
    const commentsCounter = document.querySelector('.contadorCommentary');
    const totalOfComments = (docs) => {
      commentsCounter.innerHTML = '';
      const elDiv = document.createElement('div');
      const divTemplate = `
                          <i class="far fa-comment"></i>
                          <span id="comentsPost">${docs.length}</span>`;
      elDiv.innerHTML = divTemplate;
      commentsCounter.appendChild(elDiv);
    }
    fs.collection('publicaciones').doc(postId).collection('comentarios').onSnapshot((snapshot)=>{
      console.log(snapshot.docs);
      totalOfComments(snapshot.docs)
    })

      /* mostrar comentario */
      fs.collection("publicaciones").doc(postId).collection("comentarios").onSnapshot((querySnapshop) => {
        allComments.innerHTML = "";
        querySnapshop.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().comentario}`);
          allComments.innerHTML += `
            <div class="imagenAndCommentary comentUser">
              <img src="${doc.data().photoUrl}" alt="" class="usuarioCommentary" id="usuarioCommentary">
              <div class="usuarioAndCommentaryRespt">
                <h2>${doc.data().usuario}</h2>
                <p class="contenidoCommentary">${doc.data().comentario}</p>
              </div>
            </div>
          `;
        });
      });

    // evenListener
    buttonSendCommentary.addEventListener('click', (e) => {
      e.preventDefault();
      const commentary = document.querySelector('#contenidoCommentary').value;
      console.log(commentary);
      crearItem(commentary);
      document.querySelector('#contenidoCommentary').value = "";
    });

}; 