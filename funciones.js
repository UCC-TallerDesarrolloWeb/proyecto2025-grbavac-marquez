// funciones.js — ordenar cards por precio (asc/desc)
((global) => {
  // --------- ORDEN POR PRECIO (asc/desc) ----------
  const initOrdenPrecio = ({
    selectId = "ordenar",
    listSelector = ".listado",
    itemSelector = ".listado > li",
    priceSelector = ".monto",
  } = {}) => {
    const select = document.getElementById(selectId);
    const list = document.querySelector(listSelector);
    if (!select || !list) return { ok: false, motivo: "Falta select o lista" };

    // cache para orden estable
    const originalItems = Array.from(list.querySelectorAll(itemSelector));

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
      const asc = (select.value || "").toLowerCase() === "price-asc";
      const items = Array.from(list.querySelectorAll(itemSelector));

      const enriched = items
        .map((li) => ({ li, p: getPrice(li), idx: originalItems.indexOf(li) }))
        .map((o) => (o.idx < 0 ? { ...o, idx: Number.MAX_SAFE_INTEGER } : o));

      enriched.sort((a, b) =>
        a.p === b.p ? a.idx - b.idx : asc ? a.p - b.p : b.p - a.p
      );

      list.replaceChildren(...enriched.map((e) => e.li));
    };

    select.addEventListener("change", ordenar);
    ordenar(); // aplica el orden inicial
    return { ok: true, ordenar };
  };

  // Exponer y auto-inicializar
  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initOrdenPrecio = initOrdenPrecio;
    initOrdenPrecio(); // auto-init con ids/selectores por defecto
  });
})(window);

// funciones.js — filtro por Destino (texto + zonas, incluye Noroeste)
((global) => {
  const initFiltroDestino = ({
    inputId = "buscar-zona",
    // Tomamos TODOS los checkboxes dentro de la lista de zonas, sin depender del name
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

    // Heurística de zona si no hay data-zona en el <article>
    const inferZona = (li) => {
      const art = li.querySelector(articleSelector);
      if (!art) return "";
      const dz = art.getAttribute("data-zona");
      if (dz) return norm(dz);

      const t = norm(li.querySelector(titleSelector)?.textContent);
      // NUEVO: noroeste para Salta y Tucumán
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
      // Sin zona clara
      return "";
    };

    // Zonas seleccionadas (OR entre checks)
    const zonasSeleccionadas = () =>
      checks.filter((c) => c.checked).map((c) => norm(c.value));

    const aplicar = () => {
      const q = norm(input.value);
      const zonas = zonasSeleccionadas(); // [] => no filtra por zona

      items.forEach((li) => {
        const titulo = norm(li.querySelector(titleSelector)?.textContent);
        const zona = inferZona(li);

        const pasaTexto = !q || titulo.includes(q);
        const pasaZona = zonas.length === 0 || (zona && zonas.includes(zona));

        li.style.display = pasaTexto && pasaZona ? "" : "none";
      });
    };

    // Debounce para el input de búsqueda
    let timer;
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(aplicar, 150);
    };

    input.addEventListener("input", debounced);
    checks.forEach((c) => c.addEventListener("change", aplicar));

    aplicar(); // primera pasada
    return { ok: true, aplicar };
  };

  document.addEventListener("DOMContentLoaded", () => {
    global.Funciones = global.Funciones || {};
    global.Funciones.initFiltroDestino = initFiltroDestino;
    initFiltroDestino();
  });
})(window);

((global) => {
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

    // Lee temas desde data-temas="acuaticas,adrenalina" o infiere (sin gastro/tesoros)
    const temasDeLi = (li) => {
      const art = li.querySelector(articleSel);
      if (!art) return [];
      const dt = art.getAttribute("data-temas");
      if (dt)
        return dt
          .split(",")
          .map((t) => norm(t.trim()))
          .filter(Boolean);

      // Heurística por título + meta
      const texto = [
        li.querySelector(titleSelector)?.textContent,
        li.querySelector(metaSelector)?.textContent,
      ]
        .map(norm)
        .join(" ");

      const temas = new Set();
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
      return Array.from(temas);
    };

    const seleccionados = () =>
      checks.filter((c) => c.checked).map((c) => norm(c.value));

    const aplicar = () => {
      const sel = seleccionados(); // OR: sin selección => no filtra por temas
      items.forEach((li) => {
        const temas = temasDeLi(li);
        const pasa = sel.length === 0 || temas.some((t) => sel.includes(t));

        if (!pasa) {
          li.style.display = "none";
        } else if (li.style.display === "none") {
          // no “forzamos mostrar” si otro filtro ya lo ocultó más tarde
          li.style.display = "";
        }
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

/* actividades.js — filtros con reflow elegante SOLO POR TITULO */

/** Normaliza texto (minúsculas + sin acentos). */
const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

/** Lee la categoría de la card por su primer <li> en .card-meta. */
const getCategoriaCard = (liEl) => {
  const firstMeta =
    liEl.querySelector(".card-meta li")?.textContent?.trim() || "";
  const t = norm(firstMeta);
  if (t.includes("musica")) return "musica";
  if (t.includes("nieve")) return "nieve";
  return "";
};

/** Texto indexable SOLO con el título para búsqueda. */
const getIndexText = (liEl) => {
  const titulo = liEl.querySelector(".card-titulo")?.textContent || "";
  return norm(titulo);
};

/**
 * Aplica filtros. Oculta/muestra el LI completo (reflow inmediato).
 * Usa una clase "hide-soft" breve para un fade/scale suave.
 */
const applyFilters = (qValue, catValue, items) => {
  let visibles = 0;

  items.forEach(({ li, idx, cat }) => {
    const matchTexto = qValue === "" || idx.includes(qValue);
    const matchCat = catValue === "todas" || cat === catValue;
    const show = matchTexto && matchCat;

    // Quitar display:none si debe mostrarse
    if (show && li.classList.contains("is-hidden")) {
      li.classList.remove("is-hidden");
      // animación de entrada
      li.classList.add("hide-soft");
      requestAnimationFrame(() => li.classList.remove("hide-soft"));
    }

    // Ocultar con una pequeña animación
    if (!show && !li.classList.contains("is-hidden")) {
      li.classList.add("hide-soft");
      setTimeout(() => {
        li.classList.add("is-hidden"); // saca del flujo → reacomoda
        li.classList.remove("hide-soft");
      }, 160);
    }

    if (show) visibles++;
  });

  return visibles;
};

/** Badge accesible con la cantidad de visibles. */
const announceResults = (count) => {
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
const initActividades = () => {
  const form = document.getElementById("form-filtros");
  const inputQ = document.getElementById("q");
  const selectCat = document.getElementById("categoria");
  const lis = [...document.querySelectorAll("#actividades .cards > li")];

  const items = lis.map((li) => ({
    li,
    idx: getIndexText(li), // SOLO titulo
    cat: getCategoriaCard(li), // "musica" | "nieve" | ""
  }));

  // FILTRAR (submit)
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
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

/* =========================================================================
 * Validación y navegación del buscador de Rutas Argentinas
 * ========================================================================= */

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
  usuahia: "Usuahia.html", // alias si tu archivo se llama así
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

// --------- Validaciones de campos ---------

// Letras/espacios básicos
const validateCityFormat = (el, label) => {
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
const validateDates = (idaEl, vueltaEl) => {
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
