//CREAR PUBLICACION
export const addPost = (costo, dias, noches, personas, ninos, titulo, contenido, locacion) => {
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
    likes: []
  });
}
//MODIFICAR PUBLICACION
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
  contenidoPost: newCon
  });
}
//ELIMINAR PUBLICACION
export const deletePost = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).delete();
}

//TRAER PUBLICACIONES
export const getPubli = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).get()
}

export const countLikes = (idPost, likes) => {
  // Obtener acceso a Firestore
  const fs = firebase.firestore();
  return fs.collection('post').doc(idPost).update({ likes });
};