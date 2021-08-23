// agregar seccion de comentario a viewpost 
// const fs = firebase.firestore(); -> se encuentra en el index -> es la base de datos

export const showCommentary = () => {
  const publicaciones = document.querySelector('#commentary');
    const boxCommentary = `
    <div class="imagenAndCommentary">
      <img src="./imagen/user.svg" alt="" class="usuarioCommentary" id="usuarioCommentary">
        <div class="usuarioAndCommentary" >
        <h2>Usuario2</h2>
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
    
    // funciones
      /* crear comentario y guardar*/
    const crearItem = (comentario) => {
      //fs.collection("comentarios").add({
      fs.collection("publicaciones").doc(localStorage.getItem('postId')).collection("comentarios").add({
        usuario: "usuario1",
        comentario: comentario
      })
      .then(function(docRef) {
        console.log("Se agrego correctamente ID:", docRef.id);
      })
      .catch(function(error) {
        console.log("Error agregando comentario:", error);
      }); 
    }
      /* mostrar comentario */
      fs.collection("publicaciones").doc(localStorage.getItem('postId')).collection("comentarios").onSnapshot((querySnapshop) => {
        allComments.innerHTML = "";
        querySnapshop.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().comentario}`);
          allComments.innerHTML += `
            <div class="imagenAndCommentary comentUser">
              <img src="./imagen/user.svg" alt="" class="usuarioCommentary" id="usuarioCommentary">
              <div class="usuarioAndCommentary">
                <p>${doc.data().usuario}</p>
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