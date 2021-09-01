
export const createNewPost = `
<body id="postBody">
    <header class="mainHeaderMuro">
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
  <main>
    <div class="nuevopost">
        <section class="fotografias">
        </section>
        <div class="postnew">
        <section class="iconos">
          <div id="costo" class="travelOpt">
            <img src="./imagen/cash.svg" alt="" class="iconPost" title = "Monto en soles">
            <input type="number" class="inputPost" id="costoInput">
          </div>
          <div id="dias" class="travelOpt">
            <img src="./imagen/sun.svg" alt="" class="iconPost" title = "Cuantos Dias">
            <input type="number" class="inputPost" id="diasInput">
          </div>
          <div id="noches" class="travelOpt">
            <img src="./imagen/moon.svg" alt="" class="iconPost" title = "Cuantas Noches">
            <input type="number" class="inputPost" id="nochesInput">
          </div>
          <div id="personas" class="travelOpt">
            <img src="./imagen/family.svg" alt="" class="iconPost" title = "Numero de Personas">
            <input type="number" class="inputPost" id="personasInput">
          </div>
          <div id="niños" class="travelOpt">
            <img src="./imagen/child.svg" alt="" class="iconPost" title = "Numero de niños">
            <input type="number" class="inputPost" id="ninosInput">
          </div>
        </section>
        <section class="historia">
          <input type="text" class="tituloPost" id="tituloPost" placeholder="Titula tu experiencia...">
          <textarea class="contenidoPost" id="contenidoPost" placeholder="Cuentanos sobre tu viaje..."></textarea>
          <div class="locacion">
            <img src="./imagen/locacion.svg" alt="" class="locationIcon">
            <input type="text" class="locationInput" id="locacionInput" placeholder="Ubicacion del viaje">
          </div>
        </section>
        <p id='mensajeValidacion'></p>
        <button class="publiPost" id="publiPost">Publicar</button>
        <div>
    </div>
  </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="./imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="./imagen/user.svg" alt=""></a>
  </footer>
</body>`;


export const viewPost = `
<body id="postBody">
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
    <main>
    <div class="viewPost">
    <div class="containerPost">
      <div class="usuarioAndImagen">
        <img class="photoViewPost" src="" alt="" id="pepe">
          <div class="usuario">
            <p id="userEmailPost"></p>
          </div>
      </div>
    <div class="contenidoViewPost">
      <div class="locacion">
          <div class="iconLocation">
          <img src="./imagen/locacion.svg" alt="" class="locationIcon">
          <span type="text" class="locationInput" id="viewLocation"></span>
          </div>
          <div class="travelOpt">
            <img src="./imagen/puntos.svg" alt="" class="optionesPost" id="optionPost">
          </div>
      </div>
    <h2 class="tituloPost" id="viewTitulo"></h2>
    <section class="iconos">
      <div id="costo" class="travelOpt">
        <img src="./imagen/cash.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewCosto">Costo</p>
      </div>
      <div id="dias" class="travelOpt">
        <img src="./imagen/sun.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewDias">Dias</p>
      </div>
      <div id="noches" class="travelOpt">
        <img src="./imagen/moon.svg" alt="" class="iconPost">
        <P class="colorBlack" id="viewNoches">Noches</P>
      </div>
      <div id="personas" class="travelOpt">
        <img src="./imagen/family.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewPersonas">personas</p>
      </div>
      <div id="niños" class="travelOpt">
        <img src="./imagen/child.svg" alt="" class="iconPost">
        <p class="colorBlack" id="viewNinos">niños</p>
      </div>
      <div class="modalEditRemove" id="modalEditRemove">
      <div class="boxModalEditRemove">
        <a class="textSecondary xCerrar" id="closeModalEditRomve">x</a>
        <div class="dividerModal"></div>
        <p><a href="#editpost" class="textSecondary textoEditRemove editar">Editar</a></p>
        <p class="textSecondary textoEditRemove" id="ShowModalConfirmation" >Eliminar</p>        
      </div>
    </div>

    <div class="modalRemove" id="modalRemove">
      <div class="boxModal">
        <h3>¿De verdad quieres eliminar esta publicacion?</h3>
        <p class="textBlack" >Luego ya no podra ser recuperada</p><hr>
        <p class="textPrimary" id="textRemovePost">Eliminar</p><hr>
        <p class="textSecondary" id="closeModal">Quiero volver</p>
      </div>
    </div>
    </section>
    <section class="historia">
      <p id="viewContenido" class="viewContenido"></p>      
    </section>
    </div>
    <div class="likesDate">
      <div class="contadorLikes">
        <i class="fas fa-heart" aria-hidden="true"></i>
        <span id="likesPost"></span>
      </div>
      <div class="contadorCommentary">
        <i class="far fa-comment"></i>
        <span id="comentsPost"></span>
      </div>
      <div class="datePost">
        <span id="fechaPost"></span>
      </div>
    </div>
    <hr>
    </div>
    <section class="commentary" id="commentary">
    </section>
    </div>
    </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="./imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="./imagen/user.svg" alt=""></a>
  </footer>
</body>`;

export const editPost = `
<body id="postBody">
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
  <main>
  <div class="editPost">
    <section class="fotografias">
    </section>
    <div class="containerPostEdit">
    <div class="locacionEdit">
        <img src="./imagen/locacion.svg" alt="" class="locationIcon">
        <input type="text" class="locationEdit" id="editLocation" placeholder="Locacion">
    </div>
    <input type="text" class="tituloPostEdit" placeholder="Titulo" id="editTitulo">
    <section class="iconosEdit">
      <div id="costo" class="travelOpt">
        <img src="./imagen/cash.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editCosto">
      </div>
      <div id="dias" class="travelOpt">
        <img src="./imagen/sun.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editDias">
      </div>
      <div id="noches" class="travelOpt">
        <img src="./imagen/moon.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editNoches">
      </div>
      <div id="personas" class="travelOpt">
        <img src="./imagen/family.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editPersonas">
      </div>
      <div id="niños" class="travelOpt">
        <img src="./imagen/child.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="editNinos">
      </div>
    </section>
    <section class="historia">
      <textarea class="contenidoPost" id="editContenido" placeholder="Cuenta tu historia"></textarea>
    </section>
    <div class="botonGuardar">
      <button class="publiPost" id="guardarPost">Guardar</button>
    </div>
  </div>
  </div>
  </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#newpost"><img src="./imagen/subir.svg" alt=""></a>
    <a href="#profile"><img src="./imagen/user.svg" alt=""></a>
  </footer>
</body>`;

