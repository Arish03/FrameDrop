import Link from "next/link";
import { fetchCategories } from "@/lib/api";
import { ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
  const CATEGORIES = await fetchCategories();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <div className="mb-12 border-b border-border pb-8 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Collections</h1>
        <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight mx-auto">
          Explore our meticulously curated categories. From stark minimalism to cinematic noir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {CATEGORIES.map((category, i) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group block h-[400px] relative overflow-hidden bg-background border border-border/50 hover:border-foreground transition-all duration-500">
            {/* Background texture/pattern simulation */}
            <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-semibold tracking-wider text-muted-foreground">VOL. {String(i + 1).padStart(2, '0')}</span>
                <span className="text-xs font-semibold tracking-widest uppercase border border-border px-2 py-1 bg-background/50 backdrop-blur-xs">
                  {category.count} items
                </span>
              </div>
              
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h2>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors mt-4">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
