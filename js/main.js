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

  /* ---------- Lightbox de la galería ---------- */
  var galleryImgs = Array.prototype.slice.call(
    document.querySelectorAll('.portfolio-grid .pf img')
  );
  if (galleryImgs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Cerrar">×</button>' +
      '<button class="lightbox__nav lightbox__prev" type="button" aria-label="Anterior">‹</button>' +
      '<figure class="lightbox__figure">' +
        '<img class="lightbox__img" alt="" />' +
        '<figcaption class="lightbox__cap"></figcaption>' +
      '</figure>' +
      '<button class="lightbox__nav lightbox__next" type="button" aria-label="Siguiente">›</button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var lbCap = lb.querySelector('.lightbox__cap');
    var current = 0;

    function showAt(i) {
      current = (i + galleryImgs.length) % galleryImgs.length;
      var src = galleryImgs[current];
      lbImg.src = src.getAttribute('src');
      lbImg.alt = src.getAttribute('alt') || '';
      lbCap.textContent = src.getAttribute('alt') || '';
    }
    function openLb(i) {
      showAt(i);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryImgs.forEach(function (img, i) {
      img.addEventListener('click', function () { openLb(i); });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { showAt(current - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { showAt(current + 1); });
    // Cerrar al tocar el fondo (fuera de la imagen)
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__figure')) closeLb();
    });
    // Teclado: Escape cierra, flechas navegan
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') showAt(current - 1);
      else if (e.key === 'ArrowRight') showAt(current + 1);
    });
  }

  /* ---------- Año dinámico (por si se actualiza el footer) ---------- */
  // (El footer usa © 2026 fijo según el brief; dejamos el hook por si hace falta.)
})();
