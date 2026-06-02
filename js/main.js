/* =========================================================================
   TZero Construcciones — interacciones (vanilla JS, sin dependencias)
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Navbar: fondo sólido al scrollear ---------- */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú mobile (hamburguesa) ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger.addEventListener('click', function () {
    setMenu(!mobileMenu.classList.contains('open'));
  });
  // Cerrar al tocar un link del menú
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
  });

  /* ---------- Animaciones fade-up al hacer scroll ---------- */
  var animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    animated.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: mostrar todo
    animated.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Acordeón FAQ ---------- */
  var faqButtons = document.querySelectorAll('.faq__q');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var panel = item.querySelector('.faq__a');
      var isOpen = item.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.faq__item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq__a').style.maxHeight = null;
      });

      // Abrir el clickeado (si estaba cerrado)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  // Reajustar altura del FAQ abierto si cambia el tamaño de ventana
  window.addEventListener('resize', function () {
    var open = document.querySelector('.faq__item.open .faq__a');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  /* ---------- Formulario de contacto → mailto ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var nombre = get('nombre');
      var telefono = get('telefono');
      var email = get('email');
      var servicio = get('servicio');
      var mensaje = get('mensaje');

      var subject = 'Consulta web — ' + (servicio || 'Presupuesto') + ' — ' + nombre;
      var body =
        'Nombre: ' + nombre + '\n' +
        'Teléfono: ' + telefono + '\n' +
        'Email: ' + email + '\n' +
        'Servicio: ' + (servicio || '-') + '\n\n' +
        'Mensaje:\n' + mensaje + '\n';

      var mailto = 'mailto:pablosolortega@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  /* ---------- Año dinámico (por si se actualiza el footer) ---------- */
  // (El footer usa © 2026 fijo según el brief; dejamos el hook por si hace falta.)
})();
