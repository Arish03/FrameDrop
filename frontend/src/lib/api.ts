import { Product, Category } from "./mock";

const API_URL = "http://localhost:5000/api";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products, falling back to mock... ", error);
    const { PRODUCTS } = await import("./mock");
    return PRODUCTS;
  }
}

export async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${idOrSlug}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}, falling back to mock... `, error);
    const { PRODUCTS } = await import("./mock");
    return PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error("Error fetching categories, falling back to mock... ", error);
    const { CATEGORIES } = await import("./mock");
    return CATEGORIES;
  }
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch category");
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching category ${slug}, falling back to mock... `, error);
    const { CATEGORIES } = await import("./mock");
    return CATEGORIES.find(c => c.slug === slug) || null;
  }
}
