import rawProducts from "./products.json";

const products = rawProducts
  .filter((p) => p.inStock !== false) // inStock: false wale products chhup jayenge
  .map((p) => ({
    ...p,
    id: `${p.category}-${p.name}`.toLowerCase().replace(/\s+/g, "-"),
  }));

export default products;