// configurando firebase mock
// iniciando tests
import {
  loginWithEmail,
  googleRegister,
  emailUserRegister,
} from '../src/controller/login.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();

mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

describe('Métodos de Firebase.auth()', () => {
  it('Registra con correo y contraseña', () => emailUserRegister('anita@gmail.com', 'anita258')
    .then((user) => {
      expect(user.email).toBe('anita@gmail.com');
    }));

  it('Inicia sesion con correo y contraseña', () => loginWithEmail('bartolito@gmail.com', 'bartolito58')
    .then((user) => {
      expect(user.email).toBe('bartolito@gmail.com');
    }));
  it('Usar login de google.com', () => {
    googleRegister().then((google) => {
      expect(google.providerData[0].providerId).toBe('google.com');
    });
  });
});
