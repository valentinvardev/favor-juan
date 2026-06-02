# TZero Construcciones — Landing page

Landing page one-page (scroll vertical) para **TZero Construcciones**, constructora premium
en Villa Carlos Paz, Córdoba. Estética dark navy con acentos dorados, tipografía serif
elegante (Playfair Display) + sans-serif (Inter). 100% responsive, animaciones al scroll.

Sitio **estático, sin build ni dependencias**: HTML5 + CSS moderno + JavaScript vanilla.

## 📁 Estructura

```
tzero-construcciones/
├── index.html        # Todas las secciones de la página
├── css/styles.css    # Estilos + design tokens (colores, tipografías) en :root
├── js/main.js        # Menú mobile, animaciones, acordeón FAQ, formulario
└── README.md         # Este archivo
```

## ▶️ Cómo verlo

Doble click en **`index.html`** y se abre en tu navegador. No necesita instalar nada.

> Las fuentes (Google Fonts), las fotos (Unsplash) y el mapa (Google Maps) se cargan desde
> internet, así que la primera vez conviene estar conectado. El texto y el diseño funcionan
> igual sin conexión.

## 🖼️ Reemplazar las imágenes por fotos de tus obras

Las imágenes actuales son **placeholders de Unsplash**. Para usar tus fotos reales:

1. Creá una carpeta `img/` dentro del proyecto y copiá ahí tus fotos.
2. En `index.html`, buscá los `src="https://images.unsplash.com/..."` y cambialos por la ruta
   de tu archivo, por ejemplo: `src="img/mi-obra-1.jpg"`.
   - **Portfolio:** sección `<!-- PORTFOLIO / TRABAJOS -->` (20 imágenes con su `alt`/título).
   - **Sección "Por qué confiar":** clase `why-media__img`.
   - **Hero (imagen de fondo):** está en `css/styles.css`, en `.hero__media` (y su versión
     mobile dentro del `@media (max-width:880px)`). Cambiá la `url("...")`.
3. Recomendado: fotos horizontales, mínimo 1200px de ancho, optimizadas (JPG/WebP).

> Si una imagen no carga, el lugar muestra un degradado oscuro elegante (no se rompe el diseño).

## ✏️ Cambiar datos de contacto

Están en `index.html` (sección Contacto y Footer) y en `js/main.js` (formulario):

- **Teléfono / WhatsApp:** `+54 9 3541 572133` → en los links `wa.me/5493541572133` y `tel:+5493541572133`.
- **Email:** `pablosolortega@gmail.com` (también en `js/main.js`, variable del `mailto`).
- **Ubicación:** `Tokio 52, Villa Carlos Paz, Córdoba, Argentina` (y la URL del mapa embebido).
- **Horario:** `Lunes a sábado de 8:00 – 19:00`.
- **Redes:** en el footer, reemplazá `https://facebook.com` / `https://instagram.com` por tus perfiles.

### Cómo funcionan los botones
- **WhatsApp** (flotante, CTA y footer): abren `wa.me` con un mensaje prearmado.
- **Formulario "Enviar consulta":** abre tu cliente de correo con los datos cargados (mailto).
  No hay servidor: si querés recibir los envíos automáticamente, se puede conectar a un
  servicio como Formspree más adelante.

## 🎨 Cambiar colores / tipografías

Todo está centralizado en `css/styles.css`, en el bloque `:root` (los *design tokens*):
dorados, navy, bordes, radios, fuentes. Cambiando esas variables se actualiza toda la página.

## 🚀 Publicar online (gratis)

Al ser estático, se sube a cualquier hosting:

- **Netlify** (`app.netlify.com/drop`): arrastrás la carpeta y queda online.
- **Vercel**, **GitHub Pages**, **Cloudflare Pages**: subís los archivos tal cual.
- O a tu hosting con dominio propio por FTP.

---

© 2026 TZero Construcciones · Villa Carlos Paz · Córdoba · Argentina
