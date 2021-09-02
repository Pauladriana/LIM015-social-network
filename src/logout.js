export const signOff = () => {
  const logout = document.querySelector('#logout-button');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    const auth = firebase.auth();
    auth.signOut().then(() => {
      localStorage.clear();
      // console.log('cerraste sesion');
      window.location.hash = 'login';
      // console.log('regreso al login');
    });
  });
};
