# ATLAN — Wristwatch Sourcing Website

A static, no-build website for ATLAN, a watch sourcing business. Plain HTML/CSS/JS — no framework, no build step. Open `index.html` directly or serve the folder with any static host.

## Structure

- `index.html` — home page (hero, brand grid, featured pieces, process)
- `catalog.html` — per-brand catalog with filters (price, material, dial colour), e.g. `catalog.html?brand=rolex`
- `watch.html` — single watch detail page, e.g. `watch.html?id=rolex-submariner-date-steel-black`
- `pricelist.html` — full searchable/filterable price list across all brands
- `about.html` — brand story / how sourcing works
- `contact.html` — inquiry form (email + WhatsApp), pre-fills the watch of interest when linked from a product page
- `css/style.css` — all styling (strict black & white palette, matches the ATLAN Instagram identity)
- `js/data.js` — **edit this to update your business info and inventory**
- `js/main.js` — page behaviour (nav, filters, rendering, the watch illustrations)

## Before going live — things to customize

1. **Contact info** — open `js/data.js` and fill in `SITE_CONFIG`: real email, phone, WhatsApp number (digits only, with country code), Instagram URL.
2. **Inventory** — the `WATCHES` array in `js/data.js` holds every piece shown on the site (brand, model, reference, material, dial colour, price). Add, remove, or edit entries — the catalog, price list, and filters all read from this one array, so nothing else needs to change.
3. **Logo** — the header currently renders the word "ATLAN" as styled text to match your black/white Instagram look. If you'd rather use your actual IG logo image, replace `<a href="index.html" class="logo">ATLAN</a>` in every page's header with an `<img>` tag pointing at your logo file (drop it in `assets/`).
4. **Product photography** — every watch currently shows a generated vector illustration (case colour and dial colour driven by that watch's data) instead of a real photo, to avoid using copyrighted manufacturer images without a license. Once you have your own white-background product photos:
   - Add them to `assets/watches/`.
   - In `js/data.js`, add an `image: "assets/watches/your-file.jpg"` field to a watch.
   - In `js/main.js`, in `watchCardHTML()` and `initWatchDetail()`, swap the `generateWatchSVG(watch)` call for an `<img src="${watch.image}">` when `watch.image` is present. (Happy to wire this up for you once you have the photos.)
5. **Contact form** — it currently opens the visitor's email client pre-filled with their request (`mailto:`), since this is a static site with no backend. For a form that submits silently in-page, connect a form backend such as [Formspree](https://formspree.io) or your host's built-in form handling (e.g. Netlify Forms) and update the `<form>` in `contact.html` / submit handler in `js/main.js` accordingly.
6. **Pricing** — all prices are indicative starting prices for demonstration. Update them in `js/data.js` to reflect your real sourcing prices.

## Running locally

No build step needed. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

Any static host works as-is: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain web server — just upload the whole folder.
