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
4. **Product photography** — every watch shows a generated vector illustration by default (case colour and dial colour driven by that watch's data), so the site never displays copyrighted manufacturer images without a license. Swapping in your own photo is two steps, no other code to touch:
   1. Save your photo (white/plain background works best) into `assets/watches/`, named however you like — e.g. `rolex-submariner-date.jpg`.
   2. Open `js/data.js`, find that watch's entry in the `WATCHES` array, and add (or edit) its `image` field to point at the file: `image: "assets/watches/rolex-submariner-date.jpg",`.

   That's it — the catalog, the homepage, and that watch's own detail page all pick it up automatically. Leave `image` out of an entry and it keeps showing the generated illustration.

   The 8 Rolex watches already have this wired up as a live example, pointing at placeholder graphics in `assets/watches/` (e.g. `rolex-submariner-date-steel-black.svg`) that say "Replace this file with your product photo." To use it: just replace that placeholder file with your real photo of the *same filename* (matching the extension too — rename your `.jpg` to match, or update the `image:` line in `js/data.js` to the new filename/extension). Do this for the other 18 watches the same way, whenever you're ready — one photo, one `image:` line each.
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
