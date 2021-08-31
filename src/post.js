//CREAR PUBLICACION
export const addPost = (costo, dias, noches, personas, ninos, titulo, contenido, locacion, eMail, userName, userUid, likesPost, fechaPost, photoUserPost) => {
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
    photoUser: photoUserPost
  });
}
//MODIFICAR PUBLICACION
export const fsUpdate = (collection, id, newLoc, newTit, newCos, newDia, newNoc, newNin, newPer, newCon) => {
  const fs = firebase.firestore();
  return fs.collection(collection).doc(id).update({
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
export const deletePost = (collection, id) => {
  const fs = firebase.firestore();
  return fs.collection(collection).doc(id).delete();
}

//TRAER PUBLICACIONES
export const getPubli = (id) => {
  const fs = firebase.firestore();
  return fs.collection('publicaciones').doc(id).get()
}

export const countLikes = (collection, idPost, likes) => {
  // Obtener acceso a Firestore
  const fs = firebase.firestore();
  return fs.collection(collection).doc(idPost).update({ likes });
};

export const getPost = (callback) => {
  // Obtener acceso a Firestore
  const fs = firebase.firestore();
  return fs.collection('publicaciones')
    // querySnapshot es una colección de post (doc)
    // Obtener en tiempo real los datos del doc
    .onSnapshot((querySnapshot) => {
      // console.log('Colección(querySnapshot)', querySnapshot);
      const post = [];
      // Se rrecore el querySnapshot
      querySnapshot.forEach((doc) => {
        // console.log( 'info de los posts (doc) dentro del querySnapshot',
        //     doc.data(),
        //   );
      // Se agrega los valores que obtiene de cada post
        post.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // console.log('array de post', post);
      callback(post);
    });
};
