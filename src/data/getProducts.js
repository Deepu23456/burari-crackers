import rawProducts from "./products.json";

// Har product ko uske category+name se ek unique, stable ID de rahe hain
const products = rawProducts.map((p) => ({
  ...p,
  id: `${p.category}-${p.name}`.toLowerCase().replace(/\s+/g, "-"),
}));

export default products;