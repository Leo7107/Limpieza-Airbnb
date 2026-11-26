/* =========================================================
   reveal.js · Aparecer al hacer scroll
   Todo elemento con la clase "reveal" empieza invisible (ver
   base.css) y aparece cuando entra en la pantalla.
   ========================================================= */

const elementosReveal = document.querySelectorAll('.reveal');

// Los elementos hermanos aparecen uno detrás de otro (efecto cascada)
elementosReveal.forEach(elemento => {
  const hermanos = [...elemento.parentElement.children].filter(h => h.classList.contains('reveal'));
  const posicion = hermanos.indexOf(elemento);
  elemento.style.setProperty('--retraso', (posicion * 0.08) + 's');
});

// IntersectionObserver avisa cuando un elemento entra en la pantalla
const observadorReveal = new IntersectionObserver((entradas, observador) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);   // solo se anima una vez
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

elementosReveal.forEach(elemento => observadorReveal.observe(elemento));

const comparador = document.getElementById('comparador');
const controlComparador = document.getElementById('comparadorControl');

if (comparador && controlComparador) {
  function moverComparador() {
    comparador.style.setProperty('--pos', controlComparador.value + '%');
  }

  controlComparador.addEventListener('input', moverComparador);
  moverComparador();
}