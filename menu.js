const header = document.getElementById('header');


/* ---------- 1. Header al hacer scroll ---------- */
function revisarScroll() {
  header.classList.toggle('header-scroll', window.scrollY > 20);
}

window.addEventListener('scroll', revisarScroll, { passive: true });
revisarScroll();


/* ---------- 2. Enlace activo del menú ---------- */
const enlacesMenu = document.querySelectorAll('header nav a');

function marcarEnlace(id) {
  enlacesMenu.forEach(enlace => {
    const esActivo = enlace.getAttribute('href') === id;
    enlace.classList.toggle('activo', esActivo);
    if (esActivo) {
      enlace.setAttribute('aria-current', 'true');
    } else {
      enlace.removeAttribute('aria-current');
    }
  });
}

// Cuenta como "activa" la sección que cruza el centro de la pantalla
const observadorSecciones = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) marcarEnlace('#' + entrada.target.id);
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach(seccion => observadorSecciones.observe(seccion));


/* ---------- 3. Menú hamburguesa ---------- */
const botonMenu = document.getElementById('menuToggle');
const menuMovil = document.getElementById('menuMovil');

function abrirMenu(abrir) {
  document.body.classList.toggle('menu-abierto', abrir);
  botonMenu.setAttribute('aria-expanded', abrir);
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  menuMovil.setAttribute('aria-hidden', !abrir);
}

botonMenu.addEventListener('click', () => {
  abrirMenu(!document.body.classList.contains('menu-abierto'));
});

// Al tocar un enlace, el menú se cierra y la página baja a la sección
menuMovil.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', () => abrirMenu(false));
});

// La tecla Escape también lo cierra
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && document.body.classList.contains('menu-abierto')) {
    abrirMenu(false);
    botonMenu.focus();
  }
});

// Si la pantalla se agranda a escritorio con el menú abierto, se cierra
window.matchMedia('(min-width: 1024px)').addEventListener('change', evento => {
  if (evento.matches) abrirMenu(false);
});
