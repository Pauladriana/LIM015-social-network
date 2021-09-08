const segments = document.querySelector('#segments');
export const pageprofile = `
<body>
    <header class="mainHeader">
        <span class="textTraveler">Traveler.pe</span>
        <div class="navbarIcons">
            <div class="menuIcons">
                <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconhome.png?alt=media&token=f5fb9601-f952-4c53-8b69-1757cf167364" alt=""></a>
                <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconsubir.png?alt=media&token=7ceaf2f9-903d-4c6e-aa5a-0052a2c55a18" alt=""></a>
                <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/iconuser.svg?alt=media&token=453cc4b7-96c7-41f2-94d0-29dad28b1d8a" alt=""></a>
            </div>
        <i class="fas fa-sign-out-alt iconOut" id="logout-button"></i>
        </div>
    </header>
    <div class="profileBanner">
    </div>
    <div class="cntLogo" id="cntLogo"></div>
    <div class="userProfile" id="userProfileName">
    </div>
    <div id="allPost" class="allPost"></div>
    <footer class="optionsFoot">
        <a href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/home.svg?alt=media&token=4b4eac88-e8d3-4335-8062-68c761f3c773" alt=""></a>
        <a href="#newpost"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/subir.svg?alt=media&token=378ca9fd-b9d6-4193-b0be-a255fab6cca9" alt=""></a>
        <a href="#profile"><img src="https://firebasestorage.googleapis.com/v0/b/traveler-c61bb.appspot.com/o/user.svg?alt=media&token=69d2bb66-fd7d-4ae4-9db6-5a5238bbebcb" alt=""></a>
    </footer>
</body>`;
segments.innerHTML = pageprofile;

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
