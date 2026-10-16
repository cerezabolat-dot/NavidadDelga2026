"use strict";

/* =========================================
   01. DATOS GENERALES Y CONTACTOS
   ========================================= */

const C = {
  fecha: "2026-12-24T15:00:00-06:00",

  // true muestra la hora en los detalles de la reunión.
  mostrarHora: true,

  whatsappElecciones: "50255414482",

  mensaje:
    "Como en los viejos tiempos, nos reunimos para celebrar, recordar y compartir. Hay historias que solo tienen sentido cuando estamos juntos. Esta Navidad, volvamos a encontrarnos."
};

const CONTACTO_ESTUDIO = "50250440667";

/* =========================================
   02. TEMÁTICAS Y RESERVAS MANUALES

   reservada: false → disponible
   reservada: true  → bloqueada

   tribu: "Nombre" → quién la reservó.
   ========================================= */

const NAVIDADES = [
  {
    id: "nacimiento",
    titulo: "El nacimiento de Jesús",
    descripcion:
      "La razón de la celebración. Una historia de fe, amor y esperanza que nos recuerda dónde comenzó todo.",
    referencia:
      "Estrella de Belén, pesebre y vestimenta antigua.",
    elemento: "La estrella de Belén",
    imagen: "referencia nacimiento de Jesús.png",
    reservada: false,
    tribu: ""
  },
  {
    id: "renos",
    titulo: "El encanto de los renos",
    descripcion:
      "Una aventura navideña donde la ayuda mutua y el trabajo en equipo iluminan el camino.",
    referencia:
      "Renos, bosque invernal, tonos café y detalles rojos.",
    elemento: "El bosque de los renos",
    imagen: "referencia renos.png",
    reservada: false,
    tribu: ""
  },
  {
    id: "polo-norte",
    titulo: "La magia del Polo Norte",
    descripcion:
      "Un mundo de personajes y preparativos que cobra vida gracias a la generosidad y la ilusión de dar.",
    referencia:
      "Duendes, regalos, nieve y acentos verdes y rojos.",
    elemento: "El taller del Polo Norte",
    imagen: "Referencia polo norte.png",
    reservada: false,
    tribu: ""
  },
  {
    id: "villancicos",
    titulo: "Una Navidad de villancicos",
    descripcion:
      "Melodías que reúnen generaciones y convierten los recuerdos en una celebración compartida.",
    referencia:
      "Partituras, campanas, velas y vestuario de coro clásico.",
    elemento: "Melodías de Navidad",
    imagen: "referencia villancicos.png",
    reservada: false,
    tribu: ""
  },
  {
    id: "cascanueces",
    titulo: "El sueño del Cascanueces",
    descripcion:
      "Una Navidad de fantasía y elegancia, donde la valentía y la bondad forman parte de la aventura.",
    referencia:
      "Ballet, soldados de juguete y detalles dorados.",
    elemento: "Un sueño de invierno",
    imagen: "referencia cascanueces.png",
    reservada: false,
    tribu: ""
  },
  {
    id: "delga",
    titulo: "Nuestra Navidad Delga",
    descripcion:
      "La historia de nuestra familia: sus raíces, sus recuerdos y el amor que nos sigue reuniendo.",
    referencia:
      "Fotografías familiares, álbumes, cartas y objetos con historia.",
    elemento: "Nuestro álbum familiar",
    imagen: "./imagenes/referencia-delga.jpg",
    reservada: false,
    tribu: ""
  }
];

/* =========================================
   03. IMÁGENES Y MENSAJES DE LAS BROMAS
   ========================================= */

const BROMAS = {
  lugar: {
    imagen: "reno.png",
    alt: "Rodolfo riéndose de forma traviesa",
    titulo: "¿Ya querías poner el GPS?",
    texto:
      "Tranquilo, Rodolfo todavía está buscando el lugar. La paciencia es una virtud… y esta familia la va a practicar."
  },
  itinerario: {
    imagen: "Snowman.png",
    alt: "Muñeco de nieve riéndose",
    titulo: "Mucho clic y poca paciencia.",
    texto:
      "El itinerario sigue bajo llave. Por ahora, tu primera actividad es aprender a esperar."
  }
};

/* =========================================
   04. INICIAR CUANDO EL HTML ESTÉ LISTO
   ========================================= */

function iniciarInvitacion() {
  const $ = (id) => document.getElementById(id);

  const reducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const fecha = new Date(C.fecha);
  const origenesPaneles = new WeakMap();

  let invitacionAbierta = Boolean(
    $("inv") && !$("inv").hidden
  );

  let esperaBroma = null;

  function crearElemento(etiqueta, clase = "", texto = "") {
    const elemento = document.createElement(etiqueta);
    elemento.className = clase;
    elemento.textContent = texto;
    return elemento;
  }

  function escribir(id, texto) {
    const elemento = $(id);

    if (elemento) {
      elemento.textContent = texto;
    }
  }

  /* =========================================
     05. MÚSICA: CONFIGURACIÓN Y VISIBILIDAD
     ========================================= */

  const musica = $("background-music");
  const botonMusica = $("music-toggle");

  if (musica) {
    musica.volume = 0.35;
  }

  if (botonMusica) {
    // Fuera de contenedores ocultos o animados.
    document.body.appendChild(botonMusica);

    botonMusica.hidden = !invitacionAbierta;

    // Mantener el control fijo y pulsable.
    Object.assign(botonMusica.style, {
      position: "fixed",
      right: "24px",
      bottom: "24px",
      top: "auto",
      left: "auto",
      zIndex: "1000",
      pointerEvents: "auto",
      cursor: "pointer"
    });
  }

  function actualizarBotonMusica() {
    if (!musica || !botonMusica) {
      return;
    }

    const reproduciendo =
      !musica.paused && !musica.ended;

    botonMusica.textContent = reproduciendo
      ? "Ⅱ Pausar música"
      : "♫ Música";

    botonMusica.setAttribute(
      "aria-label",
      reproduciendo
        ? "Pausar música"
        : "Reproducir música"
    );
  }

  async function reproducirMusica() {
    if (!musica) {
      return;
    }

    try {
      await musica.play();
    } catch (error) {
      console.warn(
        "No se pudo reproducir la música. Revisa el archivo de audio.",
        error
      );
    }

    actualizarBotonMusica();
  }

  if (musica && botonMusica) {
    botonMusica.addEventListener("click", () => {
      if (musica.paused) {
        reproducirMusica();
      } else {
        musica.pause();
      }
    });

    musica.addEventListener("play", actualizarBotonMusica);
    musica.addEventListener("pause", actualizarBotonMusica);
    musica.addEventListener("ended", actualizarBotonMusica);
    musica.addEventListener("error", actualizarBotonMusica);

    actualizarBotonMusica();
  }

  /* =========================================
     06. MENSAJE Y HORA
     ========================================= */

  escribir("msg", C.mensaje);

  if (C.mostrarHora && !Number.isNaN(fecha.getTime())) {
    const hora = fecha.toLocaleTimeString("es-GT", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Guatemala"
    });

    escribir("time", "A partir de las " + hora);
  } else {
    escribir("time", "Hora por confirmar");
  }

  /* =========================================
     07. CUENTA REGRESIVA
     ========================================= */

  function actualizarCuentaRegresiva() {
    const diferencia = Math.max(
      0,
      fecha.getTime() - Date.now()
    );

    if (!Number.isFinite(diferencia)) {
      escribir("cdmsg", "Fecha por confirmar");
      return;
    }

    const valores = [
      Math.floor(diferencia / 86400000),
      Math.floor(diferencia / 3600000) % 24,
      Math.floor(diferencia / 60000) % 60,
      Math.floor(diferencia / 1000) % 60
    ];

    ["d", "h", "m", "s"].forEach((id, indice) => {
      escribir(
        id,
        String(valores[indice]).padStart(2, "0")
      );
    });

    escribir(
      "cdmsg",
      diferencia === 0
        ? "¡Llegó el día de nuestra celebración!"
        : ""
    );
  }

  actualizarCuentaRegresiva();
  window.setInterval(actualizarCuentaRegresiva, 1000);

  /* =========================================
     08. SOBRE Y PARTÍCULAS
     ========================================= */

  const imagenSobre = $("envelope-image");

  function mostrarSobreAlternativo() {
    if (!imagenSobre || !$("envelope-fallback")) {
      return;
    }

    imagenSobre.hidden = true;
    $("envelope-fallback").hidden = false;
  }

  if (imagenSobre) {
    imagenSobre.addEventListener(
      "error",
      mostrarSobreAlternativo
    );

    if (
      imagenSobre.complete &&
      imagenSobre.naturalWidth === 0
    ) {
      mostrarSobreAlternativo();
    }
  }

  if (!reducido.matches && $("snow")) {
    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < 16; i++) {
      const particula = document.createElement("i");

      particula.style.left = Math.random() * 100 + "%";

      particula.style.animationDuration =
        9 + Math.random() * 9 + "s";

      particula.style.animationDelay =
        -Math.random() * 18 + "s";

      fragmento.appendChild(particula);
    }

    $("snow").replaceChildren(fragmento);
  }

  /* =========================================
     09. ABRIR INVITACIÓN

     Música: inicia al tocar el sobre.
     Botón: aparece cuando termina la apertura.
     ========================================= */

  const sobre = $("env");

  if (sobre) {
    sobre.addEventListener("click", () => {
      if (invitacionAbierta) {
        return;
      }

      invitacionAbierta = true;

      // Se llama durante el clic para permitir el audio.
      reproducirMusica();

      sobre.disabled = true;
      sobre.setAttribute("aria-expanded", "true");

      if ($("intro")) {
        $("intro").classList.add("open");
      }

      window.setTimeout(() => {
        if ($("intro")) {
          $("intro").hidden = true;
        }

        if ($("inv")) {
          $("inv").hidden = false;
          $("inv").classList.add("show");
        }

        document.body.classList.remove("intro-active");

        if (botonMusica) {
          document.body.appendChild(botonMusica);
          botonMusica.hidden = false;
        }

        window.scrollTo({
          top: 0,
          behavior: "instant"
        });

        if ($("inv")) {
          $("inv").focus({ preventScroll: true });
        }
      }, reducido.matches ? 0 : 1250);
    });
  }

  /* =========================================
     10. PANEL DE BROMAS

     Si falta en el HTML, se crea aquí.
     Si ya existe, se conserva.
     ========================================= */

  let panelBroma = $("prank-dialog");

  if (!panelBroma) {
    panelBroma = document.createElement("dialog");
    panelBroma.id = "prank-dialog";
    document.body.appendChild(panelBroma);
  }

  panelBroma.classList.add("prank-dialog");
  panelBroma.setAttribute(
    "aria-labelledby",
    "prank-title"
  );

  // Reconstruir solo si faltan sus elementos necesarios.
  const idsBroma = [
    "prank-loading",
    "prank-content",
    "prank-image",
    "prank-title",
    "prank-text"
  ];

  const estructuraCompleta = idsBroma.every((id) => {
    const elemento = $(id);
    return elemento && panelBroma.contains(elemento);
  });

  if (!estructuraCompleta) {
    panelBroma.innerHTML = `
      <div class="prank-inner">
        <button class="back" type="button" data-close>
          ← Volver
        </button>

        <div id="prank-loading" role="status">
          <span class="loading-star" aria-hidden="true">✦</span>
          <p class="script">Un momento…</p>
          <p>Estamos preparando los detalles.</p>
        </div>

        <div id="prank-content" hidden>
          <span class="eyebrow">
            UN MENSAJE DE NUESTRO COMITÉ NAVIDEÑO
          </span>

          <img id="prank-image" alt="">

          <div class="prank-sign">
            <h2 id="prank-title"></h2>
            <p id="prank-text"></p>
            <p class="small">
              Los detalles reales se anunciarán próximamente.
            </p>
          </div>

          <button class="btn cream" type="button" data-close>
            Está bien, esperaré…
          </button>
        </div>
      </div>
    `;
  }

  /* =========================================
     11. ABRIR Y CERRAR PANELES
     ========================================= */

  function moverMusica(panel = null) {
    if (!botonMusica) {
      return;
    }

    // Dentro del diálogo abierto para que sea pulsable.
    (panel || document.body).appendChild(botonMusica);

    botonMusica.hidden = !invitacionAbierta;
  }

  function abrirPanel(panel, boton) {
    if (!panel || typeof panel.showModal !== "function") {
      console.error("No se encontró un panel válido.");
      return false;
    }

    if (panel.open) {
      return true;
    }

    origenesPaneles.set(panel, boton);

    // Evitar que una transformación afecte al botón fijo.
    panel.style.animation = "none";
    panel.style.transform = "none";

    try {
      panel.hidden = false;
      panel.showModal();
    } catch (error) {
      console.error("No se pudo abrir el panel.", error);
      return false;
    }

    moverMusica(panel);

    panel.scrollTop = 0;
    document.body.classList.add("modal-active");

    const cerrar = panel.querySelector("[data-close]");

    if (cerrar) {
      cerrar.focus({ preventScroll: true });
    }

    return true;
  }

  document.querySelectorAll("dialog").forEach((panel) => {
    panel.querySelectorAll("[data-close]").forEach((boton) => {
      boton.type = "button";

      boton.addEventListener("click", () => {
        panel.close();
      });
    });

    panel.addEventListener("close", () => {
      if (panel === panelBroma) {
        window.clearTimeout(esperaBroma);
      }

      const otroPanel = Array.from(
        document.querySelectorAll("dialog[open]")
      ).pop();

      moverMusica(otroPanel || null);

      document.body.classList.toggle(
        "modal-active",
        Boolean(otroPanel)
      );

      const origen = origenesPaneles.get(panel);

      if (origen && origen.isConnected) {
        origen.focus({ preventScroll: true });
      }
    });
  });

  if ($("open-outfit")) {
    $("open-outfit").addEventListener("click", (evento) => {
      evento.preventDefault();

      abrirPanel(
        $("outfit-dialog"),
        evento.currentTarget
      );
    });
  }

  /* =========================================
     12. UBICACIÓN E ITINERARIO: BROMAS
     ========================================= */

  document.querySelectorAll("[data-prank]").forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();

      const clave = boton.dataset.prank;
      const broma = BROMAS[clave];

      if (!broma) {
        console.error("Temática de broma desconocida:", clave);
        return;
      }

      window.clearTimeout(esperaBroma);

      $("prank-loading").hidden = false;
      $("prank-content").hidden = true;

      escribir("prank-title", broma.titulo);
      escribir("prank-text", broma.texto);

      const imagen = $("prank-image");

      imagen.hidden = false;
      imagen.alt = broma.alt;

      // Si falta la foto, el mensaje sigue funcionando.
      imagen.onerror = () => {
        imagen.hidden = true;
      };

      imagen.src = broma.imagen;

      if (!abrirPanel(panelBroma, boton)) {
        return;
      }

      esperaBroma = window.setTimeout(() => {
        $("prank-loading").hidden = true;
        $("prank-content").hidden = false;
      }, reducido.matches ? 0 : 1100);
    });
  });

  /* =========================================
     13. TARJETAS Y FORMULARIOS INDIVIDUALES
     ========================================= */

  function crearTarjetas() {
    const contenedor = $("christmas-options");

    if (!contenedor) {
      return;
    }

    const fragmento = document.createDocumentFragment();

    NAVIDADES.forEach((navidad, indice) => {
      const tarjeta = crearElemento(
        "article",
        "christmas-card" +
          (navidad.reservada ? " is-reserved" : "")
      );

      // ===== FOTO DE REFERENCIA =====
      const arte = crearElemento("div", "christmas-art");

      const frase = crearElemento(
        "span",
        "christmas-symbol",
        navidad.elemento
      );

      arte.appendChild(frase);

      if (navidad.imagen) {
        const foto = document.createElement("img");

        foto.alt = "Referencia: " + navidad.titulo;
        foto.loading = "lazy";

        frase.hidden = true;

        foto.addEventListener("error", () => {
          foto.remove();
          frase.hidden = false;
        }, { once: true });

        foto.src = navidad.imagen;
        arte.appendChild(foto);
      }

      // ===== INFORMACIÓN =====
      const contenido = crearElemento(
        "div",
        "christmas-content"
      );

      const estado = navidad.reservada
        ? (
            navidad.tribu
              ? "Reservada por la tribu " + navidad.tribu
              : "Esta Navidad ya tiene protagonista."
          )
        : "Disponible · Sujeta a confirmación";

      contenido.append(
        crearElemento(
          "span",
          "christmas-number",
          "HISTORIA " + String(indice + 1).padStart(2, "0")
        ),
        crearElemento("h4", "christmas-title", navidad.titulo),
        crearElemento(
          "p",
          "christmas-description",
          navidad.descripcion
        ),
        crearElemento(
          "p",
          "christmas-reference",
          "Inspiración: " + navidad.referencia
        ),
        crearElemento("p", "christmas-status", estado)
      );

      // ===== CONFIRMAR ELECCIÓN =====
      const boton = crearElemento(
        "button",
        "btn christmas-confirm",
        navidad.reservada
          ? "Ya tiene protagonista"
          : "Confirmar mi elección"
      );

      boton.type = "button";
      boton.disabled = navidad.reservada;
      contenido.appendChild(boton);

      if (!navidad.reservada) {
        const formulario = crearElemento(
          "form",
          "card-tribe-form"
        );

        formulario.id = "formulario-" + navidad.id;
        formulario.hidden = true;

        const etiqueta = crearElemento(
          "label",
          "",
          "Nombre de tu tribu"
        );

        const campo = document.createElement("input");

        campo.id = "tribu-" + navidad.id;
        campo.name = "tribu";
        campo.type = "text";
        campo.required = true;
        campo.maxLength = 80;
        campo.placeholder = "Escribe el nombre de tu tribu";
        campo.autocomplete = "off";

        etiqueta.htmlFor = campo.id;

        const aviso = crearElemento(
          "p",
          "",
          "Se preparará el mensaje. En WhatsApp debes presionar enviar."
        );

        const botones = crearElemento(
          "div",
          "card-form-buttons"
        );

        const enviar = crearElemento(
          "button",
          "btn send-choice",
          "Continuar a WhatsApp ↗"
        );

        enviar.type = "submit";

        const cancelar = crearElemento(
          "button",
          "btn cancel-choice",
          "Cancelar"
        );

        cancelar.type = "button";

        botones.append(enviar, cancelar);
        formulario.append(etiqueta, campo, aviso, botones);
        contenido.appendChild(formulario);

        boton.setAttribute("aria-controls", formulario.id);
        boton.setAttribute("aria-expanded", "false");

        // ===== MOSTRAR FORMULARIO =====
        boton.addEventListener("click", () => {
          formulario.hidden = false;
          boton.hidden = true;
          boton.setAttribute("aria-expanded", "true");
          campo.focus();
        });

        // ===== CANCELAR =====
        cancelar.addEventListener("click", () => {
          formulario.reset();
          campo.setCustomValidity("");

          formulario.hidden = true;
          boton.hidden = false;
          boton.setAttribute("aria-expanded", "false");

          boton.focus({ preventScroll: true });
        });

        campo.addEventListener("input", () => {
          campo.setCustomValidity("");
        });

        // ===== WHATSAPP =====
        formulario.addEventListener("submit", (evento) => {
          evento.preventDefault();

          if (navidad.reservada) {
            return;
          }

          const nombre = campo.value.trim();

          if (!nombre) {
            campo.setCustomValidity(
              "Escribe el nombre de tu tribu."
            );

            campo.reportValidity();
            return;
          }

          const numero = String(
            C.whatsappElecciones
          ).replace(/\D/g, "");

          const mensaje =
            "¡Hola! Somos la tribu " + nombre +
            " y queremos elegir «" + navidad.titulo +
            "» para DELGA 2026. ¿Sigue disponible? " +
            "Esperamos la confirmación del comité organizador.";

          window.open(
            "https://wa.me/" +
              numero +
              "?text=" +
              encodeURIComponent(mensaje),
            "_blank",
            "noopener,noreferrer"
          );

          // La reserva sigue siendo manual.
          // Después de confirmar, cambia reservada a true.
        });
      }

      tarjeta.append(arte, contenido);
      fragmento.appendChild(tarjeta);
    });

    contenedor.replaceChildren(fragmento);
  }

  crearTarjetas();

  /* =========================================
     14. FOTOS DE MODELOS
     ========================================= */

  document.querySelectorAll(".optional-reference").forEach((imagen) => {
    let avisoMostrado = false;

    function mostrarAviso() {
      if (avisoMostrado) {
        return;
      }

      avisoMostrado = true;
      imagen.hidden = true;

      imagen.before(
        crearElemento(
          "p",
          "photo-placeholder",
          "Foto de referencia próximamente"
        )
      );
    }

    imagen.addEventListener(
      "error",
      mostrarAviso,
      { once: true }
    );

    if (imagen.complete && imagen.naturalWidth === 0) {
      mostrarAviso();
    }
  });

  /* =========================================
     15. CONTACTO DE PUBLICIDAD
     ========================================= */

  if ($("studio-contact")) {
    const mensaje =
      "¡Hola! Me gustaría una invitación digital como la de Convención DELGA. " +
      "Quisiera más información.";

    $("studio-contact").href =
      "https://wa.me/" +
      String(CONTACTO_ESTUDIO).replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(mensaje);
  }
}

/* =========================================
   16. EJECUTAR UNA VEZ QUE EXISTA EL HTML
   ========================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    iniciarInvitacion,
    { once: true }
  );
} else {
  iniciarInvitacion();
}
