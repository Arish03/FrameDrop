import Link from "next/link";
import { Product } from "@/lib/mock";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block relative flex flex-col h-full bg-background border border-border/50 hover:border-foreground transition-colors duration-300">
      <div className="relative aspect-[3/4] bg-muted overflow-hidden flex items-center justify-center p-8">
        {/* Placeholder for the actual image. 
            In a real app, we'd use next/image here */}
        <div className="relative z-10 w-full h-full bg-background shadow-xl border border-border/20 transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl flex items-center justify-center text-xs font-mono text-muted-foreground uppercase">
          {product.title} Print
        </div>
        
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.isNew && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="rounded-none px-2 py-0.5 tracking-wider font-semibold bg-foreground text-background">NEW</Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">{product.category}</p>
          <h3 className="font-bold uppercase tracking-tight text-lg mb-1 leading-tight group-hover:underline underline-offset-4">{product.title}</h3>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-sm">${product.price.toFixed(2)}</span>
          <span className="text-xs font-semibold tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">VIEW / BUY</span>
        </div>
      </div>
    </Link>
  );
}
