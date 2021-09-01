// CREAR PUBLICACION
export const addPost = (costo, dias, noches, personas, ninos, titulo, contenido, locacion, eMail,
  userName, userUid, likesPost, fechaPost, photoUserPost) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc().set({
    costoInput: costo,
    diasInput: dias,
    nochesInput: noches,
    personasInput: personas,
    ninosInput: ninos,
    tituloPost: titulo,
    contenidoPost: contenido,
    locacionInput: locacion,
    email: eMail,
    username: userName,
    userId: userUid,
    likes: likesPost,
    fecha: fechaPost,
    photoUser: photoUserPost,
  });
};
// MODIFICAR PUBLICACION
export const fsUpdate = (id, newLoc, newTit, newCos, newDia, newNoc, newNin, newPer, newCon) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).update({
    locacionInput: newLoc,
    tituloPost: newTit,
    costoInput: newCos,
    diasInput: newDia,
    nochesInput: newNoc,
    ninosInput: newNin,
    personasInput: newPer,
    contenidoPost: newCon,
  });
};
// ELIMINAR PUBLICACION
export const deletePost = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).delete();
};

// TRAER PUBLICACIONES
export const getPost = () => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones');
};
// DAR LIKE A UN POST
export const postLike = (idPost, idUser) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(idPost).update({ likes: [idUser] });
};
// AGREGAR UN COMENTARIO
export const addComment = (postId, username, contenido, photoUser) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(postId).collection('comentarios').add({
    usuario: username,
    comentario: contenido,
    photoUrl: photoUser,
  });
};
// TRAER COMENTARIOS
export const getComments = (idPost) => {
  const fs = firebase.firestore();
  return fs
    .collection('post')
    .doc(idPost)
    .collection('comments');
};
