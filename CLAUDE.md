# CLAUDE.md — nodo-web (NODO Soporte & Redes)

## Propósito
Sitio web corporativo estático para NODO Soporte & Redes, empresa de mantenimiento de
computadores y equipos de oficina con sede en Bogotá. Desplegado en GitHub Pages vía
`automatizacion-it`.

## Repositorio
- **GitHub:** `https://github.com/automatizacion-it/nodo-web`
- **Live:** `https://automatizacion-it.github.io/nodo-web/`
- **Rama:** `main` (raíz `/`)

## Stack
- Vanilla HTML5 / CSS3 / JS ES5 (sin frameworks, sin npm)
- GitHub Pages (rama `main`, carpeta raíz)
- RSS client-side vía `api.rss2json.com` (10k req/día gratis)
- Fuentes: Google Fonts (Big Shoulders Display · Archivo · Chivo Mono)

## Estructura de archivos
```
nodo-web/
├── index.html        # Inicio: hero patch panel + 8 servicios + proceso + contacto
├── noticias.html     # Noticias tech: cuántica, NVIDIA, Intel vs AMD (estático)
├── marcas.html       # RSS: APC/Schneider, Tripp Lite/Eaton, solar, networking
├── gobierno.html     # RSS: MinTIC, Colombia Digital, SECOP + portales directos
├── tips.html         # 6 tips fijos NODO + RSS: Krebs, Bleeping, THN, Ars Technica
├── css/
│   ├── styles.css    # Tokens de diseño (paleta T568B UTP) + layout global
│   └── rss.css       # Estilos canales RSS: skeletons, cards, tips, portales
├── js/
│   ├── main.js       # Patch panel SVG animado, reveals, nav móvil, año footer
│   └── rss.js        # Motor RSS: fetch → rss2json → cards con fecha relativa ES
├── CLAUDE.md         # Este archivo
└── README.md         # Guía de personalización y despliegue
```

## Navbar (7 ítems — igual en todas las páginas)
```
Servicios · Cómo trabajamos · Tech · Marcas · Gobierno TI · Tips · Contacto
```
- `index.html` → anclas internas (`#servicios`, `#proceso`, `#contacto`)
- Páginas secundarias → `index.html#servicios`, `index.html#proceso`, `index.html#contacto`
- Cada página tiene `class="active"` en su propio enlace
- Menú hamburguesa responsive activado por `#navToggle` en `main.js`

## Paleta (código de colores T568B)
| Token       | Hex       | Concepto UTP  |
|-------------|-----------|---------------|
| `--ink`     | `#1B2733` | Panel / texto |
| `--paper`   | `#F4F6F8` | Fondo         |
| `--naranja` | `#F0731F` | Par 1-2       |
| `--verde`   | `#16A06B` | Par 3-6       |
| `--azul`    | `#2D6CDF` | Par 4-5       |
| `--cafe`    | `#8C5A3C` | Par 7-8       |
| `--wa`      | `#22B05A` | WhatsApp      |

## Tipografías
| Rol      | Familia               | Uso                        |
|----------|-----------------------|----------------------------|
| Display  | Big Shoulders Display | H1, H2, H3, brand name     |
| Body     | Archivo               | Párrafos, nav, botones     |
| Mono     | Chivo Mono            | Eyebrows, etiquetas, ports |

## Datos del cliente
- **Empresa:** NODO Soporte & Redes
- **WhatsApp:** 3502605543 → `wa.me/573502605543`
- **Correo:** contacto@nodosoporte.com *(pendiente real)*
- **Ciudad:** Bogotá, Colombia
- **Cobertura:** Bogotá, Soacha, Chía, Mosquera, Funza

## Cómo funciona el RSS
- Cada `<section class="rss-channel">` lleva:
  - `data-feed="URL_rss2json"` — endpoint de rss2json con el feed codificado
  - `data-color="var(--x)"` — color de acento para las cards
  - `data-fallback="URL"` — enlace directo si el feed falla (CORS / servidor caído)
- `rss.js` carga todos los canales al iniciar, escalonados 300ms entre sí
- Muestra skeletons animados mientras carga
- Fechas relativas en español: "hace 3 h", "hace 2 días", etc.
- Fallo silencioso: muestra enlace directo a la fuente si rss2json no responde

## Feeds configurados
| Página    | Canal                | Feed origen              |
|-----------|----------------------|--------------------------|
| marcas    | Schneider Electric   | se.com/rss/news          |
| marcas    | Data Center Knowledge| feedburner               |
| marcas    | PV Magazine LATAM    | pv-magazine-latam.com    |
| marcas    | Network World        | feedburner               |
| gobierno  | MinTIC               | mintic.gov.co            |
| gobierno  | Colombia Digital     | colombiadigital.net      |
| gobierno  | Semana Tecnología    | semana.com               |
| gobierno  | Colombia Compra      | colombiacompra.gov.co    |
| tips      | Krebs on Security    | krebsonsecurity.com      |
| tips      | Bleeping Computer    | bleepingcomputer.com     |
| tips      | The Hacker News      | feedburner               |
| tips      | Ars Technica         | arstechnica.com          |

## Convenciones de código
- SVG siempre inline (sin archivos externos ni `<img>`)
- Íconos de servicios: `stroke` en lugar de `fill` (excepto logos WA)
- CSS: tokens en `:root`, sin !important, selectores de clase simples
- JS: ES5 estricto (`"use strict"`), sin arrow functions, sin let/const
- Responsive: 4 col → 2 col (980px) → 1 col (680px)
- `prefers-reduced-motion` respetado en animaciones y skeleton

## Historial de cambios
| Commit | Descripción |
|--------|-------------|
| feat: sitio inicial | index.html + noticias.html — hero patch panel, 8 servicios, proceso, contacto |
| feat: páginas RSS | marcas.html + gobierno.html + tips.html + rss.css + rss.js |
| fix: navbar completo | 7 ítems en las 5 páginas con `class="active"` por página |

## Pendiente (próximos issues)
- [ ] Fotos reales de instalaciones (reemplazar panel SVG del hero)
- [ ] Logo definitivo — favicon SVG + Open Graph image 1200×630
- [ ] Correo real del cliente
- [ ] Formulario de contacto (Formspree — sin backend)
- [ ] Migrar RSS a GitHub Actions + Claude API (cachear JSON estático, sin rss2json)
- [ ] Dominio propio cuando el cliente lo decida
