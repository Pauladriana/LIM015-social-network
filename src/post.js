//CREAR PUBLICACION
export const addPost = (costo, dias, noches, personas, ninos, titulo, contenido, locacion) => {
  return fs.collection('publicaciones').doc().set({
    costoInput: costo,
    diasInput: dias,
    nochesInput: noches,
    personasInput: personas,
    ninosInput: ninos,
    tituloPost: titulo,
    contenidoPost: contenido,
    locacionInput: locacion
  });
}
//MODIFICAR PUBLICACION
export const fsUpdate = (id, newLoc, newTit, newCos, newDia, newNoc, newNin, newPer, newCon) => {
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
  return fs.collection('publicaciones').doc(id).delete();
}

//TRAER PUBLICACIONES
export const getPubli = (id) => {
  return fs.collection('publicaciones').doc(id).get()
}
