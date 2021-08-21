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
                      `; 
    publicaciones.innerHTML = boxCommentary;

    // FUNCION DE ENVIAR DATOS A FIREBASE 
    const sendCommentary = (idPost, comment) => {
      return fs.collection('publicaciones').doc(idPost).collection('comentarios').add({
        fecha: new Date().toLocaleString('en-ES'),
        commentario: comment,
      });
    }
    
    // Eevento click enviar datos
    const buttonSendCommentary = document.querySelector('#sendCommentary');
    buttonSendCommentary.addEventListener('click', async (e) => {
    const commentary = document.querySelector('#contenidoCommentary');
    let comment = commentary.value;
    await sendCommentary(localStorage.getItem('postId'),comment).then(() => {
        comment = "";// limpia el input
        console.log('se envio el mensaje');
        getCommentary(localStorage.getItem('postId'));
        //commentary.focus(); // el cursor vuelve al input comentario
      });
      
    }); // fin del evento click

      // OBTENER COMENTARIO DEL FIREBASE - 23:03 del video
      
      

}; // fin de funcion

export const getCommentary = (idPost) => {
  fs.collection(`publicaciones/${idPost}/commentarios`).orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
          const comment = [];
          querySnapshot.forEach((doc) => {
              console.log(doc.data());
              //comment.push({ id: doc.id, ...doc.data() });
          });
          //callback(comment);
      });

};