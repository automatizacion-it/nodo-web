/* ============================================================
   rss.js — Motor RSS client-side vía rss2json.com (API pública)
   NODO Soporte & Redes
   Lee data-feed de cada .rss-channel y puebla su .ch-grid
   ============================================================ */
(function () {
  "use strict";

  /* Fecha relativa en español */
  function timeAgo(dateStr) {
    var d = new Date(dateStr);
    if (isNaN(d)) return "";
    var diff = Math.floor((Date.now() - d) / 1000);
    if (diff < 60)    return "hace un momento";
    if (diff < 3600)  return "hace " + Math.floor(diff / 60) + " min";
    if (diff < 86400) return "hace " + Math.floor(diff / 3600) + " h";
    if (diff < 604800)return "hace " + Math.floor(diff / 86400) + " días";
    return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
  }

  /* Strip HTML y truncar */
  function clean(html, max) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    var txt = (tmp.textContent || tmp.innerText || "").trim().replace(/\s+/g, " ");
    return max && txt.length > max ? txt.slice(0, max).replace(/\s\S+$/, "") + "…" : txt;
  }

  /* Construir tarjeta de artículo */
  function buildCard(item, accentColor) {
    var a = document.createElement("a");
    a.className = "rss-article";
    a.href = item.link || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.setProperty("--ac", accentColor || "var(--naranja)");

    var meta = document.createElement("span");
    meta.className = "art-meta";
    meta.textContent = timeAgo(item.pubDate);

    var h3 = document.createElement("h3");
    h3.textContent = clean(item.title, 90);

    var p = document.createElement("p");
    p.textContent = clean(item.description || item.content || "", 160);

    var cta = document.createElement("span");
    cta.className = "art-cta";
    cta.textContent = "Leer artículo";

    a.appendChild(meta);
    a.appendChild(h3);
    if (p.textContent) a.appendChild(p);
    a.appendChild(cta);
    return a;
  }

  /* Mensaje de error con fallback */
  function buildError(fallbackUrl) {
    var div = document.createElement("div");
    div.className = "rss-error";
    if (fallbackUrl) {
      div.innerHTML = "No se pudo cargar el feed en este momento. " +
        '<a href="' + fallbackUrl + '" target="_blank" rel="noopener">Ver fuente directamente →</a>';
    } else {
      div.textContent = "No se pudo cargar el feed en este momento. Intente más tarde.";
    }
    return div;
  }

  /* Cargar un canal */
  function loadChannel(section) {
    var feedUrl  = section.dataset.feed;
    var fallback = section.dataset.fallback || null;
    var color    = section.dataset.color || "var(--naranja)";
    var grid     = section.querySelector(".ch-grid");
    if (!feedUrl || !grid) return;

    fetch(feedUrl)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        grid.innerHTML = "";
        if (!data || data.status !== "ok" || !data.items || !data.items.length) {
          grid.appendChild(buildError(fallback));
          return;
        }
        data.items.forEach(function (item) {
          grid.appendChild(buildCard(item, color));
        });
      })
      .catch(function () {
        grid.innerHTML = "";
        grid.appendChild(buildError(fallback));
      });
  }

  /* Inicializar cuando el DOM esté listo */
  function init() {
    var channels = document.querySelectorAll(".rss-channel[data-feed]");
    if (!channels.length) return;

    /* Cargar de forma escalonada para no saturar la API */
    channels.forEach(function (ch, i) {
      setTimeout(function () { loadChannel(ch); }, i * 300);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
