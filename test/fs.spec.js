import MockFirebase from 'mock-cloud-firestore';

import {
  addPost,
  fsUpdate,
  deletePost,
  getPublications,
  postLike,
  addComment,
  getComments,
  getPost,
} from '../src/controller/post.js';

const fixtureData = {
  __collection__: {
    publicaciones: {
      __doc__: {
        post1: {
          contenidoPost: 'Pudimos visitar Machu Picchu',
          costoInput: '300',
          diasInput: '6',
          locacionInput: 'Cusco',
          ninosInput: '1',
          nochesInput: '5',
          personasInput: '3',
          tituloPost: 'Una semana en Cusco',
          likes: [],
        },
        post2: {
          contenidoPost: 'Comimos muy rico',
          costoInput: '150',
          diasInput: '3',
          locacionInput: 'Ica',
          ninosInput: '1',
          nochesInput: '2',
          personasInput: '2',
          tituloPost: 'Feriado en Ica',
          likes: [],
        },
      },
    },
    comentarios: {
      __doc__: {
        c001: {
          usuario: 'fulanito',
          comentario: 'Lindo lindo lindo',
          photoUrl: 'src/img/perfil.png',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('Nueva publicacion', () => {
  it('Debería crearse una publicacion', () => addPost('300', '6', '5', '3', '1', 'Una semana en Cusco', 'Pudimos visitar Machu Picchu', 'Cusco', 'ejemplo@gmail.com', 'anonimo', 'an123', '[]', '24/02/21', 'url')
    .then(() => getPublications(
      (post) => {
        const result = post.find((elem) => elem.tituloPost === 'Una semana en Cusco');
        expect(result.tituloPost).toBe('Una semana en Cusco');
      },
    )));
});

describe('Obtener Post', () => {
  it('Debería traer una publicacion especifica', () => getPost('300', '6', '5', '3', '1', 'Una semana en Cusco', 'Pudimos visitar Machu Picchu', 'Cusco', 'ejemplo@gmail.com', 'anonimo', 'an123', '[]', '24/02/21', 'url')
    .then(() => getPublications(
      (post) => {
        const result = post.find((elem) => elem.titulo === 'Una semana en Cusco');
        expect(result.titulo).toBe('Una semana en Cusco');
      },
    )));
});

describe('Delete Post', () => {
  it('Debería eliminar un post con id: post2', () => deletePost('post2')
    .then(() => getPublications(
      (post) => {
        const result = post.find((elem) => elem.id === 'post2');
        expect(result).toBe(undefined);
      },
    )));
});

describe('Edit Post', () => {
  it('Debería poder editar un post con id: post1', () => fsUpdate('post1', 'Ilo', 'Puerto Bonito', '120', '1', '1', '1', '2', 'Vimos lobos marinos')
    .then(() => getPublications(
      (post) => {
        const result = post.find((elem) => elem.locacionInput === 'Ilo');
        expect(result.locacionInput).toBe('Ilo');
      },
    )));
});

describe('Dar like', () => {
  it('Debería poder dar like a un post con id de usuario: 003', () => postLike('post1', '003')
    .then(() => getPublications(
      (post) => {
        const result = post.find((elem) => elem.likes === '003');
        expect(result.likes).toBe('003');
      },
    )));
});

describe('Comentar', () => {
  it('Debería poder comentar un post', () => addComment('post1', 'fulanito', 'Buen viaje', 'photoUser')
    .then(() => getComments('post1',
      (comment) => {
        const result = comment.find((elem) => elem.usuario === 'fulanito');
        expect(result.usuario).toBe('fulanito');
      })));
});
