import { notFound } from "next/navigation";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [CATEGORIES, PRODUCTS] = await Promise.all([
    fetchCategories(),
    fetchProducts()
  ]);

  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter(p => p.category === slug);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Categories
      </Link>
      
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">{category.name}</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium tracking-tight">
          Explore our collection of {category.name.toLowerCase()} posters. {categoryProducts.length} items available.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground font-medium">Showing {categoryProducts.length} products</p>
        <div className="flex gap-2">
          <select className="bg-transparent border border-border/50 text-sm py-1.5 px-3 focus:outline-none focus:border-foreground transition-colors font-medium cursor-pointer">
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {categoryProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-muted-foreground text-lg mb-4">No products found in this category.</p>
          <Link href="/shop" className="text-sm font-semibold uppercase tracking-widest text-foreground underline underline-offset-4">Browse all posters</Link>
        </div>
      )}
    </div>
  );
}
