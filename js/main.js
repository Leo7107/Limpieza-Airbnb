/* =========================================================
   Royal Cleaning Services · JavaScript
   1. Header al hacer scroll
   2. Enlace activo según la sección visible
   3. Menú hamburguesa
   4. Comparador antes / después
   5. Aparecer al hacer scroll
   6. Año del footer
   ========================================================= */

const header = document.getElementById('header');


/* ---------- 1. Header: transparente arriba, sólido al bajar ---------- */
function revisarScroll() {
  header.classList.toggle('header-scroll', window.scrollY > 20);
}

window.addEventListener('scroll', revisarScroll, { passive: true });
revisarScroll();


/* ---------- 2. Enlace activo del menú ---------- */
const enlacesMenu = document.querySelectorAll('.nav-link');
const seccionesMenu = [...enlacesMenu]
  .map(enlace => document.querySelector(enlace.getAttribute('href')))
  .filter(Boolean);

const observadorSecciones = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (!entrada.isIntersecting) return;
    const id = '#' + entrada.target.id;
    enlacesMenu.forEach(enlace => {
      const esActivo = enlace.getAttribute('href') === id;
      enlace.classList.toggle('activo', esActivo);
      if (esActivo) {
        enlace.setAttribute('aria-current', 'true');
      } else {
        enlace.removeAttribute('aria-current');
      }
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });   // cuenta como "activa" la sección que cruza el centro de la pantalla

seccionesMenu.forEach(seccion => observadorSecciones.observe(seccion));

// Al volver al hero ninguna opción queda marcada
const hero = document.getElementById('inicio');
new IntersectionObserver(([entrada]) => {
  if (entrada.isIntersecting) {
    enlacesMenu.forEach(enlace => {
      enlace.classList.remove('activo');
      enlace.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);


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
  const estaAbierto = document.body.classList.contains('menu-abierto');
  abrirMenu(!estaAbierto);
});

// Al tocar un enlace del menú, se cierra y la página baja a la sección
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


/* ---------- 4. Comparador antes / después ---------- */
const comparador = document.getElementById('comparador');
const control = document.getElementById('comparadorControl');

function moverComparador() {
  // El valor del range (0 a 100) se pasa a la variable CSS --pos
  comparador.style.setProperty('--pos', control.value + '%');
}

control.addEventListener('input', moverComparador);
moverComparador();


/* ---------- 5. Aparecer al hacer scroll ---------- */
const elementosReveal = document.querySelectorAll('.reveal');

// Los elementos hermanos aparecen uno detrás de otro (efecto cascada)
elementosReveal.forEach(elemento => {
  const hermanos = [...elemento.parentElement.children].filter(h => h.classList.contains('reveal'));
  const posicion = hermanos.indexOf(elemento);
  elemento.style.setProperty('--retraso', (posicion * 0.08) + 's');
});

const observadorReveal = new IntersectionObserver((entradas, observador) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);   // solo se anima una vez
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

elementosReveal.forEach(elemento => observadorReveal.observe(elemento));


/* ---------- 6. Año actual en el footer ---------- */
document.getElementById('anio').textContent = new Date().getFullYear();
