/* =========================================================
   INVITACIÓN 15 AÑOS v2 — todo lo editable está en CONFIG
   ========================================================= */
const CONFIG = {
  quinceanera: "Valentina",
  fechaEvento: "2026-12-12T21:00:00-03:00",       // hora de Argentina
  whatsapp: "5493875000000",                        // 54 + 9 + área + número
  alias: "valen.15.regalo",
  // Playlist de Spotify: abrí la playlist > Compartir > Copiar enlace y pegá solo el ID
  // (lo que va entre /playlist/ y el signo ?). Este ID es de ejemplo.
  spotifyPlaylistId: "37i9dQZF1DXcBWIGoYBM5M",
  // Enlaces reales: playlist colaborativa de Spotify y álbum compartido (Google Fotos / Drive)
  spotifyColaborativa: "https://open.spotify.com/",
  albumCompartido: "https://photos.google.com/"
};

// Fotos ficticias (ilustraciones generadas). Cuando tengas fotos reales,
// reemplazá "src" por la ruta, por ejemplo "fotos/valen-5.jpg".
const FOTOS = [
  { t: "Recién nacida · 2011", c: ["#f3c6d3", "#e6c98a"] },
  { t: "Primer cumple · 2012", c: ["#e6c98a", "#c9a0dc"] },
  { t: "Primer día de jardín · 2015", c: ["#9fd3c7", "#f3c6d3"] },
  { t: "Vacaciones en el sur · 2017", c: ["#8fb8ed", "#e6c98a"] },
  { t: "Con mis abuelos · 2018", c: ["#c9a0dc", "#f3c6d3"] },
  { t: "Campeonato de vóley · 2020", c: ["#f7a98b", "#e6c98a"] },
  { t: "Con mis amigas · 2022", c: ["#e58fb4", "#8fb8ed"] },
  { t: "Mis quince · 2026", c: ["#e6c98a", "#e58fb4"] }
];

function ilustracion(c, i) {
  const x = 30 + (i * 37) % 40, y = 28 + (i * 23) % 24;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs>
  <rect width="300" height="400" fill="url(#g)"/>
  <circle cx="${x * 3}" cy="${y * 3}" r="46" fill="#fff" opacity=".35"/>
  <circle cx="${300 - x * 2}" cy="${380 - y * 2}" r="70" fill="#fff" opacity=".18"/>
  <circle cx="150" cy="170" r="42" fill="#2a1233" opacity=".78"/>
  <path d="M60 400 Q150 230 240 400Z" fill="#2a1233" opacity=".78"/>
  <path d="M150 52l7 18 19 2-14 13 5 19-17-10-17 10 5-19-14-13 19-2z" fill="#fff" opacity=".8"/></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const $ = (id) => document.getElementById(id);
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const leer = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } };
const esc = (s) => s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const wa = (txt) => window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");

/* ---------- Sobre + confeti ---------- */
const canvas = $("confeti"), ctx = canvas.getContext("2d");
let piezas = [];
function confeti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  canvas.width = innerWidth; canvas.height = innerHeight;
  const cols = ["#e6c98a", "#f3c6d3", "#fbf4ec", "#c9a0dc"];
  piezas = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 2,
    vx: (Math.random() - .5) * 14, vy: Math.random() * -13 - 3,
    s: 5 + Math.random() * 6, r: Math.random() * 6, c: cols[(Math.random() * 4) | 0]
  }));
  (function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += .3; p.r += .15;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    piezas = piezas.filter((p) => p.y < canvas.height + 20);
    if (piezas.length) requestAnimationFrame(frame); else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}
$("btn-abrir").addEventListener("click", () => {
  $("sobre").classList.add("abierto");
  document.body.classList.remove("cerrada");
  confeti();
});

/* ---------- Pétalos ---------- */
for (let i = 0; i < 14; i++) {
  const p = document.createElement("i");
  p.className = "petalo";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = 9 + Math.random() * 9 + "s";
  p.style.animationDelay = -Math.random() * 12 + "s";
  document.querySelector(".petalos").appendChild(p);
}

/* ---------- Cuenta regresiva ---------- */
const destino = new Date(CONFIG.fechaEvento).getTime();
const dd = (n) => String(n).padStart(2, "0");
function cuenta() {
  const t = Math.floor((destino - Date.now()) / 1000);
  if (t <= 0) { $("fin-cuenta").textContent = "¡Hoy es el gran día!"; clearInterval(timer); return; }
  $("dias").textContent = dd(Math.floor(t / 86400));
  $("horas").textContent = dd(Math.floor((t % 86400) / 3600));
  $("minutos").textContent = dd(Math.floor((t % 3600) / 60));
  $("segundos").textContent = dd(t % 60);
}
const timer = setInterval(cuenta, 1000); cuenta();

/* ---------- Álbum + visor ---------- */
const visor = $("visor");
function agregarFoto(src, titulo) {
  const b = document.createElement("button");
  b.className = "foto"; b.type = "button";
  b.innerHTML = `<img src="${src}" alt="${esc(titulo)}"><span>${esc(titulo)}</span>`;
  b.addEventListener("click", () => { $("visor-img").src = src; $("visor-img").alt = titulo; $("visor-pie").textContent = titulo; visor.showModal(); });
  $("album").appendChild(b);
}
FOTOS.forEach((f, i) => agregarFoto(f.src || ilustracion(f.c, i), f.t));
$("visor-cerrar").addEventListener("click", () => visor.close());
visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); });
$("subir-foto").addEventListener("change", (e) => {
  const f = e.target.files[0]; if (!f) return;
  agregarFoto(URL.createObjectURL(f), "Foto de un invitado");
  e.target.value = "";
});
$("enlace-album").href = CONFIG.albumCompartido;

/* ---------- Spotify + temas propuestos ---------- */
$("spotify").src = `https://open.spotify.com/embed/playlist/${CONFIG.spotifyPlaylistId}?utm_source=generator&theme=0`;
$("enlace-colab").href = CONFIG.spotifyColaborativa;
let temas = leer("temas");
function pintarTemas() {
  $("lista-temas").innerHTML = temas.map((t, i) =>
    `<li><span>${esc(t.n)} · ${esc(t.a)}</span><button type="button" data-i="${i}" aria-label="Quitar">Quitar</button></li>`).join("");
}
$("lista-temas").addEventListener("click", (e) => {
  if (e.target.dataset.i) { temas.splice(+e.target.dataset.i, 1); guardar("temas", temas); pintarTemas(); }
});
$("btn-tema").addEventListener("click", () => {
  const n = $("tema").value.trim(), a = $("artista").value.trim();
  if (!n || !a) { $("error-tema").textContent = "Completá la canción y el artista."; $("error-tema").hidden = false; return; }
  $("error-tema").hidden = true;
  temas.push({ n, a }); guardar("temas", temas); pintarTemas();
  $("tema").value = $("artista").value = ""; $("tema").focus();
});
$("btn-temas-wa").addEventListener("click", () => {
  if (!temas.length) { $("error-tema").textContent = "Primero agregá al menos un tema."; $("error-tema").hidden = false; return; }
  wa(`Hola! Estos son los temas que propongo para los 15 de ${CONFIG.quinceanera}:\n` + temas.map((t) => `- ${t.n} (${t.a})`).join("\n"));
});
pintarTemas();

/* ---------- Alias ---------- */
$("alias").textContent = CONFIG.alias;
$("btn-alias").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(CONFIG.alias); $("btn-alias").textContent = "Alias copiado"; }
  catch (e) { $("btn-alias").textContent = "Copialo a mano: " + CONFIG.alias; }
});

/* ---------- Confirmación por WhatsApp ---------- */
$("btn-confirmar").addEventListener("click", () => {
  const nombre = $("nombre").value.trim();
  if (nombre.length < 3) { $("error-rsvp").textContent = "Escribí tu nombre para confirmar."; $("error-rsvp").hidden = false; $("nombre").focus(); return; }
  $("error-rsvp").hidden = true;
  const va = document.querySelector('input[name="asist"]:checked').value === "si";
  const n = $("personas").value, menu = $("menu").value.trim();
  wa(va
    ? `Hola! Soy ${nombre}. Confirmo mi asistencia a los 15 de ${CONFIG.quinceanera}. Vamos ${n} ${n === "1" ? "persona" : "personas"}.${menu ? " Restricción alimentaria: " + menu + "." : ""}`
    : `Hola! Soy ${nombre}. Lamentablemente no voy a poder ir a los 15 de ${CONFIG.quinceanera}. ¡Un abrazo grande!`);
});

/* ---------- Libro de visitas ---------- */
const base = [{ n: "Abuela Marta", m: "Mi nena hermosa, que sea la noche más linda de tu vida." },
              { n: "Camila", m: "¡No veo la hora de bailar con vos toda la noche!" }];
let visitas = leer("visitas");
function pintarVisitas() {
  $("visitas").innerHTML = [...visitas, ...base].map((v) => `<li><b>${esc(v.n)}</b>${esc(v.m)}</li>`).join("");
}
$("btn-visita").addEventListener("click", () => {
  const n = $("v-nombre").value.trim(), m = $("v-msg").value.trim();
  if (!n || !m) return;
  visitas.unshift({ n, m }); guardar("visitas", visitas); pintarVisitas();
  $("v-nombre").value = $("v-msg").value = "";
});
pintarVisitas();

/* ---------- Aparición suave al hacer scroll ---------- */
const obs = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".seccion > *").forEach((el) => { el.classList.add("revelar"); obs.observe(el); });
 
/* ===== BRILLOS DE FONDO (decoración) ===== */
(function () {
  const cv = document.getElementById("brillos");
  if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = cv.getContext("2d");
  const colores = ["230,201,138", "243,198,211", "251,244,236"];
  let w, h, pts;

  function medir() {
    w = cv.width = innerWidth;
    h = cv.height = innerHeight;
  }

  function nueva(inicio) {
    return {
      x: Math.random() * w,
      y: inicio ? Math.random() * h : h + 10,
      r: 0.8 + Math.random() * 2.2,
      v: 0.15 + Math.random() * 0.45,
      f: Math.random() * Math.PI * 2,
      c: colores[(Math.random() * colores.length) | 0]
    };
  }

  medir();
  pts = Array.from({ length: innerWidth < 600 ? 28 : 55 }, () => nueva(true));
  addEventListener("resize", medir);

  (function dibujar(t) {
    c.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.y -= p.v;
      p.x += Math.sin(t / 2200 + p.f) * 0.3;
      const brillo = 0.25 + 0.35 * Math.sin(t / 900 + p.f);
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      c.fillStyle = "rgba(" + p.c + "," + Math.max(brillo, 0.05) + ")";
      c.shadowColor = "rgba(" + p.c + ",.8)";
      c.shadowBlur = 8;
      c.fill();
      if (p.y < -10) pts[i] = nueva(false);
    });
    requestAnimationFrame(dibujar);
  })(0);
})();
/* ===== INTRO INTERACTIVA (decoración) ===== */
(function () {
  const sobre = document.getElementById("sobre");
  const cv = document.getElementById("sobre-fx");
  const btn = document.getElementById("btn-abrir");
  if (!sobre || !cv) return;

  // tocar el sello también abre la invitación
  const sello = sobre.querySelector(".sello");
  if (sello && btn) sello.addEventListener("click", () => btn.click());

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const c = cv.getContext("2d");
  const cols = ["230,201,138", "243,198,211", "251,244,236"];
  let w, h, ps = [], abiertoEn = 0;

  function medir() { w = cv.width = innerWidth; h = cv.height = innerHeight; }
  medir();
  addEventListener("resize", medir);

  const color = () => cols[(Math.random() * cols.length) | 0];

  function ambiente() {
    return { amb: true, x: Math.random() * w, y: Math.random() * h,
             r: 0.8 + Math.random() * 2, vx: 0, vy: -(0.1 + Math.random() * 0.3),
             f: Math.random() * 6.28, c: color() };
  }
  for (let i = 0; i < 45; i++) ps.push(ambiente());

  function chispas(x, y, vel, n) {
    for (let i = 0; i < n; i++) {
      ps.push({ x, y, r: 1 + Math.random() * 2.2,
                vx: (Math.random() - 0.5) * vel, vy: (Math.random() - 0.5) * vel,
                vida: 1, fade: 0.012 + Math.random() * 0.02, c: color() });
    }
  }

  sobre.addEventListener("pointermove", (e) => chispas(e.clientX, e.clientY, 1.6, 2));
  sobre.addEventListener("pointerdown", (e) => chispas(e.clientX, e.clientY, 6, 14));
  if (btn) btn.addEventListener("click", () => { abiertoEn = performance.now(); chispas(w / 2, h / 2, 16, 100); });

  (function dibujar(t) {
    if (abiertoEn && performance.now() - abiertoEn > 1700) { c.clearRect(0, 0, w, h); return; }
    c.clearRect(0, 0, w, h);
    ps.forEach((p) => {
      let a;
      if (p.amb) {
        p.y += p.vy; p.x += Math.sin(t / 2000 + p.f) * 0.25;
        a = 0.25 + 0.35 * Math.sin(t / 800 + p.f);
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      } else {
        p.x += p.vx; p.y += p.vy; p.vy += 0.01; p.vida -= p.fade;
        a = p.vida;
      }
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, 6.283);
      c.fillStyle = "rgba(" + p.c + "," + Math.max(a, 0.05) + ")";
      c.shadowColor = "rgba(" + p.c + ",.8)";
      c.shadowBlur = 8;
      c.fill();
    });
    ps = ps.filter((p) => p.amb || p.vida > 0);
    requestAnimationFrame(dibujar);
  })(0);
})();