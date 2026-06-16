# NODO Soporte & Redes — Web corporativa

Sitio estático (HTML/CSS/JS vanilla, sin dependencias) listo para GitHub Pages.

## Estructura

```
nodo-web/
├── index.html        # Inicio: hero, 8 servicios, proceso, contacto
├── noticias.html     # Noticias tech: cuántica, NVIDIA, Intel vs AMD
├── css/styles.css    # Tokens de diseño + estilos
└── js/main.js        # Patch panel animado, reveals, nav móvil
```

## Personalización rápida (buscar y reemplazar)

| Qué cambiar | Buscar |
|---|---|
| Nombre de la empresa | `NODO Soporte & Redes` y `NODO` |
| WhatsApp | `573502605543` (en todos los enlaces `wa.me`) |
| Teléfono fijo | `576011112233` y `(601) 111 2233` |
| Correo | `contacto@nodosoporte.com` |
| Redes sociales | URLs de `facebook.com/`, `instagram.com/`, `tiktok.com/`, `linkedin.com/`, `x.com/` en la sección contacto |
| Cobertura y horarios | Sección `.contact-card` en `index.html` |

## Paleta (concepto: código de colores UTP T568B)

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#1B2733` | Texto, panel oscuro |
| `--paper` | `#F4F6F8` | Fondo |
| `--naranja` | `#F0731F` | Acento principal (pares 1-2) |
| `--verde` | `#16A06B` | Pares 3 y 6 |
| `--azul` | `#2D6CDF` | Pares 4-5 |
| `--cafe` | `#8C5A3C` | Pares 7-8 |
| `--wa` | `#22B05A` | Botones WhatsApp |

Tipografías: Big Shoulders Display (títulos) · Archivo (cuerpo) · Chivo Mono (etiquetas técnicas).

## Despliegue en GitHub Pages

```powershell
cd ~\OneDrive\2026-proyectos
gh repo create automatizacion-it/nodo-web --public --clone
# copiar los archivos al repo y luego:
git add . ; git commit -m "Sitio inicial NODO" ; git push
gh api repos/automatizacion-it/nodo-web/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

Quedará en `https://automatizacion-it.github.io/nodo-web/`.

## Pendiente / siguiente fase

- Fotos reales de trabajos (reemplazar/acompañar los SVG de servicios).
- Página RSS dinámica: cuando se decida, replicar el patrón GitHub Actions + Claude API de `webcorporativa`.
- Favicon definitivo y Open Graph image cuando exista el logo final.
