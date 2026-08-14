# TU DÍA HÁBIL.UY 🇺🇾

### Calculadora de Días Hábiles Uruguay - Feriados 2026 - Ley 16.805

> Si ponés "dia habil" en YouTube, aparecemos nosotros. Ahora con marca propia.

**Live:** https://tudiahabiluy.github.io/

Calculá vencimientos judiciales, plazos administrativos y fechas de pago descontando automáticamente fines de semana y feriados uruguayos con traslado por Ley 16.805.

---

## ✨ Qué hace

- Sumá **días hábiles** a partir de cualquier fecha (cuenta desde el día siguiente)
- Descuenta **sábados y domingos**
- Descuenta **5 feriados inamovibles no laborables**: 1/1, 1/5, 18/7, 25/8, 25/12
- Descuenta **3 feriados trasladables no laborables** con Ley 16.805:
  - 19/4 Desembarco de los 33 Orientales
  - 18/5 Batalla de Las Piedras  
  - 12/10 Día de la Diversidad Cultural
  - **Regla:** Si caen martes o miércoles → lunes anterior. Si caen jueves o viernes → lunes siguiente.
- Opcional **10+ feriados laborables** (recomendado para juzgados):
  - 6/1 Reyes, 19/6 Artigas, 2/11 Difuntos
  - Lunes y martes de Carnaval (48 y 47 días antes de Pascua)
  - Semana de Turismo completa (cálculo de Pascua gregoriana)
- Te muestra: fecha resultante, ISO, días corridos totales, lista de días salteados con motivo

---

## 🚀 Uso

1. Elegí fecha de inicio
2. Poné cuántos días hábiles querés sumar (+5, +10, +15, +30 rápido)
3. Activá/desactivá "Incluir feriados laborables"
4. Calculá

Dentro del resultado podés:
- 📋 Copiar fecha (formato largo para escritos)
- 📄 Descargar TXT con detalle para expediente
- 📅 Descargar .ICS para Google Calendar / Outlook

---

## 🧠 Motor (no se toca)

El motor es el mismo que ya rankea. Pura fecha sin librerías externas:

```js
easterSunday(year) // Algoritmo de Butcher-Meeus
moveByLaw16805(date) // Traslado a lunes
getHolidays(year, includeLaborables) // Map de feriados
```

Loop de conteo con `iter < 5000` para evitar loops infinitos, carga feriados de años siguientes automáticamente.

---

## 📦 Stack

- HTML5 + TailwindCSS (CDN)
- Vanilla JS (sin React para que cargue en 0.2s en GitHub Pages)
- Fuentes: Outfit (display) + Inter
- PWA Ready: `site.webmanifest`, icons 192/512
- SEO: OG 1200x630, Twitter Card, JSON-LD WebApplication, canonical, sitemap.xml

---

## 🎨 Branding

- **Nombre:** TU DÍA HÁBIL.UY
- **Colores:** #0F2D1E (verde bosque) + #C6FF5A (lima) + #10B981 (emerald) + #E8F5E9 (fondo)
- **Logo:** H + punto lima
- **Dominio:** https://tudiahabiluy.github.io/

Archivos incluidos:
- `banner.jpg` (1200x630) - para WhatsApp/Facebook
- `favicon.ico` + pngs 16/32/48/180/192/512/1024
- `apple-touch-icon.png`

---

## 📂 Estructura

```
/
├── index.html              # App principal (corregida a TU DIA HABIL)
├── banner.jpg              # OG image
├── favicon.ico
├── favicon-*.png
├── apple-touch-icon.png
├── android-chrome-*.png
├── logo-1024.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── 404.html
├── README.md
└── LICENSE
```

---

## 🔧 Deploy en GitHub Pages

```bash
git clone https://github.com/tudiahabiluy/tudiahabiluy.github.io.git
# Copiá los archivos de este ZIP a la raíz
git add .
git commit -m "rebrand a Tu Dia Habil + favicon + banner"
git push origin main
```

GitHub Pages publica automático en 30 segundos.

---

## 📈 SEO - No tocado a propósito

- `gtag` ID G-T31LL5LK45 intacto
- `description` y `keywords` originales mantenidos
- Se agregaron variantes `tudiahabil`, `tu dia habil` sin borrar las que ya rankean
- `og:url` y `canonical` apuntando a https://tudiahabiluy.github.io/

---

## 🤝 Contribuir

¿Encontraste un feriado mal trasladado? Abrí un issue. La fuente oficial es IMPO + Ley 16.805.

---

## 📄 Licencia

MIT - Ver `LICENSE`. Podés usar el código para tu estudio, juzgado o empresa. Solo mantené el crédito.

---

Hecho con precisión legal uruguaya en Montevideo 🇺🇾
© 2026 TU DÍA HÁBIL.UY
