/* ============================================================
   ATLAN — site configuration & catalog data
   Edit this file to update contact info, brands, and inventory.
   ============================================================ */

const SITE_CONFIG = {
  name: "ATLAN",
  tagline: "Your Dream Piece, Sourced.",
  subline:
    "From Rolex to Patek Philippe, Audemars Piguet to Richard Mille — if you can picture it on your wrist, we can source it for you.",
  email: "hello@atlan.example",
  phone: "+1 (000) 000-0000",
  whatsappNumber: "10000000000", // digits only, include country code, no + or spaces
  instagramHandle: "@atlan",
  instagramUrl: "https://instagram.com/atlan",
  location: "By appointment",
};

/* Brand categories — flat, no sub-categories per brand */
const BRANDS = [
  {
    slug: "rolex",
    name: "Rolex",
    blurb: "The benchmark of modern watchmaking.",
  },
  {
    slug: "patek-philippe",
    name: "Patek Philippe",
    blurb: "Generational pieces, made to be handed down.",
  },
  {
    slug: "audemars-piguet",
    name: "Audemars Piguet",
    blurb: "Bold engineering since 1875.",
  },
  {
    slug: "omega",
    name: "Omega",
    blurb: "Precision proven on the moon and in the depths.",
  },
  {
    slug: "cartier",
    name: "Cartier",
    blurb: "Where horology meets jewellery.",
  },
  {
    slug: "richard-mille",
    name: "Richard Mille",
    blurb: "Motorsport engineering for the wrist.",
  },
];

/* Filterable attribute vocab (kept consistent across catalog + price list) */
const MATERIALS = [
  { value: "steel", label: "Steel" },
  { value: "yellow-gold", label: "Yellow Gold" },
  { value: "rose-gold", label: "Rose Gold" },
  { value: "two-tone", label: "Two-Tone" },
  { value: "platinum", label: "Platinum" },
  { value: "titanium", label: "Titanium" },
];

const DIAL_COLORS = [
  { value: "black", label: "Black", swatch: "#111111" },
  { value: "white", label: "White", swatch: "#f5f5f0" },
  { value: "blue", label: "Blue", swatch: "#1c3a5e" },
  { value: "green", label: "Green", swatch: "#1f3d2b" },
  { value: "silver", label: "Silver", swatch: "#c7c7c7" },
  { value: "champagne", label: "Champagne", swatch: "#d9c48f" },
  { value: "brown", label: "Brown", swatch: "#5b3a24" },
  { value: "grey", label: "Grey", swatch: "#6b6b6b" },
];

const PRICE_BUCKETS = [
  { value: "0-10000", label: "Under $10,000", min: 0, max: 10000 },
  { value: "10000-25000", label: "$10,000 – $25,000", min: 10000, max: 25000 },
  { value: "25000-50000", label: "$25,000 – $50,000", min: 25000, max: 50000 },
  { value: "50000-100000", label: "$50,000 – $100,000", min: 50000, max: 100000 },
  { value: "100000-999999999", label: "$100,000+", min: 100000, max: Infinity },
];

/* Catalog. "price" is a starting/indicative price in USD — sourcing prices
   vary by condition, box/papers, and market availability. */
const WATCHES = [
  // ---------------- Rolex ----------------
  { id: "rolex-submariner-date-steel-black", brand: "rolex", model: "Submariner Date", reference: "126610LN", material: "steel", dialColor: "black", price: 14500, caseSize: "41mm", description: "The archetypal dive watch, unfussy and permanently in demand." },
  { id: "rolex-submariner-nodate-steel-black", brand: "rolex", model: "Submariner", reference: "124060", material: "steel", dialColor: "black", price: 9800, caseSize: "41mm", description: "No-date Submariner — cleaner dial, same 300m capability." },
  { id: "rolex-datejust41-steel-silver", brand: "rolex", model: "Datejust 41", reference: "126334", material: "steel", dialColor: "silver", price: 9200, caseSize: "41mm", description: "The everyday Rolex — fluted bezel, Jubilee bracelet." },
  { id: "rolex-datejust41-twotone-champagne", brand: "rolex", model: "Datejust 41", reference: "126333", material: "two-tone", dialColor: "champagne", price: 12800, caseSize: "41mm", description: "Steel and yellow gold with a warm champagne dial." },
  { id: "rolex-daytona-steel-black", brand: "rolex", model: "Cosmograph Daytona", reference: "126500LN", material: "steel", dialColor: "black", price: 32000, caseSize: "40mm", description: "The most requested chronograph in the world, full stop." },
  { id: "rolex-daytona-yellowgold-black", brand: "rolex", model: "Cosmograph Daytona", reference: "126508", material: "yellow-gold", dialColor: "black", price: 45000, caseSize: "40mm", description: "Daytona in 18k yellow gold with a black lacquer dial." },
  { id: "rolex-gmt-batman-steel-blue", brand: "rolex", model: 'GMT-Master II "Batman"', reference: "126710BLNR", material: "steel", dialColor: "blue", price: 18500, caseSize: "40mm", description: "Blue and black Cerachrom bezel, two time zones on the wrist." },
  { id: "rolex-skydweller-rosegold-brown", brand: "rolex", model: "Sky-Dweller", reference: "326135", material: "rose-gold", dialColor: "brown", price: 44000, caseSize: "42mm", description: "Annual calendar and dual time zone, cased in Everose gold." },

  // ---------------- Patek Philippe ----------------
  { id: "patek-nautilus-steel-blue", brand: "patek-philippe", model: "Nautilus", reference: "5711/1A", material: "steel", dialColor: "blue", price: 145000, caseSize: "40mm", description: "The most coveted sports watch made — extremely limited availability." },
  { id: "patek-aquanaut-steel-black", brand: "patek-philippe", model: "Aquanaut", reference: "5167A", material: "steel", dialColor: "black", price: 45000, caseSize: "40mm", description: "Tropical composite strap, embossed dial, understated sport luxury." },
  { id: "patek-calatrava-rosegold-black", brand: "patek-philippe", model: "Calatrava", reference: "5227R", material: "rose-gold", dialColor: "black", price: 38000, caseSize: "39mm", description: "The definition of a dress watch, in rose gold." },
  { id: "patek-twenty4-steel-white", brand: "patek-philippe", model: "Twenty~4", reference: "7300/1200A", material: "steel", dialColor: "white", price: 30000, caseSize: "36mm", description: "Patek's own take on a refined, modern everyday watch." },

  // ---------------- Audemars Piguet ----------------
  { id: "ap-royaloak-steel-blue", brand: "audemars-piguet", model: "Royal Oak", reference: "15500ST", material: "steel", dialColor: "blue", price: 45000, caseSize: "41mm", description: "The Gerald Genta original — tapisserie dial, octagonal bezel." },
  { id: "ap-royaloak-rosegold-brown", brand: "audemars-piguet", model: "Royal Oak", reference: "15510OR", material: "rose-gold", dialColor: "brown", price: 95000, caseSize: "41mm", description: "Royal Oak in pink gold with a smoked brown dial." },
  { id: "ap-royaloak-offshore-steel-black", brand: "audemars-piguet", model: "Royal Oak Offshore", reference: "26420ST", material: "steel", dialColor: "black", price: 38000, caseSize: "43mm", description: "Bigger, bolder, built for wear." },
  { id: "ap-royaloak-twotone-silver", brand: "audemars-piguet", model: "Royal Oak", reference: "15510SA", material: "two-tone", dialColor: "silver", price: 58000, caseSize: "41mm", description: "Steel and gold Royal Oak with a smoked silver dial." },

  // ---------------- Omega ----------------
  { id: "omega-speedmaster-steel-black", brand: "omega", model: "Speedmaster Moonwatch Professional", reference: "310.30.42.50.01.001", material: "steel", dialColor: "black", price: 7200, caseSize: "42mm", description: "Manual-wind chronograph — the watch worn on the Moon." },
  { id: "omega-seamaster300-steel-blue", brand: "omega", model: "Seamaster Diver 300M", reference: "210.30.42.20.03.001", material: "steel", dialColor: "blue", price: 5600, caseSize: "42mm", description: "Wave-embossed dial, ceramic bezel, everyday-tough." },
  { id: "omega-seamaster300-twotone-black", brand: "omega", model: "Seamaster Diver 300M", reference: "210.20.42.20.01.001", material: "two-tone", dialColor: "black", price: 7900, caseSize: "42mm", description: "Steel and yellow gold Seamaster with a black ceramic dial." },
  { id: "omega-aquaterra-steel-silver", brand: "omega", model: "Aqua Terra 150M", reference: "220.10.41.21.02.001", material: "steel", dialColor: "silver", price: 6400, caseSize: "41mm", description: "Horizontal teak dial — dressy enough for the office, tough enough for the weekend." },

  // ---------------- Cartier ----------------
  { id: "cartier-santos-steel-silver", brand: "cartier", model: "Santos de Cartier Medium", reference: "WSSA0018", material: "steel", dialColor: "silver", price: 7550, caseSize: "35.1mm", description: "The original pilot's watch, reborn with QuickSwitch straps." },
  { id: "cartier-santos-twotone-silver", brand: "cartier", model: "Santos de Cartier Medium", reference: "W2SA0006", material: "two-tone", dialColor: "silver", price: 9300, caseSize: "35.1mm", description: "Steel and yellow gold Santos with a silvered dial." },
  { id: "cartier-tank-must-steel-black", brand: "cartier", model: "Tank Must", reference: "WSTA0056", material: "steel", dialColor: "black", price: 3150, caseSize: "33.7mm", description: "Art Deco lines that have never gone out of style." },
  { id: "cartier-tank-rosegold-silver", brand: "cartier", model: "Tank Louis Cartier", reference: "WGTA0011", material: "rose-gold", dialColor: "white", price: 16500, caseSize: "29.6mm", description: "Tank in solid rose gold — a wardrobe staple, not a sports watch." },

  // ---------------- Richard Mille ----------------
  { id: "rm11-03-titanium-white", brand: "richard-mille", model: "RM 11-03 Flyback Chronograph", reference: "RM11-03", material: "titanium", dialColor: "white", price: 185000, caseSize: "50mm", description: "Skeletonised flyback chronograph in grade 5 titanium." },
  { id: "rm07-01-platinum-white", brand: "richard-mille", model: "RM 07-01", reference: "RM07-01", material: "platinum", dialColor: "white", price: 210000, caseSize: "31.7mm", description: "Richard Mille's ladies' line, in platinum with a skeleton movement." },
];

function getBrand(slug) {
  return BRANDS.find((b) => b.slug === slug);
}

function getWatch(id) {
  return WATCHES.find((w) => w.id === id);
}

function getMaterialLabel(value) {
  return MATERIALS.find((m) => m.value === value)?.label || value;
}

function getDialLabel(value) {
  return DIAL_COLORS.find((d) => d.value === value)?.label || value;
}

function formatPrice(price) {
  return "$" + price.toLocaleString("en-US");
}
