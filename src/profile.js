const secciones = document.querySelector('#secciones');
export const pageprofile = `
<body>
    <header class="mainHeader">
        <span class="textTraveler">Traveler.pe</span>
        <div class="iconosMenuMuro">
            <div class="menuIconos">
                <a href="#muro"><img src="./imagen/iconhome.png" alt=""></a>
                <a href="#newpost"><img src="./imagen/iconsubir.png" alt=""></a>
                <a href="#profile"><img src="./imagen/iconuser.svg" alt=""></a>
            </div>
        <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
        </div>
    </header>
    <div class="banerPerfil">
    </div>
    <div class="cntLogo" id="cntLogo"></div>
    <div class="userProfile" id="userProfileName">
    </div>
    <div id="allPost" class="allPost"></div>
    <footer class="opcionesFoot">
        <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
        <a href="#newpost"><img src="./imagen/subir.svg" alt=""></a>
        <a href="#profile"><img src="./imagen/user.svg" alt=""></a>
    </footer>
</body>`;
secciones.innerHTML = pageprofile;

export const setProfileAttributes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const cntProfileName = document.getElementById('userProfileName');
  const cntProfileImage = document.getElementById('cntLogo');
  const userProfileName = document.createElement('p');
  userProfileName.innerHTML = user.displayName;
  const userProfileImage = document.createElement('img');
  userProfileImage.setAttribute('src', user.photoURL);
  userProfileImage.setAttribute('alt', 'logo');
  userProfileImage.setAttribute('class', 'logoProfile');
  cntProfileImage.appendChild(userProfileImage);
  cntProfileName.appendChild(userProfileName);
};
