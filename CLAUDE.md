# CLAUDE.md — nodo-web (NODO Soporte & Redes)

## Propósito
Sitio web corporativo estático para NODO Soporte & Redes, empresa de mantenimiento de
computadores y equipos de oficina con sede en Bogotá. Desplegado en GitHub Pages vía
`automatizacion-it`.

## Stack
- Vanilla HTML5 / CSS3 / JS ES5 (sin frameworks, sin npm)
- GitHub Pages (rama `main`, carpeta raíz)
- Fuentes: Google Fonts (Big Shoulders Display · Archivo · Chivo Mono)

## Estructura de archivos
```
index.html        # Inicio: hero + 8 servicios + proceso + contacto
noticias.html     # Noticias tech: cuántica, NVIDIA, Intel vs AMD
css/styles.css    # Tokens de diseño (paleta T568B UTP) + layout
js/main.js        # Patch panel SVG, IntersectionObserver reveals, nav móvil
CLAUDE.md         # Este archivo
README.md         # Guía de personalización y despliegue
```

## Paleta (código de colores T568B)
| Token        | Hex       | Concepto         |
|--------------|-----------|------------------|
| `--ink`      | `#1B2733` | Panel / texto    |
| `--naranja`  | `#F0731F` | Par 1-2          |
| `--verde`    | `#16A06B` | Par 3-6          |
| `--azul`     | `#2D6CDF` | Par 4-5          |
| `--cafe`     | `#8C5A3C` | Par 7-8          |
| `--wa`       | `#22B05A` | WhatsApp         |

## Datos del cliente
- **Empresa:** NODO Soporte & Redes
- **WhatsApp:** 3502605543 → `wa.me/573502605543`
- **Correo:** contacto@nodosoporte.com *(pendiente real)*
- **Ciudad:** Bogotá, Colombia

## Convenciones
- Todos los SVG son inline (sin archivos externos)
- Los íconos de servicios van en `.port-icon svg` con `stroke` en lugar de `fill`
- Las fotos reales reemplazan el panel SVG del hero cuando el cliente las entregue
- Responsive: 4 col → 2 col (980px) → 1 col (680px)

## Pendiente
- [ ] Fotos reales de instalaciones del cliente
- [ ] Logo definitivo (favicon + Open Graph)
- [ ] Correo real del cliente
- [ ] Página RSS dinámica (GitHub Actions + Claude API — mismo patrón que `webcorporativa`)
- [ ] Formulario de contacto (Formspree o similar, sin backend)

## Historial de issues
| # | Descripción | Estado |
|---|-------------|--------|
| — | Sitio inicial con 8 servicios + noticias tech | ✅ Cerrado en commit inicial |

## Actualización: páginas RSS (segunda fase)

### Nuevos archivos
```
marcas.html       # RSS: APC/Schneider, Tripp Lite/Eaton, solar, networking
gobierno.html     # RSS: MinTIC, Colombia Digital, Semana tech, SECOP + portales directos
tips.html         # 6 tips estáticos escritos por NODO + 4 feeds RSS: Krebs, Bleeping Computer, The Hacker News, Ars Technica
css/rss.css       # Estilos para páginas RSS: skeletons, cards, tips, portales gobierno
js/rss.js         # Motor RSS client-side vía api.rss2json.com — no requiere backend
```

### Cómo funciona el RSS
- Cada `<section class="rss-channel">` lleva `data-feed="URL_rss2json"` y `data-color="var(--x)"`
- `rss.js` lee todos los canales al cargar y los puebla de forma escalonada (300ms entre llamadas)
- Si un feed falla (CORS, servidor caído), muestra mensaje con `data-fallback` al portal directo
- rss2json.com tiene 10 000 req/día gratis — suficiente para tráfico normal

### Feeds configurados
| Página | Canal | Feed origen |
|--------|-------|-------------|
| marcas | Schneider Electric | se.com/rss/news |
| marcas | Data Center Knowledge | feedburner |
| marcas | PV Magazine LATAM | pv-magazine-latam.com |
| marcas | Network World | feedburner |
| gobierno | MinTIC | mintic.gov.co |
| gobierno | Colombia Digital | colombiadigital.net |
| gobierno | Semana Tecnología | semana.com |
| gobierno | Colombia Compra | colombiacompra.gov.co |
| tips | Krebs on Security | krebsonsecurity.com |
| tips | Bleeping Computer | bleepingcomputer.com |
| tips | The Hacker News | feedburner |
| tips | Ars Technica | arstechnica.com |

### Pendiente (issues futuros)
- [ ] Agregar clave API rss2json PRO si el tráfico sube (50k req/día — $9/mes)
- [ ] Migrar a GitHub Actions + Claude API para cachear RSS como JSON estático (sin depender de rss2json)
