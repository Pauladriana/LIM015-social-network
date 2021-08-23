import MockFirebase from 'mock-cloud-firestore';

import {
  addPost,
  getPubli,
  fsUpdate,
  deletePost,
} from '../src/post.js';

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
          tituloPost: 'Una semana en Cusco'
        },
        post2: {
          contenidoPost: 'Comimos muy rico',
          costoInput: '150',
          diasInput: '3',
          locacionInput: 'Ica',
          ninosInput: '1',
          nochesInput: '2',
          personasInput: '2',
          tituloPost: 'Feriado en Ica'
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

describe('Add Post', () => {
  it('Debería crearse un post ', () => addPost('300', '6', '5', '3', '1', 'Una semana en Cusco', 'Pudimos visitar Machu Picchu', 'Cusco').then(() => {
    //const newpost = getPubli('post2');
    //expect(newPost.tituloPost).toBe('Una semana en Cusco');
    }))
})

describe('Delete Post', () => {
  it('Debería eliminar un post con id: post2', () => deletePost('post2').then(() => {
      const deleted = getPubli('post2');
      expect(deleted).toBe({});
  }))
});
describe('Edit Post', () => {
  it('Debería poder editar un post con id: post1', () => fsUpdate(post2, 'Ilo', 'Puerto Bonito', '120', '1', '1', '1', '2', 'Vimos lobos marinos').then(() => {
      const edited = getPubli(post2);
      const result = edited.contenidoPost;
      expect(result).toBe('Vimos lobos marinos');
  }))
})
