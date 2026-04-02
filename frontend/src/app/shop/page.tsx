import { fetchProducts, fetchCategories } from "@/lib/api";
import { ProductCard } from "@/components/shop/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";

export default async function ShopPage() {
  const [PRODUCTS, CATEGORIES] = await Promise.all([
    fetchProducts(),
    fetchCategories()
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">All Posters</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium tracking-tight">
          Explore our complete collection of premium original designs, curated for the modern minimalist aesthetic.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="flex items-center gap-2 mb-6 font-bold uppercase tracking-widest text-sm border-b border-border pb-4">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
          
          <Accordion defaultValue={["category", "price", "size"]} className="w-full">
            <AccordionItem value="category" className="border-border">
              <AccordionTrigger className="hover:no-underline font-semibold uppercase tracking-wider text-sm py-4">Categories</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="flex flex-col gap-3">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3">
                      <Checkbox id={`cat-${cat.id}`} className="rounded-sm" />
                      <Label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {cat.name} <span className="text-muted-foreground ml-1">({cat.count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price" className="border-border">
              <AccordionTrigger className="hover:no-underline font-semibold uppercase tracking-wider text-sm py-4">Price</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="price-1" className="rounded-sm" />
                    <Label htmlFor="price-1" className="text-sm font-medium cursor-pointer">Under $50</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="price-2" className="rounded-sm" />
                    <Label htmlFor="price-2" className="text-sm font-medium cursor-pointer">$50 - $100</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="price-3" className="rounded-sm" />
                    <Label htmlFor="price-3" className="text-sm font-medium cursor-pointer">Over $100</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="size" className="border-border">
              <AccordionTrigger className="hover:no-underline font-semibold uppercase tracking-wider text-sm py-4">Size</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 flex gap-2 flex-wrap">
                {['A4', 'A3', 'A2', 'A1', '50x70'].map(size => (
                  <div key={size} className="border border-border/50 hover:border-foreground text-xs font-mono py-1.5 px-3 cursor-pointer transition-colors">
                    {size}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground font-medium">Showing {PRODUCTS.length} products</p>
            <div className="flex gap-2">
              <select className="bg-transparent border border-border/50 text-sm py-1.5 px-3 focus:outline-none focus:border-foreground transition-colors font-medium cursor-pointer">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
