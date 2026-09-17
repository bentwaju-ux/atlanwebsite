/* ============================================================
   ATLAN — shared behaviour: nav, watch illustrations, filters,
   page-specific rendering. Vanilla JS, no build step required.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFooterInfo();
  highlightActiveNav();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "catalog") initCatalog();
  if (page === "watch") initWatchDetail();
  if (page === "pricelist") initPriceList();
  if (page === "contact") initContact();
});

/* ---------------- Navigation ---------------- */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function highlightActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.classList.add("is-active");
  });
}

function initFooterInfo() {
  document.querySelectorAll("[data-site-email]").forEach((el) => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === "A") el.href = "mailto:" + SITE_CONFIG.email;
  });
  document.querySelectorAll("[data-site-phone]").forEach((el) => {
    el.textContent = SITE_CONFIG.phone;
    if (el.tagName === "A") el.href = "tel:" + SITE_CONFIG.phone.replace(/[^\d+]/g, "");
  });
  document.querySelectorAll("[data-site-instagram]").forEach((el) => {
    el.textContent = SITE_CONFIG.instagramHandle;
    if (el.tagName === "A") el.href = SITE_CONFIG.instagramUrl;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  });
  document.querySelectorAll("[data-site-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------------- Watch illustration (placeholder art) ----------------
   Generates a simple, elegant vector watch face on a white ground.
   Case tone follows `material`, dial fill follows `dialColor`.
   Swap these for real product photography whenever it's ready —
   each card/detail view just needs an <img> or this SVG in its place. */

const CASE_TONES = {
  steel: { light: "#e9e9ea", mid: "#b9bac0", dark: "#7d7e84" },
  "yellow-gold": { light: "#f3d98b", mid: "#d4af37", dark: "#96792a" },
  "rose-gold": { light: "#f1c6ad", mid: "#d79c7d", dark: "#a06a4d" },
  platinum: { light: "#f1f1ee", mid: "#cfd0cc", dark: "#9a9b97" },
  titanium: { light: "#dcdcda", mid: "#a6a7a5", dark: "#6d6e6c" },
  "two-tone": { light: "#e9e9ea", mid: "#d4af37", dark: "#7d7e84" },
};

function generateWatchSVG(watch, size = 320) {
  const tones = CASE_TONES[watch.material] || CASE_TONES.steel;
  const dial = DIAL_COLORS.find((d) => d.value === watch.dialColor) || DIAL_COLORS[0];
  const dialFill = dial.swatch;
  const dialIsDark = isColorDark(dialFill);
  const markerColor = dialIsDark ? "#f2f2ee" : "#1a1a1a";
  const isTwoTone = watch.material === "two-tone";
  const cx = size / 2,
    cy = size / 2;
  const caseR = size * 0.34;
  const bezelR = size * 0.29;
  const dialR = size * 0.25;

  const markers = [];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI / 6) * i - Math.PI / 2;
    const inner = dialR * 0.82;
    const outer = dialR * 0.94;
    const x1 = cx + inner * Math.cos(angle);
    const y1 = cy + inner * Math.sin(angle);
    const x2 = cx + outer * Math.cos(angle);
    const y2 = cy + outer * Math.sin(angle);
    const w = i % 3 === 0 ? 2.4 : 1.2;
    markers.push(
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${markerColor}" stroke-width="${w}" stroke-linecap="round" />`
    );
  }

  const lugW = size * 0.09;
  const lugH = size * 0.16;
  const lugOffset = caseR * 0.72;

  return `
  <svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" role="img" aria-label="${escapeAttr(
    watch.brand + " " + watch.model
  )}">
    <defs>
      <radialGradient id="case-${watch.id}" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stop-color="${tones.light}" />
        <stop offset="55%" stop-color="${tones.mid}" />
        <stop offset="100%" stop-color="${tones.dark}" />
      </radialGradient>
      <linearGradient id="dial-${watch.id}" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stop-color="${dialFill}" stop-opacity="1" />
        <stop offset="100%" stop-color="${dialFill}" stop-opacity="0.85" />
      </linearGradient>
    </defs>

    <!-- lugs -->
    <rect x="${cx - lugW / 2}" y="${cy - caseR - lugOffset * 0}" width="${lugW}" height="${lugH}" rx="3" fill="url(#case-${watch.id})" transform="translate(0,${-caseR * 0.55})" />
    <g fill="url(#case-${watch.id})">
      <rect x="${cx - lugW * 1.3}" y="${cy - caseR - lugH * 0.55}" width="${lugW}" height="${lugH}" rx="3" />
      <rect x="${cx + lugW * 0.3}" y="${cy - caseR - lugH * 0.55}" width="${lugW}" height="${lugH}" rx="3" />
      <rect x="${cx - lugW * 1.3}" y="${cy + caseR - lugH * 0.45}" width="${lugW}" height="${lugH}" rx="3" />
      <rect x="${cx + lugW * 0.3}" y="${cy + caseR - lugH * 0.45}" width="${lugW}" height="${lugH}" rx="3" />
    </g>

    <!-- crown -->
    <rect x="${cx + caseR - 2}" y="${cy - size * 0.03}" width="${size * 0.045}" height="${size * 0.06}" rx="2" fill="url(#case-${watch.id})" />

    <!-- case -->
    <circle cx="${cx}" cy="${cy}" r="${caseR}" fill="url(#case-${watch.id})" stroke="${tones.dark}" stroke-width="1" />
    ${
      isTwoTone
        ? `<path d="M ${cx} ${cy - caseR} A ${caseR} ${caseR} 0 0 1 ${cx} ${cy + caseR}" fill="${CASE_TONES["yellow-gold"].mid}" opacity="0.55" />`
        : ""
    }

    <!-- bezel -->
    <circle cx="${cx}" cy="${cy}" r="${bezelR}" fill="none" stroke="${tones.dark}" stroke-width="${size * 0.012}" opacity="0.5" />

    <!-- dial -->
    <circle cx="${cx}" cy="${cy}" r="${dialR}" fill="url(#dial-${watch.id})" stroke="${tones.dark}" stroke-width="1" />
    ${markers.join("\n    ")}

    <!-- hands -->
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - dialR * 0.55}" stroke="${markerColor}" stroke-width="3" stroke-linecap="round" transform="rotate(-40 ${cx} ${cy})" />
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - dialR * 0.75}" stroke="${markerColor}" stroke-width="2.2" stroke-linecap="round" transform="rotate(70 ${cx} ${cy})" />
    <circle cx="${cx}" cy="${cy}" r="${size * 0.012}" fill="${markerColor}" />

    <!-- brand text on dial -->
    <text x="${cx}" y="${cy - dialR * 0.35}" text-anchor="middle" font-family="Georgia, serif" font-size="${size * 0.032}" fill="${markerColor}" letter-spacing="1">${escapeXML(watch.brand.replace(/-/g, " "))}</text>
  </svg>`;
}

function isColorDark(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}

function escapeXML(str) {
  return String(str).replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));
}
function escapeAttr(str) {
  return escapeXML(str).replace(/"/g, "&quot;");
}

/* ---------------- Watch card (shared by home + catalog) ---------------- */

function watchCardHTML(watch) {
  const brand = getBrand(watch.brand);
  const accent = brand?.color || "var(--gold)";
  return `
  <article class="watch-card" style="--accent:${accent}">
    <a href="watch.html?id=${encodeURIComponent(watch.id)}" class="watch-card__media">
      ${generateWatchSVG(watch)}
    </a>
    <div class="watch-card__body">
      <p class="watch-card__brand">${brand ? brand.name : watch.brand}</p>
      <h3 class="watch-card__model"><a href="watch.html?id=${encodeURIComponent(watch.id)}">${watch.model}</a></h3>
      <p class="watch-card__meta">${getMaterialLabel(watch.material)} &middot; ${getDialLabel(watch.dialColor)} dial</p>
      <p class="watch-card__price">${formatPrice(watch.price)}</p>
    </div>
  </article>`;
}

/* ---------------- Home page ---------------- */

function initHome() {
  const grid = document.querySelector("[data-brand-grid]");
  if (grid) {
    grid.innerHTML = BRANDS.map(
      (b) => `
      <a class="brand-tile" href="catalog.html?brand=${b.slug}" style="--accent:${b.color}">
        <span class="brand-tile__name">${b.name}</span>
        <span class="brand-tile__blurb">${b.blurb}</span>
        <span class="brand-tile__cta" style="color:${b.color}">Shop ${b.name} &rarr;</span>
      </a>`
    ).join("");
  }

  const featured = document.querySelector("[data-featured-grid]");
  if (featured) {
    const picks = [
      "rolex-submariner-date-steel-black",
      "patek-nautilus-steel-blue",
      "ap-royaloak-steel-blue",
      "omega-speedmaster-steel-black",
    ]
      .map(getWatch)
      .filter(Boolean);
    featured.innerHTML = picks.map(watchCardHTML).join("");
  }
}

/* ---------------- Catalog page ---------------- */

function initCatalog() {
  const params = new URLSearchParams(location.search);
  const brandSlug = params.get("brand") || BRANDS[0].slug;
  const brand = getBrand(brandSlug) || BRANDS[0];

  document.querySelectorAll("[data-brand-name]").forEach((el) => (el.textContent = brand.name));
  document.querySelectorAll("[data-brand-blurb]").forEach((el) => (el.textContent = brand.blurb));
  document.querySelectorAll("[data-brand-accent]").forEach((el) => (el.style.background = brand.color));

  const brandNav = document.querySelector("[data-brand-nav]");
  if (brandNav) {
    brandNav.innerHTML = BRANDS.map(
      (b) =>
        `<a href="catalog.html?brand=${b.slug}" class="chip${b.slug === brand.slug ? " is-active" : ""}" style="--accent:${b.color}">${b.name}</a>`
    ).join("");
  }

  const materialFilter = document.querySelector("[data-filter-material]");
  if (materialFilter) {
    materialFilter.innerHTML = MATERIALS.map(
      (m) => `
      <label class="filter-option">
        <input type="checkbox" name="material" value="${m.value}" />
        <span>${m.label}</span>
      </label>`
    ).join("");
  }

  const dialFilter = document.querySelector("[data-filter-dial]");
  if (dialFilter) {
    dialFilter.innerHTML = DIAL_COLORS.map(
      (d) => `
      <label class="filter-option">
        <input type="checkbox" name="dial" value="${d.value}" />
        <span class="swatch" style="background:${d.swatch}"></span>
        <span>${d.label}</span>
      </label>`
    ).join("");
  }

  const priceFilter = document.querySelector("[data-filter-price]");
  if (priceFilter) {
    priceFilter.innerHTML = PRICE_BUCKETS.map(
      (p) => `
      <label class="filter-option">
        <input type="checkbox" name="price" value="${p.value}" />
        <span>${p.label}</span>
      </label>`
    ).join("");
  }

  const grid = document.querySelector("[data-catalog-grid]");
  const count = document.querySelector("[data-result-count]");
  const empty = document.querySelector("[data-empty-state]");
  const form = document.querySelector("[data-filter-form]");

  function render() {
    const checked = (name) =>
      Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((i) => i.value);
    const materials = checked("material");
    const dials = checked("dial");
    const priceKeys = checked("price");
    const priceRanges = priceKeys.map((k) => PRICE_BUCKETS.find((p) => p.value === k));

    let results = WATCHES.filter((w) => w.brand === brand.slug);
    if (materials.length) results = results.filter((w) => materials.includes(w.material));
    if (dials.length) results = results.filter((w) => dials.includes(w.dialColor));
    if (priceRanges.length)
      results = results.filter((w) => priceRanges.some((r) => w.price >= r.min && w.price < r.max));

    const sortValue = document.querySelector("[data-sort]")?.value;
    if (sortValue === "price-asc") results.sort((a, b) => a.price - b.price);
    if (sortValue === "price-desc") results.sort((a, b) => b.price - a.price);

    grid.innerHTML = results.map(watchCardHTML).join("");
    count.textContent = `${results.length} piece${results.length === 1 ? "" : "s"}`;
    empty.hidden = results.length !== 0;
  }

  form.addEventListener("change", render);
  document.querySelector("[data-sort]")?.addEventListener("change", render);
  document.querySelector("[data-clear-filters]")?.addEventListener("click", () => {
    form.reset();
    render();
  });

  render();
}

/* ---------------- Watch detail page ---------------- */

function initWatchDetail() {
  const params = new URLSearchParams(location.search);
  const watch = getWatch(params.get("id"));
  const wrap = document.querySelector("[data-watch-detail]");
  if (!watch || !wrap) {
    document.querySelector("[data-not-found]").hidden = false;
    return;
  }
  const brand = getBrand(watch.brand);

  document.title = `${watch.model} — ${brand.name} | ATLAN`;
  wrap.querySelector("[data-media]").innerHTML = generateWatchSVG(watch, 480);
  wrap.querySelector("[data-media]").style.borderTop = `4px solid ${brand.color}`;
  const brandLink = wrap.querySelector("[data-brand]");
  brandLink.textContent = brand.name;
  brandLink.href = `catalog.html?brand=${brand.slug}`;
  brandLink.style.color = brand.color;
  wrap.querySelector("[data-model]").textContent = watch.model;
  wrap.querySelector("[data-reference]").textContent = watch.reference;
  wrap.querySelector("[data-price]").textContent = formatPrice(watch.price);
  wrap.querySelector("[data-description]").textContent = watch.description;

  const specs = wrap.querySelector("[data-specs]");
  specs.innerHTML = `
    <div><dt>Reference</dt><dd>${watch.reference}</dd></div>
    <div><dt>Case Material</dt><dd>${getMaterialLabel(watch.material)}</dd></div>
    <div><dt>Dial Colour</dt><dd>${getDialLabel(watch.dialColor)}</dd></div>
    <div><dt>Case Size</dt><dd>${watch.caseSize}</dd></div>
    <div><dt>Indicative Price</dt><dd>${formatPrice(watch.price)}</dd></div>
  `;

  const inquireLink = wrap.querySelector("[data-inquire-link]");
  if (inquireLink) {
    inquireLink.href = `contact.html?watch=${encodeURIComponent(brand.name + " " + watch.model + " (" + watch.reference + ")")}`;
  }

  const related = WATCHES.filter((w) => w.brand === watch.brand && w.id !== watch.id).slice(0, 3);
  const relatedGrid = document.querySelector("[data-related-grid]");
  if (relatedGrid) relatedGrid.innerHTML = related.map(watchCardHTML).join("");
}

/* ---------------- Price list page ---------------- */

function initPriceList() {
  const tbody = document.querySelector("[data-price-table-body]");
  const brandSelect = document.querySelector("[data-price-brand]");
  const materialSelect = document.querySelector("[data-price-material]");
  const searchInput = document.querySelector("[data-price-search]");
  const count = document.querySelector("[data-price-count]");
  if (!tbody) return;

  if (brandSelect) {
    brandSelect.innerHTML =
      `<option value="">All Brands</option>` +
      BRANDS.map((b) => `<option value="${b.slug}">${b.name}</option>`).join("");
  }
  if (materialSelect) {
    materialSelect.innerHTML =
      `<option value="">All Materials</option>` +
      MATERIALS.map((m) => `<option value="${m.value}">${m.label}</option>`).join("");
  }

  function render() {
    const brandVal = brandSelect?.value || "";
    const materialVal = materialSelect?.value || "";
    const search = (searchInput?.value || "").trim().toLowerCase();

    let results = [...WATCHES];
    if (brandVal) results = results.filter((w) => w.brand === brandVal);
    if (materialVal) results = results.filter((w) => w.material === materialVal);
    if (search)
      results = results.filter(
        (w) =>
          w.model.toLowerCase().includes(search) ||
          w.reference.toLowerCase().includes(search) ||
          getBrand(w.brand).name.toLowerCase().includes(search)
      );
    results.sort((a, b) => a.price - b.price);

    tbody.innerHTML = results
      .map(
        (w) => `
      <tr>
        <td>${getBrand(w.brand).name}</td>
        <td><a href="watch.html?id=${encodeURIComponent(w.id)}">${w.model}</a></td>
        <td>${w.reference}</td>
        <td>${getMaterialLabel(w.material)}</td>
        <td>${getDialLabel(w.dialColor)}</td>
        <td class="num">${formatPrice(w.price)}</td>
      </tr>`
      )
      .join("");
    if (count) count.textContent = `${results.length} piece${results.length === 1 ? "" : "s"} listed`;
  }

  [brandSelect, materialSelect].forEach((el) => el?.addEventListener("change", render));
  searchInput?.addEventListener("input", render);
  render();
}

/* ---------------- Contact page ---------------- */

function initContact() {
  const params = new URLSearchParams(location.search);
  const watchField = document.querySelector("#watch-interest");
  const presetWatch = params.get("watch");
  if (watchField && presetWatch) watchField.value = presetWatch;

  const form = document.querySelector("[data-contact-form]");
  const successMsg = document.querySelector("[data-form-success]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const watchInterest = data.get("watch") || "";
    const budget = data.get("budget") || "";
    const message = data.get("message") || "";

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      watchInterest ? `Watch of interest: ${watchInterest}` : null,
      budget ? `Budget: ${budget}` : null,
      "",
      message,
    ].filter(Boolean);

    const subject = encodeURIComponent(`New inquiry — ${watchInterest || "ATLAN sourcing request"}`);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;

    if (successMsg) successMsg.hidden = false;
  });
}
