# HÁBIL.UY — Calculadora de Día Hábil en Uruguay

> Sumá días hábiles fácil y rápido, descontando fines de semana y feriados uruguayos con traslado por Ley 16.805.

**Demo en vivo:** https://tudiahabiluy.github.io/

![HÁBIL.UY](banner.jpg)

### ¿Qué es?

HÁBIL.UY es una calculadora de vencimientos pensada para Uruguay. Ingresás una fecha de inicio y la cantidad de días hábiles, y te devuelve la fecha resultante descontando:

- Sábados y domingos
- Feriados no laborables (5 inamovibles + 3 trasladables por Ley 16.805)
- Opcionalmente, feriados laborables (Carnaval, Turismo, Reyes, Artigas, Difuntos) — ideal para juzgados y trámites que sí los cuentan como inhábiles.

Hecho con precisión legal uruguaya, sin tracking innecesario.

---

### ✨ Funcionalidades

- **Cálculo exacto:** Cuenta desde el día siguiente a la fecha de inicio.
- **Traslado automático Ley 16.805:** 
  - Si el feriado cae martes o miércoles → se mueve al lunes anterior
  - Si cae jueves o viernes → se mueve al lunes siguiente
  - Si cae lunes, sábado o domingo → se mantiene
- **Dos modos:**
  - `Solo no laborables` (régimen general)
  - `Incluir laborables` (recomendado para Poder Judicial / más preciso)
- **Detalle de días salteados:** Lista cada fin de semana y feriado que se omitió con motivo.
- **Cálculo de Pascua gregoriana:** Para Semana de Turismo y Carnaval.
- **UX pulida:** Copy-to-clipboard, chips rápidos (+5, +10, +15, +30), scroll automático en mobile, confetti al calcular.
- **SEO listo:** OG tags para WhatsApp / Twitter, `meta description` optimizada.

### 📅 Feriados contemplados (2026+)

**5 Inamovibles — No laborables:**
- 1° de enero — Año Nuevo
- 1° de mayo — Día de los Trabajadores
- 18 de julio — Jura de la Constitución
- 25 de agosto — Declaratoria de la Independencia
- 25 de diciembre — Navidad

**3 Trasladables — No laborables (Ley 16.805):**
- 19 de abril — Desembarco de los Treinta y Tres Orientales
- 18 de mayo — Batalla de Las Piedras
- 12 de octubre — Día de la Diversidad Cultural

**Laborables (opcional):**
- 6 de enero — Reyes
- 19 de junio — Natalicio de Artigas
- 2 de noviembre — Día de los Difuntos
- Lunes y martes de Carnaval (48 y 47 días antes de Pascua)
- Semana de Turismo completa (7 días hasta Domingo de Pascua)

> La Pascua se calcula con el algoritmo de Meeus/Jones/Butcher para Pascua gregoriana.

### 🧠 Cómo funciona el algoritmo

```js
// 1. Genera todos los feriados del año (y años siguientes si hace falta)
// 2. Itera día por día desde inicio + 1
// 3. Si es finde -> skip
// 4. Si es feriado en el Map -> skip (y guarda razón)
// 5. Si no, cuenta como día hábil
// 6. Para trasladables: aplica I0(fecha) = traslado a lunes

function esTrasladable(d) {
  const day = d.getDay(); // 0 Dom ... 6 Sab
  if ([0,1,6].includes(day)) return d; // se queda
  if ([2,3].includes(day)) return addDays(d, -(day-1)); // Mar/Mie -> Lun anterior
  return addDays(d, 8-day); // Jue/Vie -> Lun siguiente
}
```

El loop está limitado a 3000 iteraciones y expande años automáticamente (`ceil(dias/180)+3`) para cálculos largos.

### 🛠️ Stack

- **Frontend:** React 18.3.1 (build inline, sin bundler) + Tailwind CSS
- **Fuentes:** Outfit (display) + Inter
- **Hosting:** GitHub Pages (`https://tudiahabiluy.github.io/`)
- **Analytics:** Google tag `G-T31LL5LK45`
- **Assets:** `banner.jpg` 1200x630 para OG

Es un single-file app: todo el código está en el `index.html` que subiste. Cero dependencias de build.

### 🚀 Correr local

Como es estático, no necesitás instalar nada:

```bash
# 1. Clonar
git clone https://github.com/tudiahabiluy/tudiahabiluy.github.io.git
cd tudiahabiluy.github.io

# 2. Servir
npx serve .
# o
python -m http.server 8000
```

Abrí http://localhost:8000

Si querés modularizar a Vite:

```bash
npm create vite@latest habil-uy -- --template react
# copiar lógica de Gc() / M0() / I0() a src/utils/feriados.js
```

### 📦 Deploy

El repo es el propio GitHub Pages. Cada push a `main` se publica automático.

Estructura actual:
```
/
├── index.html   # App completa (React + Tailwind + lógica)
├── banner.jpg   # OG image 1200x630
└── README.md    # este archivo
```

### 🔍 SEO / OG

Ya incluido en `<head>`:

```html
<meta property="og:title" content="Calculadora de Día Hábil en Uruguay - Suma días hábiles">
<meta property="og:description" content="...">
<meta property="og:image" content="banner.jpg">
<meta name="twitter:card" content="summary_large_image">
```

Keywords: `día hábil Uruguay, calcular día hábil Uruguay, fecha hábil Uruguay, días hábiles, calcular fecha Uruguay`

### 🗺️ Roadmap

- [ ] Rango de años con feriados oficiales de Presidencia
- [ ] Exportar a .ics / Google Calendar
- [ ] Modo "días corridos" vs "hábiles"
- [ ] API `/api?from=2026-05-11&days=10&laborables=true`
- [ ] PWA offline

### ⚖️ Aviso legal

Esta herramienta es informativa. No sustituye asesoramiento jurídico. Aunque la lógica sigue la Ley N° 16.805 y el calendario oficial, los juzgados u organismos pueden tener criterios propios (feria judicial, asuetos especiales). Verificá siempre con fuente oficial.

### 🤝 Contribuir

PRs bienvenidos. Si encontrás un feriado mal trasladado, abrí issue con fecha y captura.

### 👤 Autor

Hecho en Montevideo por **Miguel Alves** — [@m.alvcig](https://www.instagram.com/m.alvcig)

© 2026 HÁBIL.UY — Hecho con precisión legal uruguaya.

---
> Si te sirvió, compartilo por WhatsApp. El banner está optimizado para que se vea lindo.
