
export const loginout = () => {
  const logout = document.querySelector('#logout-button');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    .then(() => {
    console.log('cerraste sesion');
    });
    .catch((err) => {
      console.log(err);
    });
  };
};
