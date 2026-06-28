((global) => {
  /**
   * Inicializa el ordenamiento de cards por precio
   * @method initOrdenPrecio
   * @param {Object} config - Configuración del ordenamiento
   * @param {string} config.selectId - ID del elemento select para ordenar
   * @param {string} config.listSelector - Selector CSS de la lista de cards
   * @param {string} config.itemSelector - Selector CSS de los items dentro de la lista
   * @param {string} config.priceSelector - Selector CSS del elemento que contiene el precio
   * @return {Object} Objeto con estado de inicialización y función ordenar
   */
  const initOrdenPrecio = ({
    selectId = "ordenar",
    listSelector = ".listado",
    itemSelector = ".listado > li",
    priceSelector = ".monto",
  } = {}) => {
    const select = document.getElementById(selectId);
    const list = document.querySelector(listSelector);
    if (!select || !list) return { ok: false, motivo: "Falta select o lista" };

    const originalItems = Array.from(list.querySelectorAll(itemSelector));

    // getPrice toma una card y devuelve un numero para poder ordenarla.
    // Primero intenta leer data-price; si no existe, limpia el texto visible del precio.
    const getPrice = (li) => {
      const el = li.querySelector(priceSelector);
      if (!el) return Number.POSITIVE_INFINITY;
      const dp = el.getAttribute("data-price");
      if (dp !== null && dp !== "") {
        const n = Number(dp);
        return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
      }
      const txt = el.textContent
        .trim()
        .replace(/[^\d,.-]/g, "")
        .replace(",", ".");
      const n = parseFloat(txt);
      return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
    };

    const ordenar = () => {
      // asc indica si el select esta en precio ascendente.
      const asc = (select.value || "").toLowerCase() === "price-asc";
      const items = Array.from(list.querySelectorAll(itemSelector));

      // enriched guarda cada LI junto con su precio y su posicion original.
      // idx sirve para mantener el orden original si dos precios son iguales.
      const enriched = items
        .map((li) => ({ li, p: getPrice(li), idx: originalItems.indexOf(li) }))
        .map((o) => (o.idx < 0 ? { ...o, idx: Number.MAX_SAFE_INTEGER } : o));

      // sort reordena el arreglo. El ternario decide ascendente o descendente.
      enriched.sort((a, b) =>
        a.p === b.p ? a.idx - b.idx : asc ? a.p - b.p : b.p - a.p
      );

      // replaceChildren vuelve a poner los LI en el DOM ya ordenados.
      list.replaceChildren(...enriched.map((e) => e.li));
    };

    select.addEventListener("change", ordenar);
    ordenar();
    return { ok: true, ordenar };
  };

  // Exponer y auto-inicializar
  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initOrdenPrecio = initOrdenPrecio;
    initOrdenPrecio();
  });
})(window);

// Estado compartido para que los filtros de tema y destino no se pisen entre si.
// Cada LI guarda si pasa filtro de destino y si pasa filtro de tema.
// La card solo se muestra cuando pasa ambos.
((global) => {
  const updateCombinedDisplay = (li) => {
    const pasaDestino = li.dataset.filterDestino !== "0";
    const pasaTema = li.dataset.filterTema !== "0";
    li.style.display = pasaDestino && pasaTema ? "" : "none";
  };

  const setFilterState = (li, filterName, passes) => {
    li.dataset[filterName] = passes ? "1" : "0";
    updateCombinedDisplay(li);
  };

  global.FiltrosCombinados = {
    setFilterState,
    updateCombinedDisplay,
  };
})(window);

// funciones.js — filtro por Destino (texto + zonas, incluye Noroeste)
((global) => {
  /**
   * Inicializa el filtro de destinos por zona y texto
   * @method initFiltroDestino
   * @param {Object} config - Configuración del filtro
   * @param {string} config.inputId - ID del campo de búsqueda
   * @param {string} config.checksSelector - Selector CSS de los checkboxes de zonas
   * @param {string} config.listSelector - Selector CSS de la lista de destinos
   * @param {string} config.itemSelector - Selector CSS de los items dentro de la lista
   * @param {string} config.titleSelector - Selector CSS del título de la card
   * @param {string} config.articleSelector - Selector CSS del artículo contenedor
   * @return {Object} Objeto con estado de inicialización y función aplicar
   */
  const initFiltroDestino = ({
    inputId = "buscar-zona",
    checksSelector = '#bloque-destino .lista-check input[type="checkbox"]',
    listSelector = ".listado",
    itemSelector = ".listado > li",
    titleSelector = ".card-titulo",
    articleSelector = "article.card",
  } = {}) => {
    const input = document.getElementById(inputId);
    const checks = Array.from(document.querySelectorAll(checksSelector));
    const list = document.querySelector(listSelector);
    if (!input || !checks.length || !list)
      return { ok: false, motivo: "Faltan controles o lista" };

    const items = Array.from(list.querySelectorAll(itemSelector));

    // Normalizador para comparar texto/zona sin tildes y en minúscula
    const norm = (s) =>
      (s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    // inferZona intenta descubrir a que zona pertenece una card.
    // Primero busca data-zona en el HTML; si no esta, la deduce por el titulo.
    const inferZona = (li) => {
      const art = li.querySelector(articleSelector);
      if (!art) return "";
      const dz = art.getAttribute("data-zona");
      if (dz) return norm(dz);

      const t = norm(li.querySelector(titleSelector)?.textContent);
      // noroeste para Salta y Tucumán
      if (t.includes("salta") || t.includes("tucuman") || t.includes("tucum"))
        return "noroeste";
      // Patagonia
      if (t.includes("ushuaia")) return "patagonia";
      // Litoral
      if (t.includes("misiones") || t.includes("iguazu") || t.includes("iguaz"))
        return "litoral";
      // Centro (BA / Córdoba)
      if (
        t.includes("buenos aires") ||
        t.includes("cordoba") ||
        t.includes("córdoba")
      )
        return "centro";
      return "";
    };

    // Devuelve un arreglo con los valores de los checkboxes de zona marcados.
    const zonasSeleccionadas = () =>
      checks.filter((c) => c.checked).map((c) => norm(c.value));

    const aplicar = () => {
      // q es el texto escrito por el usuario, ya normalizado.
      const q = norm(input.value);
      // zonas es el arreglo de zonas seleccionadas.
      const zonas = zonasSeleccionadas();

      items.forEach((li) => {
        const titulo = norm(li.querySelector(titleSelector)?.textContent);
        const zona = inferZona(li);

        // pasaTexto: true si no hay busqueda o si el titulo contiene el texto.
        const pasaTexto = !q || titulo.includes(q);
        // pasaZona: true si no hay zonas elegidas o si la card pertenece a una de ellas.
        const pasaZona = zonas.length === 0 || (zona && zonas.includes(zona));

        // Si cumple texto y zona, este filtro queda aprobado.
        // FiltrosCombinados combina este resultado con el filtro de temas.
        global.FiltrosCombinados.setFilterState(
          li,
          "filterDestino",
          pasaTexto && pasaZona
        );
      });
    };

    let timer;
    // debounce espera 150ms antes de filtrar para no ejecutar la funcion en cada tecla instantaneamente.
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(aplicar, 150);
    };

    input.addEventListener("input", debounced);
    checks.forEach((c) => c.addEventListener("change", aplicar));

    aplicar();
    return { ok: true, aplicar };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initFiltroDestino = initFiltroDestino;
    initFiltroDestino();
  });
})(window);

((global) => {
  /**
   * Inicializa el filtro por temas de actividades
   * @method initFiltroTemas
   * @param {Object} config - Configuración del filtro
   * @param {string} config.checksSelector - Selector CSS de los checkboxes de temas
   * @param {string} config.listSelector - Selector CSS de la lista de actividades
   * @param {string} config.itemSelector - Selector CSS de los items
   * @param {string} config.articleSel - Selector CSS del artículo
   * @param {string} config.titleSelector - Selector CSS del título
   * @param {string} config.metaSelector - Selector CSS de metadatos
   * @return {Object} Objeto con estado de inicialización y función aplicar
   */
  const initFiltroTemas = ({
    checksSelector = '#bloque-temas .lista-check input[type="checkbox"]',
    listSelector = ".listado",
    itemSelector = ".listado > li",
    articleSel = "article.card",
    titleSelector = ".card-titulo",
    metaSelector = ".card-meta",
  } = {}) => {
    const checks = Array.from(document.querySelectorAll(checksSelector));
    const list = document.querySelector(listSelector);
    if (!checks.length || !list)
      return { ok: false, motivo: "Faltan checks o lista" };

    const items = Array.from(list.querySelectorAll(itemSelector));
    const norm = (s) =>
      (s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    // temasDeLi devuelve un arreglo con los temas asociados a una card.
    const temasDeLi = (li) => {
      const art = li.querySelector(articleSel);
      if (!art) return [];
      const dt = art.getAttribute("data-temas");
      // Si la card trae data-temas, se usa ese atributo directamente.
      if (dt)
        return dt
          .split(",")
          .map((t) => norm(t.trim()))
          .filter(Boolean);

      // Construir texto a partir de título, meta y badge (si existe)
      const parts = [
        li.querySelector(titleSelector)?.textContent,
        li.querySelector(metaSelector)?.textContent,
        li.querySelector(".badge")?.textContent,
      ].map(norm);

      const texto = parts.filter(Boolean).join(" ");

      const temas = new Set();

      // Detectar temas por palabras clave usando expresiones regulares.
      // Set evita repetir el mismo tema mas de una vez.
      if (/(kayak|acuatic|surf|rafting|buceo|snorkel)/.test(texto))
        temas.add("acuaticas");
      if (/(ski|snowboard|trekking|adrenalina|parapente|tirolesa)/.test(texto))
        temas.add("adrenalina");
      if (
        /(naturaleza|parque|sendero|selva|montan|montañ|salinas|paisaje)/.test(
          texto
        )
      )
        temas.add("naturaleza");
      if (/(arte|grafiti|graffiti|concierto|museo|cultural)/.test(texto))
        temas.add("arte");

      // Si el badge contiene la palabra 'actividad', añadir 'actividades'
      const badge = norm(li.querySelector(".badge")?.textContent);
      if (badge && badge.includes("actividad")) temas.add("actividades");

      return Array.from(temas);
    };

    // Devuelve los temas marcados por el usuario.
    const seleccionados = () =>
      checks.filter((c) => c.checked).map((c) => norm(c.value));

    const aplicar = () => {
      const sel = seleccionados();
      items.forEach((li) => {
        const temas = temasDeLi(li);
        // Si no hay temas seleccionados, muestra todo.
        // "actividades" es un tema general, por eso acepta todas las cards.
        // Para los otros temas, muestra solo cards que tengan al menos un tema seleccionado.
        const pasa =
          sel.length === 0 ||
          sel.includes("actividades") ||
          temas.some((t) => sel.includes(t));

        // Este filtro solo guarda si pasa tema; la visibilidad final se decide
        // combinando tema + destino/texto para que un filtro no pise al otro.
        global.FiltrosCombinados.setFilterState(li, "filterTema", pasa);
      });
    };

    checks.forEach((c) => c.addEventListener("change", aplicar));
    aplicar();
    return { ok: true, aplicar };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initFiltroTemas = initFiltroTemas;
    initFiltroTemas();
  });
})(window);

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

/**
 * Obtiene la categoría de una card basada en sus metadatos
 * @method getCategoriaCard
 * @param {HTMLElement} liEl - Elemento LI de la card
 * @return {string} Categoría de la card ('musica', 'nieve' o '')
 */
const getCategoriaCard = (liEl) => {
  const firstMeta =
    liEl.querySelector(".card-meta li")?.textContent?.trim() || "";
  const t = norm(firstMeta);
  if (t.includes("musica")) return "musica";
  if (t.includes("nieve")) return "nieve";
  return "";
};

const getIndexText = (liEl) => {
  // Extrae el titulo de la card y lo normaliza para buscar por texto.
  const titulo = liEl.querySelector(".card-titulo")?.textContent || "";
  return norm(titulo);
};

/**
 * Aplica filtros. Oculta/muestra el LI completo.
 */
const applyFilters = (qValue, catValue, items) => {
  // visibles cuenta cuantas cards quedan mostradas despues del filtro.
  let visibles = 0;

  items.forEach(({ li, idx, cat }) => {
    // matchTexto verifica si el texto buscado aparece en el indice de busqueda.
    const matchTexto = qValue === "" || idx.includes(qValue);
    // matchCat verifica si la categoria coincide o si esta seleccionado "todas".
    const matchCat = catValue === "todas" || cat === catValue;
    // show solo es true si cumple ambos filtros.
    const show = matchTexto && matchCat;

    // Quitar display:none si debe mostrarse
    if (show && li.classList.contains("is-hidden")) {
      li.classList.remove("is-hidden");
      // animación de entrada
      li.classList.add("hide-soft");
      requestAnimationFrame(() => li.classList.remove("hide-soft"));
    }

    if (!show && !li.classList.contains("is-hidden")) {
      li.classList.add("hide-soft");
      setTimeout(() => {
        li.classList.add("is-hidden");
        li.classList.remove("hide-soft");
      }, 160);
    }

    if (show) visibles++;
  });

  return visibles;
};

const announceResults = (count) => {
  // Busca o crea un elemento live para avisar resultados de forma accesible.
  let live = document.getElementById("live-resultado");
  if (!live) {
    live = document.createElement("p");
    live.id = "live-resultado";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    document.getElementById("filtros")?.appendChild(live);
  }
  live.innerHTML =
    (count === 0
      ? "No se encontraron actividades."
      : `Mostrando ${count} actividad${count === 1 ? "" : "es"}.`) +
    ` <span class="pill">${count}</span>`;
};

/** Init: indexa LIs para búsquedas rápidas y ata eventos. */
/**
 * Inicializa el sistema de filtrado de actividades
 * @method initActividades
 * @return {void}
 */
const initActividades = () => {
  const form = document.getElementById("form-filtros");
  const inputQ = document.getElementById("q");
  const selectCat = document.getElementById("categoria");
  // Solo inicializar si estamos en la página de actividades (existe el listado de cards)
  const cardsContainer = document.querySelector("#actividades .cards");
  if (!cardsContainer) return; // no es la página de actividades, salir

  const lis = [...document.querySelectorAll("#actividades .cards > li")];

  // items es un arreglo indexado: cada card guarda su LI, texto normalizado y categoria.
  const items = lis.map((li) => ({
    li,
    idx: getIndexText(li),
    cat: getCategoriaCard(li),
  }));

  // FILTRAR (submit)
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    // Lee filtros actuales y los normaliza antes de aplicarlos.
    const qValue = norm(inputQ?.value || "");
    const catValue = (selectCat?.value || "todas").toLowerCase();
    const visibles = applyFilters(qValue, catValue, items);
    announceResults(visibles);
  });

  // LIMPIAR (reset)
  form?.addEventListener("reset", () => {
    setTimeout(() => {
      inputQ.value = "";
      selectCat.value = "todas";
      const visibles = applyFilters("", "todas", items);
      announceResults(visibles);
    }, 0);
  });

  // Estado inicial
  const visibles = applyFilters("", "todas", items);
  announceResults(visibles);
};

document.addEventListener("DOMContentLoaded", () => {
  initActividades();
});

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// Páginas por destino disponible (claves normalizadas)
const DESTINOS = {
  tucuman: "Tucuman.html",
  "san miguel de tucuman": "Tucuman.html",

  "buenos aires": "BuenosAires.html",
  caba: "BuenosAires.html",
  "ciudad autonoma de buenos aires": "BuenosAires.html",

  salta: "Salta.html",

  cordoba: "Cordoba.html",

  misiones: "Misiones.html",
  iguazu: "Misiones.html",
  iguazú: "Misiones.html",

  ushuaia: "Ushuaia.html",
  usuahia: "Ushuaia.html",
};

// Lista de ciudades válidas para ORIGEN (normalizadas).
// Podés usar solo los canónicos, o permitir alias igual que DESTINOS.
const ORIGEN_VALIDOS = new Set([
  "tucuman",
  "buenos aires",
  "salta",
  "cordoba",
  "misiones",
  "ushuaia",

  // opcionalmente aceptamos alias comunes
  "san miguel de tucuman",
  "caba",
  "ciudad autonoma de buenos aires",
  "iguazu",
  "iguazú",
  "usuahia",
]);

// Letras/espacios básicos
/**
 * Valida el formato de una ciudad
 * @method validateCityFormat
 * @param {HTMLElement} el - Elemento input a validar
 * @param {string} label - Etiqueta para mensajes de error
 * @return {boolean} true si es válido, false si no
 */
const validateCityFormat = (el, label) => {
  // value toma lo escrito por el usuario sin espacios al principio/final.
  const value = el.value.trim();
  const re = /^[ a-zA-ZáéíóúÁÉÍÓÚñÑüÜ'.-]+$/;
  if (!value) {
    alert(`Por favor, ingresá ${label}.`);
    el.value = "";
    el.focus();
    return false;
  }
  if (!re.test(value)) {
    alert(`${label} inválido. Usá solo letras y espacios.`);
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

// Origen debe pertenecer al set de ciudades disponibles
const validateOriginAllowed = (el) => {
  // Normaliza lo escrito y verifica si existe en el Set de origenes permitidos.
  const key = normalize(el.value);
  if (!ORIGEN_VALIDOS.has(key)) {
    alert("Origen no disponible. Seleccioná una ciudad de la lista.");
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

// Pasajeros 1–10
const validatePassengers = (el) => {
  // Convierte el valor del input a numero para validar rango.
  const v = Number(el.value);
  if (!Number.isInteger(v) || v < 1 || v > 10) {
    alert("Cantidad de pasajeros inválida. Debe ser un entero entre 1 y 10.");
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

// Fechas: al menos ida; si hay vuelta, no puede ser anterior a ida
/**
 * Valida las fechas de ida y vuelta
 * @method validateDates
 * @param {HTMLElement} idaEl - Elemento input de fecha de ida
 * @param {HTMLElement} vueltaEl - Elemento input de fecha de vuelta
 * @return {boolean} true si son válidas, false si no
 */
const validateDates = (idaEl, vueltaEl) => {
  // Si el input tiene valor, se convierte a Date; si esta vacio queda null.
  const ida = idaEl.value ? new Date(idaEl.value) : null;
  const vuelta = vueltaEl.value ? new Date(vueltaEl.value) : null;

  if (!ida && !vuelta) {
    alert("Ingresá al menos la fecha de ida.");
    idaEl.focus();
    return false;
  }
  if (ida && vuelta && vuelta < ida) {
    alert("La fecha de vuelta no puede ser anterior a la de ida.");
    vueltaEl.value = "";
    vueltaEl.focus();
    return false;
  }
  return true;
};

// Página de la ciudad destino (o null)
const getDestinoPage = (destinoTexto) => {
  // Convierte el destino ingresado en clave normalizada y busca su pagina HTML.
  const key = normalize(destinoTexto);
  return DESTINOS[key] || null;
};

// --------- Wiring del formulario ---------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-busqueda");
  if (!form) return;

  const origenEl = document.getElementById("origen");
  const destinoEl = document.getElementById("destino");
  const idaEl = document.getElementById("fecha-ida");
  const vueltaEl = document.getElementById("fecha-vuelta");
  const paxEl = document.getElementById("pasajeros");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Formato básico
    if (!validateCityFormat(origenEl, "el origen")) return;
    if (!validateCityFormat(destinoEl, "el destino")) return;

    // Origen solo de la lista
    if (!validateOriginAllowed(origenEl)) return;

    // Pasajeros y fechas
    if (!validatePassengers(paxEl)) return;
    if (!validateDates(idaEl, vueltaEl)) return;

    // Destino debe existir en las páginas disponibles
    const destinoPage = getDestinoPage(destinoEl.value);
    if (!destinoPage) {
      alert("Destino no encontrado. Seleccioná uno de la lista disponible.");
      destinoEl.value = "";
      destinoEl.focus();
      return;
    }

    // Redirigir a la ciudad seleccionada
    window.location.href = destinoPage;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email");
  const clave = document.getElementById("clave");
  const btn = document.getElementById("btn-ingresar"); // <a href="index.html">

  // función para validar formato de email
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s || "").trim());

  const mark = (el, bad) => {
    // Marca visual/accesiblemente un campo invalido con aria-invalid.
    if (!el) return;
    bad
      ? el.setAttribute("aria-invalid", "true")
      : el.removeAttribute("aria-invalid");
  };

  if (btn) {
    btn.addEventListener("click", (e) => {
      const eVal = (email?.value || "").trim();
      const cVal = (clave?.value || "").trim();

      let msg = "";
      if (!eVal || !cVal) msg = "Completá email y clave para ingresar.";
      else if (!isEmail(eVal))
        msg = "Ingresá un email válido (ej.: usuario@dominio.com).";

      if (msg) {
        e.preventDefault();
        alert(msg);
        mark(email, !eVal || !isEmail(eVal));
        mark(clave, !cVal);
        (!eVal || !isEmail(eVal) ? email : clave)?.focus();
      }
    });
  }

  const btnFacebook = document.querySelector(".btn-facebook");
  const btnGoogle = document.querySelector(".btn-google");

  if (btnFacebook) {
    btnFacebook.addEventListener("click", () => {
      window.open("https://www.facebook.com/", "_blank");
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      window.open("https://accounts.google.com/", "_blank");
    });
  }
});

// Función para el formulario de contacto
((global) => {
  const initFormularioContacto = () => {
    // Inicializa el formulario de contacto solo si existen sus elementos en la pagina.
    const form = document.getElementById("form-contacto");
    const btn = document.getElementById("btn-enviar");
    const aviso = document.getElementById("aviso");

    if (!form || !btn || !aviso) return { ok: false };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simula envio: deshabilita el boton, cambia texto y luego muestra aviso.
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "enviando...";

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = original;

        aviso.hidden = false;
        aviso.textContent = "mensaje enviado";

        setTimeout(() => {
          aviso.hidden = true;
        }, 3000);
      }, 400);
    });
    return { ok: true };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initFormularioContacto = initFormularioContacto;
    initFormularioContacto();
  });
})(window);

// Función para el chat
((global) => {
  const initChat = () => {
    // Busca el boton del chat y abre una pagina externa al hacer click.
    const btnChat = document.getElementById("btn-abrir-chat");
    if (!btnChat) return { ok: false };

    btnChat.addEventListener("click", () => {
      window.open("https://chat.openai.com/", "_blank");
    });

    return { ok: true };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initChat = initChat;
    initChat();
  });
})(window);

// Función para el estimador de espera
((global) => {
  const initEstimadorEspera = () => {
    // Toma selects y salida para calcular una espera aproximada.
    const selDia = document.getElementById("dia");
    const selFranja = document.getElementById("franja");
    const btn = document.getElementById("btn-estimar");
    const salida = document.getElementById("resultado");

    if (!selDia || !selFranja || !btn || !salida) return { ok: false };

    const tabla = {
      laboral: { maniana: 0.6, tarde: 1.4, noche: 0.8 },
      fin: { maniana: 0.9, tarde: 1.8, noche: 1.1 },
    };
    const estimar = () => {
      // Lee dia/franja, busca el valor en la tabla y actualiza el texto de salida.
      const d = selDia.value;
      const f = selFranja.value;
      const horas = tabla[d] && tabla[d][f] ? tabla[d][f] : 1.0;
      salida.textContent = "Espera estimada: " + horas.toFixed(1) + " h";
    };

    btn.addEventListener("click", estimar);
    selDia.addEventListener("change", estimar);
    selFranja.addEventListener("change", estimar);

    return { ok: true };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initEstimadorEspera = initEstimadorEspera;
    initEstimadorEspera();
  });
})(window);

document.addEventListener("DOMContentLoaded", () => {
  // Tarifas por noche (USD)
  const tarifa = { eco: 30, std: 46, prm: 69 };

  const form = document.getElementById("form-reserva");
  const btnCalcular = document.getElementById("btn-calcular");
  const subtotalEl = document.getElementById("subtotal");
  const msgEl = document.getElementById("msg");

  if (!form || !btnCalcular || !subtotalEl || !msgEl) return;

  // --- Función para calcular diferencia de días ---
  const diferenciaDias = (desde, hasta) => {
    // Convierte las fechas a milisegundos para calcular la diferencia.
    const t1 = new Date(desde).getTime();
    const t2 = new Date(hasta).getTime();
    if (isNaN(t1) || isNaN(t2)) return 0;
    const diff = Math.ceil((t2 - t1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // --- Calcular subtotal ---
  btnCalcular.addEventListener("click", () => {
    // Lee datos del formulario de reserva y calcula precio total.
    const desde = form["fecha-desde"].value;
    const hasta = form["fecha-hasta"].value;
    const personas = Number(form["cantidad"].value);
    const cat = form["categoria"].value;

    if (!desde || !hasta || !personas || personas <= 0) {
      msgEl.textContent = "Completá fechas válidas y cantidad de personas.";
      subtotalEl.textContent = "$0";
      return;
    }

    const noches = diferenciaDias(desde, hasta);
    if (noches === 0) {
      msgEl.textContent = 'La fecha "Hasta" debe ser posterior a "Desde".';
      subtotalEl.textContent = "$0";
      return;
    }

    const total = (tarifa[cat] || 0) * noches * personas;

    subtotalEl.textContent = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(total);

    msgEl.textContent = "";
  });

  // --- Confirmar reserva ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (subtotalEl.textContent === "$0") {
      msgEl.textContent = "Calculá el subtotal antes de confirmar.";
      return;
    }
    msgEl.textContent = "Reserva registrada.";
  });
});
