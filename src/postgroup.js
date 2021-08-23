
export const createNewPost = `
<body id="postBody">
  <header class="mainHeader">
    <span>Traveler.pe</span>
    <img src="./imagen/user.svg" alt="">
  </header>
  <main>
    <section class="fotografias">
      <img src="./imagen/apurimac3.svg" alt="">
    </section>
    <section class="iconos">
      <div id="costo" class="travelOpt">
        <img src="./imagen/cash.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="costoInput">
      </div>
      <div id="dias" class="travelOpt">
        <img src="./imagen/sun.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="diasInput">
      </div>
      <div id="noches" class="travelOpt">
        <img src="./imagen/moon.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="nochesInput">
      </div>
      <div id="personas" class="travelOpt">
        <img src="./imagen/family.svg" alt="" class="iconPost">
        <input type="number" class="inputPost" id="personasInput">
      </div>
      <div id="niños" class="travelOpt">
        <img src="./imagen/child.svg" alt="" class="iconPost">
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
  </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#"><img src="./imagen/buscar.svg" alt="">
    <a href="#newpost"><img src="./imagen/subir.svg" alt="">
    <a href="#"><img src="./imagen/notificaciones.svg" alt="">
    <a href="#"><img src="./imagen/mensajes.svg" alt="">
  </footer>
</body>`;


export const viewPost = `
<body id="postBody">
    <header class="mainHeader">
    <span>Traveler.pe</span>
    <img src="./imagen/user.svg" alt="">
    </header>
    <main>
    <section class="usuarioAndButoon">
      <div class="usuarioAndImagen">
        <img src="./imagen/user.svg" alt="" id="pepe">
          <div class="usuario">
            <p>Usuario1</p>
            <p>@usuario1</p>
            <p>24seguidores</p>
          </div>
      </div>
      <div class="buttonSeguir">
        <button class="publiPost" >Seguir</button>
      </div>
    </section>
    
    <div class="contenidoViewPost">
      <div class="locacion">
          <img src="./imagen/locacion.svg" alt="" class="locationIcon">
          <span type="text" class="locationInput" id="viewLocation">Tarma</span><div class="travelOpt">
          <img src="./imagen/puntos.svg" alt="" class="optionesPost" id="optionPost">
      </div>
    </div>
    <h2 class="tituloPost" id="viewTitulo"></h2>
    <section class="iconos">
      <div id="costo" class="travelOpt">
        <img src="./imagen/cash.svg" alt="" class="iconPost">
        <p id="viewCosto">Costo</p>
      </div>
      <div id="dias" class="travelOpt">
        <img src="./imagen/sun.svg" alt="" class="iconPost">
        <p id="viewDias">Dias</p>
      </div>
      <div id="noches" class="travelOpt">
        <img src="./imagen/moon.svg" alt="" class="iconPost">
        <P id="viewNoches">Noches</P>
      </div>
      <div id="personas" class="travelOpt">
        <img src="./imagen/family.svg" alt="" class="iconPost">
        <p id="viewPersonas">personas</p>
      </div>
      <div id="niños" class="travelOpt">
        <img src="./imagen/child.svg" alt="" class="iconPost">
        <p id="viewNinos">niños</p>
      </div>
      <div class="modalEditRemove" id="modalEditRemove">
      <div class="boxModalEditRemove">
        <a class="textSecondary xCerrar" id="closeModalEditRomve">x</a><hr>
        <a href="#editpost" class="textSecondary textoEditRemove">Editar</a>
        <p class="textSecondary textoEditRemove" id="ShowModalConfirmation" >Eliminar</p>        
      </div>
    </div>

    <div class="modalRemove" id="modalRemove">
      <div class="boxModal">
        <h3>¿De verdad quieres eliminar esta publicacion?</h3>
        <p>Luego ya no podra ser recuperada</p><hr>
        <p class="textPrimary" id="textRemovePost">Eliminar</p><hr>
        <p class="textSecondary" id="closeModal">Quiero volver</p>
      </div>
    </div>
    </section>
    <section class="historia">
      <p id="viewContenido" class="viewContenido">Era una mañana soleada del 12 de octubre, cuando viaje rumbo a Apurimac en u viaje de tres dias.
      El primer dia visite el Bosque de Piedras y la casa de los pitufos, el camino es bastante cansado por lo que recomiendo usar ropa comoda y calzado especial. Me hospede en una posada que brindaba desayuno con un costo de S/30 la noche.
      Tambien almorce en diferentes restaurantes. El precio promedio del menu es de S/6. 
      En total gasté S/400 por tres dias, incluyendo el pasaje terrestre.
      Recomiendo mucho visitar Apurimac!</p>      
    </section>
    </div>
    <div class="likesDate">
      <div class="contadorLikes">
        <i class="fas fa-heart" aria-hidden="true"></i>
        <span>7</span>
      </div>
      <div class="contadorCommentary">
        <i class="far fa-comment"></i>
        <span>7</span>
      </div>
      <div class="datePost">
        <span id="fechaPost">23/08/2021</span>
      </div>
    </div><hr>
    <section class="commentary" id="commentary">
    </section>
    </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#"><img src="./imagen/buscar.svg" alt="">
    <a href="#newpost"><img src="./imagen/subir.svg" alt="">
    <a href="#"><img src="./imagen/notificaciones.svg" alt="">
    <a href="#"><img src="./imagen/mensajes.svg" alt="">
  </footer>
</body>`;

export const editPost = `
<body id="postBody">
  <header class="mainHeader">
    <span>Traveler.pe</span>
    <img src="./imagen/user.svg" alt="">
  </header>
  <main>
    <section class="fotografias">
      <img src="./imagen/imagenCuscoEDIT.svg" alt="">
    </section>
    <section class="usuarioAndButoon">
    
    <div class="usuarioAndImagen">
    <img src="./imagen/user.svg" alt="">
    <div class="usuario">
    <p>Usuario1</p>
    <p>@usuario1</p>
    <p>24seguidores</p>
    </div>
    </div>
    <div class="botonGuardar">
    <button class="publiPost" id="guardarPost">Guardar</button>
    </div>
    </section>
    <div class="locacion">
        <img src="./imagen/locacion.svg" alt="" class="locationIcon">
        <input type="text" class="locationInput" id="editLocation" placeholder="Locacion">
    </div>
    <input type="text" class="tituloPost" placeholder="Titulo" id="editTitulo">
    <section class="iconos">
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
  </main>
  <footer class="opcionesFoot">
    <a href="#muro"><img src="./imagen/home.svg" alt=""></a>
    <a href="#"><img src="./imagen/buscar.svg" alt="">
    <a href="#newpost"><img src="./imagen/subir.svg" alt="">
    <a href="#"><img src="./imagen/notificaciones.svg" alt="">
    <a href="#"><img src="./imagen/mensajes.svg" alt="">
  </footer>
</body>`;
