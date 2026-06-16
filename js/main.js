/* NODO Soporte & Redes — main.js */
(function () {
  "use strict";

  /* ---------- Año en el footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---------- Animación de aparición ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Patch panel del hero ---------- */
  var portsG = document.getElementById("ports");
  var cablesG = document.getElementById("cables");
  if (!portsG || !cablesG) return;

  var NS = "http://www.w3.org/2000/svg";
  // Colores de pares UTP (T568B): alterna rayado/sólido — naranja, verde, azul, café
  var COLORS = ["#F0731F", "#F0731F", "#16A06B", "#2D6CDF",
                "#2D6CDF", "#16A06B", "#8C5A3C", "#8C5A3C"];
  var N = 8, X0 = 48, GAP = 48, PY = 58, PW = 32, PH = 26;
  var groups = [];

  for (var i = 0; i < N; i++) {
    var x = X0 + i * GAP;
    var g = document.createElementNS(NS, "g");
    g.setAttribute("class", "port-g");
    g.style.setProperty("--on", COLORS[i]);

    var jack = document.createElementNS(NS, "rect");
    jack.setAttribute("x", x); jack.setAttribute("y", PY);
    jack.setAttribute("width", PW); jack.setAttribute("height", PH);
    jack.setAttribute("rx", 3);
    jack.setAttribute("class", "port-jack");

    var clip = document.createElementNS(NS, "rect"); // muesca RJ45
    clip.setAttribute("x", x + PW / 2 - 6); clip.setAttribute("y", PY + PH - 6);
    clip.setAttribute("width", 12); clip.setAttribute("height", 6);
    clip.setAttribute("fill", "#1B2733");

    var led = document.createElementNS(NS, "circle");
    led.setAttribute("cx", x + PW / 2); led.setAttribute("cy", PY - 8);
    led.setAttribute("r", 3);
    led.setAttribute("class", "port-led");

    var tag = document.createElementNS(NS, "text");
    tag.setAttribute("x", x + PW / 2); tag.setAttribute("y", PY + PH + 14);
    tag.setAttribute("class", "port-tag");
    tag.textContent = "0" + (i + 1);

    g.appendChild(jack); g.appendChild(clip); g.appendChild(led); g.appendChild(tag);
    portsG.appendChild(g);
    groups.push(g);

    // Cable que cae del puerto con curva suave
    var cx = x + PW / 2;
    var endX = 60 + i * 44;
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d",
      "M" + cx + " " + (PY + PH) +
      " C" + cx + " " + (PY + PH + 70) + " " + endX + " " + 200 + " " + endX + " 285");
    path.setAttribute("class", "port-cable");
    path.setAttribute("stroke", COLORS[i]);
    path.dataset.port = i + 1;
    cablesG.appendChild(path);
  }

  function setPort(n, on) {
    var idx = n - 1;
    if (!groups[idx]) return;
    groups[idx].classList.toggle("port-on", on);
    var cable = cablesG.querySelector('[data-port="' + n + '"]');
    if (cable) cable.classList.toggle("cable-on", on);
  }

  /* Hover en tarjetas de servicio enciende su puerto */
  document.querySelectorAll(".port[data-port]").forEach(function (card) {
    var n = parseInt(card.dataset.port, 10);
    card.addEventListener("mouseenter", function () { setPort(n, true); });
    card.addEventListener("mouseleave", function () { setPort(n, false); });
  });

  /* Ciclo ambiental: los puertos parpadean en secuencia (respeta reduced motion) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    var cur = 0;
    setInterval(function () {
      setPort(cur + 1, false);
      cur = (cur + 1) % N;
      setPort(cur + 1, true);
      setTimeout(function (c) { return function () { setPort(c + 1, false); }; }(cur), 900);
    }, 1400);
  }
})();
