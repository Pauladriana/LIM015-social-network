// CREAR PUBLICACION
export const addPost = (cost, days, nights, people, children, title, content, location, eMail,
  userName, userUid, likesPost, date, photoUserPost) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc().set({
    costoInput: cost,
    diasInput: days,
    nochesInput: nights,
    personasInput: people,
    ninosInput: children,
    tituloPost: title,
    contenidoPost: content,
    locacionInput: location,
    email: eMail,
    username: userName,
    userId: userUid,
    likes: likesPost,
    fecha: date,
    photoUser: photoUserPost,
  });
};
// MODIFICAR PUBLICACION
export const fsUpdate = (id, newLoc, newTit, newCos, newDay, newNight,
  newkids, newPeople, newCont) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).update({
    locacionInput: newLoc,
    tituloPost: newTit,
    costoInput: newCos,
    diasInput: newDay,
    nochesInput: newNight,
    ninosInput: newkids,
    personasInput: newPeople,
    contenidoPost: newCont,
  });
};
// ELIMINAR PUBLICACION
export const deletePost = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).delete();
};

// TRAER PUBLICACIONES
export const getPost = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).get();
};
export const getPublications = () => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones');
};
// DAR LIKE A UN POST
export const postLike = (idPost, array) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(idPost).update({ likes: array });
};
// AGREGAR UN COMENTARIO
export const addComment = (postId, username, content, photoUser) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(postId).collection('comentarios').add({
    usuario: username,
    comentario: content,
    photoUrl: photoUser,
  });
};
// TRAER COMENTARIOS
export const getComments = (idPost) => {
  const fs = firebase.firestore();
  return fs
    .collection('publicaciones')
    .doc(idPost)
    .collection('comentarios');
};
